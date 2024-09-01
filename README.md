# talkOnChime

- Next.js と Amazon Chime SDK を使用したテレカンファレンスシステム
 - このプロジェクトは、Next.js と Amazon Chime SDK を使用して構築されたテレカンファレンスシステムです。
 - システムは AWS Fargate 上にホストされており、ユーザーがビデオ会議に参加し、リアルタイムチャットを行うことができます。

## 機能

- **ビデオ会議**: Amazon Chime SDK を使用して会議を作成および参加します。
- **リアルタイムチャット**: 会議中に WebSocket を使用してリアルタイムにチャットが可能です。
- **サーバーサイドレンダリング**: Next.js を使用してサーバーサイドレンダリングと動的ルーティングを実現。
- **コンテナ化デプロイ**: Docker を使用してアプリケーションをコンテナ化し、AWS Fargate 上にデプロイ。

## 前提条件

- [Node.js](https://nodejs.org/) (v14 以上)
- [Docker](https://www.docker.com/)
- [AWS CLI](https://aws.amazon.com/cli/)
- [AWS アカウント](https://aws.amazon.com/)

## セットアップ

### 1. リポジトリをクローン

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. AWS クレデンシャルの設定

AWS CLI を使用して AWS クレデンシャルを設定します。

```bash
aws configure
```

### 4. 環境変数の設定

プロジェクトのルートディレクトリに `.env.local` ファイルを作成し、以下の環境変数を追加します。

```plaintext
AWS_REGION=your-aws-region
AWS_ACCOUNT_ID=your-aws-account-id
```

### 5. ローカルでのビルドと実行

ローカル環境でアプリケーションをビルドして実行します。

```bash
npm run build
npm run start
```

ブラウザで `http://localhost:3000` にアクセスします。

## Docker と AWS Fargate でのデプロイ

### 1. Docker イメージのビルド

```bash
docker build -t my-nextjs-chime-app .
```

### 2. ECR へのプッシュ

1. ECR リポジトリがない場合は作成します。

    ```bash
    aws ecr create-repository --repository-name my-nextjs-chime-app
    ```

2. Docker イメージをタグ付けして ECR にプッシュします。

    ```bash
    $(aws ecr get-login --no-include-email --region your-aws-region)
    docker tag my-nextjs-chime-app:latest your-aws-account-id.dkr.ecr.your-aws-region.amazonaws.com/my-nextjs-chime-app:latest
    docker push your-aws-account-id.dkr.ecr.your-aws-region.amazonaws.com/my-nextjs-chime-app:latest
    ```

### 3. AWS Fargate へのデプロイ

1. Fargate の起動タイプを使用して ECS クラスターを作成します。
2. Docker イメージを使用して新しいタスク定義を作成します。
3. タスク定義を使用して ECS サービスを作成します。
4. ALB (Application Load Balancer) を設定して、ECS サービスにトラフィックをルーティングします。
5. Route 53 のレコードを設定して、ドメインを ALB に紐付けます。

## 使用方法

1. デプロイされたアプリケーションの URL にアクセスします。
2. 名前を入力して会議に参加します。
3. アプリケーション内でビデオ会議とチャット機能を使用します。

## 貢献

貢献は大歓迎です！変更を提案する場合は、プルリクエストを提出するか、イシューを立ててください。

## ライセンス

このプロジェクトは MIT ライセンスのもとで公開されています。詳細については [LICENSE](LICENSE) ファイルを参照してください。

### **その他の必要なファイル**

1. **`.gitignore`ファイル**:
   Gitに含めたくないファイルやディレクトリを指定するためのファイルです。

   ```plaintext
   node_modules/
   .env
   .DS_Store
   build/
   .next/
   docker-compose.override.yml
   ```

2. **`.env.local.example`ファイル**:
   環境変数のテンプレートファイルです。ユーザーがコピーして `.env.local` として使用できるようにします。

   ```plaintext
   AWS_REGION=your-aws-region
   AWS_ACCOUNT_ID=your-aws-account-id
   ```

3. **`LICENSE`ファイル**:
   オープンソースライセンス（例: MIT ライセンス）を使用する場合、このファイルをリポジトリに追加します。

   ```plaintext
   MIT License

   Copyright (c) 2023 [Your Name]

   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in
   all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   THE SOFTWARE.
   ```

4. **`docker-compose.yml`（オプション）**:
   開発環境で Docker を使用してアプリケーションを簡単に起動するためのファイル。これはオプションですが、便利な場合があります。

   ```yaml
   version: '3'
   services:
     app:
       image: my-nextjs-chime-app:latest
       ports:
         - "3000:3000"
       environment:
         - AWS_REGION=${AWS_REGION}
         - AWS_ACCOUNT_ID=${AWS_ACCOUNT_ID}
   ```

### **まとめ**

これらのファイルとドキュメントをリポジトリに含めることで、プロジェクトのセットアップ、構築、デプロイ、運用がスムーズに行えるようになります。質問やサポートが必要であれば、いつでもお知らせください。
