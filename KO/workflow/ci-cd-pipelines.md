# CI/CD 파이프라인 자동화

이 문서는 웹 개발 표준에 따라 빌드, 테스트 및 배포 프로세스를 자동화하는 표준화된 CI/CD 파이프라인 구성을 제공합니다.

## GitHub Actions 워크플로

### 기본 CI 파이프라인(GitHub Actions)

```yaml
name: CI 파이프라인

on: 
push: 
branch: [ main, develop ] 
pull_request: 
branch: [ main, develop ] 

jobs: 
build-and-test: 
runs-on: ubuntu-latest 

steps: 
- uses: actions/checkout@v3 

- name: Node.js 설치 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: 종속성 설치 
run: npm ci 

- name: Lint 
run: npm run lint 

- name: 유형 검사 
run: npm run type-check 

- name: 단위 테스트 
실행: npm run test

- name: 빌드
실행: npm run build

- name: 빌드 아티팩트 업로드
사용: actions/upload-artifact@v3
사용: 
name: build-output
경로: dist/ 
``` 

### CI/CD 파이프라인 완료(GitHub Actions)

```yaml
name: CI/CD 파이프라인

on: 
push: 
branch: [ main, develop ] 
pull_request: 
branch: [ main, develop ] 

jobs: 
code-quality: 
runs-on: ubuntu-latest
steps: 
- 사용: actions/checkout@v3

- name: Node.js 설정
사용: actions/setup-node@v3 
사용: 
node-version: '18' 
캐시: 'npm' 

- name: 설치 종속성
실행: npm ci

- 이름: Lint
실행: npm run lint

- 이름: 유형 검사
실행: npm run type-check

- 이름: 코드 스타일 검사
실행: npm run format:check

- 이름: 보안 감사
실행: npm audit --production

테스트:
needs: code-quality
runs-on: ubuntu-latest
steps:
- 사용: actions/checkout@v3

- 이름: Node.js 설치
사용: actions/setup-node@v3
with: 
node-version: '18'
cache: 'npm'

- 이름: 종속성 설치
실행: npm ci

- 이름: 단위 테스트
실행: npm run test

- 이름: 통합 테스트
실행: npm run test:integration

- 이름: 업로드 테스트 커버리지
사용: actions/upload-artifact@v3
함께:
이름: test-coverage
경로: coverage/

빌드:
필요: test
실행: ubuntu-latest
단계:
- 사용: actions/checkout@v3

- 이름: Node.js 설정
사용: actions/setup-node@v3
함께:
노드 버전: '18'
캐시: 'npm'

- 이름: 종속성 설치
실행: npm ci

- 이름: 빌드
실행: npm run build

- 이름: 빌드 아티팩트 업로드
사용: actions/upload-artifact@v3
함께:
이름: build-output
경로: dist/

e2e-tests:
필요: build
실행: ubuntu-latest
단계:
- 사용: actions/checkout@v3

- name: Node.js 설정
uses: actions/setup-node@v3
with: 
node-version: '18' 
cache: 'npm' 

- name: 종속성 설치
run: npm ci

- name: 빌드 아티팩트 다운로드
uses: actions/download-artifact@v3
with: 
name: build-output 
path: dist/ 

- name: E2E 테스트
run: npm run test:e2e 

- name: E2E 테스트 결과 업로드
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

- name: 빌드 아티팩트 다운로드
uses: actions/download-artifact@v3
with: 
name: build-output
path: dist/

- name: 스테이징에 배포
run: |
# 여기에 배포 스크립트를 추가합니다.
echo "스테이징 환경에 배포"

deploy-production:
if: github.event_name == 'push' && github.ref == 'refs/heads/main'
needs: e2e-tests
runs-on: ubuntu-latest
environment: production
steps:
- uses: actions/checkout@v3

- name: 빌드 아티팩트 다운로드
uses: actions/download-artifact@v3
with:
name: build-output
path: dist/

- name: 프로덕션에 배포
run: |
# 여기에 배포 스크립트를 추가하세요.
echo "프로덕션 환경에 배포"
``` 

## GitLab CI/CD 파이프라인

```yaml
단계: 
- 검증 
- 테스트 
- 빌드 
- e2e-테스트 
- 배포 

변수: 
NODE_VERSION: "18" 

캐시: 
키: ${CI_COMMIT_REF_SLUG} 
경로: 
- node_modules/ 

코드 품질: 
단계: 검증 
이미지: node:${NODE_VERSION} 
스크립트: 
- npm ci 
- npm run lint 
- npm run type-check 
- npm run format:check 
- npm audit --production 

단위 테스트: 
단계: 테스트 
이미지: node:${NODE_VERSION} 
스크립트: 
- npm ci
- npm 테스트 실행
아티팩트:
경로:
- coverage/
만료일: 1주

통합 테스트:
단계: 테스트
이미지: node:${NODE_VERSION}
스크립트:
- npm ci
- npm 테스트 실행:통합
아티팩트:
경로:
- integration-coverage/
만료일: 1주

빌드:
단계: 빌드
이미지: node:${NODE_VERSION}
스크립트:
- npm ci
- npm 빌드 실행
아티팩트:
경로:
- dist/
만료일: 1주

e2e 테스트:
단계: e2e 테스트
이미지: cypress/browsers:node${NODE_VERSION}-chrome
스크립트:
- npm ci
- npm 테스트 실행:e2e
아티팩트: 
경로: 
- e2e-results/ 
expire_in: 1 week 

deploy-staging: 
stage: deploy 
image: node:${NODE_VERSION} 
script: 
- echo "스테이징 환경에 배포" 
# 여기에 배포 스크립트를 추가하세요.
environment: 
name: staging 
only: 
- develop 

deploy-production: 
stage: deploy 
image: node:${NODE_VERSION} 
script: 
- echo "프로덕션 환경에 배포" 
# 여기에 배포 스크립트를 추가하세요.
environment: 
name: production 
only: 
- main 
when: manual 
``` 

## Jenkins 파이프라인 

```groovy 
pipeline { 
agent { 
docker { 
image 'node:18' 
} 
} 

stages { 
stage('Install') { 
steps { 
sh 'npm ci' 
} 
} 

stage('코드 품질') { 
parallel { 
stage('린트') { 
steps { 
sh 'npm 실행 lint' 
} 
} 
stage('유형 검사') { 
steps { 
sh 'npm 실행 유형 검사' 
} 
} 
stage('형식 검사') { 
steps { 
sh 'npm 실행 형식:검사' 
} 
} 
stage('보안 감사') { 
steps { 
sh 'npm 감사 --생산' 
} 
} 
} 
} 

stage('테스트') { 
parallel { 
stage('단위 테스트') { 
steps { 
sh 'npm 실행 테스트' 
} 
post { 
항상 { 
junit 'junit-reports/*.xml'
publishHTML(target: [ 
allowMissing: false, 
alwaysLinkToLastBuild: false, 
keepAll: true, 
reportDir: 'coverage', 
reportFiles: 'index.html', 
reportName: '커버리지 보고서' 
]) 
} 
} 
} 
stage('통합 테스트') { 
steps { 
sh 'npm run test:integration' 
} 
} 
} 
} 

stage('빌드') { 
steps { 
sh 'npm run build' 
} 
post { 
success { 
archiveArtifacts 아티팩트: 'dist/**/*', 지문: true 
} 
} 
} 

stage('E2E 테스트') { 
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
reportName: 'E2E 테스트 보고서' 
]) 
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
``` 

## Azure DevOps 파이프라인 

```yaml 
trigger: 
branch: 
include: 
- main 
- develop 

pool: 
vmImage: 'ubuntu-latest' 

variables: 
nodeVersion: '18.x' 

stages: 
- stage: Validate 
jobs: 
- job: CodeQuality
steps: 
- task: NodeTool@0
inputs: 
versionSpec: $(nodeVersion) 
displayName: 'Node.js 설치' 

- script: npm ci 
displayName: '종속성 설치' 

- script: npm run lint 
displayName: '린팅 실행' 

- script: npm run type-check 
displayName: '유형 검사 실행' 

- script: npm run format:check 
displayName: '코드 형식 검사' 

- task: npm@1 
inputs: 
command: 'custom' 
customCommand: 'audit --production' 
displayName: '보안 감사' 

- stage: Test 
dependsOn: Validate 
jobs: 
- job: UnitTests 
steps: 
- task: NodeTool@0
inputs: 
versionSpec: $(nodeVersion) 
displayName: 'Node.js 설치' 

- 스크립트: npm ci 
displayName: '종속성 설치' 

- 스크립트: npm run test 
displayName: '단위 테스트 실행' 

- 작업: PublishTestResults@2 
입력: 
testResultsFormat: 'JUnit' 
testResultsFiles: '**/junit-*.xml' 
mergeTestResults: true 
testRunTitle: '단위 테스트' 
displayName: '테스트 결과 게시' 

- 작업: PublishCodeCoverageResults@1 
입력: 
codeCoverageTool: 'Cobertura' 
summaryFileLocation: '$(System.DefaultWorkingDirectory)/coverage/cobertura-coverage.xml' 
reportDirectory: '$(System.DefaultWorkingDirectory)/coverage' 
displayName: '코드 게시 coverage'

- stage: Build
dependsOn: Test
jobs: 
- job: BuildApp
steps: 
- task: NodeTool@0
inputs: 
versionSpec: $(nodeVersion) 
displayName: 'Node.js 설치' 

- script: npm ci 
displayName: '종속성 설치' 

- script: npm run build 
displayName: '애플리케이션 빌드' 

- task: CopyFiles@2
inputs: 
sourceFolder: '$(System.DefaultWorkingDirectory)/dist' 
contents: '**' 
targetFolder: '$(Build.ArtifactStagingDirectory)' 
displayName: '빌드 파일 복사' 

- task: PublishBuildArtifacts@1
inputs: 
pathToPublish: '$(Build.ArtifactStagingDirectory)' 
artifactName: 'drop' 
displayName: '빌드 아티팩트 게시'

- stage: E2ETest
dependsOn: Build
jobs: 
- job: E2ETests
steps: 
- task: NodeTool@0
inputs: 
versionSpec: $(nodeVersion) 
displayName: 'Node.js 설치' 

- script: npm ci 
displayName: '종속성 설치' 

- task: DownloadBuildArtifacts@0
inputs: 
buildType: 'current' 
downloadType: 'single' 
artifactName: 'drop' 
downloadPath: '$(System.DefaultWorkingDirectory)/dist' 
displayName: '빌드 아티팩트 다운로드' 

- script: npm run test:e2e 
displayName: 'E2E 테스트 실행' 

- task: PublishTestResults@2
inputs: 
testResultsFormat: 'JUnit' 
testResultsFiles: '**/e2e-*.xml'
mergeTestResults: true
testRunTitle: 'E2E 테스트'
displayName: 'E2E 테스트 결과 게시'

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
- script: echo "스테이징 환경에 배포합니다"
displayName: '스테이징 환경에 배포'

- stage: DeployProduction
dependsOn: E2ETest
condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
jobs:
- deployment: DeployProduction
환경: 프로덕션
전략:
runOnce:
배포:
단계:
- 스크립트: echo "프로덕션 환경에 배포"
displayName: '프로덕션 환경에 배포'
```

## CI/CD 파이프라인 모범 사례

1. **빠른 실패**: 린팅 및 유형 검사와 같은 빠른 검사를 먼저 실행하여 빠른 피드백을 제공합니다.
2. **병렬 실행**: 파이프라인 지속 시간을 줄이기 위해 독립적인 작업을 병렬로 실행합니다.
3. **캐싱**: 종속성을 캐시하여 빌드 속도를 높입니다.
4. **아티팩트**: 작업 간에 빌드 아티팩트를 공유하여 다시 빌드를 방지합니다.
5. **환경 분리**: 스테이징 및 프로덕션에 서로 다른 환경을 사용합니다.
6. **수동 승인**: 프로덕션 배포에 대해 수동 승인을 요구합니다.
7. **알림**: 파이프라인 실패에 대한 알림을 설정합니다.
8. **비밀 관리**: 안전한 방법을 사용하여 비밀 및 자격 증명을 처리합니다.
9. **버전 관리**: 빌드 아티팩트에 버전 정보 포함
10. **모니터링**: 파이프라인 성능 모니터링 및 필요에 따라 최적화

## 구현 체크리스트

- [ ] 버전 관리 저장소 설정
- [ ] 원하는 CI/CD 플랫폼 구성
- [ ] 기본 파이프라인 구성 생성
- [ ] 코드 품질 검사 추가
- [ ] 테스트 러너 구성
- [ ] 빌드 프로세스 설정
- [ ] 배포 환경 구성
- [ ] 알림 설정
- [ ] 파이프라인 사용 및 유지 관리 문서화
- [ ] CI/CD 워크플로우 팀 교육
