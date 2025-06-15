# Internationalization (i18n) Standards

## Core Principles

- Design for global audiences from the start
- Separate content from code
- Support multiple languages and locales
- Respect cultural differences and sensitivities
- Implement automatic language detection
- Allow manual language selection
- Test with real users from target markets

## Language & Content

### Text Management

- Store all user-facing text in resource files
- Never hardcode text strings in components
- Use unique, descriptive keys for text resources
- Organize translations by feature or page
- Support pluralization rules for different languages
- Handle gender-specific variations
- Support right-to-left (RTL) languages
- Implement fallback mechanisms for missing translations

### Translation Process

- Provide context for translators
- Include placeholder/variable descriptions
- Use professional translation services
- Implement translation memory systems
- Allow for text expansion (some languages require more space)
- Provide screenshots for context
- Implement a review process for translations
- Support continuous translation updates

### Content Considerations

- Avoid culturally specific metaphors or idioms
- Be aware of color symbolism across cultures
- Consider different name formats and address standards
- Respect cultural sensitivities and taboos
- Adapt content for local markets when necessary
- Use culturally neutral imagery
- Consider reading direction (LTR vs RTL)
- Avoid slang and colloquialisms

## Technical Implementation

### Framework & Libraries

- Use established i18n libraries:
  - react-i18next / i18next (React)
  - vue-i18n (Vue)
  - angular/localize (Angular)
  - next-intl (Next.js)
  - Format.js (React)
- Implement proper language detection
- Support language switching without page reload
- Configure fallback languages
- Implement lazy loading for translations
- Cache translations for performance
- Support nested translation keys
- Implement pluralization and formatting

### Code Structure

- Separate translation files by language
- Use JSON or YAML for translation resources
- Implement namespaces for large applications
- Keep translation keys organized and maintainable
- Follow consistent naming conventions for keys
- Document special formatting or variables
- Implement type safety for translation keys (TypeScript)
- Support dynamic key generation when necessary

### Formatting

#### Date & Time

- Use libraries that support international date formats
- Display dates in the user's preferred format
- Consider time zones and daylight saving time
- Format dates according to locale conventions
- Support different calendar systems when needed
- Use ISO format for data exchange
- Display relative times appropriately by culture

#### Numbers & Currency

- Format numbers according to locale conventions
- Use proper decimal and thousands separators
- Format currencies with appropriate symbols
- Position currency symbols correctly by locale
- Support different numbering systems
- Format percentages according to locale
- Consider exchange rates for multi-region applications

#### Addresses & Phone Numbers

- Support different address formats
- Accommodate various postal code formats
- Handle international phone numbers (E.164 format)
- Format phone numbers according to local conventions
- Support different name ordering conventions
- Consider honorifics and titles across cultures
- Validate addresses by country-specific rules

## UI Considerations

### Layout & Design

- Design flexible layouts that accommodate text expansion
- Support both LTR and RTL text directions
- Implement bidirectional (bidi) text support
- Test layouts with longer text strings
- Avoid fixed-width containers for text
- Consider font size variations across languages
- Test with actual translated content, not lorem ipsum
- Implement language-specific CSS when needed

### Typography

- Use fonts that support multiple languages
- Include appropriate font fallbacks
- Consider character sets for different languages
- Support special characters and diacritics
- Adjust line heights for different scripts
- Test readability across languages
- Consider vertical text for some East Asian languages
- Use Unicode properly

### Navigation & Controls

- Translate navigation items and controls
- Adjust navigation for RTL languages
- Consider cultural reading patterns
- Ensure icons are culturally neutral
- Test keyboard shortcuts across keyboard layouts
- Provide localized help and documentation
- Translate error messages and notifications
- Localize search functionality

## Testing & Quality Assurance

### Testing Strategy

- Test with native speakers
- Verify translations in context
- Test text expansion and truncation
- Validate date, number, and currency formatting
- Test RTL layouts thoroughly
- Verify language switching functionality
- Test with different locale settings
- Implement automated i18n testing

### Common Issues

- Check for hardcoded strings
- Verify proper pluralization
- Look for concatenated strings
- Test for Unicode handling issues
- Verify sorting and collation
- Check for cultural assumptions in logic
- Test with long words and strings
- Verify handling of special characters

### Tools & Automation

- Implement linting for i18n issues
- Use translation management systems
- Automate screenshot generation for context
- Implement pseudo-localization for testing
- Use automated testing for layout issues
- Track translation coverage and quality
- Implement CI/CD checks for i18n
- Monitor for missing translations

## Legal & Compliance

- Research local legal requirements
- Adapt privacy policies for different regions
- Consider GDPR and other privacy regulations
- Adapt terms of service for local markets
- Be aware of content restrictions by country
- Consider accessibility requirements by region
- Document compliance measures
- Consult legal experts for key markets 