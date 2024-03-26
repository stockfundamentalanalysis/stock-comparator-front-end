import { isNotNull } from '@/lib/helpers'
import prisma from '@/lib/prisma/client'
import { Prisma } from '@prisma/client'

const transactionsSelect = {
  ticker: true,
  price: true,
  numberofstocks: true,
  transactiontype: true,
} satisfies Prisma.transactionsSelect

const fundamentalAnalysisSelect = {
  ticker: true,
  dcfpotential: true,
  dcfworstpotential: true,
  companyname: true,
  currentprice: true,
  stockcurrency: true,
} satisfies Prisma.fundamentalanalysisSelect

const currenciesSelect = {
  currency: true,
  usdconversionfactor: true,
} satisfies Prisma.currenciesSelect

type FundamentalAnalysysPayload = Prisma.fundamentalanalysisGetPayload<{
  select: typeof fundamentalAnalysisSelect
}>

type FundamentalAnalysisMap = Record<string, FundamentalAnalysysPayload>

export interface PortfolioEntry {
  Ticker: string
  StockMargin: number
  StocksOwned: number
  MeanBuyPrice: number
  MeanSellPrice: number
  PercentualMargin: number
  MarginUSD: number
  CurrentPortfolioValueUSD: number
  Potential: number | null
  CompanyName: string | null
  CurrentPrice: number
  WorstPotential: number | null
  ProportionOfPortfolio: number | null
}

export const getPortfolio = async (): Promise<PortfolioEntry[]> => {
  try {
    const transactions = await prisma.transactions.findMany({
      where: {
        ticker: {
          not: null,
        },
      },
      select: transactionsSelect,
    })

    const transactionTickers = transactions.map(
      (transaction) => transaction.ticker!
    )

    const fundamentalAnalysis = await prisma.fundamentalanalysis.findMany({
      where: {
        ticker: {
          in: transactionTickers,
        },
      },
      select: fundamentalAnalysisSelect,
    })

    const fundamentalAnalysisMap: FundamentalAnalysisMap =
      fundamentalAnalysis.reduce((acc, analysis) => {
        acc[analysis.ticker!] = analysis
        return acc
      }, {} as FundamentalAnalysisMap)

    const stockCurrencies = fundamentalAnalysis
      .map((analysis) => analysis.stockcurrency)
      .filter(isNotNull)

    const currencies = await prisma.currencies.findMany({
      where: {
        currency: {
          in: stockCurrencies,
        },
        usdconversionfactor: {
          not: null,
        },
      },
      select: currenciesSelect,
    })

    const currencyMap = currencies.reduce(
      (acc, currency) => {
        acc[currency.currency!] = currency.usdconversionfactor!
        return acc
      },
      {} as Record<string, number>
    )

    // Process transactions to calculate portfolio
    const stockData: Record<string, Record<string, number>> = {}
    let totalCurrentPortfolioValueUSD = 0 // Initialize total value
    transactions.forEach((transaction) => {
      const { ticker, price, numberofstocks, transactiontype } = transaction
      if (!ticker || !price || !numberofstocks || !transactiontype) {
        return
      }

      if (!stockData[ticker]) {
        stockData[ticker] = {
          BuySum: 0,
          BuyNumberOfStocks: 0,
          SellSum: 0,
          SellNumberOfStocks: 0,
        }
      }
      if (transactiontype === 'Buy') {
        stockData[ticker].BuySum += price.toNumber() * numberofstocks
        stockData[ticker].BuyNumberOfStocks += numberofstocks
      } else if (transactiontype === 'Sell') {
        stockData[ticker].SellSum += price.toNumber() * numberofstocks
        stockData[ticker].SellNumberOfStocks += numberofstocks
      }
    })

    // Calculate portfolio
    const portfolio: PortfolioEntry[] = []

    for (const [Ticker, data] of Object.entries(stockData)) {
      const { BuySum, BuyNumberOfStocks, SellSum, SellNumberOfStocks } = data
      // Fetch fundamental analysis data for the ticker
      const fundamentalData = fundamentalAnalysisMap[Ticker]

      if (!fundamentalData?.currentprice || !fundamentalData.stockcurrency) {
        continue
      }

      const conversionFactor = currencyMap[fundamentalData.stockcurrency] || 1

      const StocksOwned = BuyNumberOfStocks - SellNumberOfStocks
      const MeanBuyPrice = BuySum / (BuyNumberOfStocks || 1)
      const MeanSellPrice = SellSum / (SellNumberOfStocks || 1)
      const StockMargin =
        StocksOwned * fundamentalData.currentprice +
        SellNumberOfStocks * MeanSellPrice -
        MeanBuyPrice * BuyNumberOfStocks

      // Calculate additional fields based on Python logic
      const PercentualMargin =
        StockMargin / (MeanBuyPrice * BuyNumberOfStocks) || 0
      const MarginUSD = StockMargin * conversionFactor
      const CurrentPortfolioValueUSD =
        StocksOwned * fundamentalData.currentprice * conversionFactor

      totalCurrentPortfolioValueUSD += CurrentPortfolioValueUSD // Accumulate total value

      // Construct portfolio entry
      const portfolioEntry = {
        Ticker,
        StockMargin,
        StocksOwned,
        MeanBuyPrice,
        MeanSellPrice,
        PercentualMargin,
        MarginUSD,
        CurrentPortfolioValueUSD,
        Potential: fundamentalData.dcfpotential,
        CompanyName: fundamentalData.companyname,
        CurrentPrice: fundamentalData.currentprice,
        WorstPotential: fundamentalData.dcfworstpotential,
        ProportionOfPortfolio: null,
      }

      portfolio.push(portfolioEntry)
    }

    // Calculate proportions for each ticker
    portfolio.forEach((entry) => {
      entry.ProportionOfPortfolio =
        entry.CurrentPortfolioValueUSD / totalCurrentPortfolioValueUSD
    })

    return portfolio
  } catch (e) {
    console.error(e)
    return []
  }
}
