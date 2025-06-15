# コード品質の自動化

このドキュメントでは、Web 開発標準に従ってコード品質チェックを自動化するための標準化された構成とワークフローを提供します。

## リンティング設定

### ESLint設定 (JavaScript/TypeScript)

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
"sourceType": "module"
},
"plugins": [
"react",
"react-hooks",
"@typescript-eslint",
"jsx-a11y",
"import",
"prettier"
],
"rules": {
"no-console": ["warn", { "allow": ["warn", "error"] }],
"no-unused-vars": "off",
"@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
"react/prop-types": "off",
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

### Stylelint 設定 (CSS/SCSS)

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
"color-hex-case": "lower",
"color-hex-length": "short",
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

## コードのフォーマット

### Prettier の設定

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

## 静的コード解析

### SonarQube の設定

```json
{
"sonar.projectKey": "project-name",
"sonar.projectName": "プロジェクト名",
"sonar.projectVersion": "1.0.0",
"sonar.sources": "src",
"sonar.tests": "src",
"sonar.test.inclusions": "**/*.test.js、**/*.test.jsx、**/*.test.ts、**/*.test.tsx",
"sonar.coverage.exclusions": "**/*.test.js、**/*.test.jsx、**/*.test.ts、**/*.test.tsx、**/*.stories.js、**/*.stories.jsx、**/*.stories.ts、**/*.stories.tsx",
"sonar.javascript.lcov.reportPaths": "coverage/lcov.info",
"sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
"sonar.exclusions": "node_modules/**,build/**,dist/**,coverage/**,public/**,**/*.stories.js,**/*.stories.jsx,**/*.stories.ts,**/*.stories.tsx"
}
```

## 型チェック

### TypeScript の設定

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
"resolveJsonModule": true,
"isolatedModules": true,
"noEmit": true,
"jsx": "react-jsx",
"baseUrl": "src"
},
"include": ["src"],
"exclude": ["node_modules", "build", "dist", "coverage", "public"]
}
```

## Gitフック

### Husky設定

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

## 依存関係管理

### Dependabot の設定

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

## コード品質のための GitHub Actions ワークフロー

```yaml
name: Code Quality

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
with:
fetch-depth: 0

- name: Setup Node.js
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

- name: フォーマットチェック
run: npm run format:check

- name: テストの実行
run: npm test -- --coverage

- name: SonarCloud スキャン
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

- name: カバレッジを Codecov にアップロード
uses: codecov/codecov-action@v3
with:
token: ${{ secrets.CODECOV_TOKEN }}
files: ./coverage/lcov.info
flags: unittests
name: codecov-umbrella
fail_ci_if_error: true 
``` 

## コード品質のための GitLab CI/CD パイプライン

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
アーティファクト:
パス:
- coverage/
レポート:
junit: junit.xml
有効期限: 1週間
キャッシュ:
キー: ${CI_COMMIT_REF_SLUG}
パス:
- node_modules/
```

## コード品質自動化のベストプラクティス

1. **Fail Fast**: リンターとフォーマッタを開発プロセスの早い段階で実行するように設定
2. **Consistent Standards**: チーム全体で一貫したコーディング標準を適用する
3. **Automated Enforcement**: Gitフックを使用して、標準を満たしていないコードのコミットを防ぐ
4. **Continuous Monitoring**: コード品質チェックをCI/CDパイプラインに統合する
5. **Actionable Feedback**: 明確で実用的なフィードバックを提供するツールを設定する
6. **Regular Updates**: 常にリンティングルールと依存関係を最新に保つ
7. **ドキュメント**: コード品質基準とプロセスを文書化する
8. **チームの賛同**: チームが基準を理解し、同意していることを確認する
9. **段階的な実装**: チームの負担を軽減するため、基準を段階的に実装する
10. **改善の測定**: コード品質メトリクスを経時的に追跡し、改善を測定する

## 実装チェックリスト

- [ ] JavaScript/TypeScript のリンティング用に ESLint を設定する
- [ ] CSS/SCSS のリンティング用に Stylelint を設定する
- [ ] コードフォーマット用に Prettier を設定する
- [ ] 型チェック用に TypeScript を設定する
- [ ] 静的コード解析用に SonarQube または類似ツールを設定する
- [ ] Husky と lint-staged で Git フックを設定する
- [ ] 依存関係管理用に Dependabot を設定する
- [ ] コード品質チェックを CI/CD パイプラインに統合する
- [ ] コード品質基準とプロセスを文書化する
- [ ] コード品質基準とツールについてチームをトレーニングする