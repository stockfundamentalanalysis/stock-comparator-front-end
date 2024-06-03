import { Prisma } from '@prisma/client'

export const fundamentalAnalysisSelect = {
  ticker: true,
  companyname: true,
  currentprice: true,
  targetprice: true,
  dcfpotential: true,
  dcfworstpotential: true,
  sector: true,
  country: true,
  stockcurrency: true,
  reportcurrency: true,
  lastreportdate: true,
  currentper: true,
  meanper: true,
  currentevebitda: true,
  meanevebitda: true,
  currentevebit: true,
  currentpricetobook: true,
  meanpricetobook: true,
  currentpricetofreecashflowrate: true,
  meanpricetofreecashflowrate: true,
  roe: true,
  roic: true,
  meanroic: true,
  roce: true,
  roa: true,
  beta: true,
  netdebttoprice: true,
  cashtototalassets: true,
  cashoverstockprice: true,
  debtqualityratio: true,
  liabilitiestoequityratio: true,
  netdebttoebitda: true,
  meannetdebttoebitda: true,
  interestexpensetoebit: true,
  entreprisevalueusd: true,
  ebitdatendency: true,
  freecashflowtendency: true,
  operatingcashflowtendency: true,
  netincometendency: true,
  equitytendency: true,
  roictendency: true,
  dividendyield: true,
  ebitdamargin: true,
  netincomemargin: true,
  wacc: true,
  tendency: true,
  tendencyauto: true,
  lastupdate: true,
  firstyearreport: true,
} satisfies Prisma.fundamentalanalysisSelect

export type FundamentalAnalysis = Prisma.fundamentalanalysisGetPayload<{
  select: typeof fundamentalAnalysisSelect
}>
