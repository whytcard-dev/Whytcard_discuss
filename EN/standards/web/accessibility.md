# Web Accessibility Standards

## Core Principles (POUR)

- **Perceivable**: Information must be presentable to users in ways they can perceive
- **Operable**: User interface components must be operable by all users
- **Understandable**: Information and operation must be understandable
- **Robust**: Content must be robust enough to work with current and future technologies

## Compliance Levels

- **Target Compliance**: WCAG 2.1 AA (minimum)
- **Aspire To**: WCAG 2.1 AAA where feasible
- **Legal Requirements**: ADA, Section 508, EAA (EU), AODA (Canada) as applicable
- **Regular Testing**: Automated and manual accessibility testing

## Semantic Structure

### HTML Semantics

- Use appropriate HTML elements for their intended purpose
- Implement proper heading structure (h1-h6) in logical order
- Use landmark elements (`<main>`, `<nav>`, `<header>`, `<footer>`, `<aside>`)
- Implement proper list structures (`<ul>`, `<ol>`, `<dl>`)
- Use `<button>` for interactive controls, not divs or spans
- Use `<a>` for navigation to new pages or resources
- Use `<table>` for tabular data with proper headers
- Avoid overriding native semantics with ARIA unless necessary

### Document Structure

- Include a single `<h1>` per page
- Implement logical heading hierarchy
- Use descriptive page titles
- Provide skip links for keyboard users
- Group related form elements with `<fieldset>` and `<legend>`
- Use `<label>` elements for form controls
- Implement proper document language (`<html lang="en">`)
- Use `<section>`, `<article>`, and other semantic containers

## Keyboard Accessibility

- Ensure all interactive elements are keyboard accessible
- Implement logical tab order (use tabindex wisely)
- Provide visible focus indicators (enhance default styles)
- Ensure keyboard traps are avoided
- Implement keyboard shortcuts for complex interfaces
- Test all functionality with keyboard only
- Ensure custom components support keyboard interaction patterns
- Support standard keyboard interactions (Space, Enter, Escape, Arrow keys)

## Images & Media

### Images

- Provide alternative text for all images (`alt` attribute)
- Use empty alt (`alt=""`) for decorative images
- Provide descriptive alt text for informative images
- Use appropriate text alternatives for complex images (charts, graphs)
- Ensure text is not embedded within images
- Use `<figure>` and `<figcaption>` for images with captions
- Maintain sufficient contrast for important images

### Media

- Provide captions for videos
- Provide transcripts for audio content
- Implement audio descriptions for videos when needed
- Ensure media players are keyboard accessible
- Provide controls for pausing, stopping, and adjusting volume
- Avoid auto-playing media with sound
- Ensure no content flashes more than 3 times per second

## Color & Contrast

- Ensure sufficient color contrast ratios:
  - 4.5:1 for normal text (AA)
  - 3:1 for large text (AA)
  - 7:1 for normal text (AAA)
  - 4.5:1 for large text (AAA)
- Don't rely on color alone to convey information
- Provide additional indicators (icons, patterns, text)
- Test interfaces in grayscale
- Support high contrast modes
- Ensure focus indicators have sufficient contrast
- Test with color blindness simulators
- Use accessible color combinations

## Forms & Interactive Elements

### Forms

- Associate labels with form controls (using `for` attribute)
- Group related form elements with `<fieldset>` and `<legend>`
- Provide clear instructions and error messages
- Indicate required fields (not just with color)
- Validate input and provide accessible error messages
- Maintain form state after validation errors
- Support autocomplete attributes
- Use appropriate input types (email, tel, date, etc.)

### Interactive Elements

- Ensure all controls have accessible names
- Provide large enough touch targets (44×44px minimum)
- Implement ARIA roles, states, and properties when needed
- Ensure custom components follow WAI-ARIA Authoring Practices
- Provide feedback for all interactions
- Ensure state changes are announced to screen readers
- Test complex widgets with assistive technologies

## Focus Management

- Maintain visible focus indicators
- Never remove focus outlines without alternatives
- Manage focus when content changes dynamically
- Return focus to appropriate elements after actions
- Trap focus in modals and dialogs
- Implement programmatic focus for single-page applications
- Ensure focus order matches visual order
- Use `tabindex` appropriately (avoid positive values)

## Text & Typography

- Use relative units for text (rem, em)
- Ensure text can be resized up to 200% without loss of content
- Maintain line height of at least 1.5 for paragraph text
- Keep line length between 50-75 characters
- Provide sufficient spacing between paragraphs
- Use clear, simple language when possible
- Avoid justified text
- Ensure proper contrast between text and background
- Support text spacing adjustments

## ARIA Implementation

- Use native HTML elements before ARIA when possible
- Implement ARIA landmarks for page structure
- Use ARIA roles to define element types when needed
- Apply ARIA states and properties for dynamic content
- Update ARIA states when content changes
- Test ARIA implementations with screen readers
- Follow WAI-ARIA Authoring Practices for patterns
- Avoid conflicting or redundant ARIA

## Dynamic Content & AJAX

- Announce dynamic content changes to screen readers
- Use ARIA live regions appropriately
- Manage focus when content updates
- Provide loading indicators for asynchronous content
- Ensure custom scrolling regions are accessible
- Make single-page applications navigable
- Maintain page state during back/forward navigation
- Ensure browser history is properly updated

## Testing & Validation

### Automated Testing

- Integrate accessibility linting in development workflow
- Use axe-core or similar tools for automated testing
- Include accessibility tests in CI/CD pipeline
- Generate accessibility reports
- Track accessibility issues over time
- Test with multiple automated tools
- Understand the limitations of automated testing

### Manual Testing

- Conduct keyboard-only testing
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Test with screen magnifiers
- Test with speech recognition software
- Verify color contrast manually
- Test with browser zoom up to 200%
- Test with different display sizes

### User Testing

- Include users with disabilities in testing
- Test with assistive technology users
- Gather feedback on accessibility issues
- Prioritize fixes based on impact
- Document workarounds for known issues
- Conduct regular accessibility reviews
- Implement continuous improvement

## Documentation & Training

- Document accessibility features
- Provide accessibility statements
- Train development team on accessibility
- Include accessibility in design reviews
- Document known issues and roadmaps
- Share best practices across teams
- Keep up with evolving standards
- Assign accessibility champions 