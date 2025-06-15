# CI/CD Boru Hattı Otomasyonu

Bu belge, web geliştirme standartlarına göre derleme, test etme ve dağıtım süreçlerini otomatikleştirmek için standartlaştırılmış CI/CD boru hattı yapılandırmaları sağlar.

## GitHub Actions İş Akışı 

### Temel CI Boru Hattı (GitHub Actions) 

```yaml 
name: CI Boru Hattı 

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

- name: Node.js Kurulumu 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Bağımlılıkları Kur 
run: npm ci 

- name: Lint 
run: npm run lint 

- name: Type check 
run: npm run type-check 

- name: Birim testleri 
çalıştır: npm run test 

- name: Derleme 
çalıştır: npm run build 

- name: Derleme yapıtlarını yükle 
uses: actions/upload-artifact@v3 
with: 
name: build-output 
path: dist/ 
``` 

### CI/CD Boru Hattını Tamamla (GitHub Eylemleri) 

```yaml 
name: CI/CD Boru Hattı 

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

- name: Node.js Kurulumu 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
önbellek: 'npm' 

- ad: Bağımlılıkları yükle 
çalıştır: npm ci 

- ad: Lint 
çalıştır: npm run lint 

- ad: Tür denetimi 
çalıştır: npm run type-check 

- ad: Kod stili denetimi 
çalıştır: npm run format:check 

- ad: Güvenlik denetimi 
çalıştır: npm audit --production 

test: 
ihtiyaçlar: kod kalitesi 
çalıştırılanlar: ubuntu-latest 
adımlar: 
- kullanır: actions/checkout@v3 

- ad: Node.js'yi kur 
kullanır: actions/setup-node@v3 
ile: 
node-version: '18' 
önbellek: 'npm' 

- ad: Bağımlılıkları yükle 
çalıştır: npm ci 

- ad: Birim testleri 
çalıştır: npm test çalıştır 

- name: Entegrasyon testleri 
çalıştır: npm run test:integration 

- name: Test kapsamını yükle 
uses: actions/upload-artifact@v3 
with: 
name: test-coverage 
path: coverage/ 

build: 
needs: test 
runs-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v3 

- name: Node.js'yi kur 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Bağımlılıkları yükle 
run: npm ci 

- name: Derleme 
run: npm run build 

- name: Derleme yapıtlarını yükle 
uses: actions/upload-artifact@v3 
with: 
name: build-output 
path: dist/ 

e2e-tests: 
ihtiyaçlar: build 
çalışır: ubuntu-latest 
adımlar: 
- kullanır: actions/checkout@v3 

- ad: Node.js Kurulumu 
kullanır: actions/setup-node@v3 
ile: 
node-version: '18' 
önbellek: 'npm' 

- ad: Bağımlılıkları yükle 
çalıştır: npm ci 

- ad: Derleme yapıtlarını indir 
kullanır: actions/download-artifact@v3 
ile: 
ad: build-output 
yol: dist/ 

- ad: E2E Testleri 
çalıştır: npm run test:e2e 

- ad: E2E test sonuçlarını yükle 
kullanır: actions/upload-artifact@v3 
ile: 
ad: e2e-test-results 
yol: e2e-results/ 

deploy-staging: 
if: github.event_name == 'push' && github.ref == 'refs/heads/develop' 
needs: e2e-tests 
runs-on: ubuntu-latest 
environment: staging 
steps: 
- uses: actions/checkout@v3 

- name: Yapım yapıtlarını indir 
uses: actions/download-artifact@v3 
with: 
name: build-output 
path: dist/ 

- name: Staging'e dağıt 
run: | 
# Dağıtım betiğinizi buraya ekleyin 
echo "Staging ortamına dağıtılıyor" 

deploy-production: 
if: github.event_name == 'push' && github.ref == 'refs/heads/main' 
needs: e2e-tests 
runs-on: ubuntu-latest 
environment: production 
steps: 
- uses: actions/checkout@v3 

- name: Yapım yapıtlarını indir 
uses: actions/download-artifact@v3 
with: 
name: build-output 
path: dist/ 

- name: Üretime Dağıt 
run: | 
# Dağıtım betiğinizi buraya ekleyin 
echo "Üretim ortamına dağıtılıyor" 
``` 

## GitLab CI/CD Boru Hattı 

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
artifacts: 
paths: 
- coverage/ 
expire_in: 1 week 

integration-tests: 
stage: test 
image: node:${NODE_VERSION} 
script: 
- npm ci 
- npm run test:integration 
artifacts: 
paths: 
- integration-coverage/ 
expire_in: 1 week 

build: 
stage: build 
image: node:${NODE_VERSION} 
script: 
- npm ci 
- npm run build 
artifacts: 
paths: 
- dist/ 
expire_in: 1 week 

e2e-tests: 
stage: e2e-test 
image: cypress/browsers:node${NODE_VERSION}-chrome 
script: 
- npm ci 
- npm run test:e2e 
artifacts: 
paths: 
- e2e-results/ 
expire_in: 1 week 

deploy-staging: 
stage: deploy 
image: node:${NODE_VERSION} 
script: 
- echo "Staging ortamına dağıtılıyor" 
# Dağıtım betiğinizi buraya ekleyin 
environment: 
name: staging 
only: 
- develop 

deploy-production: 
stage: deploy 
image: node:${NODE_VERSION} 
script: 
- echo "Üretim ortamına dağıtılıyor" 
# Dağıtım betiğinizi buraya ekleyin 
environment: 
name: production 
only: 
- main 
when: manual 
``` 

## Jenkins Boru hattı 

```groovy 
boru hattı { 
aracı { 
docker { 
görüntü 'node:18' 
} 
} 

aşamalar { 
aşama('Yükle') { 
adımlar { 
sh 'npm ci' 
} 
} 

aşama('Kod Kalitesi') { 
paralel { 
aşama('Lint') { 
adımlar { 
sh 'npm run lint' 
} 
} 
aşama('Tür Kontrolü') { 
adımlar { 
sh 'npm run type-check' 
} 
} 
aşama('Biçim Kontrolü') { 
adımlar { 
sh 'npm run format:check' 
} 
} 
aşama('Güvenlik Denetimi') { 
adımlar { 
sh 'npm audit --production' 
} 
} 
} 
} 

stage('Test') { 
parallel { 
stage('Birim Testleri') { 
steps { 
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
reportName: 'Coverage Report' 
]) 
} 
} 
} 
stage('Entegrasyon Testleri') { 
steps { 
sh 'npm run test:integration' 
} 
} 
} 
} 

stage('Build') { 
steps { 
sh 'npm run build' 
} 
post { 
success { 
archiveArtifacts artifacts: 'dist/**/*', parmak izi: true 
} 
} 
} 

stage('E2E Testleri') { 
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
reportName: 'E2E Test Raporu' 
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

## Azure DevOps Boru hattı 

```yaml 
tetikleyici: 
dallar: 
dahil et: 
- ana 
- geliştir 

havuz: 
vmImage: 'ubuntu-latest' 

değişkenler: 
nodeVersion: '18.x' 

aşamalar: 
- aşama: Doğrula 
işler: 
- iş: CodeQuality 
adımlar: 
- görev: NodeTool@0 
girdiler: 
versionSpec: $(nodeVersion) 
displayName: 'Node.js'yi yükle' 

- betik: npm ci 
displayName: 'Bağımlılıkları yükle' 

- betik: npm run lint 
displayName: 'Linting çalıştır' 

- betik: npm run type-check 
displayName: 'Tür denetimi çalıştır' 

- betik: npm run format:check 
displayName: 'Kod biçimlendirmesini kontrol et' 

- görev: npm@1 
girdiler: 
komut: 'özel' 
customCommand: 'denetim --üretim' 
displayName: 'Güvenlik denetimi' 

- aşama: Test 
bağlı: Doğrula 
işler: 
- iş: BirimTestleri 
adımlar: 
- görev: NodeTool@0 
girdiler: 
versionSpec: $(nodeVersion) 
displayName: 'Node.js'yi yükle' 

- betik: npm ci 
displayName: 'Bağımlılıkları yükle' 

- betik: npm run test 
displayName: 'Birim testlerini çalıştır' 

- görev: PublishTestResults@2 
girdiler: 
testResultsFormat: 'JUnit' 
testResultsFiles: '**/junit-*.xml' 
mergeTestResults: true 
testRunTitle: 'Birim Testleri' 
displayName: 'Test sonuçlarını yayınla' 

- görev: PublishCodeCoverageResults@1 
girdiler: 
codeCoverageTool: 'Cobertura' 
summaryFileLocation: '$(System.DefaultWorkingDirectory)/coverage/cobertura-coverage.xml' 
reportDirectory: '$(System.DefaultWorkingDirectory)/coverage' 
displayName: 'Kod kapsamını yayınla' 

- aşama: Derleme 
dependOn: Test 
işler: 
- iş: BuildApp 
adımlar: 
- görev: NodeTool@0 
girdiler: 
versionSpec: $(nodeVersion) 
displayName: 'Node.js'yi yükle' 

- betik: npm ci 
displayName: 'Bağımlılıkları yükle' 

- script: npm run build 
displayName: 'Uygulamayı derle' 

- task: CopyFiles@2 
girdiler: 
sourceFolder: '$(System.DefaultWorkingDirectory)/dist' 
contents: '**' 
targetFolder: '$(Build.ArtifactStagingDirectory)' 
displayName: 'Derleme dosyalarını kopyala' 

- task: PublishBuildArtifacts@1 
girdiler: 
pathToPublish: '$(Build.ArtifactStagingDirectory)' 
artifactName: 'drop' 
displayName: 'Derleme yapıtlarını yayınla' 

- stage: E2ETest 
dependOn: Derleme 
jobs: 
- job: E2ETests 
steps: 
- task: NodeTool@0 
girdiler: 
versionSpec: $(nodeVersion) 
displayName: 'Node.js'yi yükle' 

- script: npm ci 
displayName: 'Bağımlılıkları yükle' 

- task: DownloadBuildArtifacts@0 
inputs: 
buildType: 'current' 
downloadType: 'single' 
artifactName: 'drop' 
downloadPath: '$(System.DefaultWorkingDirectory)/dist' 
displayName: 'Build artifacts'ı indir' 

- script: npm run test:e2e 
displayName: 'E2E testlerini çalıştır' 

- task: PublishTestResults@2 
inputs: 
testResultsFormat: 'JUnit' 
testResultsFiles: '**/e2e-*.xml' 
mergeTestResults: true 
testRunTitle: 'E2E Testleri' 
displayName: 'E2E test sonuçlarını yayınla' 

- stage: DeployStaging 
dependOn: E2ETest 
condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/develop')) 
jobs: 
- deployment: DeployStaging 
environment: staging 
strategy: 
runOnce: 
deploy: 
steps: 
- script: echo "Staging ortamına dağıtılıyor" 
displayName: 'Staging'e dağıt' 

- stage: DeployProduction 
dependOn: E2ETest 
condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main')) 
jobs: 
- deployment: DeployProduction 
environment: production 
strategy: 
runOnce: 
deploy: 
steps: 
- script: echo "Üretim ortamına dağıtılıyor" 
displayName: 'Üretime Dağıt' 
``` 

## CI/CD Boru Hatları için En İyi Uygulamalar 

1. **Hızlı Başarısızlık**: Hızlı geri bildirim sağlamak için önce linting ve tür denetimi gibi hızlı denetimleri çalıştırın 
2. **Paralel Yürütme**: Boru hattı süresini azaltmak için bağımsız işleri paralel olarak çalıştırın 
3. **Önbelleğe Alma**: Yapıları hızlandırmak için bağımlılıkları önbelleğe alın 
4. **Yapılar**: Yeniden oluşturmayı önlemek için yapı yapılarını işler arasında paylaşın 
5. **Ortam Ayrımı**: Aşama ve üretim için farklı ortamlar kullanın 
6. **Manuel Onay**: Üretim dağıtımları için manuel onay gerektir 
7. **Bildirimler**: Boru hattı arızaları için bildirimler ayarlayın 
8. **Sırlar Yönetimi**: Sırları ve kimlik bilgilerini işlemek için güvenli yöntemler kullanın 
9. **Sürümleme**: Sürüm bilgilerini yapı eserlerine ekleyin
10. **İzleme**: Boru hattı performansını izleyin ve gerektiği gibi optimize edin

## Uygulama Kontrol Listesi

- [ ] Sürüm kontrol deposunu kurun
- [ ] Tercih ettiğiniz CI/CD platformunu yapılandırın
- [ ] Temel boru hattı yapılandırmasını oluşturun
- [ ] Kod kalite kontrolleri ekleyin
- [ ] Test çalıştırıcılarını yapılandırın
- [ ] Yapı sürecini kurun
- [ ] Dağıtım ortamlarını yapılandırın
- [ ] Bildirimleri ayarlayın
- [ ] Boru hattı kullanımını ve bakımını belgelendirin
- [ ] Ekibi CI/CD iş akışı konusunda eğitin

