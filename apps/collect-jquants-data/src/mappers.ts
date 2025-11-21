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
    companyName: record.CompanyName ?? null,
    companyNameEnglish: record.CompanyNameEnglish ?? null,
    sector17Code: record.Sector17Code ?? null,
    sector17CodeName: record.Sector17CodeName ?? null,
    sector33Code: record.Sector33Code ?? null,
    sector33CodeName: record.Sector33CodeName ?? null,
    scaleCategory: record.ScaleCategory ?? null,
    marketCode: record.MarketCode ?? null,
    marketCodeName: record.MarketCodeName ?? null,
    marginCode: record.MarginCode ?? null,
    marginCodeName: record.MarginCodeName ?? null,
  };
}

export function mapDailyStockInfo(
  record: DailyQuoteRecord
): Prisma.DailyStockInfoUncheckedCreateInput {
  return {
    code: record.Code,
    date: record.Date,
    open: toNumber(record.Open),
    hight: toNumber(record.High),
    low: toNumber(record.Low),
    close: toNumber(record.Close),
    upperLimit: record.UpperLimit ?? DEFAULT_FLAG_VALUE,
    lowerLimit: record.LowerLimit ?? DEFAULT_FLAG_VALUE,
    volume: toNumber(record.Volume),
    tradingValue: toNumber(record.TradingValue),
    adjustmentFactor: toNumber(record.AdjustmentFactor),
    adjustmentOpen: toNumber(record.AdjustmentOpen),
    adjustmentHigh: toNumber(record.AdjustmentHigh),
    adjustmentLow: toNumber(record.AdjustmentLow),
    adjustmentClose: toNumber(record.AdjustmentClose),
    adjustmentVolume: toNumber(record.AdjustmentVolume),
  };
}

export function mapFinsStatement(
  record: StatementRecord
): Prisma.FinsStatementUncheckedCreateInput {
  return {
    localCode: record.LocalCode,
    disclosureNumber: record.DisclosureNumber,
    disclosedDate: record.DisclosedDate,
    disclosedTime: record.DisclosedTime ?? null,
    typeOfDocument: record.TypeOfDocument ?? null,
    typeOfCurrentPeriod: record.TypeOfCurrentPeriod ?? null,
    currentPeriodStartDate: record.CurrentPeriodStartDate ?? null,
    currentPeriodEndDate: record.CurrentPeriodEndDate ?? null,
    currentFiscalYearStartDate: record.CurrentFiscalYearStartDate ?? null,
    currentFiscalYearEndDate: record.CurrentFiscalYearEndDate ?? null,
    nextFiscalYearStartDate: record.NextFiscalYearStartDate ?? null,
    nextFiscalYearEndDate: record.NextFiscalYearEndDate ?? null,
    netSales: record.NetSales ?? null,
    operatingProfit: record.OperatingProfit ?? null,
    ordinaryProfit: record.OrdinaryProfit ?? null,
    profit: record.Profit ?? null,
    earningsPerShare: record.EarningsPerShare ?? null,
    dilutedEarningsPerShare: record.DilutedEarningsPerShare ?? null,
    bookValuePerShare: record.BookValuePerShare ?? null,
    totalAssets: record.TotalAssets ?? null,
    equity: record.Equity ?? null,
    equityToAssetRatio: record.EquityToAssetRatio ?? null,
    cashFlowsFromOperatingActivities:
      record.CashFlowsFromOperatingActivities ?? null,
    cashFlowsFromInvestingActivities:
      record.CashFlowsFromInvestingActivities ?? null,
    cashFlowsFromFinancingActivities:
      record.CashFlowsFromFinancingActivities ?? null,
    cashAndEquivalents: record.CashAndEquivalents ?? null,
    resultDividendPerShare1stQuarter:
      record.ResultDividendPerShare1stQuarter ?? null,
    resultDividendPerShare2ndQuarter:
      record.ResultDividendPerShare2ndQuarter ?? null,
    resultDividendPerShare3rdQuarter:
      record.ResultDividendPerShare3rdQuarter ?? null,
    resultDividendPerShareFiscalYearEnd:
      record.ResultDividendPerShareFiscalYearEnd ?? null,
    resultDividendPerShareAnnual: record.ResultDividendPerShareAnnual ?? null,
    distributionsPerUnitReit: record.DistributionsPerUnitREIT ?? null,
    resultTotalDividendPaidAnnual: record.ResultTotalDividendPaidAnnual ?? null,
    resultPayoutRatioAnnual: record.ResultPayoutRatioAnnual ?? null,
    forecastDividendPerShare1stQuarter:
      record.ForecastDividendPerShare1stQuarter ?? null,
    forecastDividendPerShare2ndQuarter:
      record.ForecastDividendPerShare2ndQuarter ?? null,
    forecastDividendPerShare3rdQuarter:
      record.ForecastDividendPerShare3rdQuarter ?? null,
    forecastDividendPerShareFiscalYearEnd:
      record.ForecastDividendPerShareFiscalYearEnd ?? null,
    forecastDividendPerShareAnnual:
      record.ForecastDividendPerShareAnnual ?? null,
    forecastDistributionsPerUnitReit:
      record.ForecastDistributionsPerUnitREIT ?? null,
    forecastTotalDividendPaidAnnual:
      record.ForecastTotalDividendPaidAnnual ?? null,
    forecastPayoutRatioAnnual: record.ForecastPayoutRatioAnnual ?? null,
    nextYearForecastDividendPerShare1stQuarter:
      record.NextYearForecastDividendPerShare1stQuarter ?? null,
    nextYearForecastDividendPerShare2ndQuarter:
      record.NextYearForecastDividendPerShare2ndQuarter ?? null,
    nextYearForecastDividendPerShare3rdQuarter:
      record.NextYearForecastDividendPerShare3rdQuarter ?? null,
    nextYearForecastDividendPerShareFiscalYearEnd:
      record.NextYearForecastDividendPerShareFiscalYearEnd ?? null,
    nextYearForecastDividendPerShareAnnual:
      record.NextYearForecastDividendPerShareAnnual ?? null,
    nextYearForecastDistributionsPerUnitReit:
      record.NextYearForecastDistributionsPerUnitREIT ?? null,
    nextYearForecastPayoutRatioAnnual:
      record.NextYearForecastPayoutRatioAnnual ?? null,
    forecastNetSales2ndQuarter: record.ForecastNetSales2ndQuarter ?? null,
    forecastOperatingProfit2ndQuarter:
      record.ForecastOperatingProfit2ndQuarter ?? null,
    forecastOrdinaryProfit2ndQuarter:
      record.ForecastOrdinaryProfit2ndQuarter ?? null,
    forecastProfit2ndQuarter: record.ForecastProfit2ndQuarter ?? null,
    forecastEarningsPerShare2ndQuarter:
      record.ForecastEarningsPerShare2ndQuarter ?? null,
    nextYearForecastNetSales2ndQuarter:
      record.NextYearForecastNetSales2ndQuarter ?? null,
    nextYearForecastOperatingProfit2ndQuarter:
      record.NextYearForecastOperatingProfit2ndQuarter ?? null,
    nextYearForecastOrdinaryProfit2ndQuarter:
      record.NextYearForecastOrdinaryProfit2ndQuarter ?? null,
    nextYearForecastProfit2ndQuarter:
      record.NextYearForecastProfit2ndQuarter ?? null,
    nextYearForecastEarningsPerShare2ndQuarter:
      record.NextYearForecastEarningsPerShare2ndQuarter ?? null,
    forecastNetSales: record.ForecastNetSales ?? null,
    forecastOperatingProfit: record.ForecastOperatingProfit ?? null,
    forecastOrdinaryProfit: record.ForecastOrdinaryProfit ?? null,
    forecastProfit: record.ForecastProfit ?? null,
    forecastEarningsPerShare: record.ForecastEarningsPerShare ?? null,
    nextYearForecastNetSales: record.NextYearForecastNetSales ?? null,
    nextYearForecastOperatingProfit:
      record.NextYearForecastOperatingProfit ?? null,
    nextYearForecastOrdinaryProfit:
      record.NextYearForecastOrdinaryProfit ?? null,
    nextYearForecastProfit: record.NextYearForecastProfit ?? null,
    nextYearForecastEarningsPerShare:
      record.NextYearForecastEarningsPerShare ?? null,
    numberOfIssuedAndOutstandingSharesAtEnd:
      record.NumberOfIssuedAndOutstandingSharesAtEnd ?? null,
    numberOfTreasuryStockAtEnd: record.NumberOfTreasuryStockAtEnd ?? null,
    averageNumberOfShares: record.AverageNumberOfShares ?? null,
    numberOfIssuedAndOutstandingSharesAtTheEndOfFiscalYearIncludingTreasuryStock:
      record.NumberOfIssuedAndOutstandingSharesAtTheEndOfFiscalYearIncludingTreasuryStock ??
      null,
    numberOfTreasuryStockAtTheEndOfFiscalYear:
      record.NumberOfTreasuryStockAtTheEndOfFiscalYear ?? null,
    nonConsolidatedNetSales: record.NonConsolidatedNetSales ?? null,
    nonConsolidatedOperatingProfit:
      record.NonConsolidatedOperatingProfit ?? null,
    nonConsolidatedOrdinaryProfit:
      record.NonConsolidatedOrdinaryProfit ?? null,
    nonConsolidatedProfit: record.NonConsolidatedProfit ?? null,
    nonConsolidatedEarningsPerShare:
      record.NonConsolidatedEarningsPerShare ?? null,
    nonConsolidatedTotalAssets: record.NonConsolidatedTotalAssets ?? null,
    nonConsolidatedEquity: record.NonConsolidatedEquity ?? null,
    nonConsolidatedEquityToAssetRatio:
      record.NonConsolidatedEquityToAssetRatio ?? null,
    nonConsolidatedBookValuePerShare:
      record.NonConsolidatedBookValuePerShare ?? null,
    forecastNonConsolidatedNetSales2ndQuarter:
      record.ForecastNonConsolidatedNetSales2ndQuarter ?? null,
    forecastNonConsolidatedOperatingProfit2ndQuarter:
      record.ForecastNonConsolidatedOperatingProfit2ndQuarter ?? null,
    forecastNonConsolidatedOrdinaryProfit2ndQuarter:
      record.ForecastNonConsolidatedOrdinaryProfit2ndQuarter ?? null,
    forecastNonConsolidatedProfit2ndQuarter:
      record.ForecastNonConsolidatedProfit2ndQuarter ?? null,
    forecastNonConsolidatedEarningsPerShare2ndQuarter:
      record.ForecastNonConsolidatedEarningsPerShare2ndQuarter ?? null,
    nextYearForecastNonConsolidatedNetSales2ndQuarter:
      record.NextYearForecastNonConsolidatedNetSales2ndQuarter ?? null,
    nextYearForecastNonConsolidatedOperatingProfit2ndQuarter:
      record.NextYearForecastNonConsolidatedOperatingProfit2ndQuarter ?? null,
    nextYearForecastNonConsolidatedOrdinaryProfit2ndQuarter:
      record.NextYearForecastNonConsolidatedOrdinaryProfit2ndQuarter ?? null,
    nextYearForecastNonConsolidatedProfit2ndQuarter:
      record.NextYearForecastNonConsolidatedProfit2ndQuarter ?? null,
    nextYearForecastNonConsolidatedEarningsPerShare2ndQuarter:
      record.NextYearForecastNonConsolidatedEarningsPerShare2ndQuarter ?? null,
    forecastNonConsolidatedNetSales:
      record.ForecastNonConsolidatedNetSales ?? null,
    forecastNonConsolidatedOperatingProfit:
      record.ForecastNonConsolidatedOperatingProfit ?? null,
    forecastNonConsolidatedOrdinaryProfit:
      record.ForecastNonConsolidatedOrdinaryProfit ?? null,
    forecastNonConsolidatedProfit:
      record.ForecastNonConsolidatedProfit ?? null,
    forecastNonConsolidatedEarningsPerShare:
      record.ForecastNonConsolidatedEarningsPerShare ?? null,
    nextYearForecastNonConsolidatedNetSales:
      record.NextYearForecastNonConsolidatedNetSales ?? null,
    nextYearForecastNonConsolidatedOperatingProfit:
      record.NextYearForecastNonConsolidatedOperatingProfit ?? null,
    nextYearForecastNonConsolidatedOrdinaryProfit:
      record.NextYearForecastNonConsolidatedOrdinaryProfit ?? null,
    nextYearForecastNonConsolidatedProfit:
      record.NextYearForecastNonConsolidatedProfit ?? null,
    nextYearForecastNonConsolidatedEarningsPerShare:
      record.NextYearForecastNonConsolidatedEarningsPerShare ?? null,
    materialChangesInSubsidiaries:
      record.MaterialChangesInSubsidiaries ?? null,
    significantChangesInTheScopeOfConsolidation:
      record.SignificantChangesInTheScopeOfConsolidation ?? null,
    changesBasedOnRevisionsOfAccountingStandard:
      record.ChangesBasedOnRevisionsOfAccountingStandard ?? null,
    changesOtherThanOnesBasedOnRevisionsOfAccountingStandard:
      record.ChangesOtherThanOnesBasedOnRevisionsOfAccountingStandard ?? null,
    changesInAccountingEstimates: record.ChangesInAccountingEstimates ?? null,
    retrospectiveRestatement: record.RetrospectiveRestatement ?? null,
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
