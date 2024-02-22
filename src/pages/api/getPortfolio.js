import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  try {
    const transactions = await prisma.transactions.findMany({
      select: {
        Ticker: true,
        Price: true,
        NumberOfStocks: true,
        TransactionType: true,
      },
    })

    const fundamentalAnalyses = await prisma.fundamentalAnalysis.findMany({
      where: {
        Ticker: {
          in: transactions.map((transaction) => transaction.Ticker),
        },
      },
      select: {
        Ticker: true,
        DCFPotential: true,
        DCFWorstPotential: true,
        CompanyName: true,
        CurrentPrice: true,
        StockCurrency: true,
      },
    })

    const fundamentalAnalysisMap = fundamentalAnalyses.reduce(
      (acc, analysis) => {
        acc[analysis.Ticker] = analysis
        return acc
      },
      {}
    )

    const currencies = await prisma.currencies.findMany({
      where: {
        Currency: {
          in: fundamentalAnalyses.map((analysis) => analysis.StockCurrency),
        },
      },
      select: {
        Currency: true,
        USDConversionFactor: true,
      },
    })

    const currencyMap = currencies.reduce((acc, currency) => {
      acc[currency.Currency] = currency.USDConversionFactor
      return acc
    }, {})

    // Process transactions to calculate portfolio
    const stockData = {}
    let totalCurrentPortfolioValueUSD = 0 // Initialize total value
    transactions.forEach((transaction) => {
      const { Ticker, Price, NumberOfStocks, TransactionType } = transaction
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
    const portfolio = []
    for (const [Ticker, data] of Object.entries(stockData)) {
      const { BuySum, BuyNumberOfStocks, SellSum, SellNumberOfStocks } = data
      // Fetch fundamental analysis data for the ticker
      const fundamentalData = fundamentalAnalysisMap[Ticker]
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
        Potential: fundamentalData?.DCFPotential || null,
        CompanyName: fundamentalData?.CompanyName || null,
        CurrentPrice: fundamentalData?.CurrentPrice || null,
        WorstPotential: fundamentalData?.WorstPotential || null,
      }

      portfolio.push(portfolioEntry)
    }

    // Calculate proportions for each ticker
    portfolio.forEach((entry) => {
      entry['ProportionOfPortfolio'] =
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
