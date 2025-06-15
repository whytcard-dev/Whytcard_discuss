# Otomatisasi Kualitas Kode 

Dokumen ini menyediakan konfigurasi dan alur kerja standar untuk mengotomatisasi pemeriksaan kualitas kode sesuai dengan standar pengembangan web. 

## Konfigurasi Linting 

### Konfigurasi ESLint (JavaScript/TypeScript) 

```json 
{ 
"root": benar, 
"env": { 
"browser": benar, 
"node": benar, 
"es2021": benar 
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
"jsx": benar 
}, 
"ecmaVersion": 2021, 
"sourceType": "modul" 
}, 
"plugins": [ 
"bereaksi", 
"react-hooks", 
"@typescript-eslint", 
"jsx-a11y", 
"impor", 
"lebih cantik" 
], 
"aturan": { 
"tanpa-konsol": ["peringatkan", { "izinkan": ["peringatkan", "kesalahan"] }], 
"tanpa-vars-yang-tidak-digunakan": "nonaktif", 
"@typescript-eslint/tanpa-vars-yang-tidak-digunakan": ["kesalahan", { "argsIgnorePattern": "^_" }], 
"bereaksi/jenis-prop": "nonaktif", 
"react/react-in-jsx-scope": "off", 
"react-hooks/rules-of-hooks": "error", 
"react-hooks/exhaustive-deps": "warn", 
"import/order": [ 
"error", 
{ 
"groups": ["builtin", "external", "internal", "parent", "sibling", "index"], 
"newlines-between": "always", 
"alphabetize": { "order": "asc", "caseInsensitive": true } 
} 
], 
"jsx-a11y/anchor-is-valid": [ 
"error", 
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

### Konfigurasi Stylelint (CSS/SCSS) 

```json 
{ 
"extends": [ 
"stylelint-config-standard", 
"stylelint-config-prettier" 
], 
"plugins": [ 
"stylelint-order" 
], 
"rules": { 
"order/properties-alphabetical-order": true, 
"color-hex-case": "lower", "color-hex-length": "short", 
"color-no-invalid-hex": true, 
"declaration-colon-space-after": "always", 
"indentation": 2, 
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

## Pemformatan Kode 

### Konfigurasi yang Lebih Cantik 

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

## Analisis Kode Statis 

### Konfigurasi SonarQube 

```json 
{ 
"sonar.projectKey": "project-name", 
"sonar.projectName": "Nama Proyek", 
"sonar.projectVersion": "1.0.0", 
"sonar.sources": "src", 
"sonar.tests": "src", 
"sonar.test.inclusions": "**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx", 
"sonar.coverage.exclusions": "**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx,**/*.stories.js,**/*.stories.jsx,**/*.stories.ts,**/*.stories.ts", 
"sonar.javascript.lcov.reportPaths": "coverage/lcov.info", 
"sonar.typescript.lcov.reportPaths": "coverage/lcov.info", 
"sonar.exclusions": "node_modules/**,build/**,dist/**,coverage/**,public/**,**/*.stories.js,**/*.stories.jsx,**/*.stories.ts,**/*.stories.tsx" 
} 
``` 

## Pemeriksaan Tipe 

### Konfigurasi TypeScript 

```json 
{ 
"compilerOptions": { 
"target": "es2020", 
"lib": ["dom", "dom.iterable", "esnext"], 
"allowJs": true, 
"skipLibCheck": true, 
"esModuleInterop": true, 
"allowSyntheticDefaultImports": true, 
"strict": true, 
"forceConsistentCasingInFileNames": true, 
"noFallthroughCasesInSwitch": true, 
"module": "esnext", 
"moduleResolution": "node", 
"resolveJsonModule": benar, 
"isolatedModules": benar, 
"noEmit": benar, 
"jsx": "react-jsx", 
"baseUrl": "src" 
}, 
"include": ["src"], 
"exclude": ["node_modules", "build", "dist", "coverage", "public"] 
} 
``` 

## Kait Git 

### Konfigurasi Husky 

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

## Manajemen Ketergantungan 

### Konfigurasi Dependabot 

```yaml 
versi: 2 
pembaruan: 
- ekosistem-paket: "npm" 
direktori: "/" 
jadwal: 
interval: "mingguan" 
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

## Alur Kerja GitHub Actions untuk Kualitas Kode 

```yaml 
name: Kualitas Kode 

on: 
push: 
branch: [ main, develop ] 
pull_request: 
branch: [ main, develop ] 

jobs: 
code-quality: 
runs-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v3 
with: 
fetch-depth: 0 

- name: Menyiapkan Node.js 
uses: actions/setup-node@v3 
dengan: 
node-version: '18' 
cache: 'npm' 

- nama: Instal dependensi 
jalankan: npm ci 

- nama: Lint 
jalankan: npm run lint 

- nama: Pemeriksaan tipe 
jalankan: npm run type-check 

- nama: Pemeriksaan format 
jalankan: npm run format:check 

- nama: Menjalankan pengujian 
jalankan: npm test -- --coverage 

- nama: SonarCloud Scan 
menggunakan: SonarSource/sonarcloud-github-action@master 
env: 
GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} 
SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }} 
dengan: 
args: > 
-Dsonar.projectKey=${{ github.repository_owner }}_${{ github.event.repository.name }} 
-Dsonar.organization=${{ github.repository_owner }} 
-Dsonar.sources=src 
-Dsonar.tests=src 
-Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx 
-Dsonar.javascript.lcov.reportPaths=coverage/lcov.info 
-Dsonar.typescript.lcov.reportPaths=coverage/lcov.info 

- nama: Unggah liputan ke Codecov 
menggunakan: codecov/codecov-action@v3 
dengan: 
token: ${{ secrets.CODECOV_TOKEN }} 
file: ./coverage/lcov.info 
flags: unittests 
name: codecov-umbrella 
fail_ci_if_error: true 
``` 

## GitLab CI/CD Pipeline untuk Kualitas Kode 

```yaml 
code-quality: 
stage: validate 
image: node:18 
script: 
- npm ci 
- npm run lint 
- npm run type-check 
- npm run format:check 
- npm test -- --coverage 
- npm install -g sonarqube-scanner 
- sonar-scanner -Dsonar.projectKey=${CI_PROJECT_PATH_SLUG} -Dsonar.sources=src -Dsonar.tests=src -Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info 
artefak: 
jalur: 
- coverage/ 
laporan: 
junit: junit.xml 
berakhir dalam: 1 minggu 
cache: 
kunci: ${CI_COMMIT_REF_SLUG} 
jalur: 
- node_modules/ 
``` 

## Praktik Terbaik untuk Otomatisasi Kualitas Kode 

1. **Gagal Cepat**: Konfigurasikan linter dan formatter untuk dijalankan lebih awal dalam proses pengembangan 
2. **Standar Konsisten**: Terapkan standar pengodean yang konsisten di seluruh tim 
3. **Otomatis **Penegakan**: Gunakan kait Git untuk mencegah komit kode yang tidak memenuhi standar 
4. **Pemantauan Berkelanjutan**: Integrasikan pemeriksaan kualitas kode ke dalam alur kerja CI/CD 
5. **Umpan Balik yang Dapat Ditindaklanjuti**: Konfigurasikan alat untuk memberikan umpan balik yang jelas dan dapat ditindaklanjuti 
6. **Pembaruan Reguler**: Jaga agar aturan dan dependensi linting tetap mutakhir 
7. **Dokumentasi**: Dokumentasikan standar dan proses kualitas kode 
8. **Dukungan Tim**: Pastikan tim memahami dan setuju dengan standar 
9. **Implementasi Bertahap**: Terapkan standar secara bertahap untuk menghindari kewalahan tim 
10. **Ukur Peningkatan**: Lacak metrik kualitas kode dari waktu ke waktu untuk mengukur peningkatan 

## Daftar Periksa Implementasi 

- [ ] Siapkan ESLint untuk linting JavaScript/TypeScript 
- [ ] Siapkan Stylelint untuk linting CSS/SCSS 
- [ ] Konfigurasikan Prettier untuk pemformatan kode 
- [ ] Siapkan TypeScript untuk tipe memeriksa 
- [ ] Mengonfigurasi SonarQube atau alat serupa untuk analisis kode statis 
- [ ] Menyiapkan kait Git dengan Husky dan lint-staged 
- [ ] Mengonfigurasi Dependabot untuk manajemen ketergantungan 
- [ ] Mengintegrasikan pemeriksaan kualitas kode ke dalam jalur CI/CD 
- [ ] Mendokumentasikan standar dan proses kualitas kode 
- [ ] Melatih tim tentang standar dan alat kualitas kode