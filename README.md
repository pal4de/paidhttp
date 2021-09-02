# paidhttp

EthereumでHTTP 402エラーの返却を実現するテスト

コードまで人に見せるつもりで作ってないので、いろいろアレです

ごめんなさい

---

ローカルネットワークを永続化していないため、以下の手順が必要です

1. `npm run start`でネットワーク立ち上げ
2. `npm run build:solidity`でデプロイ
3. `app.ts`と`public/payment.js`内のアドレスの書き換え
