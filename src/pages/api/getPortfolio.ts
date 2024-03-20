import { isNotNull } from '@/lib/helpers'
import prisma from '@/lib/prisma/client'
import { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const transactionsSelect = {
  Ticker: true,
  Price: true,
  NumberOfStocks: true,
  TransactionType: true,
} satisfies Prisma.TransactionsSelect

const fundamentalAnalysisSelect = {
  Ticker: true,
  DCFPotential: true,
  DCFWorstPotential: true,
  CompanyName: true,
  CurrentPrice: true,
  StockCurrency: true,
} satisfies Prisma.FundamentalAnalysisSelect

const currenciesSelect = {
  Currency: true,
  USDConversionFactor: true,
} satisfies Prisma.CurrenciesSelect

type FundamentalAnalysysPayload = Prisma.FundamentalAnalysisGetPayload<{
  select: typeof fundamentalAnalysisSelect
}>

type FundamentalAnalysisMap = Record<string, FundamentalAnalysysPayload>

interface PortfolioEntry {
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

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const transactions = await prisma.transactions.findMany({
      where: {
        Ticker: {
          not: null,
        },
      },
      select: transactionsSelect,
    })

    const transactionTickers = transactions.map(
      (transaction) => transaction.Ticker!
    )

    const fundamentalAnalysis = await prisma.fundamentalAnalysis.findMany({
      where: {
        Ticker: {
          in: transactionTickers,
        },
      },
      select: fundamentalAnalysisSelect,
    })

    const fundamentalAnalysisMap: FundamentalAnalysisMap =
      fundamentalAnalysis.reduce((acc, analysis) => {
        acc[analysis.Ticker!] = analysis
        return acc
      }, {} as FundamentalAnalysisMap)

    const stockCurrencies = fundamentalAnalysis
      .map((analysis) => analysis.StockCurrency)
      .filter(isNotNull)

    const currencies = await prisma.currencies.findMany({
      where: {
        Currency: {
          in: stockCurrencies,
        },
        USDConversionFactor: {
          not: null,
        },
      },
      select: currenciesSelect,
    })

    const currencyMap = currencies.reduce(
      (acc, currency) => {
        acc[currency.Currency!] = currency.USDConversionFactor!
        return acc
      },
      {} as Record<string, number>
    )

    // Process transactions to calculate portfolio
    const stockData: Record<string, Record<string, number>> = {}
    let totalCurrentPortfolioValueUSD = 0 // Initialize total value
    transactions.forEach((transaction) => {
      const { Ticker, Price, NumberOfStocks, TransactionType } = transaction
      if (!Ticker || !Price || !NumberOfStocks || !TransactionType) {
        return
      }

      if (!stockData[Ticker]) {
        stockData[Ticker] = {
          BuySum: 0,
          BuyNumberOfStocks: 0,
          SellSum: 0,
          SellNumberOfStocks: 0,
        }
      }
      if (TransactionType === 'Buy') {
        stockData[Ticker].BuySum += Price * NumberOfStocks
        stockData[Ticker].BuyNumberOfStocks += NumberOfStocks
      } else if (TransactionType === 'Sell') {
        stockData[Ticker].SellSum += Price * NumberOfStocks
        stockData[Ticker].SellNumberOfStocks += NumberOfStocks
      }
    })

    // Calculate portfolio
    const portfolio: PortfolioEntry[] = []

    for (const [Ticker, data] of Object.entries(stockData)) {
      const { BuySum, BuyNumberOfStocks, SellSum, SellNumberOfStocks } = data
      // Fetch fundamental analysis data for the ticker
      const fundamentalData = fundamentalAnalysisMap[Ticker]

      if (!fundamentalData?.CurrentPrice || !fundamentalData.StockCurrency) {
        continue
      }

      const conversionFactor = currencyMap[fundamentalData.StockCurrency] || 1

      const StocksOwned = BuyNumberOfStocks - SellNumberOfStocks
      const MeanBuyPrice = BuySum / (BuyNumberOfStocks || 1)
      const MeanSellPrice = SellSum / (SellNumberOfStocks || 1)
      const StockMargin =
        StocksOwned * fundamentalData.CurrentPrice +
        SellNumberOfStocks * MeanSellPrice -
        MeanBuyPrice * BuyNumberOfStocks

      // Calculate additional fields based on Python logic
      const PercentualMargin =
        StockMargin / (MeanBuyPrice * BuyNumberOfStocks) || 0
      const MarginUSD = StockMargin * conversionFactor
      const CurrentPortfolioValueUSD =
        StocksOwned * fundamentalData.CurrentPrice * conversionFactor

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
        Potential: fundamentalData.DCFPotential,
        CompanyName: fundamentalData.CompanyName,
        CurrentPrice: fundamentalData.CurrentPrice,
        WorstPotential: fundamentalData.DCFWorstPotential,
        ProportionOfPortfolio: null,
      }

      portfolio.push(portfolioEntry)
    }

    // Calculate proportions for each ticker
    portfolio.forEach((entry) => {
      entry.ProportionOfPortfolio =
        entry.CurrentPortfolioValueUSD / totalCurrentPortfolioValueUSD
    })

    res.status(200).json(portfolio)
  } catch (error) {
    console.error('Error fetching portfolio data:', error)
    res.status(500).json({ error: 'An error occurred while fetching data' })
  } finally {
    await prisma.$disconnect()
  }
}
