# Code Quality Automation

This document provides standardized configurations and workflows for automating code quality checks according to the web development standards.

## Linting Configuration

### ESLint Configuration (JavaScript/TypeScript)

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

### Stylelint Configuration (CSS/SCSS)

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

## Code Formatting

### Prettier Configuration

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

## Static Code Analysis

### SonarQube Configuration

```json
{
  "sonar.projectKey": "project-name",
  "sonar.projectName": "Project Name",
  "sonar.projectVersion": "1.0.0",
  "sonar.sources": "src",
  "sonar.tests": "src",
  "sonar.test.inclusions": "**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx",
  "sonar.coverage.exclusions": "**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx,**/*.stories.js,**/*.stories.jsx,**/*.stories.ts,**/*.stories.tsx",
  "sonar.javascript.lcov.reportPaths": "coverage/lcov.info",
  "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
  "sonar.exclusions": "node_modules/**,build/**,dist/**,coverage/**,public/**,**/*.stories.js,**/*.stories.jsx,**/*.stories.ts,**/*.stories.tsx"
}
```

## Type Checking

### TypeScript Configuration

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

## Git Hooks

### Husky Configuration

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

## Dependency Management

### Dependabot Configuration

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

## GitHub Actions Workflow for Code Quality

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
    
    - name: Install dependencies
      run: npm ci
    
    - name: Lint
      run: npm run lint
    
    - name: Type check
      run: npm run type-check
    
    - name: Format check
      run: npm run format:check
    
    - name: Run tests
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
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        token: ${{ secrets.CODECOV_TOKEN }}
        files: ./coverage/lcov.info
        flags: unittests
        name: codecov-umbrella
        fail_ci_if_error: true
```

## GitLab CI/CD Pipeline for Code Quality

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
  artifacts:
    paths:
      - coverage/
    reports:
      junit: junit.xml
    expire_in: 1 week
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - node_modules/
```

## Best Practices for Code Quality Automation

1. **Fail Fast**: Configure linters and formatters to run early in the development process
2. **Consistent Standards**: Enforce consistent coding standards across the team
3. **Automated Enforcement**: Use Git hooks to prevent committing code that doesn't meet standards
4. **Continuous Monitoring**: Integrate code quality checks into CI/CD pipelines
5. **Actionable Feedback**: Configure tools to provide clear, actionable feedback
6. **Regular Updates**: Keep linting rules and dependencies up to date
7. **Documentation**: Document code quality standards and processes
8. **Team Buy-in**: Ensure the team understands and agrees with the standards
9. **Gradual Implementation**: Implement standards gradually to avoid overwhelming the team
10. **Measure Improvement**: Track code quality metrics over time to measure improvement

## Implementation Checklist

- [ ] Set up ESLint for JavaScript/TypeScript linting
- [ ] Set up Stylelint for CSS/SCSS linting
- [ ] Configure Prettier for code formatting
- [ ] Set up TypeScript for type checking
- [ ] Configure SonarQube or similar tool for static code analysis
- [ ] Set up Git hooks with Husky and lint-staged
- [ ] Configure Dependabot for dependency management
- [ ] Integrate code quality checks into CI/CD pipelines
- [ ] Document code quality standards and processes
- [ ] Train the team on code quality standards and tools 