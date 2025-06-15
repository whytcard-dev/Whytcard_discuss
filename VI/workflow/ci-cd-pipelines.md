# Tự động hóa đường ống CI/CD

Tài liệu này cung cấp các cấu hình đường ống CI/CD được chuẩn hóa để tự động hóa các quy trình xây dựng, thử nghiệm và triển khai theo các tiêu chuẩn phát triển web.

## GitHub Actions Workflow 

### Basic CI Pipeline (GitHub Actions) 

```yaml
name: CI Pipeline 

on: 
push: 
branches: [ main, development ] 
pull_request: 
branches: [ main, development ] 

jobs: 
build-and-test: 
runs-on: ubuntu-latest 

steps: 
- uses: actions/checkout@v3 

- name: Thiết lập Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Cài đặt các phụ thuộc 
run: npm ci 

- name: Lint 
run: npm run lint 

- name: Kiểm tra kiểu 
run: npm run type-check 

- name: Kiểm tra đơn vị 
run: npm run kiểm tra 

- name: Xây dựng 
chạy: npm chạy xây dựng 

- name: Tải lên các hiện vật xây dựng 
sử dụng: hành động/tải lên-hiện vật@v3 
với: 
name: đầu ra xây dựng 
đường dẫn: dist/ 
``` 

### Đường ống CI/CD hoàn chỉnh (Hành động GitHub) 

```yaml 
name: Đường ống CI/CD 

on: 
đẩy: 
nhánh: [ chính, phát triển ] 
yêu cầu kéo: 
nhánh: [ chính, phát triển ] 

việc làm: 
chất lượng mã: 
chạy trên: ubuntu-mới nhất 
các bước: 
- uses: hành động/kiểm tra@v3 

- name: Thiết lập Node.js 
sử dụng: hành động/thiết lập-node@v3 
với: 
phiên bản nút: '18' 
bộ nhớ đệm: 'npm' 

- name: Cài đặt các phụ thuộc 
chạy: npm ci 

- name: Lint 
run: npm run lint 

- name: Kiểm tra kiểu 
run: npm run type-check 

- name: Kiểm tra kiểu mã 
run: npm run format:check 

- name: Kiểm tra bảo mật 
run: npm audit --production 

test: 
needs: code-quality 
run-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v3 

- name: Thiết lập Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Cài đặt phụ thuộc 
run: npm ci 

- name: Kiểm tra đơn vị 
run: npm run test 

- name: Kiểm tra tích hợp 
run: npm run test:integration 

- name: Tải lên phạm vi kiểm tra 
uses: actions/upload-artifact@v3 
với: 
name: test-coverage 
path: coverage/ 

build: 
needs: test 
runs-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v3 

- name: Thiết lập Node.js 
uses: actions/setup-node@v3 
với: 
node-version: '18' 
cache: 'npm' 

- name: Cài đặt các phụ thuộc 
run: npm ci 

- name: Build 
run: npm run build 

- name: Tải lên các hiện vật dựng 
uses: actions/upload-artifact@v3 
với: 
name: build-output 
path: dist/ 

e2e-tests: 
needs: build 
runs-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v3 

- name: Thiết lập Node.js 
sử dụng: actions/setup-node@v3 
với: 
node-version: '18' 
cache: 'npm' 

- name: Cài đặt các phụ thuộc 
run: npm ci 

- name: Tải xuống các hiện vật xây dựng 
sử dụng: actions/download-artifact@v3 
với: 
name: build-output 
path: dist/ 

- name: Kiểm tra E2E 
run: npm run test:e2e 

- name: Tải lên kết quả kiểm tra E2E 
sử dụng: actions/upload-artifact@v3 
với: 
name: e2e-test-results 
path: e2e-results/ 

triển khai-dàn dựng: 
if: github.event_name == 'push' && github.ref == 'refs/heads/develop' 
cần: e2e-tests 
chạy-trên: ubuntu-latest 
môi trường: dàn dựng 
các bước: 
- sử dụng: hành động/checkout@v3 

- tên: Tải xuống hiện vật xây dựng 
sử dụng: hành động/download-artifact@v3 
với: 
tên: đầu ra xây dựng 
đường dẫn: dist/ 

- tên: Triển khai đến dàn dựng 
chạy: | 
# Thêm tập lệnh triển khai của bạn tại đây
echo "Triển khai lên môi trường dàn dựng"

triển khai-sản xuất: 
if: github.event_name == 'push' && github.ref == 'refs/heads/main' 
needs: e2e-tests 
run-on: ubuntu-latest 
environment: sản xuất 
steps: 
- uses: actions/checkout@v3 

- name: Tải xuống hiện vật xây dựng 
uses: actions/download-artifact@v3 
with: 
name: build-output 
path: dist/ 

- name: Triển khai lên Sản xuất 
run: |
# Thêm tập lệnh triển khai của bạn tại đây
echo "Triển khai lên môi trường sản xuất"
```

## GitLab CI/CD Pipeline

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
- npm run kiểm tra
hiện vật:
đường dẫn:
- phạm vi phủ sóng/
hết hạn trong: 1 tuần

kiểm tra tích hợp:
giai đoạn: kiểm tra
hình ảnh: node:${NODE_VERSION}
tập lệnh:
- npm ci
- npm chạy kiểm tra:tích hợp
hiện vật:
đường dẫn:
- phạm vi phủ sóng tích hợp/
hết hạn trong: 1 tuần

xây dựng:
giai đoạn: xây dựng
hình ảnh: node:${NODE_VERSION}
tập lệnh:
- npm ci
- npm chạy xây dựng
hiện vật:
đường dẫn:
- dist/
hết hạn trong: 1 tuần

kiểm tra e2e:
giai đoạn: kiểm tra e2e
hình ảnh: cypress/browsers:node${NODE_VERSION}-chrome
tập lệnh:
- npm ci
- npm chạy kiểm tra:e2e
hiện vật:
đường dẫn:
- e2e-results/ 
expire_in: 1 tuần

deploy-staging: 
stage: triển khai 
image: node:${NODE_VERSION} 
script: 
- echo "Triển khai lên môi trường dàn dựng" 
# Thêm tập lệnh triển khai của bạn tại đây 
environment: 
name: dàn dựng 
only: 
- development 

deploy-production: 
stage: triển khai 
image: node:${NODE_VERSION} 
script: 
- echo "Triển khai lên môi trường sản xuất" 
# Thêm tập lệnh triển khai của bạn tại đây 
environment: 
name: sản xuất 
only: 
- main 
when: manual 
``` 

## Jenkins Pipeline 

```groovy 
pipeline { 
agent { 
docker { 
image 'node:18' 
} 
} 

periods { 
stage('Cài đặt') { 
steps { 
sh 'npm ci' 
} 
} 

giai đoạn('Chất lượng mã') { 
song song { 
giai đoạn('Lint') { 
các bước { 
sh 'npm run lint' 
} 
} 
giai đoạn('Kiểm tra loại') { 
các bước { 
sh 'npm run type-check' 
} 
} 
giai đoạn('Kiểm tra định dạng') { 
các bước { 
sh 'npm run format:check' 
} 
} 
giai đoạn('Kiểm tra bảo mật') { 
các bước { 
sh 'npm audit --production' 
} 
} 
} 
} 

giai đoạn('Kiểm tra') { 
song song { 
giai đoạn('Kiểm tra đơn vị') { 
các bước { 
sh 'npm run test' 
} 
bài đăng { 
luôn luôn { 
junit 'junit-reports/*.xml'
publishHTML(target: [ 
allowMissing: false, 
alwaysLinkToLastBuild: false, 
keepAll: true, 
reportDir: 'coverage', 
reportFiles: 'index.html', 
reportName: 'Coverage Report' 
]) 
} 
} 
} 
giai đoạn ('Kiểm tra tích hợp') { 
các bước { 
sh 'npm chạy thử nghiệm: tích hợp' 
} 
} 
} 
} 

giai đoạn ('Xây dựng') { 
các bước { 
sh 'npm chạy xây dựng' 
} 
bài đăng { 
thành công { 
archiveArtifacts hiện vật: 'dist/**/*', dấu vân tay: đúng 
} 
} 
} 

giai đoạn ('Kiểm tra E2E') { 
các bước { 
sh 'npm chạy thử nghiệm: e2e' 
} 
bài đăng { 
luôn { 
publishHTML(target: [ 
allowMissing: false, 
alwaysLinkToLastBuild: false, 
keepAll: true, 
reportDir: 'e2e-results', 
reportFiles: 'index.html', 
reportName: 'E2E Test Report' 
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

## Azure DevOps Pipeline 

```yaml
trigger: 
branches: 
include: 
- main 
- development 

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
displayName: 'Cài đặt Node.js' 

- script: npm ci 
displayName: 'Cài đặt các phụ thuộc' 

- script: npm run lint 
displayName: 'Chạy linting' 

- script: npm run type-check 
displayName: 'Chạy kiểm tra kiểu' 

- script: npm run format:check 
displayName: 'Kiểm tra định dạng mã' 

- task: npm@1 
inputs: 
command: 'custom' 
customCommand: 'audit --production' 
displayName: 'Kiểm tra bảo mật' 

- stage: Test 
dependOn: Validate 
jobs: 
- job: UnitTests 
steps: 
- task: NodeTool@0 
inputs: 
versionSpec: $(nodeVersion) 
displayName: 'Cài đặt Node.js' 

- script: npm ci 
displayName: 'Cài đặt các phụ thuộc'

- script: npm run test
displayName: 'Chạy các bài kiểm tra đơn vị'

- task: PublishTestResults@2
inputs: 
testResultsFormat: 'JUnit'
testResultsFiles: '**/junit-*.xml'
mergeTestResults: true
testRunTitle: 'Các bài kiểm tra đơn vị'
displayName: 'Xuất bản kết quả kiểm tra'

- task: PublishCodeCoverageResults@1
inputs: 
codeCoverageTool: 'Cobertura'
summaryFileLocation: '$(System.DefaultWorkingDirectory)/coverage/cobertura-coverage.xml'
reportDirectory: '$(System.DefaultWorkingDirectory)/coverage'
displayName: 'Xuất bản phạm vi phủ sóng mã'

- stage: Build
dependOn: Test
jobs: 
- job: BuildApp
steps: 
- task: NodeTool@0
đầu vào: 
versionSpec: $(nodeVersion) 
displayName: 'Cài đặt Node.js' 

- script: npm ci 
displayName: 'Cài đặt các phụ thuộc' 

- script: npm run build 
displayName: 'Xây dựng ứng dụng' 

- task: CopyFiles@2 
đầu vào: 
sourceFolder: '$(System.DefaultWorkingDirectory)/dist' 
contents: '**' 
targetFolder: '$(Build.ArtifactStagingDirectory)' 
displayName: 'Sao chép tệp xây dựng' 

- task: PublishBuildArtifacts@1 
đầu vào: 
pathToPublish: '$(Build.ArtifactStagingDirectory)' 
artifactName: 'drop' 
displayName: 'Xuất bản hiện vật xây dựng' 

- giai đoạn: E2ETest 
phụ thuộc vào: Xây dựng 
công việc: 
- công việc: E2ETests 
các bước: 
- nhiệm vụ: NodeTool@0 
đầu vào: 
versionSpec: $(nodeVersion) 
displayName: 'Cài đặt Node.js' 

- script: npm ci 
displayName: 'Cài đặt các phụ thuộc' 

- task: DownloadBuildArtifacts@0 
đầu vào: 
buildType: 'current' 
downloadType: 'single' 
artifactName: 'drop' 
downloadPath: '$(System.DefaultWorkingDirectory)/dist' 
displayName: 'Tải xuống các hiện vật xây dựng' 

- script: npm run test:e2e 
displayName: 'Chạy thử nghiệm E2E' 

- task: PublishTestResults@2 
đầu vào: 
testResultsFormat: 'JUnit' 
testResultsFiles: '**/e2e-*.xml' 
mergeTestResults: true 
testRunTitle: 'Thử nghiệm E2E' 
displayName: 'Xuất bản thử nghiệm E2E results'

- giai đoạn: DeployStaging
phụ thuộc vào: E2ETest
điều kiện: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/develop')) 
công việc: 
- triển khai: DeployStaging
môi trường: dàn dựng
chiến lược: 
runOnce: 
triển khai: 
các bước: 
- tập lệnh: echo "Triển khai đến môi trường dàn dựng" 
displayName: 'Triển khai đến dàn dựng' 

- giai đoạn: DeployProduction 
phụ thuộc vào: E2ETest 
điều kiện: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main')) 
công việc: 
- triển khai: DeployProduction 
môi trường: sản xuất 
chiến lược: 
runOnce: 
triển khai: 
các bước: 
- tập lệnh: echo "Triển khai đến môi trường sản xuất" 
displayName: 'Triển khai đến Sản xuất'
```

## Thực hành tốt nhất cho Đường ống CI/CD

1. **Thất bại nhanh**: Chạy các kiểm tra nhanh như kiểm tra lỗi và kiểm tra kiểu trước để cung cấp phản hồi nhanh
2. **Thực thi song song**: Chạy các tác vụ độc lập song song để giảm thời lượng đường ống
3. **Bộ đệm**: Lưu các phụ thuộc vào bộ đệm để tăng tốc độ xây dựng
4. **Các hiện vật**: Chia sẻ các hiện vật xây dựng giữa các tác vụ để tránh xây dựng lại
5. **Phân tách môi trường**: Sử dụng các môi trường khác nhau để dàn dựng và sản xuất
6. **Phê duyệt thủ công**: Yêu cầu phê duyệt thủ công cho các triển khai sản xuất
7. **Thông báo**: Thiết lập thông báo về lỗi đường ống
8. **Quản lý bí mật**: Sử dụng các phương pháp an toàn để xử lý bí mật và thông tin xác thực
9. **Lập phiên bản**: Bao gồm thông tin phiên bản trong các hiện vật xây dựng
10. **Giám sát**: Theo dõi hiệu suất đường ống và tối ưu hóa khi cần

## Danh sách kiểm tra triển khai

- [ ] Thiết lập kho lưu trữ kiểm soát phiên bản
- [ ] Cấu hình Nền tảng CI/CD được lựa chọn
- [ ] Tạo cấu hình đường ống cơ bản
- [ ] Thêm kiểm tra chất lượng mã
- [ ] Cấu hình trình chạy thử nghiệm
- [ ] Thiết lập quy trình xây dựng
- [ ] Cấu hình môi trường triển khai
- [ ] Thiết lập thông báo
- [ ] Tài liệu sử dụng và bảo trì đường ống
- [ ] Đào tạo nhóm về quy trình làm việc CI/CD
