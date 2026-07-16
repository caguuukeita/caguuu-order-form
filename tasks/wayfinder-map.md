## Destination

店頭注文入力アプリから、Google Apps Script (GAS) を経由せずに、直接セキュアに「Lark Bitable」へ注文データを書き込む仕組みを構築する。当面はGoogleスプレッドシート（GAS）へのバックアップ送信も併用するが、将来的にはGASを完全に廃止できるアーキテクチャとする。

## Notes

- フロントエンド（React/Vite）から直接データを送信するため、LarkのAPIキー（App Secret等）をブラウザ側に持たせることはセキュリティ上絶対に避けること。
- そのため、Lark Bitableに標準搭載されている「自動化機能（Automation）のWebhookトリガー」を利用するか、Cloudflare Workersのようなエッジサーバーレス関数を中継地点として用意する必要がある。
- ブラウザからの直接送信となる場合、過去のPower Automateの時と同様にCORS（Cross-Origin Resource Sharing）の制限をいかに回避するかが鍵となる。

## Decisions so far

- [Ticket 1: Lark Bitable WebhookのCORS仕様とペイロード受け入れ調査](tasks/ticket-1-lark-webhook-cors.md) — LarkのWebhookはCORS非対応のため、完全無料でセキュアな「Cloudflare Workers」を中継プロキシとして導入し、そこ経由でLarkへ送信する。
- [Ticket 2: 複数商品のデータ構造マッピング方針の決定](tasks/ticket-2-lark-data-structure.md) — 分析用の別テーブル分割は行わず、実装がシンプルな「1つのテキストフィールドに全入力内容を含めて改行区切りで記録する」フラット構造を採用する。

## 🗺️ The Way is Clear (Wayfinder Completed)

アーキテクチャとデータ構造の意思決定が完了し、霧が晴れました。
ここからは実際の実装フェーズ（Execution）へ移行します。以下のタスクをImplementation Planとして実行します。

1. Cloudflare Workersの構築（中継プロキシ）
2. フロントエンド（`webhook.ts`）からWorkerへの送信ロジックの実装
3. Lark BitableのWebhook設定手順書の作成
