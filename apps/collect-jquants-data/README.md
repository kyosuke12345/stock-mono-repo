# collect-jquants-data

データベースに JPX J-Quants API から取得したデータを流し込むためのユーティリティです。

## 必要な環境変数

`.env`（または `.env.example` をコピーしたファイル）に以下を設定してください。

| 変数 | 必須 | 説明 |
| --- | --- | --- |
| `JQUANTS_REFRESH_TOKEN` | ✅ | J-Quants ポータルで発行したリフレッシュトークン |
| `JQUANTS_LISTED_INFO_DATE` | 任意 | 上場銘柄情報を取得する日付（未設定なら最新） |
| `JQUANTS_DAILY_QUOTES_DATE` / `JQUANTS_DAILY_QUOTES_FROM` `JQUANTS_DAILY_QUOTES_TO` | ✅ | 日次株価の取得対象日（単日または期間） |
| `JQUANTS_DAILY_QUOTES_CODE` | 任意 | 銘柄コードを指定すると対象銘柄のみ取得 |
| `JQUANTS_STATEMENTS_DATE` / `JQUANTS_STATEMENTS_FROM` `JQUANTS_STATEMENTS_TO` / `JQUANTS_STATEMENTS_CODE` | ✅ | 財務情報を取得する基準 |

PostgreSQL への接続文字列は `DATABASE_URL` で指定します（ルート `.env` 参照）。

## 使い方

```bash
# 依存関係をインストール済みであること
pnpm install

# Prisma Client を生成（初回のみ）
pnpm --filter @repo/db run prisma:generate

# 収集ジョブを実行
pnpm --filter collect-jquants-data start
```

実行すると以下が順番に行われます。

1. `listed/info` で取得したデータを `company_info` テーブルに upsert
2. `prices/daily_quotes` で取得したデータを `daily_stock_info` テーブルに upsert
3. `statements` で取得したデータを `fins_statement` テーブルに upsert

各処理は 25 件単位でトランザクションを張りながら実行されるため、大量データでもタイムアウトしにくい構成になっています。
