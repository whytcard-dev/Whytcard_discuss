# أتمتة خط أنابيب CI/CD

يوفر هذا المستند تكوينات موحدة لخط أنابيب CI/CD لأتمتة عمليات البناء والاختبار والنشر وفقًا لمعايير تطوير الويب.

## سير عمل إجراءات GitHub

### خط أنابيب CI الأساسي (إجراءات GitHub)

```yaml
الاسم: خط أنابيب CI

تشغيل:
الدفع:
الفروع: [الرئيسية، التطوير]
طلب السحب:
الفروع: [الرئيسية، التطوير]

الوظائف:
البناء والاختبار:
تشغيل: أحدث إصدار من ubuntu

الخطوات:
- الاستخدامات: actions/checkout@v3

- الاسم: إعداد Node.js
- الاستخدامات: actions/setup-node@v3

مع:
إصدار العقدة: '18'

ذاكرة التخزين المؤقت: 'npm'

- الاسم: تثبيت التبعيات
- التشغيل: npm ci

- الاسم: Lint
- التشغيل: npm run lint

- الاسم: فحص النوع
- التشغيل: npm run type-check

- الاسم: اختبارات الوحدة
التشغيل: npm run test


- الاسم: بناء
التشغيل: npm run build


- الاسم: تحميل عناصر البناء

الاستخدامات: actions/upload-artifact@v3

مع:
الاسم: build-output
المسار: dist/
```

### إكمال خط أنابيب CI/CD (إجراءات GitHub)

```yaml
الاسم: خط أنابيب CI/CD

على:
الدفع:
الفروع: [main, develop]

طلب السحب:
الفروع: [main, develop]

الوظائف:
جودة الكود:
تشغيل: ubuntu-latest
الخطوات:

- الاستخدام: actions/checkout@v3


- الاسم: إعداد Node.js
الاستخدامات: actions/setup-node@v3

مع:
إصدار العقدة: '18'
ذاكرة التخزين المؤقت: 'npm'


- الاسم: تثبيت التبعيات

تشغيل: npm ci


- الاسم: فحص الترابط

تشغيل: فحص نوع تشغيل npm


- الاسم: فحص نمط الكود

تشغيل: تنسيق تشغيل npm: فحص


- الاسم: تدقيق الأمان

تشغيل: تدقيق npm --production

الاختبار:

المتطلبات: جودة الكود

تشغيل: أحدث إصدار من ubuntu

الخطوات:

- الاستخدامات: actions/checkout@v3


- الاسم: إعداد Node.js

الاستخدامات: actions/setup-node@v3

مع:
إصدار العقدة: '18'

ذاكرة التخزين المؤقت: 'npm'


- الاسم: تثبيت التبعيات

تشغيل: npm ci


- الاسم: اختبارات الوحدة

تشغيل: اختبار تشغيل npm


- الاسم: اختبارات التكامل
التشغيل: npm run test:integration

- الاسم: تحميل تغطية الاختبار
الاستخدامات: actions/upload-artifact@v3
مع:
الاسم: test-coverage
المسار: coverage/

البناء:
الاحتياجات: test
التشغيل: ubuntu-latest
الخطوات:
- الاستخدامات: actions/checkout@v3

- الاسم: إعداد Node.js
الاستخدامات: actions/setup-node@v3

مع:
إصدار العقدة: '18'

الذاكرة المؤقتة: 'npm'

- الاسم: تثبيت التبعيات
التشغيل: npm ci

- الاسم: البناء
التشغيل: npm run build

- الاسم: تحميل عناصر البناء
الاستخدامات: actions/upload-artifact@v3
مع:
الاسم: build-out
المسار: dist/

اختبارات e2e:
الاحتياجات: بناء
التشغيل: أحدث إصدار من ubuntu
الخطوات:
- الاستخدامات: actions/checkout@v3

- الاسم: إعداد Node.js
- الاستخدامات: actions/setup-node@v3
- مع:
إصدار العقدة: '18'
- ذاكرة التخزين المؤقت: 'npm'

- الاسم: تثبيت التبعيات
- التشغيل: npm ci
- الاسم: تنزيل عناصر البناء
- الاستخدامات: actions/download-artifact@v3
- مع:
- الاسم: مخرجات البناء
- المسار: dist/
- الاسم: اختبارات E2E
- التشغيل: npm تشغيل الاختبار: e2e
- الاسم: تحميل نتائج اختبار E2E
- الاستخدامات: actions/upload-artifact@v3
- مع:
- الاسم: نتائج اختبار e2e
- المسار: نتائج e2e/

النشر المرحلي:
إذا: github.event_name == 'push' وgithub.ref == 'refs/heads/develop'
المتطلبات: اختبارات e2e
يعمل على: ubuntu-latest
البيئة: المرحلة المرحلية
الخطوات:
- الاستخدامات: actions/checkout@v3

- الاسم: تنزيل عناصر البناء
- الاستخدامات: actions/download-artifact@v3
- مع:
- الاسم: build-output
- المسار: dist/

- الاسم: النشر إلى المرحلة المرحلية
- التشغيل: |
# أضف نص النشر هنا
echo "جاري النشر في بيئة مؤقتة"

deploy-production:
if: github.event_name == 'push' && github.ref == 'refs/heads/main'
needs: e2e-tests
running-on: ubuntu-latest
environment: production
steps:
- uses: actions/checkout@v3

- name: Download build artifacts
uses: actions/download-artifact@v3
with:
name: build-output
path: dist/

- name: Deploy to Production
run: |
# أضف نص النشر هنا
echo "جاري النشر في بيئة الإنتاج"
```

## خط أنابيب GitLab CI/CD

```yaml
المراحل:
- التحقق
- الاختبار
- الإنشاء
- الاختبار الإلكتروني
- النشر

المتغيرات:
NODE_VERSION: "18"

ذاكرة التخزين المؤقت:
المفتاح: ${CI_COMMIT_REF_SLUG}

المسارات:
- node_modules/

جودة الكود:
المرحلة: التحقق
الصورة: node:${NODE_VERSION}

النص البرمجي:
- npm ci
- npm run lint
- npm run type-check
- npm run format:check
- npm audit --production

اختبارات الوحدة:
المرحلة: الاختبار
الصورة: node:${NODE_VERSION}

النص البرمجي:
- npm ci
- اختبار تشغيل npm
الآثار:
المسارات:
- التغطية/
انتهاء الصلاحية: أسبوع واحد

اختبارات التكامل:
المرحلة: اختبار
الصورة: العقدة: ${NODE_VERSION}

النص البرمجي:
- npm ci
- اختبار تشغيل npm: التكامل
الآثار:
المسارات:
- تغطية التكامل/
انتهاء الصلاحية: أسبوع واحد

البناء:
المرحلة: بناء
الصورة: العقدة: ${NODE_VERSION}

النص البرمجي:
- npm ci
- بناء تشغيل npm
الآثار:
المسارات:
- التوزيع/
انتهاء الصلاحية: أسبوع واحد

اختبارات e2e:
المرحلة: اختبار e2e
الصورة: cypress/browsers:node${NODE_VERSION}-chrome
النص البرمجي:
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
# أضف سكربت النشر هنا
environment:
name: staging
only:
- develop

deploy-production:
stage: deploy
image: node:${NODE_VERSION}
script:
- echo "Deploying to production environment"
# أضف سكربت النشر هنا
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
مراحل {
المرحلة ('تثبيت') {
خطوات {
sh 'npm ci'
}

}


المرحلة ('جودة الكود') {
موازية {
المرحلة ('فحص الوبر') {
خطوات {
sh 'npm run lint'
}

}

المرحلة ('فحص النوع') {

خطوات {
sh 'npm run type-check'
}

}

المرحلة ('فحص التنسيق') {

خطوات {
sh 'npm run format:check'
}

}

المرحلة ('تدقيق الأمان') {

خطوات {
sh 'npm audit --production'
}

}

}


المرحلة ('اختبار') {
موازية {

المرحلة ('اختبارات الوحدة') {

خطوات {
sh 'npm run اختبار
}

نشر {
دائمًا {

junit 'junit-reports/*.xml'

نشر HTML(الهدف: [

السماح بالمفقود: خطأ،


دومًا رابط إلى آخر بناء: خطأ،


احتفظ بالكل: صحيح،


reportDir: 'تغطية'،


reportFiles: 'index.html'،


reportName: 'تقرير التغطية'
])

}

}


مرحلة('اختبارات التكامل') {

خطوات {

sh 'npm تشغيل اختبار: تكامل'

}

}

}


مرحلة('بناء') {

خطوات {

sh 'npm تشغيل بناء'

}

نشر {

نجاح {


archiveArtifacts artifacts: 'dist/**/*'، بصمة الإصبع: صحيح

}
} 
} 

stage('اختبارات E2E') { 
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
reportName: 'E2E Test Report'
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

```

## Azure DevOps Pipeline

```yaml
trigger:
branches:
include:
- main
- develop

pool:
vmImage: 'ubuntu-latest'

المتغيرات:
إصدار العقدة: '18.x'

المراحل:
- المرحلة: التحقق
المهام:
- المهمة: جودة الكود
الخطوات:
- المهمة: NodeTool@0

المدخلات:
مواصفات الإصدار: $(nodeVersion)

اسم العرض: "تثبيت Node.js"

- النص البرمجي: npm ci

اسم العرض: "تثبيت التبعيات"

- النص البرمجي: npm run lint

اسم العرض: "تشغيل فحص النوع"

- النص البرمجي: npm run type-check

اسم العرض: "تشغيل فحص النوع"

- النص البرمجي: npm run format:check

اسم العرض: "التحقق من تنسيق الكود"

- المهمة: npm@1

المدخلات:
الأمر: "مخصص"

أمر مخصص: 'audit --production'
اسم العرض: 'تدقيق الأمان'

- المرحلة: اختبار
يعتمد على: التحقق
الوظائف:
- الوظيفة: اختبارات الوحدات
الخطوات:
- المهمة: NodeTool@0

المدخلات:
versionSpec: $(nodeVersion)
اسم العرض: 'تثبيت Node.js'


- النص البرمجي: npm ci

اسم العرض: 'تثبيت التبعيات'


- النص البرمجي: npm run test

اسم العرض: 'تشغيل اختبارات الوحدات'


- المهمة: PublishTestResults@2

المدخلات:
testResultsFormat: 'JUnit'
testResultsFiles: '**/junit-*.xml'
mergeTestResults: true
testRunTitle: 'اختبارات الوحدات'

اسم العرض: 'نشر الاختبار' النتائج

- المهمة: PublishCodeCoverageResults@1
المدخلات:
codeCoverageTool: 'Cobertura'
summaryFileLocation: '$(System.DefaultWorkingDirectory)/coverage/cobertura-coverage.xml'
reportDirectory: '$(System.DefaultWorkingDirectory)/coverage'
displayName: 'نشر تغطية الكود'

- المرحلة: بناء
dependOn: اختبار
المهام:
- المهمة: BuildApp
الخطوات:
- المهمة: NodeTool@0
المدخلات:
versionSpec: $(nodeVersion)
displayName: 'تثبيت Node.js'

- النص البرمجي: npm ci
displayName: 'تثبيت التبعيات'

- النص البرمجي: npm run build
displayName: 'بناء تطبيق

- المهمة: نسخ الملفات @ 2
المدخلات:
المجلد المصدر: '$(System.DefaultWorkingDirectory)/dist'
المحتويات: '**'
المجلد المستهدف: '$(Build.ArtifactStagingDirectory)'
اسم العرض: 'نسخ ملفات البناء'

- المهمة: نشر آثار البناء @ 1
المدخلات:
مسار النشر: '$(Build.ArtifactStagingDirectory)'
اسم الأثر: 'إسقاط'
اسم العرض: 'نشر آثار البناء'

- المرحلة: اختبار E2ETest
يعتمد على: بناء
الوظائف:
- المهمة: اختبارات E2ETests
الخطوات:
- المهمة: أداة العقدة @ 0
المدخلات:
مواصفات الإصدار: $(إصدار العقدة)
اسم العرض: 'تثبيت Node.js'

- النص البرمجي: npm ci

اسم العرض: "تثبيت التبعيات"

- المهمة: DownloadBuildArtifacts@0

المدخلات:
نوع البناء: "حالي"

نوع التنزيل: "مفرد"

اسم الأداة: "إسقاط"

مسار التنزيل: '$(System.DefaultWorkingDirectory)/dist'

اسم العرض: "تنزيل أدوات البناء"

- النص البرمجي: npm run test:e2e

اسم العرض: "تشغيل اختبارات E2E"

- المهمة: PublishTestResults@2

المدخلات:
تنسيق testResults: 'JUnit'

ملفات testResults: '**/e2e-*.xml'

mergeTestResults: صحيح
testRunTitle: 'E2E الاختبارات
اسم العرض: "نشر نتائج اختبار E2E"

- المرحلة: DeployStaging
يعتمد على: E2ETest
الشرط: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/develop'))
الوظائف:
- النشر: DeployStaging
البيئة: staging
الاستراتيجية:
runOnce:
deploy:
الخطوات:
- النص البرمجي: echo "النشر في بيئة staging"
اسم العرض: "النشر في بيئة staging"

- المرحلة: DeployProduction
يعتمد على: E2ETest
الشرط: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
الوظائف:
- النشر: DeployProduction
البيئة: الإنتاج
الاستراتيجية:
runOnce:
deploy:
steps:
- script: echo "Deploying to production environment"
displayName: 'Deploy to Production'
```

## أفضل الممارسات لأنابيب CI/CD

1. **الفشل السريع**: قم بإجراء فحوصات سريعة مثل فحص الأخطاء وفحص النوع أولاً لتقديم ملاحظات سريعة.
2. **التنفيذ المتوازي**: قم بتشغيل وظائف مستقلة بالتوازي لتقليل مدة خط الأنابيب.
3. **التخزين المؤقت**: قم بتخزين التبعيات مؤقتًا لتسريع عمليات البناء.
4. **العناصر**: شارك عناصر البناء بين الوظائف لتجنب إعادة البناء.
5. **فصل البيئات**: استخدم بيئات مختلفة للتجهيز والإنتاج.
6. **الموافقة اليدوية**: اطلب الموافقة اليدوية لعمليات النشر في الإنتاج.
7. **الإشعارات**: قم بإعداد إشعارات لفشل خط الأنابيب.
8. **إدارة الأسرار**: استخدم طرقًا آمنة للتعامل مع الأسرار وبيانات الاعتماد.
9. **إدارة الإصدارات**: تضمين معلومات الإصدار في عناصر البناء
10. **المراقبة**: مراقبة أداء خط الأنابيب وتحسينه حسب الحاجة

## قائمة التحقق من التنفيذ

- [ ] إعداد مستودع التحكم في الإصدارات
- [ ] تكوين منصة CI/CD المفضلة
- [ ] إنشاء تكوين خط الأنابيب الأساسي
- [ ] إضافة فحوصات جودة الكود
- [ ] تكوين برامج تشغيل الاختبار
- [ ] إعداد عملية البناء
- [ ] تكوين بيئات النشر
- [ ] إعداد الإشعارات
- [ ] توثيق استخدام خط الأنابيب وصيانته
- [ ] تدريب الفريق على سير عمل CI/CD
