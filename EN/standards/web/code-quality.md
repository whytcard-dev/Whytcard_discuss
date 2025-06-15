# Code Quality Standards

## Core Principles

- Write clean, maintainable, and self-documenting code
- Follow SOLID and DRY principles
- Keep functions small and focused (single responsibility)
- Use descriptive naming for variables, functions, and classes
- Maintain consistent code style across the project
- Document complex logic and public APIs
- Write code for humans, not just machines

## JavaScript/TypeScript Standards

### TypeScript Configuration

- Use strict mode (`"strict": true`)
- Enable all recommended type checking options
- Configure proper module resolution
- Set appropriate target ECMAScript version
- Specify include/exclude patterns
- Use path aliases for cleaner imports

### Naming Conventions

- **Variables/Functions**: camelCase (`getUserData`, `calculateTotal`)
- **Classes/Interfaces/Types**: PascalCase (`UserProfile`, `ApiResponse`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`, `API_URL`)
- **Private properties**: Use `#` prefix or `_` convention (`#privateField`, `_privateMethod`)
- **Boolean variables**: Use "is", "has", "can" prefixes (`isActive`, `hasPermission`)
- **Component files**: PascalCase with extension (`UserCard.tsx`)
- **Utility files**: camelCase with extension (`formatDate.ts`)

### Code Organization

- One class/component per file
- Group imports by external/internal
- Order imports alphabetically
- Use barrel exports (`index.ts`) for related functionality
- Organize code by feature/module
- Keep files under 400 lines (split if larger)
- Keep functions under 50 lines
- Maximum nesting: 3-4 levels deep

### Best Practices

- Prefer immutability (const, readonly, Object.freeze)
- Use optional chaining and nullish coalescing
- Implement proper error handling
- Avoid any type except when necessary
- Use type guards for runtime type checking
- Prefer async/await over raw promises
- Avoid magic numbers and strings (use constants)
- Implement proper null/undefined checks
- Use early returns to reduce nesting

## React Standards

### Component Structure

- Prefer functional components with hooks
- Use named exports for components
- Implement prop validation with TypeScript
- Extract complex logic to custom hooks
- Keep components focused on UI concerns
- Implement proper error boundaries
- Use React.memo for performance optimization
- Extract reusable components

### State Management

- Use local state for component-specific data
- Use context for shared state across components
- Consider external state management for complex apps
- Keep state normalized and minimal
- Implement proper state initialization
- Use reducers for complex state logic
- Avoid prop drilling (use composition or context)

### Performance Optimization

- Use React.memo for pure components
- Implement useMemo for expensive calculations
- Use useCallback for function memoization
- Virtualize long lists (react-window, react-virtualized)
- Implement proper dependency arrays in hooks
- Avoid unnecessary re-renders
- Use React Profiler to identify bottlenecks

## Testing Standards

### Unit Testing

- Test all business logic and utilities
- Use Jest or Vitest as the test runner
- Implement proper mocking of dependencies
- Use Testing Library for component testing
- Follow AAA pattern (Arrange, Act, Assert)
- Write descriptive test names
- Aim for >80% code coverage
- Test edge cases and error scenarios

### Integration Testing

- Test component interactions
- Test form submissions and user flows
- Use MSW for API mocking
- Test routing and navigation
- Verify state changes
- Test with realistic data

### End-to-End Testing

- Use Cypress or Playwright
- Test critical user journeys
- Test on multiple browsers
- Implement proper test isolation
- Use data attributes for test selectors
- Implement retry logic for flaky tests
- Test accessibility

## Code Review Standards

### Process

- All code must be reviewed before merging
- Automated checks must pass before review
- Use pull request templates
- Keep PRs small and focused
- Respond to review comments promptly
- Resolve all comments before merging
- Squash commits before merging

### Review Checklist

- Code follows project standards
- Tests are included and pass
- Documentation is updated
- No security vulnerabilities
- Performance implications considered
- Accessibility requirements met
- Edge cases handled
- No unnecessary code or dependencies

## Tooling

### Linting and Formatting

- ESLint with appropriate rules
- Prettier for consistent formatting
- Husky for pre-commit hooks
- lint-staged for incremental linting
- TypeScript compiler for type checking
- Stylelint for CSS/SCSS

### Static Analysis

- SonarQube or CodeClimate
- Complexity metrics monitoring
- Duplicate code detection
- Security vulnerability scanning
- Bundle size analysis
- Unused code detection

### CI/CD Integration

- Run all checks on every PR
- Block merging if checks fail
- Generate and publish test coverage reports
- Implement performance regression testing
- Automate dependency updates
- Deploy preview environments 