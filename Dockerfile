# ベースイメージ
FROM node:16-alpine

# 作業ディレクトリを作成
WORKDIR /app

# パッケージをコピーしてインストール
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN yarn build

# アプリケーションを起動
CMD ["yarn", "start"]
