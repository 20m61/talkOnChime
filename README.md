# talkOnChime

Next.js と Amazon Chime SDK を使用したテレカンファレンスシステム

## 概要

`talkOnChime` は、Next.js と Amazon Chime SDK を使用して構築されたテレカンファレンスシステムです。システムは AWS Fargate 上にホストされており、ユーザーがビデオ会議に参加し、リアルタイムチャットを行うことができます。

## 構成

以下は、システムの全体構成図です。

```mermaid
graph TD
    A[Route 53 (DNS)] --> B[Application Load Balancer (ALB)]
    B --> C[ECS Cluster (Fargate)]
    C --> D[Fargate Service]
    D --> E[Container 1 (Next.js App)]
    D --> F[Container 2 (Next.js App)]
    E --> G[Amazon ECR (Docker Images)]
    F --> G[Amazon ECR (Docker Images)]
```

## 機能

- **ビデオ会議**: Amazon Chime SDK を使用して会議を作成および参加します。
- **リアルタイムチャット**: 会議中に WebSocket を使用してリアルタイムにチャットが可能です。
- **サーバーサイドレンダリング**: Next.js を使用してサーバーサイドレンダリングと動的ルーティングを実現。
- **コンテナ化デプロイ**: Docker を使用してアプリケーションをコンテナ化し、AWS Fargate 上にデプロイ。

## 必要条件

- [Node.js](https://nodejs.org/) (v14 以上)
- [Docker](https://www.docker.com/)
- [AWS CLI](https://aws.amazon.com/cli/)
- [AWS CDK](https://aws.amazon.com/cdk/)
- [AWS アカウント](https://aws.amazon.com/)

## セットアップ手順

### 1. リポジトリをクローン

```bash
git clone https://github.com/20m61/talkOnChime.git
cd talkOnChime
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

### 4. Docker イメージのビルド

```bash
docker build -t talkonchime .
```

### 5. CDK によるインフラストラクチャのデプロイ

1. CDK プロジェクトをセットアップ:

   ```bash
   cd cdk
   npm install
   ```

2. CDK を使用して AWS インフラストラクチャをデプロイ:

   ```bash
   cdk deploy
   ```

### 6. アプリケーションのデプロイ

1. Docker イメージを ECR にプッシュ:

   ```bash
   aws ecr create-repository --repository-name talkonchime
   docker tag talkonchime:latest <AWS_ACCOUNT_ID>.dkr.ecr.<AWS_REGION>.amazonaws.com/talkonchime:latest
   docker push <AWS_ACCOUNT_ID>.dkr.ecr.<AWS_REGION>.amazonaws.com/talkonchime:latest
   ```

2. Fargate サービスが自動的にデプロイされます。

## 使用方法

デプロイが完了したら、ALB のエンドポイントにアクセスし、アプリケーションを使用します。

1. アクセスして名前を入力し、会議に参加。
2. アプリケーション内でビデオ会議とチャット機能を使用。

## 貢献

貢献は大歓迎です！プルリクエストを提出するか、イシューを立ててください。

## ライセンス

このプロジェクトは MIT ライセンスのもとで公開されています。詳細については [LICENSE](LICENSE) ファイルを参照してください。

### **まとめ**

このセットアップ手順に従って、Next.js、AWS CDK、および Fargate を使用した完全なテレカンファレンスシステムを構築できます。システムはスケーラブルで管理しやすく、必要に応じて拡張可能です。

何か質問やサポートが必要な場合は、いつでもお知らせください。
