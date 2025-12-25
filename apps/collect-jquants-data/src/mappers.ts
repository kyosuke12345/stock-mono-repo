import type { Prisma } from "@repo/db";
import type {
  DailyQuoteRecord,
  ListedInfoRecord,
  StatementRecord,
} from "./jquants-client.js";

const DEFAULT_FLAG_VALUE = "-";

export function mapCompanyInfo(
  record: ListedInfoRecord
): Prisma.CompanyInfoUncheckedCreateInput {
  return {
    code: record.Code,
    date: record.Date,
    companyName: record.CoName ?? null,
    companyNameEnglish: record.CoNameEn ?? null,
    sector17Code: record.S17 ?? null,
    sector17CodeName: record.S17Nm ?? null,
    sector33Code: record.S33 ?? null,
    sector33CodeName: record.S33Nm ?? null,
    scaleCategory: record.ScaleCat ?? null,
    marketCode: record.Mkt ?? null,
    marketCodeName: record.MktNm ?? null,
    marginCode: record.Mrgn ?? null,
    marginCodeName: record.MrgnNm ?? null,
  };
}

export function mapDailyStockInfo(
  record: DailyQuoteRecord
): Prisma.DailyStockInfoUncheckedCreateInput {
  return {
    code: record.Code,
    date: record.Date,
    open: toNumber(record.O),
    hight: toNumber(record.H),
    low: toNumber(record.L),
    close: toNumber(record.C),
    upperLimit: record.UL ?? DEFAULT_FLAG_VALUE,
    lowerLimit: record.LL ?? DEFAULT_FLAG_VALUE,
    volume: toNumber(record.Vo),
    tradingValue: toNumber(record.Va),
    adjustmentFactor: toNumber(record.AdjFactor),
    adjustmentOpen: toNumber(record.AdjO),
    adjustmentHigh: toNumber(record.AdjH),
    adjustmentLow: toNumber(record.AdjL),
    adjustmentClose: toNumber(record.AdjC),
    adjustmentVolume: toNumber(record.AdjVo),
  };
}

export function mapFinsStatement(
  record: StatementRecord
): Prisma.FinsStatementUncheckedCreateInput {
  return {
    localCode: record.Code,
    disclosureNumber: record.DiscNo,
    disclosedDate: record.DiscDate,
    disclosedTime: record.DiscTime ?? null,
    typeOfDocument: record.DocType ?? null,
    typeOfCurrentPeriod: record.CurPerType ?? null,
    currentPeriodStartDate: record.CurPerSt ?? null,
    currentPeriodEndDate: record.CurPerEn ?? null,
    currentFiscalYearStartDate: record.CurFYSt ?? null,
    currentFiscalYearEndDate: record.CurFYEn ?? null,
    nextFiscalYearStartDate: record.NxtFYSt ?? null,
    nextFiscalYearEndDate: record.NxtFYEn ?? null,
    netSales: record.Sales ?? null,
    operatingProfit: record.OP ?? null,
    ordinaryProfit: record.OdP ?? null,
    profit: record.NP ?? null,
    earningsPerShare: record.EPS ?? null,
    dilutedEarningsPerShare: record.DEPS ?? null,
    bookValuePerShare: record.BPS ?? null,
    totalAssets: record.TA ?? null,
    equity: record.Eq ?? null,
    equityToAssetRatio: record.EqAR ?? null,
    cashFlowsFromOperatingActivities: record.CFO ?? null,
    cashFlowsFromInvestingActivities: record.CFI ?? null,
    cashFlowsFromFinancingActivities: record.CFF ?? null,
    cashAndEquivalents: record.CashEq ?? null,
    resultDividendPerShare1stQuarter: record.Div1Q ?? null,
    resultDividendPerShare2ndQuarter: record.Div2Q ?? null,
    resultDividendPerShare3rdQuarter: record.Div3Q ?? null,
    resultDividendPerShareFiscalYearEnd: record.DivFY ?? null,
    resultDividendPerShareAnnual: record.DivAnn ?? null,
    distributionsPerUnitReit: record.DivUnit ?? null,
    resultTotalDividendPaidAnnual: record.DivTotalAnn ?? null,
    resultPayoutRatioAnnual: record.PayoutRatioAnn ?? null,
    forecastDividendPerShare1stQuarter: record.FDiv1Q ?? null,
    forecastDividendPerShare2ndQuarter: record.FDiv2Q ?? null,
    forecastDividendPerShare3rdQuarter: record.FDiv3Q ?? null,
    forecastDividendPerShareFiscalYearEnd: record.FDivFY ?? null,
    forecastDividendPerShareAnnual: record.FDivAnn ?? null,
    forecastDistributionsPerUnitReit: record.FDivUnit ?? null,
    forecastTotalDividendPaidAnnual: record.FDivTotalAnn ?? null,
    forecastPayoutRatioAnnual: record.FPayoutRatioAnn ?? null,
    nextYearForecastDividendPerShare1stQuarter: record.NxFDiv1Q ?? null,
    nextYearForecastDividendPerShare2ndQuarter: record.NxFDiv2Q ?? null,
    nextYearForecastDividendPerShare3rdQuarter: record.NxFDiv3Q ?? null,
    nextYearForecastDividendPerShareFiscalYearEnd: record.NxFDivFY ?? null,
    nextYearForecastDividendPerShareAnnual: record.NxFDivAnn ?? null,
    nextYearForecastDistributionsPerUnitReit: record.NxFDivUnit ?? null,
    nextYearForecastPayoutRatioAnnual: record.NxFPayoutRatioAnn ?? null,
    forecastNetSales2ndQuarter: record.FSales2Q ?? null,
    forecastOperatingProfit2ndQuarter: record.FOP2Q ?? null,
    forecastOrdinaryProfit2ndQuarter: record.FOdP2Q ?? null,
    forecastProfit2ndQuarter: record.FNP2Q ?? null,
    forecastEarningsPerShare2ndQuarter: record.FEPS2Q ?? null,
    nextYearForecastNetSales2ndQuarter: record.NxFSales2Q ?? null,
    nextYearForecastOperatingProfit2ndQuarter: record.NxFOP2Q ?? null,
    nextYearForecastOrdinaryProfit2ndQuarter: record.NxFOdP2Q ?? null,
    nextYearForecastProfit2ndQuarter: record.NxFNp2Q ?? null,
    nextYearForecastEarningsPerShare2ndQuarter: record.NxFEPS2Q ?? null,
    forecastNetSales: record.FSales ?? null,
    forecastOperatingProfit: record.FOP ?? null,
    forecastOrdinaryProfit: record.FOdP ?? null,
    forecastProfit: record.FNP ?? null,
    forecastEarningsPerShare: record.FEPS ?? null,
    nextYearForecastNetSales: record.NxFSales ?? null,
    nextYearForecastOperatingProfit: record.NxFOP ?? null,
    nextYearForecastOrdinaryProfit: record.NxFOdP ?? null,
    nextYearForecastProfit: record.NxFNp ?? null,
    nextYearForecastEarningsPerShare: record.NxFEPS ?? null,
    numberOfIssuedAndOutstandingSharesAtEnd: record.ShOutFY ?? null,
    numberOfTreasuryStockAtEnd: record.TrShFY ?? null,
    averageNumberOfShares: record.AvgSh ?? null,
    numberOfIssuedAndOutstandingSharesAtTheEndOfFiscalYearIncludingTreasuryStock:
      record.ShOutFY ?? null,
    numberOfTreasuryStockAtTheEndOfFiscalYear: record.TrShFY ?? null,
    materialChangesInSubsidiaries: record.MatChgSub ?? null,
    significantChangesInTheScopeOfConsolidation: record.SigChgInC ?? null,
    changesBasedOnRevisionsOfAccountingStandard: record.ChgByASRev ?? null,
    changesOtherThanOnesBasedOnRevisionsOfAccountingStandard:
      record.ChgNoASRev ?? null,
    changesInAccountingEstimates: record.ChgAcEst ?? null,
    retrospectiveRestatement: record.RetroRst ?? null,
    nonConsolidatedNetSales: record.NCSales ?? null,
    nonConsolidatedOperatingProfit: record.NCOP ?? null,
    nonConsolidatedOrdinaryProfit: record.NCOdP ?? null,
    nonConsolidatedProfit: record.NCNP ?? null,
    nonConsolidatedEarningsPerShare: record.NCEPS ?? null,
    nonConsolidatedTotalAssets: record.NCTA ?? null,
    nonConsolidatedEquity: record.NCEq ?? null,
    nonConsolidatedEquityToAssetRatio: record.NCEqAR ?? null,
    nonConsolidatedBookValuePerShare: record.NCBPS ?? null,
    forecastNonConsolidatedNetSales2ndQuarter: record.FNCSales2Q ?? null,
    forecastNonConsolidatedOperatingProfit2ndQuarter: record.FNCOP2Q ?? null,
    forecastNonConsolidatedOrdinaryProfit2ndQuarter: record.FNCOdP2Q ?? null,
    forecastNonConsolidatedProfit2ndQuarter: record.FNCNP2Q ?? null,
    forecastNonConsolidatedEarningsPerShare2ndQuarter: record.FNCEPS2Q ?? null,
    nextYearForecastNonConsolidatedNetSales2ndQuarter:
      record.NxFNCSales2Q ?? null,
    nextYearForecastNonConsolidatedOperatingProfit2ndQuarter:
      record.NxFNCOP2Q ?? null,
    nextYearForecastNonConsolidatedOrdinaryProfit2ndQuarter:
      record.NxFNCOdP2Q ?? null,
    nextYearForecastNonConsolidatedProfit2ndQuarter:
      record.NxFNCNP2Q ?? null,
    nextYearForecastNonConsolidatedEarningsPerShare2ndQuarter:
      record.NxFNCEPS2Q ?? null,
    forecastNonConsolidatedNetSales: record.FNCSales ?? null,
    forecastNonConsolidatedOperatingProfit: record.FNCOP ?? null,
    forecastNonConsolidatedOrdinaryProfit: record.FNCOdP ?? null,
    forecastNonConsolidatedProfit: record.FNCNP ?? null,
    forecastNonConsolidatedEarningsPerShare: record.FNCEPS ?? null,
    nextYearForecastNonConsolidatedNetSales: record.NxFNCSales ?? null,
    nextYearForecastNonConsolidatedOperatingProfit: record.NxFNCOP ?? null,
    nextYearForecastNonConsolidatedOrdinaryProfit: record.NxFNCOdP ?? null,
    nextYearForecastNonConsolidatedProfit: record.NxFNCNP ?? null,
    nextYearForecastNonConsolidatedEarningsPerShare: record.NxFNCEPS ?? null,
  };
}

function toNumber(value?: string | number | null): number | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}
