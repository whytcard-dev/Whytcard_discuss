# CI/CD パイプラインの自動化

このドキュメントでは、Web 開発標準に従ってビルド、テスト、デプロイのプロセスを自動化するための標準化された CI/CD パイプライン構成について説明します。

## GitHub Actions ワークフロー

### 基本的な CI パイプライン (GitHub Actions)

```yaml
name: CI パイプライン

on:
push:
branches: [ main, develop ]
pull_request:
branches: [ main, develop ]

jobs:
build-and-test:
runs-on: ubuntu-latest

steps:
- uses: actions/checkout@v3

- name: Node.js のセットアップ
uses: actions/setup-node@v3
with:
node-version: '18'
cache: 'npm'

- name: 依存関係のインストール
run: npm ci

- name: Lint
run: npm run lint

- name: 型チェック
run: npm run type-check

- name: ユニットテスト
run: npm run test

- name: Build
run: npm run build

- name: ビルド成果物のアップロード
uses: actions/upload-artifact@v3
with:
name: build-output
path: dist/
```

### 完全なCI/CDパイプライン（GitHub Actions）

```yaml
name: CI/CDパイプライン

on:
push:
branches: [ main, develop ]
pull_request:
branches: [ main, develop ]

jobs:
code-quality:
runs-on: ubuntu-latest
steps:
- uses: actions/checkout@v3

- name: Node.jsのセットアップ
uses: actions/setup-node@v3
with:
node-version: '18'
cache: 'npm'

- name: インストール依存関係
実行: npm ci

- 名前: Lint
実行: npm run lint

- 名前: 型チェック
実行: npm run type-check

- 名前: コードスタイルチェック
実行: npm run format:check

- 名前: セキュリティ監査
実行: npm audit --production

テスト:
ニーズ: code-quality
実行先: ubuntu-latest
ステップ:
- uses: actions/checkout@v3

- 名前: Node.js のセットアップ
uses: actions/setup-node@v3
with:
node-version: '18'
キャッシュ: 'npm'

- 名前: 依存関係のインストール
実行: npm ci

- 名前: 単体テスト
実行: npm run test

- 名前: 統合テスト
実行: npm run test:integration

- name: テストカバレッジのアップロード
uses: actions/upload-artifact@v3
with:
name: test-coverage
path: coverage/

build:
needs: test
runs-on: ubuntu-latest
steps:
- uses: actions/checkout@v3

- name: Node.jsのセットアップ
uses: actions/setup-node@v3
with:
node-version: '18'
cache: 'npm'

- name: 依存関係のインストール
run: npm ci

- name: ビルド
run: npm run build

- name: ビルド成果物のアップロード
uses: actions/upload-artifact@v3
with:
name: build-output
path: dist/

e2e-tests:
needs: build
runs-on: ubuntu-latest
steps:
- uses: actions/checkout@v3

- name: Node.js のセットアップ
uses: actions/setup-node@v3
with:
node-version: '18'
cache: 'npm'

- name: 依存関係のインストール
run: npm ci

- name: ビルド成果物のダウンロード
uses: actions/download-artifact@v3
with:
name: build-output
path: dist/

- name: E2E テスト
run: npm run test:e2e

- name: E2E テスト結果のアップロード
uses: actions/upload-artifact@v3
with:
name: e2e-test-results
path: e2e-results/

deploy-staging:
if: github.event_name == 'push' && github.ref == 'refs/heads/develop'
needs: e2e-tests
runs-on: ubuntu-latest
environment: staging
steps:
- uses: actions/checkout@v3

- name: ビルド成果物のダウンロード
uses: actions/download-artifact@v3
with:
name: build-output
path: dist/

- name: ステージングへのデプロイ
run: |
# ここにデプロイスクリプトを追加してください
echo "ステージング環境にデプロイしています"

deploy-production: 
if: github.event_name == 'push' && github.ref == 'refs/heads/main' 
needs: e2e-tests 
runs-on: ubuntu-latest 
environment: production 
steps: 
- uses: actions/checkout@v3 

- name: ビルド成果物をダウンロード
uses: actions/download-artifact@v3 
with: 
name: build-output 
path: dist/ 

- name: 本番環境にデプロイ
run: | 
# ここにデプロイスクリプトを追加してください
echo "本番環境にデプロイしています"
```

## GitLab CI/CD パイプライン

```yaml 
stages:
- validate
- test
- build
- e2e-test
- deploy

variables:
NODE_VERSION: "18"

cache:
key: ${CI_COMMIT_REF_SLUG}
paths:
- node_modules/

code-quality:
stage: validate
image: node:${NODE_VERSION}
script:
- npm ci
- npm run lint
- npm run type-check
- npm run format:check
- npm audit --production

unit-tests:
stage: test
image: node:${NODE_VERSION}
script:
- npm ci
- npm run test
アーティファクト:
パス:
- coverage/
有効期限: 1週間

integration-tests:
stage: test
イメージ: node:${NODE_VERSION}
スクリプト:
- npm ci
- npm run test:integration
アーティファクト:
パス:
- integration-coverage/
有効期限: 1週間

build:
stage: build
イメージ: node:${NODE_VERSION}
スクリプト:
- npm ci
- npm run build
アーティファクト:
パス:
- dist/
有効期限: 1週間

e2e-tests:
stage: e2e-test
イメージ: cypress/browsers:node${NODE_VERSION}-chrome
スクリプト:
- npm ci
- npm run test:e2e
アーティファクト:
paths:
- e2e-results/
expire_in: 1 week

deploy-staging:
stage: deploy
image: node:${NODE_VERSION}
script:
- echo "ステージング環境にデプロイしています"
# ここにデプロイメントスクリプトを追加してください
environment:
name: staging
only:
- develop

deploy-production:
stage: deploy
image: node:${NODE_VERSION}
script:
- echo "本番環境にデプロイしています"
# ここにデプロイメントスクリプトを追加してください
environment:
name: production
only:
- main
when: manual
```

## Jenkins パイプライン

```groovy
pipeline {
agent {
docker {
image 'node:18'
}
}

stages {
stage('Install') {
手順 {
sh 'npm ci'
}
}

stage('コード品質') {
parallel {
stage('Lint') {
手順 {
sh 'npm run lint'
}
}
stage('型チェック') {
手順 {
sh 'npm run type-check'
}
}
stage('フォーマットチェック') {
手順 {
sh 'npm run format:check'
}
}
stage('セキュリティ監査') {
手順 {
sh 'npm audit --production'
}
}
}
}

stage('テスト') {
parallel {
stage('単体テスト') {
手順 {
sh 'npm run test'
}
post {
always {
junit 'junit-reports/*.xml'
publishHTML(target: [
allowMissing: false,
alwaysLinkToLastBuild: false,
keepAll: true,
reportDir: 'coverage',
reportFiles: 'index.html',
reportName: 'カバレッジレポート'
])
}
}
}
stage('統合テスト') {
steps {
sh 'npm run test:integration'
}
}
}
}

stage('ビルド') {
steps {
sh 'npm run build'
}
post {
success {
archiveArtifacts アーティファクト: 'dist/**/*', フィンガープリント: true
}
}
}

stage('E2E テスト') {
steps {
sh 'npm run test:e2e'
}
post {
always {
publishHTML(target: [
allowMissing: false,
alwaysLinkToLastBuild: false,
keepAll: true,
reportDir: 'e2e-results',
reportFiles: 'index.html',
reportName: 'E2E テストレポート'
])
}
}
}
}
}

post {
always {
cleanWs()
}
}
}
}
```

## Azure DevOps パイプライン

```yaml
trigger:
branches:
include:
- main
- develop

pool:
vmImage: 'ubuntu-latest'

variables:
nodeVersion: '18.x'

ステージ:
- ステージ: 検証
ジョブ:
- ジョブ: コード品質
ステップ:
- タスク: NodeTool@0
入力:
versionSpec: $(nodeVersion)
表示名: 'Node.js をインストール'

- スクリプト: npm ci
表示名: '依存関係をインストール'

- スクリプト: npm run lint
表示名: 'リンティングを実行'

- スクリプト: npm run type-check
表示名: '型チェックを実行'

- スクリプト: npm run format:check
表示名: 'コードフォーマットをチェック'

- タスク: npm@1
入力:
コマンド: 'custom'
customCommand: 'audit --production'
表示名: 'セキュリティ監査'

- ステージ: テスト
依存先: 検証
ジョブ:
- ジョブ: UnitTests
ステップ:
- タスク: NodeTool@0
入力:
versionSpec: $(nodeVersion)
表示名: 'Node.js をインストール'

- スクリプト: npm ci
表示名: '依存関係をインストール'

- スクリプト: npm run test
表示名: 'ユニットテストを実行'

- タスク: PublishTestResults@2
入力:
testResultsFormat: 'JUnit'
testResultsFiles: '**/junit-*.xml'
mergeTestResults: true
testRunTitle: 'ユニットテスト'
表示名: 'テスト結果を公開'

- タスク: PublishCodeCoverageResults@1
入力:
codeCoverageTool: 'Cobertura'
summaryFileLocation: '$(System.DefaultWorkingDirectory)/coverage/cobertura-coverage.xml'
reportDirectory: '$(System.DefaultWorkingDirectory)/coverage'
displayName: 'コードカバレッジを公開'

- stage: Build
dependsOn: Test
jobs:
- job: BuildApp
steps:
- task: NodeTool@0
inputs:
versionSpec: $(nodeVersion)
displayName: 'Node.js をインストール'

- script: npm ci
displayName: '依存関係をインストール'

- script: npm run build
displayName: 'アプリケーションのビルド'

- task: CopyFiles@2
inputs:
sourceFolder: '$(System.DefaultWorkingDirectory)/dist'
contents: '**'
targetFolder: '$(Build.ArtifactStagingDirectory)'
displayName: 'ビルドファイルのコピー'

- task: PublishBuildArtifacts@1
inputs:
pathToPublish: '$(Build.ArtifactStagingDirectory)'
artifactName: 'drop'
displayName: 'ビルド成果物の公開'

- stage: E2ETest
dependsOn: Build
jobs:
- job: E2ETests
steps:
- task: NodeTool@0
inputs:
versionSpec: $(nodeVersion)
displayName: 'Node.jsのインストール'

- script: npm ci
displayName: '依存関係のインストール'

- task: DownloadBuildArtifacts@0
inputs:
buildType: 'current'
downloadType: 'single'
artifactName: 'drop'
downloadPath: '$(System.DefaultWorkingDirectory)/dist'
displayName: 'ビルド成果物をダウンロード'

- script: npm run test:e2e
displayName: 'E2E テストを実行'

- task: PublishTestResults@2
inputs: 
testResultsFormat: 'JUnit'
testResultsFiles: '**/e2e-*.xml'
mergeTestResults: true
testRunTitle: 'E2E テスト'
displayName: 'E2E テスト結果を公開'

- stage: DeployStaging
dependsOn: E2ETest
condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/develop'))
jobs: 
- deployment: DeployStaging
environment: staging
strategy: 
runOnce: 
deploy: 
steps: 
- script: echo "ステージングにデプロイしています環境"
displayName: 'ステージングにデプロイ'

- stage: DeployProduction
dependsOn: E2ETest
condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
jobs:
- deployment: DeployProduction
environment: production
strategy:
runOnce:
deploy:
steps:
- script: echo "本番環境にデプロイしています"
displayName: '本番環境にデプロイ'
```

## CI/CDパイプラインのベストプラクティス

1. **Fail Fast**: lintや型チェックなどの簡単なチェックを最初に実行して、迅速なフィードバックを提供する
2. **Parallel Execution**: 独立したジョブを並列実行して、パイプラインの実行時間を短縮する
3. **Caching**: 依存関係をキャッシュしてビルドを高速化する
4. **Artifacts**: ジョブ間でビルド成果物を共有して、再構築
5. **環境の分離**: ステージングと本番環境で異なる環境を使用する
6. **手動承認**: 本番環境へのデプロイには手動承認を必須にする
7. **通知**: パイプラインの障害発生時に通知を設定する
8. **シークレット管理**: シークレットと認証情報を安全な方法で処理する
9. **バージョン管理**: ビルド成果物にバージョン情報を含める
10. **監視**: パイプラインのパフォーマンスを監視し、必要に応じて最適化する

## 実装チェックリスト

- [ ] バージョン管理リポジトリを設定する
- [ ] 選択したCI/CDプラットフォームを構成する
- [ ] 基本的なパイプライン構成を作成する
- [ ] コード品質チェックを追加する
- [ ] テストランナーを構成する
- [ ] ビルドプロセスを構成する
- [ ] デプロイ環境を構成する
- [ ] 通知を設定する
- [ ] パイプラインの使用状況とメンテナンスをドキュメント化する
- [ ] CI/CDワークフローについてチームをトレーニングする
