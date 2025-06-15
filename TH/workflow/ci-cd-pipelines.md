# การทำงานอัตโนมัติของ CI/CD Pipeline 

เอกสารนี้จัดทำการกำหนดค่า CI/CD Pipeline ที่ได้มาตรฐานเพื่อดำเนินการสร้าง ทดสอบ และปรับใช้โดยอัตโนมัติตามมาตรฐานการพัฒนาเว็บ

## เวิร์กโฟลว์ GitHub Actions 

### CI Pipeline ขั้นพื้นฐาน (GitHub Actions) 

```yaml 
name: CI Pipeline 

on: 
push: 
branches: [ main, develop ] 

pulse_request: 

branches: [ main, develop ] 

jobs: 
build-and-test: 
runs-on: ubuntu-latest 

steps: 
- uses: actions/checkout@v3 

- name: ตั้งค่า Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: ติดตั้ง dependencies 
run: npm ci 

- name: Lint 
run: npm run lint 

- name: การตรวจสอบประเภท 
run: npm run type-check 

- ชื่อ: การทดสอบยูนิต 
รัน: npm รันการทดสอบ 

- ชื่อ: สร้าง 
รัน: npm รันสร้าง 

- ชื่อ: อัปโหลดสิ่งประดิษฐ์ที่สร้าง 
การใช้งาน: actions/upload-artifact@v3 
ด้วย: 
ชื่อ: build-output 
เส้นทาง: dist/ 
``` 

### เสร็จสิ้นกระบวนการ CI/CD (GitHub Actions) 

```yaml 

ชื่อ: กระบวนการ CI/CD 

เปิด: 

push: 

สาขา: [ main, develop ] 

คำขอ pull_request: 

สาขา: [ main, develop ] 

งาน: 
คุณภาพโค้ด: 

ทำงานบน: ubuntu-latest 

ขั้นตอน: 
- การใช้: actions/checkout@v3 

- ชื่อ: ตั้งค่า Node.js 
การใช้งาน: actions/setup-node@v3 
ด้วย: 
เวอร์ชันโหนด: '18' 
แคช: 'npm' 

- ชื่อ: ติดตั้งการอ้างอิง 
รัน: npm ci 

- ชื่อ: Lint 
รัน: npm run lint 

- ชื่อ: ตรวจสอบประเภท 
รัน: npm run type-check 

- ชื่อ: ตรวจสอบรูปแบบโค้ด 
รัน: npm run format:check 

- ชื่อ: การตรวจสอบความปลอดภัย 
รัน: npm audit --production 

ทดสอบ: 

ความต้องการ: คุณภาพโค้ด 
รันบน: ubuntu-latest 

ขั้นตอน: 
- ใช้: actions/checkout@v3 

- ชื่อ: ตั้งค่า Node.js 
ใช้: actions/setup-node@v3 
ด้วย: 
node-version: '18' 
แคช: 'npm' 

- ชื่อ: ติดตั้งการอ้างอิง 
รัน: npm ci 

- ชื่อ: การทดสอบยูนิต 
รัน: npm run ทดสอบ 

- ชื่อ: การทดสอบการรวม 
รัน: npm รันการทดสอบ: การรวม 

- ชื่อ: อัปโหลดการครอบคลุมการทดสอบ 
ใช้: actions/upload-artifact@v3 
ด้วย: 
ชื่อ: test-coverage 
เส้นทาง: coverage/ 

สร้าง: 
ความต้องการ: การทดสอบ 
รันบน: ubuntu-latest 
ขั้นตอน: 
- ใช้: actions/checkout@v3 

- ชื่อ: ตั้งค่า Node.js 
ใช้: actions/setup-node@v3 
ด้วย: 
node-version: '18' 
แคช: 'npm' 

- ชื่อ: ติดตั้งการอ้างอิง 
รัน: npm ci 

- ชื่อ: สร้าง 
รัน: npm เรียกใช้สร้าง 

- ชื่อ: อัปโหลดอาร์ทิแฟกต์ที่สร้าง 
ใช้: actions/upload-artifact@v3 
ด้วย: 
ชื่อ: สร้างเอาต์พุต 
เส้นทาง: dist/ 

e2e-tests: 
needs: build 
runs-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v3 

- name: Setup Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Install dependencies 
run: npm ci 

- name: Download build artifacts 
uses: actions/download-artifact@v3 
with: 
name: build-output 
path: dist/ 

- name: E2E Tests 
run: npm run test:e2e 

- name: Upload E2E test results 
uses: actions/upload-artifact@v3 
with: 
name: e2e-test-results 
path: e2e-results/ 

การจัดเตรียมแบบปรับใช้: 
ถ้า: github.event_name == 'push' และ github.ref == 'refs/heads/develop' 
ความต้องการ: e2e-tests 
รันบน: ubuntu-latest 
สภาพแวดล้อม: การจัดเตรียม 
ขั้นตอน: 
- ใช้: actions/checkout@v3 

- ชื่อ: ดาวน์โหลดสิ่งประดิษฐ์ที่สร้าง 

ใช้: actions/download-artifact@v3 
ด้วย: 
ชื่อ: เอาต์พุตที่สร้าง 
เส้นทาง: dist/ 

- ชื่อ: ปรับใช้เพื่อจัดเตรียม 
เรียกใช้: | 
# เพิ่มสคริปต์การปรับใช้ของคุณที่นี่ 
echo "การปรับใช้ในสภาพแวดล้อมการจัดเตรียม" 

การปรับใช้-การผลิต: 
if: github.event_name == 'push' && github.ref == 'refs/heads/main' 
needs: e2e-tests 
runs-on: ubuntu-latest 
environment: production 
steps: 
- uses: actions/checkout@v3 

- name: ดาวน์โหลดสิ่งประดิษฐ์ที่สร้าง 
uses: actions/download-artifact@v3 
with: 
name: build-output 
path: dist/ 

- name: ปรับใช้กับการผลิต 
run: | 
# เพิ่มสคริปต์การปรับใช้ของคุณที่นี่ 
echo "การปรับใช้ในสภาพแวดล้อมการผลิต" 
``` 

## GitLab CI/CD Pipeline 

```yaml 
stages: 
- ตรวจสอบ 
- ทดสอบ 
- สร้าง 
- e2e-test 
- ปรับใช้ 

variables: 
NODE_VERSION: "18" 

cache: 
key: ${CI_COMMIT_REF_SLUG} 
paths: 
- node_modules/ 

code-quality: 
stage: ตรวจสอบ 

image: node:${NODE_VERSION} 
script: 
- npm ci 
- npm run lint 
- npm run type-check 
- npm run format:check 
- npm audit --production 

unit-tests: 
stage: test 
image: โหนด: ${NODE_VERSION} 
สคริปต์: 
- npm ci 
- npm run test 
สิ่งประดิษฐ์: 
เส้นทาง: 
- coverage/ 
expire_in: 1 สัปดาห์ 

การทดสอบการรวม: 
ขั้นตอน: การทดสอบ 
รูปภาพ: โหนด: ${NODE_VERSION} 
สคริปต์: 
- npm ci 
- npm run test:integration 
สิ่งประดิษฐ์: 
เส้นทาง: 
- integration-coverage/ 
expire_in: 1 สัปดาห์ 

สร้าง: 
ขั้นตอน: สร้าง 
รูปภาพ: โหนด: ${NODE_VERSION} 
สคริปต์: 
- npm ci 
- npm run build 
สิ่งประดิษฐ์: 
เส้นทาง: 
- dist/ 
expire_in: 1 สัปดาห์ 

การทดสอบ e2e: 
ขั้นตอน: การทดสอบ e2e 
รูปภาพ: cypress/browsers:node${NODE_VERSION}-chrome 
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
- echo "Deploying to staging environment" 
# เพิ่มสคริปต์การปรับใช้ของคุณที่นี่ 
environment: 
name: staging 
only: 
- develop 

deploy-production: 
stage: deploy 
image: node:${NODE_VERSION} 
script: 
- echo "Deploying to production environment" 
# เพิ่มสคริปต์การปรับใช้ของคุณที่นี่ 
environment: 
name: production 
only: 
- main 
when: manual 
``` 

## เจนกินส์ ไปป์ไลน์ 

```เจ๋งมาก 
ไปป์ไลน์ { 
ตัวแทน { 
ด็อกเกอร์ { 
รูปภาพ 'โหนด:18' 
} 
} 

ขั้นตอน { 

เวที('ติดตั้ง') { 
ขั้นตอน { 

sh 'npm ci' 
} 
} 

เวที('คุณภาพโค้ด') { 

ขนาน { 

เวที('Lint') { 
ขั้นตอน { 

sh 'npm เรียกใช้ lint' 
} 
} 
เวที('ตรวจสอบประเภท') { 
ขั้นตอน { 

sh 'npm เรียกใช้การตรวจสอบประเภท' 
} 
} 
เวที('ตรวจสอบรูปแบบ') { 
ขั้นตอน { 

sh 'npm เรียกใช้รูปแบบ: การตรวจสอบ' 
} 
} 
เวที('การตรวจสอบความปลอดภัย') { 
ขั้นตอน { 

sh 'npm การตรวจสอบ -- การผลิต' 
} 
} 
} 
} 

ระยะ('การทดสอบ') { 
ขนาน { 
ระยะ('การทดสอบยูนิต') { 
ขั้นตอน { 
sh 'npm เรียกใช้การทดสอบ' 
} 
โพสต์ { 
เสมอ { 
junit 'junit-reports/*.xml' 
publishHTML(เป้าหมาย: [ 
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

ระยะ('การทดสอบบูรณาการ') { 
ขั้นตอน { 
sh 'npm เรียกใช้การทดสอบ: บูรณาการ' 
} 
} 
} 
} 

ระยะ('สร้าง') { 
ขั้นตอน { 
sh 'npm เรียกใช้การสร้าง' 
} 
โพสต์ { 
ความสำเร็จ { 
archiveArtifacts artifacts: 'dist/**/*', ลายนิ้วมือ: true 
} 
} 
} 

เวที ('การทดสอบ E2E') { 
ขั้นตอน { 
sh 'npm run test:e2e' 
} 
โพสต์ { 
เสมอ { 
publishHTML(เป้าหมาย: [ 
allowMissing: false, 
alwaysLinkToLastBuild: false, 
keepAll: true, 
reportDir: 'e2e-results', 
reportFiles: 'index.html', 
reportName: 'รายงานการทดสอบ E2E' 
]) 
} 
} 
} 
} 

โพสต์ { 
เสมอ { 
cleanWs() 
} 
} 
} 
``` 

## Azure DevOps ไปป์ไลน์ 

```yaml 
ทริกเกอร์: 
สาขา: 
รวม: 
- หลัก 
- พัฒนา 

พูล: 
vmImage: 'ubuntu-latest' 

ตัวแปร: 
nodeVersion: '18.x' 

ขั้นตอน: 
- ขั้นตอน: 
- ขั้นตอน: 
- งาน: NodeTool@0 
อินพุต: 
versionSpec: $(nodeVersion) 
displayName: 'ติดตั้ง Node.js' 

- สคริปต์: npm ci 
displayName: 'ติดตั้งการอ้างอิง' 

- สคริปต์: npm เรียกใช้ lint 
displayName: 'เรียกใช้ linting' 

- สคริปต์: npm เรียกใช้การตรวจสอบประเภท 
displayName: 'เรียกใช้การตรวจสอบประเภท' 

- สคริปต์: npm เรียกใช้รูปแบบ: ตรวจสอบ 
displayName: 'ตรวจสอบการจัดรูปแบบโค้ด' 

- งาน: npm@1 
อินพุต: 
คำสั่ง: 'กำหนดเอง' 
คำสั่งที่กำหนดเอง: 'ตรวจสอบ --การผลิต' 
displayName: 'การตรวจสอบความปลอดภัย' 

- ขั้นตอน: 
- งาน: NodeTool@0 
อินพุต: 
versionSpec: $(nodeVersion) 
displayName: 'ติดตั้ง Node.js' 

- สคริปต์: npm ci 
displayName: 'ติดตั้งการอ้างอิง' 

- สคริปต์: npm เรียกใช้การทดสอบ 
displayName: 'เรียกใช้การทดสอบยูนิต' 

- งาน: PublishTestResults@2 
อินพุต: 
testResultsFormat: 'JUnit' 
testResultsFiles: '**/junit-*.xml' 
mergeTestResults: true 
testRunTitle: 'Unit Tests' 
displayName: 'เผยแพร่ผลการทดสอบ' 

- task: PublishCodeCoverageResults@1 
inputs: 
codeCoverageTool: 'Cobertura' 
summaryFileLocation: '$(System.DefaultWorkingDirectory)/coverage/cobertura-coverage.xml' 
reportDirectory: '$(System.DefaultWorkingDirectory)/coverage' 
displayName: 'เผยแพร่การครอบคลุมโค้ด' 

- stage: Build 

dependsOn: Test 

jobs: 
- job: BuildApp 
steps: 
- task: NodeTool@0 
inputs: 
versionSpec: $(nodeVersion) 
displayName: 'ติดตั้ง Node.js' 

- script: npm ci 
displayName: 'ติดตั้งการอ้างอิง' 

- สคริปต์: npm run build 
displayName: 'สร้างแอปพลิเคชัน' 

- งาน: CopyFiles@2 
อินพุต: 
sourceFolder: '$(System.DefaultWorkingDirectory)/dist' 
เนื้อหา: '**' 
targetFolder: '$(Build.ArtifactStagingDirectory)' 
displayName: 'คัดลอกไฟล์ที่สร้าง' 

- งาน: PublishBuildArtifacts@1 
อินพุต: 
pathToPublish: '$(Build.ArtifactStagingDirectory)' 
artifactName: 'drop' 
displayName: 'เผยแพร่สิ่งประดิษฐ์ที่สร้าง' 

- ระยะ: E2ETest 
dependsOn: สร้าง 
งาน: 
- งาน: E2ETests 
ขั้นตอน: 
- งาน: NodeTool@0 
อินพุต: 
versionSpec: $(nodeVersion) 
displayName: 'ติดตั้ง Node.js' 

- สคริปต์: npm ci 
displayName: 'ติดตั้งการอ้างอิง' 

- งาน: DownloadBuildArtifacts@0 
อินพุต: 
ประเภทการสร้าง: 'ปัจจุบัน' 
ประเภทการดาวน์โหลด: 'เดี่ยว' 
ชื่อสิ่งประดิษฐ์: 'วาง' 
เส้นทางการดาวน์โหลด: '$(System.DefaultWorkingDirectory)/dist' 
displayName: 'ดาวน์โหลดสิ่งประดิษฐ์ที่สร้าง' 

- สคริปต์: npm เรียกใช้การทดสอบ: e2e 
displayName: 'เรียกใช้การทดสอบ E2E' 

- งาน: เผยแพร่ผลลัพธ์การทดสอบ@2 
อินพุต: 
รูปแบบการทดสอบผลลัพธ์: 'JUnit' 
ไฟล์ผลลัพธ์การทดสอบ: '**/e2e-*.xml' 
รวมผลลัพธ์การทดสอบ: true 
testRunTitle: 'การทดสอบ E2E' 
displayName: 'เผยแพร่ผลการทดสอบ E2E' 

- ระยะ: การจัดเตรียมการใช้งาน 
dependOn: E2ETest 
condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/develop')) 
jobs: 
- การปรับใช้: การจัดเตรียมการใช้งาน 
สภาพแวดล้อม: การจัดเตรียมการใช้งาน 
กลยุทธ์: 

เรียกใช้ครั้งเดียว: 
การปรับใช้: 
ขั้นตอน: 
- สคริปต์: echo "กำลังปรับใช้ในสภาพแวดล้อมการจัดเตรียมการใช้งาน" 
displayName: 'ปรับใช้ในสภาพแวดล้อมการจัดเตรียมการใช้งาน' 

- ระยะ: การปรับใช้การผลิต 
dependOn: E2ETest 
condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main')) 
jobs: 
- การปรับใช้: การปรับใช้การผลิต 
สภาพแวดล้อม: การผลิต 
กลยุทธ์: 
runOnce: 
deploy: 
steps: 
- script: echo "Deploying to production environment" 
displayName: 'Deploy to Production' 
``` 

## แนวทางปฏิบัติที่ดีที่สุดสำหรับ CI/CD Pipelines 

1. **Fail Fast**: รันการตรวจสอบอย่างรวดเร็ว เช่น การลินต์และการตรวจสอบประเภทก่อนเพื่อให้ได้รับคำติชมอย่างรวดเร็ว 
2. **Parallel Execution**: รันงานอิสระแบบขนานเพื่อลดระยะเวลาของไปป์ไลน์ 
3. **Caching**: แคชที่สัมพันธ์กันเพื่อเพิ่มความเร็วในการสร้าง 
4. **Artifacts**: แชร์ Artifacts ที่สร้างระหว่างงานเพื่อหลีกเลี่ยงการสร้างใหม่ 
5. **การแยกสภาพแวดล้อม**: ใช้สภาพแวดล้อมที่แตกต่างกันสำหรับการจัดเตรียมและการผลิต 
6. **การอนุมัติด้วยตนเอง**: ต้องได้รับการอนุมัติด้วยตนเองสำหรับการปรับใช้การผลิต 
7. **การแจ้งเตือน**: ตั้งค่าการแจ้งเตือนสำหรับความล้มเหลวของไปป์ไลน์ 
8. **การจัดการความลับ**: ใช้เมธอดที่ปลอดภัยเพื่อจัดการความลับและข้อมูลรับรอง 
9. **การกำหนดเวอร์ชัน**: รวมข้อมูลเวอร์ชันใน สร้างสิ่งประดิษฐ์ 
10. **การตรวจสอบ**: ตรวจสอบประสิทธิภาพของไปป์ไลน์และปรับให้เหมาะสมตามต้องการ 

## รายการตรวจสอบการใช้งาน 

- [ ] ตั้งค่าที่เก็บข้อมูลการควบคุมเวอร์ชัน 
- [ ] กำหนดค่าแพลตฟอร์ม CI/CD ที่เลือก 
- [ ] สร้างการกำหนดค่าไปป์ไลน์พื้นฐาน 
- [ ] เพิ่มการตรวจสอบคุณภาพโค้ด 
- [ ] กำหนดค่าตัวเรียกใช้การทดสอบ 
- [ ] ตั้งค่ากระบวนการสร้าง 
- [ ] กำหนดค่าสภาพแวดล้อมการปรับใช้ 
- [ ] ตั้งค่าการแจ้งเตือน 
- [ ] จัดทำเอกสารการใช้งานและการบำรุงรักษาไปป์ไลน์ 
- [ ] ฝึกอบรมทีมงานเกี่ยวกับเวิร์กโฟลว์ CI/CD 
