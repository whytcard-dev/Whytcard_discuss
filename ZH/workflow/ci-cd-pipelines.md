# CI/CD 流水线自动化

本文档提供标准化的 CI/CD 流水线配置，以根据 Web 开发标准自动化构建、测试和部署流程。

## GitHub Actions 工作流程

### 基本 CI 流水线 (GitHub Actions)

```yaml
名称：CI 流水线

on:
push:
branches: [main,develop]
pull_request:
branches: [main,develop]

jobs:
build-and-test:
runs-on:ubuntu-latest


steps:
- uses:actions/checkout@v3

- name:安装 Node.js
uses:actions/setup-node@v3
with:
node-version:'18'
cache:'npm'

- name:安装依赖项
run:npm ci

- name:Lint
run:npm run lint

- name:类型检查
run:npm run type-check

- name:单元测试
run:npm run测试

- 名称：构建
运行：npm run build

- 名称：上传构建工件
使用：actions/upload-artifact@v3
使用：
名称：build-output
路径：dist/
```

### 完整的 CI/CD 流水线 (GitHub Actions)

```yaml
名称：CI/CD 流水线

开启：
推送：
分支：[main,develop]
拉取请求：
分支：[main,develop]

作业：
代码质量：
运行于：ubuntu-latest
步骤：
- 用途：actions/checkout@v3

- 名称：设置 Node.js
使用：actions/setup-node@v3
使用：
node-version：'18'
缓存：'npm'

- 名称：安装依赖项
运行：npm ci

- 名称：Lint
运行：npm run lint

- 名称：类型检查
运行：npm run type-check

- 名称：代码风格检查
运行：npm run format:check

- 名称：安全审核
运行：npm audit --production

测试：
需求：代码质量
运行于：ubuntu-latest
步骤：
- 使用：actions/checkout@v3

- 名称：安装 Node.js
使用：actions/setup-node@v3
使用：
node-version：'18'
缓存：'npm'

- 名称：安装依赖项
运行：npm ci

- 名称：单元测试
运行：npm run test

- 名称：集成测试
运行：npm run test:integration

- 名称：上传测试覆盖率
使用：actions/upload-artifact@v3
使用：
名称：test-coverage
路径：coverage/

构建：
需求：测试
运行于：ubuntu-latest
步骤：
- 使用：actions/checkout@v3

- 名称：设置 Node.js
使用：actions/setup-node@v3
使用：
node-version：'18'
缓存：'npm'

- 名称：安装依赖项
运行：npm ci

- 名称：构建
运行：npm run build

- 名称：上传构建工件
使用：actions/upload-artifact@v3
使用：
名称：build-output
路径：dist/

e2e-tests：
需求：构建
运行于：ubuntu-latest
步骤：
- 使用： actions/checkout@v3

- 名称：设置 Node.js
使用：actions/setup-node@v3
使用：
node-version：'18'
cache：'npm'

- 名称：安装依赖项
运行：npm ci

- 名称：下载构建工件
使用：actions/download-artifact@v3
使用：
名称：build-output
路径：dist/

- 名称：E2E 测试
运行：npm run test:e2e

- 名称：上传 E2E 测试结果
使用：actions/upload-artifact@v3
使用：
名称：e2e-test-results
路径：e2e-results/

deploy-staging：
if：github.event_name == 'push' && github.ref == 'refs/heads/develop'
需求：e2e-tests
运行环境：ubuntu-latest
环境：staging
步骤：
- 使用：actions/checkout@v3

- 名称：下载构建工件
使用：actions/download-artifact@v3
使用：
名称：build-output
路径：dist/

- 名称：部署到 Staging
运行：|
# 在此处添加您的部署脚本
echo "正在部署到预发布环境"

deploy-production:
if: github.event_name == 'push' && github.ref == 'refs/heads/main'
needs: e2e-tests
running-on: ubuntu-latest
environment: production
steps:
- uses: actions/checkout@v3

- name: 下载构建工件
uses: actions/download-artifact@v3
with:
name: build-output
path: dist/

- name: 部署到生产环境
run: |
# 在此处添加您的部署脚本
echo "正在部署到生产环境"
```

## GitLab CI/CD 流水线

```yaml
阶段：
- 验证
- 测试
- 构建
- e2e-test
- 部署

变量：
NODE_VERSION: "18"

缓存：
键：${CI_COMMIT_REF_SLUG}
路径：
- node_modules/

代码质量：
阶段：验证
镜像：node:${NODE_VERSION}
脚本：
- npm ci
- npm run lint
- npm run type-check
- npm run format:check
- npm audit --production

单元测试：
阶段：测试
镜像：node:${NODE_VERSION}
脚本：
- npm ci
- npm 运行测试
工件：
路径：
- coverage/
过期时间：1 周

集成测试：
阶段：测试
镜像：node:${NODE_VERSION}
脚本：
- npm ci
- npm 运行测试：集成
工件：
路径：
- integration-coverage/
过期时间：1 周

构建：
阶段：构建
镜像：node:${NODE_VERSION}
脚本：
- npm ci
- npm 运行构建
工件：
路径：
- dist/
过期时间：1 周

e2e 测试：
阶段：e2e 测试
镜像：cypress/browsers:node${NODE_VERSION}-chrome
脚本：
- npm ci
- npm 运行测试：e2e
artifacts:
paths:
- e2e-results/
expire_in: 1周

deploy-staging:
stage: deploy
image: node:${NODE_VERSION}
script:
- echo "正在部署到 staging 环境"
# 在此处添加您的部署脚本
environment:
name: staging
only:
-develop

deploy-production:
stage: deploy
image: node:${NODE_VERSION}
script:
- echo "正在部署到生产环境"
# 在此处添加您的部署脚本
environment:
name: production
only:
-main
when: manual
```

## Jenkins 流水线

```groovy
pipeline {
agent {
docker {
image 'node:18'
}
}

stages {
stage('安装') {
步骤 {
sh 'npm ci'
}
}

stage('代码质量') {
并行 {
stage('Lint') {
步骤 {
sh 'npm run lint'
}
}
stage('类型检查') {
步骤 {
sh 'npm run type-check'
}
}
stage('格式检查') {
步骤 {
sh 'npm run format:check'
}
}
stage('安全审计') {
步骤 {
sh 'npm audit --production'
}
}
}
}

stage('测试') {
并行 {
stage('单元测试') {
步骤 {
sh 'npm run test'
}
post {
始终{
junit 'junit-reports/*.xml'
publishHTML(target: [
allowMissing: false,
alwaysLinkToLastBuild: false,
keepAll: true,
reportDir: 'coverage',
reportFiles: 'index.html',
reportName: '覆盖率报告'
])
}
}
}
}
stage('集成测试') {
步骤 {
sh 'npm run test:integration'
}
}
}
}
}

stage('构建') {
步骤 {
sh 'npm run build'
}
post {
成功 {
archiveArtifacts artifacts: 'dist/**/*', finger: true
}
}
}
}

stage('端到端测试') {
步骤{
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
reportName: 'E2E 测试报告'
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

## Azure DevOps 流水线

```yaml
触发器：
分支：
包含：
- 主分支
- 开发分支

池：
vmImage: 'ubuntu-latest'

变量：
节点版本： '18.x'

阶段：
- 阶段：验证
作业：
- 作业：代码质量
步骤：
- 任务：NodeTool@0
输入：
版本规范：$(nodeVersion)
显示名称：'安装 Node.js'

- 脚本：npm ci
显示名称：'安装依赖项'

- 脚本：npm run lint
显示名称：'运行 linting'

- 脚本：npm run type-check
显示名称：'运行类型检查'

- 脚本：npm run format:check
显示名称：'检查代码格式'

- 任务：npm@1
输入：
命令：'自定义'
自定义命令：'audit --production'
显示名称：'安全审计'

- 阶段：测试
依赖项：验证
作业：
- 作业：单元测试
步骤：
- 任务：NodeTool@0
输入：
版本规范：$(nodeVersion)
显示名称：'安装 Node.js'

- 脚本：npm ci
显示名称：'安装依赖项'

- 脚本：npm run test
显示名称：'运行单元测试'

- 任务：PublishTestResults@2
输入：
测试结果格式：'JUnit'
测试结果文件：'**/junit-*.xml'
合并测试结果：true
测试运行标题：'单元测试'
显示名称：'发布测试结果'

- 任务：PublishCodeCoverageResults@1
输入：
代码覆盖工具：'Cobertura'
摘要文件位置： '$(System.DefaultWorkingDirectory)/coverage/cobertura-coverage.xml'
reportDirectory: '$(System.DefaultWorkingDirectory)/coverage'
displayName: '发布代码覆盖率'

- stage: Build
dependsOn: Test
jobs:
- job: BuildApp
steps:
- task: NodeTool@0
input:
versionSpec: $(nodeVersion)
displayName: '安装 Node.js'

- script: npm ci
displayName: '安装依赖项'

- script: npm run build
displayName: '构建应用程序'

- task: CopyFiles@2
input:
sourceFolder: '$(System.DefaultWorkingDirectory)/dist'
contents: '**'
targetFolder: '$(Build.ArtifactStagingDirectory)'
displayName: '复制构建文件'

- task: PublishBuildArtifacts@1
inputs:
pathToPublish: '$(Build.ArtifactStagingDirectory)'
artifactName: 'drop'
displayName: '发布构建文件'

- stage: E2ETest
dependsOn: Build
jobs:
- job: E2ETests
steps:
- task: NodeTool@0
inputs:
versionSpec: $(nodeVersion)
displayName: '安装 Node.js'

- script: npm ci
displayName: '安装依赖项'

- task: DownloadBuildArtifacts@0
inputs:
buildType: 'current'
downloadType: 'single'
artifactName: 'drop'
downloadPath: '$(System.DefaultWorkingDirectory)/dist'
displayName: '下载构建工件'

- script: npm run test:e2e
displayName: '运行 E2E 测试'

- task: PublishTestResults@2
inputs:
testResultsFormat: 'JUnit'
testResultsFiles: '**/e2e-*.xml'
mergeTestResults: true
testRunTitle: 'E2E 测试'
displayName: '发布 E2E 测试结果'

- stage: DeployStaging
dependsOn: E2ETest
condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/develop'))
jobs:
- deploy: DeployStaging
environment: staging
strategy:
runOnce:
部署：
步骤：
- 脚本：echo "部署到暂存环境"
displayName: "部署到暂存环境"

- 阶段：DeployProduction
dependsOn: E2ETest
条件：and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
作业：
- 部署：DeployProduction
环境：生产
策略：
运行一次：
部署：
步骤：
- 脚本：echo "部署到生产环境"
displayName: "部署到生产环境"
```

## CI/CD 流水线最佳实践

1. **快速失败**：首先运行快速检查，例如 linting 和类型检查，以提供快速反馈
2. **并行执行**：并行运行独立作业以减少流水线持续时间
3. **缓存**：缓存依赖项以加快速度构建
4. **工件**：在作业之间共享构建工件，避免重新构建
5. **环境分离**：为暂存和生产环境使用不同的环境
6. **手动审批**：生产部署需要手动审批
7. **通知**：设置流水线故障通知
8. **机密管理**：使用安全方法处理机密和凭证
9. **版本控制**：在构建工件中包含版本信息
10. **监控**：监控流水线性能并根据需要进行优化

## 实施清单

- [ ] 设置版本控制存储库
- [ ] 配置所选的 CI/CD 平台
- [ ] 创建基本流水线配置
- [ ] 添加代码质量检查
- [ ] 配置测试运行器
- [ ] 设置构建流程
- [ ] 配置部署环境
- [ ] 设置通知
- [ ] 文档流水线使用和维护
- [ ] 对团队进行 CI/CD 工作流程培训
