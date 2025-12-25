import { FinsStatement, TypeOfDocumentKey } from "@repo/db";
import { bigintPercent } from "../calc/calc.util.js";

/**
 * 指定した(開示書類種別)のみを抽出し、開示番号の降順でソートして返す
 * @param finStatements FinsStatement[]
 * @returns FinsStatement[]
 */
export function getSameFinsStatements(
  finStatements: FinsStatement[],
  typeOfDocument: TypeOfDocumentKey
): FinsStatement[] {
  const sortedFinStatements = finStatements
    .filter((fs) => fs.typeOfDocument === typeOfDocument)
    .sort((a, b) => {
      if (a.disclosureNumber && b.disclosureNumber) {
        return b.disclosureNumber.localeCompare(a.disclosureNumber);
      }
      return 0;
    });

  // 修正があるので、最新の開示番号のみ抽出する
  const fixedFinsStatement: FinsStatement[] = [];
  for (const fs of sortedFinStatements) {
    if (
      !fixedFinsStatement.some(
        (f) =>
          f.currentPeriodStartDate === fs.currentPeriodStartDate &&
          f.currentPeriodEndDate === fs.currentPeriodEndDate
      )
    ) {
      fixedFinsStatement.push(fs);
    }
  }

  return fixedFinsStatement;
}

/**
 * 2つの決算短信の差分を取得する
 * @param newFinStatement 対象の決算短信
 * @param oldFinStatement 1つ前の決算短信
 * @returns
 */
export function getDifferentFinsStatements(
  newFinStatement: FinsStatement,
  oldFinStatement: FinsStatement
) {
  // 売上差分
  const netSalesDiff =
    BigInt(newFinStatement.netSales || "0") -
    BigInt(oldFinStatement.netSales || "0");
  // 売上伸び率(%)
  const netSalesGrowthRate = bigintPercent(
    newFinStatement.netSales || "0",
    oldFinStatement.netSales || "1",
    2
  );
  // 営業利益差分
  const operatingProfitDiff =
    BigInt(newFinStatement.operatingProfit || "0") -
    BigInt(oldFinStatement.operatingProfit || "0");
  // 営業利益伸び率(%)
  const operatingProfitGrowthRate = bigintPercent(
    newFinStatement.operatingProfit || "0",
    oldFinStatement.operatingProfit || "1",
    2
  );
  // 経常利益差分
  const ordinaryProfitDiff =
    BigInt(newFinStatement.ordinaryProfit || "0") -
    BigInt(oldFinStatement.ordinaryProfit || "0");
  // 経常利益伸び率(%)
  const ordinaryProfitGrowthRate = bigintPercent(
    newFinStatement.ordinaryProfit || "0",
    oldFinStatement.ordinaryProfit || "1",
    2
  );
  // 当期純利益差分
  const profitDiffAfterTax =
    BigInt(newFinStatement.profit || "0") -
    BigInt(oldFinStatement.profit || "0");
  // 当期純利益伸び率(%)
  const profitGrowthRateAfterTax = bigintPercent(
    newFinStatement.profit || "0",
    oldFinStatement.profit || "1",
    2
  );

  return {
    netSalesDiff,
    netSalesGrowthRate,
    operatingProfitDiff,
    operatingProfitGrowthRate,
    ordinaryProfitDiff,
    ordinaryProfitGrowthRate,
    profitDiffAfterTax,
    profitGrowthRateAfterTax,
  };
}
