# Otomatisasi Pipeline CI/CD 

Dokumen ini menyediakan konfigurasi pipeline CI/CD yang terstandarisasi untuk mengotomatisasi proses pembuatan, pengujian, dan penerapan sesuai dengan standar pengembangan web. 

## Alur Kerja GitHub Actions 

### Pipeline CI Dasar (GitHub Actions) 

```yaml 
name: Pipeline CI 

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

- name: Menyiapkan Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Menginstal dependensi 
run: npm ci 

- name: Lint 
run: npm run lint 

- name: Pemeriksaan tipe 
run: npm run type-check 

- name: Pengujian unit 
run: npm run uji 

- nama: Bangun 
jalankan: npm jalankan pembangunan 

- nama: Unggah artefak pembangunan 
kegunaan: tindakan/unggah-artifak@v3 
dengan: 
nama: keluaran-pembuatan 
jalur: dist/ 
``` 

### Pipa CI/CD Lengkap (Tindakan GitHub) 

```yaml 
nama: Pipa CI/CD 

aktif: 
dorong: 
cabang: [ utama, kembangkan ] 
tarik_permintaan: 
cabang: [ utama, kembangkan ] 

pekerjaan: 
kualitas-kode: 
berjalan-pada: ubuntu-terbaru 
langkah-langkah: 
- kegunaan: tindakan/pembayaran@v3 

- nama: Siapkan Node.js 
kegunaan: tindakan/pengaturan-node@v3 
dengan: 
versi-simpul: '18' 
cache: 'npm' 

- nama: Instal dependensi 
jalankan: npm ci 

- nama: Lint 
jalankan: npm run lint 

- nama: Pemeriksaan tipe 
jalankan: npm run type-check 

- nama: Pemeriksaan gaya kode 
jalankan: npm run format:check 

- nama: Audit keamanan 
jalankan: npm audit --production 

uji: 
kebutuhan: kualitas-kode 
berjalan pada: ubuntu-terbaru 
langkah: 
- penggunaan: actions/checkout@v3 

- nama: Menyiapkan Node.js 
penggunaan: actions/setup-node@v3 
dengan: 
versi-simpul: '18' 
cache: 'npm' 

- nama: Menginstal dependensi 
jalankan: npm ci 

- nama: Pengujian unit 
jalankan: npm run test 

- nama: Pengujian integrasi 
jalankan: npm run test:integration 

- nama: Mengunggah cakupan pengujian 
penggunaan: actions/upload-artifact@v3 
dengan: 
nama: test-coverage 
jalur: coverage/ 

build: 
kebutuhan: test 
runs-on: ubuntu-latest 
langkah: 
- penggunaan: actions/checkout@v3 

- nama: Setup Node.js 
penggunaan: actions/setup-node@v3 
dengan: 
versi-simpul: '18' 
cache: 'npm' 

- nama: Install dependencies 
jalankan: npm ci 

- nama: Build 
jalankan: npm run build 

- nama: Upload build artifacts 
penggunaan: actions/upload-artifact@v3 
dengan: 
nama: build-output 
jalur: dist/ 

e2e-tests: 
kebutuhan: build 
runs-on: ubuntu-latest 
langkah: 
- penggunaan: actions/checkout@v3 

- nama: Setup Node.js 
menggunakan: actions/setup-node@v3 
dengan: 
node-version: '18' 
cache: 'npm' 

- name: Instal dependensi 
jalankan: npm ci 

- name: Unduh artefak build 
menggunakan: actions/download-artifact@v3 
dengan: 
name: build-output 
jalur: dist/ 

- name: Uji E2E 
jalankan: npm run test:e2e 

- name: Unggah hasil uji E2E 
menggunakan: actions/upload-artifact@v3 
dengan: 
name: e2e-test-results 
jalur: e2e-results/ 

deploy-staging: 
jika: github.event_name == 'push' && github.ref == 'refs/heads/develop' 
membutuhkan: e2e-tests 
runs-on: ubuntu-latest 
lingkungan: staging 
langkah: 
- penggunaan: actions/checkout@v3 

- nama: Unduh artefak build 
penggunaan: actions/download-artifact@v3 
dengan: 
nama: build-output 
jalur: dist/ 

- nama: Deploy ke Staging 
jalankan: | # Tambahkan skrip penyebaran Anda di sini 
echo "Menyebarkan ke lingkungan pementasan" 

deploy-production: 
if: github.event_name == 'push' && github.ref == 'refs/heads/main' 
needs: e2e-tests 
runs-on: ubuntu-latest 
environment: production 
steps: 
- uses: actions/checkout@v3 

- name: Unduh artefak pembangunan 
uses: actions/download-artifact@v3 
with: 
name: build-output 
path: dist/ 

- name: Menyebarkan ke Produksi 
run: | # Tambahkan skrip penyebaran Anda di sini 
echo "Menyebarkan ke lingkungan produksi" 
``` 

## GitLab CI/CD Pipeline 

```yaml 
tahapan: 
- validasi 
- uji 
- bangun 
- uji e2e 
- sebarkan 

variabel: 
NODE_VERSION: "18" 

cache: 
kunci: ${CI_COMMIT_REF_SLUG} 
jalur: 
- node_modules/ 

kualitas-kode: 
tahap: validasi 
gambar: node:${NODE_VERSION} 
skrip: 
- npm ci 
- npm run lint 
- npm run type-check 
- npm run format:check 
- npm audit --production 

pengujian-unit: 
tahap: uji 
gambar: node:${NODE_VERSION} 
skrip: 
- npm ci 
- npm jalankan pengujian 
artefak: 
jalur: 
- coverage/ 
berakhir dalam: 1 minggu 

pengujian-integrasi: 
tahap: pengujian 
gambar: node:${NODE_VERSION} 
skrip: 
- npm ci 
- npm jalankan pengujian:integrasi 
artefak: 
jalur: 
- integration-coverage/ 
berakhir dalam: 1 minggu 

pembuatan: 
tahap: pembuatan 
gambar: node:${NODE_VERSION} 
skrip: 
- npm ci 
- npm jalankan pembuatan 
artefak: 
jalur: 
- dist/ 
berakhir dalam: 1 minggu 

pengujian-e2e: 
tahap: pengujian-e2e 
gambar: cypress/browser:node${NODE_VERSION}-chrome 
skrip: 
- npm ci 
- npm jalankan pengujian:e2e 
artefak: 
jalur: 
- e2e-results/ 
expire_in: 1 minggu 

deploy-staging: 
stage: deploy 
image: node:${NODE_VERSION} 
script: 
- echo "Menyebarkan ke lingkungan staging" 
# Tambahkan skrip penyebaran Anda di sini 
environment: 
name: staging 
only: 
- develop 

deploy-production: 
stage: deploy 
image: node:${NODE_VERSION} 
script: 
- echo "Menyebarkan ke lingkungan produksi" 
# Tambahkan skrip penyebaran Anda di sini 
environment: 
name: production 
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

stage { 
stage('Install') { 
steps { 
sh 'npm ci' 
} 
} 

stage('Kualitas Kode') { 
parallel { 
stage('Lint') { 
steps { 
sh 'npm run lint' 
} 
} 
stage('Pemeriksaan Tipe') { 
steps { 
sh 'npm run type-check' 
} 
} 
stage('Pemeriksaan Format') { 
steps { 
sh 'npm run format:check' 
} 
} 
stage('Audit Keamanan') { 
steps { 
sh 'npm audit --production' 
} 
} 
} 
} 

stage('Uji') { 
parallel { 
stage('Uji Unit') { 
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
reportName: 'Laporan Cakupan' 
]) 
} 
} 
} 
stage('Uji Integrasi') { 
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
ArsipArtefak artifacts: 'dist/**/*', sidik jari: true 
} 
} 
} 

stage('Uji E2E') { 
steps { 
sh 'npm run test:e2e' 
} 
post { 
always { 
publikasikanHTML(target: [ 
allowMissing: false, 
alwaysLinkToLastBuild: false, 
keepAll: true, 
reportDir: 'e2e-results', 
reportFiles: 'index.html', 
reportName: 'Laporan Uji E2E' 
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
pemicu: 
cabang: 
sertakan: 
- utama 
- kembangkan 

kumpulan: 
vmImage: 'ubuntu-terbaru' 

variabel: 
versi simpul: '18.x' 

tahapan: 
- tahap: Validasi 
pekerjaan: 
- pekerjaan: CodeQuality 
langkah: 
- tugas: NodeTool@0 
masukan: 
versionSpec: $(nodeVersion) 
displayName: 'Instal Node.js' 

- skrip: npm ci 
displayName: 'Instal dependensi' 

- skrip: npm run lint 
displayName: 'Jalankan linting' 

- skrip: npm run type-check 
displayName: 'Jalankan pemeriksaan tipe' 

- skrip: npm run format:check 
displayName: 'Periksa format kode' 

- tugas: npm@1 
masukan: 
perintah: 'kustom' 
customCommand: 'audit --production' 
displayName: 'Audit keamanan' 

- tahap: Uji 
tergantung pada: Validasi 
pekerjaan: 
- pekerjaan: UnitTests 
langkah: 
- tugas: NodeTool@0 
masukan: 
versionSpec: $(nodeVersion) 
displayName: 'Instal Node.js' 

- skrip: npm ci 
displayName: 'Instal dependensi' 

- skrip: npm run test 
displayName: 'Jalankan pengujian unit' 

- tugas: PublishTestResults@2 
inputs: 
testResultsFormat: 'JUnit' 
testResultsFiles: '**/junit-*.xml' 
mergeTestResults: true 
testRunTitle: 'Pengujian Unit' 
displayName: 'Publikasikan hasil pengujian' 

- tugas: PublishCodeCoverageResults@1 
inputs: 
codeCoverageTool: 'Cobertura' 
summaryFileLocation: '$(System.DefaultWorkingDirectory)/coverage/cobertura-coverage.xml' 
reportDirectory: '$(System.DefaultWorkingDirectory)/coverage' 
displayName: 'Publikasikan cakupan kode' 

- stage: Bangun 
dependOn: Uji 
jobs: 
- job: BuildApp 
steps: 
- task: NodeTool@0 
inputs: 
versionSpec: $(nodeVersion) 
displayName: 'Instal Node.js' 

- script: npm ci 
displayName: 'Instal dependensi' 

- script: npm run build 
displayName: 'Bangun aplikasi' 

- task: CopyFiles@2 
inputs: 
sourceFolder: '$(System.DefaultWorkingDirectory)/dist' 
content: '**' 
targetFolder: '$(Build.ArtifactStagingDirectory)' 
displayName: 'Salin file build' 

- task: PublishBuildArtifacts@1 
inputs: 
pathToPublish: '$(Build.ArtifactStagingDirectory)' 
artifactName: 'drop' 
displayName: 'Publikasikan artefak build' 

- stage: E2ETest 
dependOn: Build 
jobs: 
- job: E2ETests 
steps: 
- task: NodeTool@0 
inputs: 
versionSpec: $(nodeVersion) 
displayName: 'Instal Node.js' 

- script: npm ci 
displayName: 'Instal dependensi' 

- task: DownloadBuildArtifacts@0 
inputs: 
buildType: 'current' 
downloadType: 'single' 
artifactName: 'drop' 
downloadPath: '$(System.DefaultWorkingDirectory)/dist' 
displayName: 'Unduh artefak build' 

- script: npm run test:e2e 
displayName: 'Jalankan pengujian E2E' 

- task: PublishTestResults@2 
input: 
testResultsFormat: 'JUnit' 
testResultsFiles: '**/e2e-*.xml' 
mergeTestResults: true 
testRunTitle: 'Uji E2E' 
displayName: 'Publikasikan hasil uji E2E' 

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
- script: echo "Men-deploy ke lingkungan staging" 
displayName: 'Deploy ke Staging' 

- stage: DeployProduction 
dependOn: E2ETest 
condition: dan(berhasil(), eq(variabel['Build.SourceBranch'], 'refs/heads/main')) 
pekerjaan: 
- penyebaran: DeployProduction 
lingkungan: produksi 
strategi: 
jalankanSekali: 
penyebaran: 
langkah: 
- skrip: gema "Menyebarkan ke lingkungan produksi" 
nama tampilan: 'Menyebarkan ke Produksi' 
``` 

## Praktik Terbaik untuk Pipeline CI/CD 

1. **Gagal Cepat**: Jalankan pemeriksaan cepat seperti linting dan pemeriksaan tipe terlebih dahulu untuk memberikan umpan balik cepat 
2. **Eksekusi Paralel**: Jalankan pekerjaan independen secara paralel untuk mengurangi durasi pipeline 
3. **Caching**: Cache dependensi untuk mempercepat build 
4. **Artefak**: Bagikan artefak build antar pekerjaan untuk menghindari pembangunan ulang 
5. **Pemisahan Lingkungan**: Gunakan lingkungan yang berbeda untuk pementasan dan produksi 
6. **Persetujuan Manual**: Memerlukan persetujuan manual persetujuan untuk penerapan produksi 
7. **Pemberitahuan**: Siapkan pemberitahuan untuk kegagalan alur kerja 
8. **Manajemen Rahasia**: Gunakan metode aman untuk menangani rahasia dan kredensial 
9. **Pembuatan Versi**: Sertakan informasi versi dalam artefak pembuatan 
10. **Pemantauan**: Pantau kinerja alur kerja dan optimalkan sesuai kebutuhan 

## Daftar Periksa Implementasi 

- [ ] Siapkan repositori kontrol versi 
- [ ] Konfigurasikan platform CI/CD pilihan 
- [ ] Buat konfigurasi alur kerja dasar 
- [ ] Tambahkan pemeriksaan kualitas kode 
- [ ] Konfigurasikan test runner 
- [ ] Siapkan proses pembuatan 
- [ ] Konfigurasikan lingkungan penerapan 
- [ ] Siapkan pemberitahuan 
- [ ] Dokumentasikan penggunaan dan pemeliharaan alur kerja 
- [ ] Latih tim tentang alur kerja CI/CD 
