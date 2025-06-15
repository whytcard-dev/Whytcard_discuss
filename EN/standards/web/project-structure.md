# Project Structure Standards

## Directory Organization

### Root Structure

```
project-root/
├── src/               # Source code
├── public/            # Static assets
├── dist/              # Build output (generated)
├── node_modules/      # Dependencies (generated)
├── tests/             # Test files
├── docs/              # Documentation
├── .github/           # GitHub workflows and templates
├── .vscode/           # VS Code configuration
├── scripts/           # Build and utility scripts
├── package.json       # Project metadata and dependencies
├── tsconfig.json      # TypeScript configuration
├── .eslintrc.js       # ESLint configuration
├── .prettierrc        # Prettier configuration
├── .gitignore         # Git ignore patterns
├── .env.example       # Example environment variables
└── README.md          # Project documentation
```

### Source Directory Structure

```
src/
├── assets/            # Static assets that require processing
│   ├── images/        # Images
│   ├── fonts/         # Font files
│   └── styles/        # Global styles
│
├── components/        # Reusable UI components
│   ├── common/        # Shared components across features
│   ├── layout/        # Layout components
│   └── ui/            # Basic UI components
│
├── hooks/             # Custom React hooks
│
├── pages/             # Page components / route components
│
├── features/          # Feature-based modules
│   ├── feature1/      # Specific feature
│   │   ├── components/  # Feature-specific components
│   │   ├── hooks/       # Feature-specific hooks
│   │   ├── api/         # Feature-specific API calls
│   │   ├── utils/       # Feature-specific utilities
│   │   ├── types/       # Feature-specific types
│   │   └── index.ts     # Feature exports
│   └── feature2/      # Another feature
│
├── services/          # Service integrations
│   ├── api/           # API client and endpoints
│   ├── auth/          # Authentication service
│   └── analytics/     # Analytics service
│
├── store/             # State management
│   ├── slices/        # Redux slices or context providers
│   ├── actions/       # Action creators
│   └── selectors/     # State selectors
│
├── utils/             # Utility functions
│   ├── formatting/    # Formatting utilities
│   ├── validation/    # Validation utilities
│   └── helpers/       # Helper functions
│
├── types/             # TypeScript type definitions
│   ├── api/           # API response types
│   ├── models/        # Data model types
│   └── common/        # Common type definitions
│
├── constants/         # Application constants
│
├── i18n/              # Internationalization
│   ├── locales/       # Translation files
│   └── config.ts      # i18n configuration
│
├── config/            # App configuration
│   ├── routes.ts      # Route definitions
│   └── settings.ts    # App settings
│
└── App.tsx            # Main application component
```

## Naming Conventions

### Files and Directories

- **React Components**: PascalCase with extension
  - `Button.tsx`, `UserProfile.tsx`
- **Hooks**: camelCase with 'use' prefix
  - `useAuth.ts`, `useFetch.ts`
- **Utilities**: camelCase
  - `formatDate.ts`, `validateEmail.ts`
- **Constants**: UPPER_SNAKE_CASE
  - `API_ENDPOINTS.ts`, `ROUTE_PATHS.ts`
- **Types/Interfaces**: PascalCase with descriptive names
  - `UserData.ts`, `ApiResponse.ts`
- **Test Files**: Same name as the file being tested with `.test` or `.spec` suffix
  - `Button.test.tsx`, `formatDate.spec.ts`

### Component Organization

- **Component Files**: One component per file
- **Component Structure**:
  ```tsx
  // Imports
  import React from 'react';
  import './styles.css';
  
  // Types
  interface ButtonProps {
    // ...
  }
  
  // Component
  export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    // ...
    return (
      // JSX
    );
  };
  
  // Helper functions specific to this component
  const helperFunction = () => {
    // ...
  };
  ```

## Module Organization

### Import Order

1. External libraries
2. Internal modules
3. Components
4. Hooks
5. Utilities
6. Types
7. Assets/styles

Example:
```tsx
// External libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Internal modules
import { API_ENDPOINTS } from '@/constants/api';
import { fetchData } from '@/services/api';

// Components
import { Button } from '@/components/ui';
import { Modal } from '@/components/common';

// Hooks
import { useAuth } from '@/hooks';

// Utilities
import { formatDate } from '@/utils/formatting';

// Types
import type { UserData } from '@/types';

// Assets/styles
import './styles.css';
```

### Export Patterns

- Use named exports for most components and functions
- Use barrel exports (index.ts) to simplify imports
- Avoid default exports except for page components

Example barrel export:
```tsx
// components/ui/index.ts
export * from './Button';
export * from './Input';
export * from './Card';
```

## Configuration Files

### Environment Variables

- Use `.env` files for environment-specific configuration
- Include `.env.example` with documentation
- Use environment-specific files (`.env.development`, `.env.production`)
- Never commit sensitive values to version control

### TypeScript Configuration

- Use strict mode
- Configure path aliases for cleaner imports
- Separate configurations for different environments if needed
- Document non-obvious configuration choices

### Package Management

- Use a lockfile (package-lock.json, yarn.lock, pnpm-lock.yaml)
- Document required Node.js version
- Group dependencies logically in package.json
- Separate dev dependencies from production dependencies

## Documentation

### Code Documentation

- Document complex functions and components
- Use JSDoc for function documentation
- Document props for React components
- Include examples for reusable components
- Document state management patterns

### Project Documentation

- Include a comprehensive README.md
- Document setup and installation process
- Include development workflow instructions
- Document build and deployment process
- Maintain a CHANGELOG.md for version history
- Include contributing guidelines

## Best Practices

- Group related files together
- Keep component files small and focused
- Separate business logic from UI components
- Use path aliases to avoid deep import paths
- Maintain consistent file organization across the project
- Document project structure for new team members
- Use code generators for consistency when applicable
- Review and refactor project structure periodically 