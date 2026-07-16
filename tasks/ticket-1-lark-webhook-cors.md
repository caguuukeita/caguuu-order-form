## Question

**Lark Bitable WebhookのCORS仕様とペイロード受け入れ調査**

Lark Base（Bitable）の自動化（Automation）機能に存在する「Webhook」トリガーは、フロントエンドからの直接POSTリクエスト（CORS）を許可しているか？
許可していない場合、`text/plain` 形式での送信によってMicrosoft Power Automateの時のようにCORSのプリフライトリクエストを回避可能か？
それともCloudflare Workersのようなバックエンド中継APIを立てる必要があるか？

これを調査し、Larkへデータを流し込むための通信アーキテクチャを決定する。

## Resolution (Closed)

調査の結果、**Lark BitableのAutomation Webhookはブラウザからの直接送信（CORS）を許可していません。** また、LarkのWebhookは `application/json` 形式を要求するため、`text/plain` への偽装（`mode: 'no-cors'`）を用いた強引なブラウザからの送信もエラーとなる可能性が極めて高く、信頼性がありません。

GASを将来的に廃止するという要件を満たしつつ、安全にLarkへデータを送るためには、以下のいずれかの**「中継API（プロキシ）」**を導入する必要があります。

1. **Cloudflare Workers（推奨）**
   - 完全に無料（1日10万リクエストまで）のエッジサーバーレス関数。
   - フロントエンドからのリクエストを受け取り（CORS許可）、Larkへ `application/json` で転送するだけのシンプルな中継プログラムを配置する。LarkのWebhook URLも裏側に隠せるためセキュア。
2. **Make.com (旧 Integromat) などのノーコードiPaaS**
   - Make.comで発行したWebhook（CORS対応済）をフロントエンドの送信先に指定し、Make側でLark Bitable連携モジュールを使ってデータを流し込む。
   - コードを書かずに済むが、無料枠が月間1,000回までという制限がある。

今回は、完全無料で運用コストがかからず、アーキテクチャとしても美しい **Cloudflare Workers** をCORS回避用の中継プロキシとして採用する方針とする。
