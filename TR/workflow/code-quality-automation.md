# Kod Kalitesi Otomasyonu 

Bu belge, web geliştirme standartlarına göre kod kalitesi kontrollerini otomatikleştirmek için standartlaştırılmış yapılandırmalar ve iş akışları sağlar. 

## Linting Yapılandırması 

### ESLint Yapılandırması (JavaScript/TypeScript) 

```json 
{ 
"root": true, 
"env": { 
"browser": true, 
"node": true, 
"es2021": true 
}, 
"extends": [ 
"eslint:recommended", 
"plugin:@typescript-eslint/recommended", 
"plugin:react/recommended", 
"plugin:react-hooks/recommended", 
"plugin:jsx-a11y/recommended", 
"plugin:import/errors", 
"plugin:import/warnings", 
"plugin:import/typescript", 
"plugin:prettier/recommended" 
], 
"parser": "@typescript-eslint/parser", 
"parserOptions": { 
"ecmaFeatures": { 
"jsx": true 
}, 
"ecmaVersion": 2021, 
"sourceType": "modül" 
}, 
"eklentiler": [ 
"tepki", 
"tepki-kancaları", 
"@typescript-eslint", 
"jsx-a11y", 
"içe aktar", 
"daha güzel" 
], 
"kurallar": { 
"konsol-yok": ["uyar", { "izin ver": ["uyar", "hata"] }], 
"kullanılmayan-değişkenler-yok": "kapalı", 
"@typescript-eslint/kullanılmayan-değişkenler-yok": ["hata", { "argsIgnorePattern": "^_" }], 
"react/prop-types": "kapalı", 
"react/react-in-jsx-scope": "kapalı", 
"react-hooks/rules-of-hooks": "hata", 
"react-hooks/exhaustive-deps": "uyar", 
"import/order": [ 
"hata", 
{ 
"groups": ["builtin", "external", "internal", "parent", "sibling", "index"], 
"newlines-between": "always", 
"alphabetize": { "order": "asc", "caseInsensitive": true } 
} 
], 
"jsx-a11y/anchor-is-valid": [ 
"hata", 
{ 
"components": ["Link"], 
"specialLink": ["hrefLeft", "hrefRight"], 
"aspects": ["invalidHref", "preferButton"] 
} 
] 
}, 
"settings": { 
"react": { 
"version": "detect" 
}, 
"import/resolver": { 
"typescript": {}, 
"node": { 
"extensions": [".js", ".jsx", ".ts", ".tsx"] 
} 
} 
} 
} 
``` 

### Stylelint Yapılandırması (CSS/SCSS) 

```json 
{ 
"extends": [ 
"stylelint-config-standard", 
"stylelint-config-prettier" 
], 
"eklentiler": [ 
"stylelint-order" 
], 
"kurallar": { 
"order/properties-alphabetical-order": true, 
"color-hex-case": "lower", 
"color-hex-length": "short", 
"color-no-invalid-hex": true, 
"declaration-colon-space-after": "always", 
"girinti": 2, 
"max-empty-lines": 1, 
"selector-pseudo-class-no-unknown": [ 
true, 
{ 
"ignorePseudoClasses": ["global"] 
} 
], 
"at-rule-no-unknown": [ 
true, 
{ 
"ignoreAtRules": ["tailwind", "apply", "variants", "responsive", "screen"] 
} 
], 
"no-descending-specificity": null 
} 
} 
``` 

## Kod Biçimlendirme 

### Daha Güzel Yapılandırma 

```json 
{ 
"semi": true, 
"singleQuote": true, 
"trailingComma": "es5", 
"printWidth": 100, 
"tabWidth": 2, 
"useTabs": false, 
"bracketSpacing": true, 
"jsxBracketSameLine": false, 
"arrowParens": "avoid", 
"endOfLine": "lf" 
} 
``` 

## Statik Kod Analizi 

### SonarQube Yapılandırma 

```json 
{ 
"sonar.projectKey": "proje-adı", 
"sonar.projectName": "Proje Adı", 
"sonar.projectVersion": "1.0.0", 
"sonar.sources": "kaynak", 
"sonar.tests": "kaynak", 
"sonar.test.inclusions": "**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx", 
"sonar.coverage.exclusions": "**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx,**/*.stories.js,**/*.stories.jsx,**/*.stories.ts,**/*.stories.tsx", 
"sonar.javascript.lcov.reportPaths": "coverage/lcov.info", 
"sonar.typescript.lcov.reportPaths": "coverage/lcov.info", 
"sonar.exclusions": "node_modules/**,build/**,dist/**,coverage/**,public/**,**/*.stories.js,**/*.stories.jsx,**/*.stories.ts,**/*.stories.tsx" 
} 
``` 

## Tür Denetimi 

### TypeScript Yapılandırması 

```json 
{ 
"compilerOptions": { 
"target": "es2020", 
"lib": ["dom", "dom.iterable", "esnext"], 
"allowJs": true, 
"skipLibCheck": doğru, 
"esModuleInterop": doğru, 
"allowSyntheticDefaultImports": doğru, 
"strict": doğru, 
"forceConsistentCasingInFileNames": doğru, 
"noFallthroughCasesInSwitch": doğru, 
"module": "esnext", 
"moduleResolution": "node", 
"resolveJsonModule": doğru, 
"isolatedModules": doğru, 
"noEmit": doğru, 
"jsx": "react-jsx", 
"baseUrl": "src" 
}, 
"include": ["src"], 
"exclude": ["node_modules", "build", "dist", "coverage", "public"] 
} 
``` 

## Git Kancaları 

### Husky Yapılandırması 

```json 
{ 
"husky": { 
"hooks": { 
"pre-commit": "lint-staged", 
"commit-msg": "commitlint -E HUSKY_GIT_PARAMS" 
} 
}, 
"lint-staged": { 
"*.{js,jsx,ts,tsx}": [ 
"eslint --fix", 
"prettier --write" 
], 
"*.{css,scss}": [ 
"stylelint --fix", 
"prettier --write" 
], 
"*.{json,md}": [ 
"prettier --write" 
] 
}, 
"commitlint": { 
"extends": [ 
"@commitlint/config-conventional" 
] 
} 
} 
``` 

## Bağımlılık Yönetimi 

### Dependabot Yapılandırması 

```yaml 
version: 2 
updates: 
- package-ecosystem: "npm" 
directory: "/" 
schedule: 
interval: "weekly" 
open-pull-requests-limit: 10 
versioning-strategy: increase 
ignore: 
- dependency-name: "*" 
update-types: ["version-update:semver-major"] 
labels: 
- "dependencies" 
- "automerge" 
commit-message: 
prefix: "chore" 
include: "scope" 
``` 

## GitHub Actions İş Akışı Kod İçin Kalite 

```yaml 
name: Kod Kalitesi 

on: 
push: 
branches: [ main, development ] 
pull_request: 
branches: [ main, development ] 

jobs: 
code-quality: 
runs-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v3 
with: 
fetch-depth: 0 

- name: Node.js Kurulumu 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Bağımlılıkları Kur 
run: npm ci 

- name: Lint 
run: npm run lint 

- name: Tür kontrolü 
run: npm run type-check 

- name: Biçim kontrolü 
run: npm run format:check 

- name: Testleri çalıştır 
run: npm test -- --coverage 

- name: SonarCloud Scan 
uses: SonarSource/sonarcloud-github-action@master 
env: 
GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} 
SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }} 
with: 
args: > 
-Dsonar.projectKey=${{ github.repository_owner }}_${{ github.event.repository.name }} 
-Dsonar.organization=${{ github.repository_owner }} 
-Dsonar.sources=src 
-Dsonar.tests=src 
-Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx 
-Dsonar.javascript.lcov.reportPaths=coverage/lcov.info 
-Dsonar.typescript.lcov.reportPaths=coverage/lcov.info 

- name: Kapsamı Codecov'a yükle 
uses: codecov/codecov-action@v3 
with: 
token: ${{ secrets.CODECOV_TOKEN }} 
files: ./coverage/lcov.info 
flags: unittests 
name: codecov-umbrella 
fail_ci_if_error: true 
``` 

## Kod Kalitesi için GitLab CI/CD Boru Hattı 

```yaml 
code-quality: 
aşama: doğrula 
görüntü: düğüm: 18 
betik: 
- npm ci 
- npm run lint 
- npm run type-check 
- npm run format:check 
- npm test -- --coverage 
- npm install -g sonarqube-scanner 
- sonar-scanner -Dsonar.projectKey=${CI_PROJECT_PATH_SLUG} -Dsonar.sources=src -Dsonar.tests=src -Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info 
eserler: 
yollar: 
- coverage/ 
raporlar: 
junit: junit.xml 
expire_in: 1 hafta 
önbellek: 
anahtar: ${CI_COMMIT_REF_SLUG} 
yollar: 
- node_modules/ 
``` 

## Kod Kalitesi Otomasyonu için En İyi Uygulamalar 

1. **Hızlı Başarısızlık**: Geliştirme sürecinin başlarında çalışacak şekilde linters ve biçimlendiricileri yapılandırın 
2. **Tutarlı Standartlar**: Ekip genelinde tutarlı kodlama standartlarını uygulayın 
3. **Otomatik Uygulama**: Standartlara uymayan kodun gönderilmesini önlemek için Git kancalarını kullanın 
4. **Sürekli İzleme**: Kod kalitesi kontrollerini CI/CD kanallarına entegre edin 
5. **Eyleme Dönüştürülebilir Geri Bildirim**: Net, eyleme dönüştürülebilir geri bildirim sağlamak için araçları yapılandırın 
6. **Düzenli Güncellemeler**: Linting kurallarını ve bağımlılıkları güncel tutun 
7. **Belgeleme**: Kod kalite standartlarını ve süreçlerini belgelendirin

8. **Ekip Katılımı**: Ekibin standartları anladığından ve kabul ettiğinden emin olun

9. **Kademeli Uygulama**: Ekibi bunaltmaktan kaçınmak için standartları kademeli olarak uygulayın
10. **İyileştirmeyi Ölçün**: İyileştirmeyi ölçmek için zaman içinde kod kalite ölçümlerini izleyin

## Uygulama Kontrol Listesi

- [ ] JavaScript/TypeScript linting için ESLint'i ayarlayın
- [ ] CSS/SCSS linting için Stylelint'i ayarlayın
- [ ] Kod biçimlendirmesi için Prettier'ı yapılandırın
- [ ] Tür denetimi için TypeScript'i ayarlayın
- [ ] Statik kod analizi için SonarQube veya benzeri bir aracı yapılandırın
- [ ] Husky ve lint-staged ile Git kancalarını ayarlayın
- [ ] Bağımlılık yönetimi için Dependabot'u yapılandırın
- [ ] Kod kalite kontrollerini CI/CD kanallarına entegre edin
- [ ] Kod kalitesini belgelendirin standartlar ve süreçler 
- [ ] Ekibi kod kalitesi standartları ve araçları konusunda eğitin