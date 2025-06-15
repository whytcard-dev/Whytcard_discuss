# General Style Guide for WhytCard

## Introduction

This document defines the general coding style and best practices to follow across all languages and technologies used in the WhytCard project. These standards ensure consistency, maintainability, and quality throughout the codebase.

## Table of Contents

1. [Fundamental Principles](#fundamental-principles)
2. [Naming Conventions](#naming-conventions)
3. [Formatting](#formatting)
4. [Documentation](#documentation)
5. [Code Structure](#code-structure)
6. [Language-Specific Guidelines](#language-specific-guidelines)
7. [Version Control](#version-control)

## Fundamental Principles

### Clarity Over Cleverness

Always prioritize code clarity over clever or complex solutions:

- Write code that is easy to understand
- Avoid obscure language features unless necessary
- Prioritize readability and maintainability over brevity

### Consistency

Maintain consistency throughout the codebase:

- Follow established patterns in the project
- Don't mix different styles or approaches
- When modifying existing code, match its style

### DRY (Don't Repeat Yourself)

Avoid code duplication:

- Extract repeated code into functions or classes
- Create shared utilities for common operations
- Use inheritance or composition to share behavior

### KISS (Keep It Simple, Stupid)

Prefer simple solutions to complex ones:

- Start with the simplest approach that works
- Add complexity only when necessary
- Break complex problems into simpler parts

### YAGNI (You Aren't Gonna Need It)

Don't add functionality until it's necessary:

- Avoid speculative features
- Implement only what is required now
- Refactor when needed, not preemptively

## Naming Conventions

### General Rules

- Names should be descriptive and convey purpose
- Use full words rather than abbreviations (except for common ones)
- Be consistent with existing naming patterns

### Case Styles

Use the appropriate case style for each language:

- **camelCase**: JavaScript/TypeScript variables and functions
- **PascalCase**: Classes in most languages, React components
- **snake_case**: Python variables and functions
- **kebab-case**: HTML elements, CSS classes, file names
- **UPPER_SNAKE_CASE**: Constants in most languages

### Naming Examples

```javascript
// JavaScript
const userProfile = {
  firstName: 'John',
  lastName: 'Doe',
  EMAIL_REGEX: /^[^@]+@[^@]+\.[^@]+$/,
};

function calculateTotalPrice(items) {
  // Implementation
}

class UserManager {
  // Implementation
}
```

```python
# Python
user_profile = {
  "first_name": "John",
  "last_name": "Doe",
  "EMAIL_REGEX": r"^[^@]+@[^@]+\.[^@]+$",
}

def calculate_total_price(items):
  # Implementation
  pass

class UserManager:
  # Implementation
  pass
```

## Formatting

### Indentation

- Use consistent indentation throughout the project
- For JavaScript/TypeScript/HTML/CSS: 2 spaces
- For Python: 4 spaces (PEP 8)
- Never mix tabs and spaces

### Line Length

- Limit lines to a maximum of 100 characters for most languages
- For Python, follow PEP 8 (79 characters for code, 72 for comments)
- Break long lines in a way that's natural for the language

### Spacing

- Use spaces around operators
- Use spaces after commas and semicolons
- Use consistent spacing in function calls and declarations

### Brackets and Blocks

- Opening brackets on the same line for most languages (except for Python functions and classes)
- Consistent use of brackets even for single-line blocks
- Align closing brackets with the start of the opening line

### Examples

```javascript
// JavaScript
function calculateDiscount(price, discountPercent) {
  if (price <= 0) {
    return 0;
  }
  
  const discount = price * (discountPercent / 100);
  return discount;
}

const items = [
  { name: 'Item 1', price: 10 },
  { name: 'Item 2', price: 20 },
  { name: 'Item 3', price: 30 },
];
```

```python
# Python
def calculate_discount(price, discount_percent):
    if price <= 0:
        return 0
    
    discount = price * (discount_percent / 100)
    return discount

items = [
    {"name": "Item 1", "price": 10},
    {"name": "Item 2", "price": 20},
    {"name": "Item 3", "price": 30},
]
```

## Documentation

### Code Comments

- Use comments to explain "why", not "what"
- Comment complex algorithms or non-obvious solutions
- Keep comments up-to-date with code changes
- Avoid redundant or obvious comments

### Function and Method Documentation

Document all functions and methods with:

- Description of purpose
- Parameters and their types
- Return value and type
- Exceptions that may be thrown
- Usage examples for complex functions

### File Headers

Include at the beginning of each file:

- Brief description of the file's purpose
- Author(s) information
- Creation date
- License information

### Examples

```javascript
/**
 * Calculates the total price of items after applying discounts.
 * 
 * @param {Array<Object>} items - Array of item objects with price property
 * @param {number} discountPercent - Discount percentage (0-100)
 * @returns {number} Total price after discount
 * 
 * @example
 * const items = [{ price: 10 }, { price: 20 }];
 * const total = calculateTotalPrice(items, 10); // Returns 27
 */
function calculateTotalPrice(items, discountPercent) {
  // Implementation
}
```

```python
def calculate_total_price(items, discount_percent):
    """
    Calculate the total price of items after applying discounts.
    
    Args:
        items: List of dictionaries with price property
        discount_percent: Discount percentage (0-100)
        
    Returns:
        float: Total price after discount
        
    Example:
        items = [{"price": 10}, {"price": 20}]
        total = calculate_total_price(items, 10)  # Returns 27
    """
    # Implementation
```

## Code Structure

### File Organization

- One primary class/component per file
- Group related functionality in the same directory
- Separate interface from implementation when appropriate
- Keep files reasonably sized (< 500 lines as a guideline)

### Function and Method Size

- Keep functions and methods small and focused
- Aim for functions that do one thing well
- Limit function length (< 50 lines as a guideline)
- Extract complex logic into helper functions

### Dependency Management

- Minimize dependencies between modules
- Use dependency injection to reduce coupling
- Clearly document module dependencies
- Avoid circular dependencies

### Error Handling

- Handle errors at the appropriate level
- Use exceptions for exceptional conditions
- Provide meaningful error messages
- Don't swallow exceptions without good reason

## Language-Specific Guidelines

### JavaScript/TypeScript

- Follow Airbnb JavaScript Style Guide
- Use ES6+ features when appropriate
- Use TypeScript for type safety
- Prefer functional programming patterns

```javascript
// Prefer const over let when variable won't be reassigned
const PI = 3.14159;

// Use template literals for string interpolation
const greeting = `Hello, ${name}!`;

// Use destructuring assignment
const { firstName, lastName } = user;

// Use arrow functions for short callbacks
const doubled = numbers.map(n => n * 2);
```

### Python

- Follow PEP 8 style guide
- Use type hints (PEP 484)
- Prefer list/dict comprehensions for simple cases
- Use context managers for resource management

```python
# Use list comprehensions for simple transformations
doubled = [n * 2 for n in numbers]

# Use context managers for resource management
with open("file.txt", "r") as f:
    content = f.read()

# Use type hints
def greet(name: str) -> str:
    return f"Hello, {name}!"
```

### HTML/CSS

- Use semantic HTML elements
- Follow BEM methodology for CSS classes
- Minimize inline styles
- Use CSS variables for theming

```html
<!-- Use semantic HTML -->
<article class="card">
  <header class="card__header">
    <h2 class="card__title">Title</h2>
  </header>
  <div class="card__content">
    <p>Content goes here</p>
  </div>
</article>
```

```css
/* Use CSS variables for theming */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
}

.card {
  border: 1px solid var(--primary-color);
}

/* Follow BEM methodology */
.card__header {
  background-color: var(--primary-color);
}

.card__title {
  font-size: 1.5rem;
}
```

## Version Control

### Commit Messages

- Write clear, descriptive commit messages
- Use the imperative mood ("Add feature" not "Added feature")
- Reference issue numbers when applicable
- Follow the conventional commits format

```
feat: add user authentication system

- Implement JWT-based authentication
- Add login and registration endpoints
- Create authentication middleware

Closes #123
```

### Branching Strategy

- Use feature branches for new development
- Keep main/master branch stable
- Use pull requests for code review
- Delete branches after merging

### Code Reviews

- Review all code before merging
- Focus on architecture, security, and performance
- Be constructive and respectful in comments
- Use automated tools to catch style issues

## Conclusion

This style guide is designed to ensure consistency and quality across the WhytCard codebase. While it covers general principles, refer to language-specific guides for more detailed rules. Remember that the goal is to create maintainable, readable, and robust code.

All team members are expected to follow these guidelines and help enforce them through code reviews and mentoring.

---

Last updated: 2025-01-15 