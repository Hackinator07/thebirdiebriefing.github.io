# Configuration System

This directory contains centralized configuration files that can be updated once and used throughout the application.

## Files

### `config.json`
Contains reusable content and settings:
- `authors`: Object containing author information and their callouts
  - Each author has:
    - `name`: Author's display name
    - `email`: Author's contact email
    - `callouts`: Object containing different callout types for this author
      - `author`: Default author callout message
      - `newsletter`: Newsletter subscription callout
      - `podcast`: Podcast promotion callout
      - `social`: Social media follow callout
      - `feedback`: Feedback request callout
- `siteName`: The name of the website

## Usage

### In Components

```typescript
import { getAuthorCallout, getAuthor, getAllAuthors } from '@/lib/data';

// Get a specific author's callout
const georgeCallout = getAuthorCallout('george-hack', 'author');
const sarahNewsletter = getAuthorCallout('sarah-jones', 'newsletter');

// Get author information
const author = getAuthor('mike-chen');

// Get all authors
const allAuthors = getAllAuthors();
```

### In AuthorCallout Component

The `AuthorCallout` component supports author-specific callouts:

```tsx
// Use specific author's callout
<AuthorCallout authorId="george-hack" calloutType="author" />
<AuthorCallout authorId="sarah-jones" calloutType="newsletter" />
<AuthorCallout authorId="mike-chen" calloutType="podcast" />

// Use default author (george-hack) if no authorId provided
<AuthorCallout calloutType="social" />

// Override with custom message
<AuthorCallout message="Custom message here" />
```

### In Articles

Specify which author and callout type to use in your article data:

```json
{
  "id": "article-slug",
  "title": "Article Title",
  "author": "George Hack",
  "authorId": "george-hack",
  "calloutType": "newsletter",
  // ... other article properties
}
```

## Available Authors

- **george-hack**: George Hack - General LPGA coverage and analysis
- **sarah-jones**: Sarah Jones - Tournament analysis and player insights
- **mike-chen**: Mike Chen - Statistical analysis and data-driven insights

## Available Callout Types (per author)

Each author has their own versions of these callout types:
- **author**: Default callout for author contact
- **newsletter**: Promotes newsletter subscription
- **podcast**: Promotes podcast episodes
- **social**: Encourages social media follows
- **feedback**: Requests reader feedback

## Adding New Authors

To add a new author:

1. Add a new author object to the `authors` section in `config.json`:
```json
"new-author-id": {
  "name": "New Author Name",
  "email": "newauthor@birdiebriefing.com",
  "callouts": {
    "author": "Custom author callout message...",
    "newsletter": "Custom newsletter callout...",
    "podcast": "Custom podcast callout...",
    "social": "Custom social callout...",
    "feedback": "Custom feedback callout..."
  }
}
```

2. Use the new author in articles:
```json
{
  "authorId": "new-author-id",
  "calloutType": "author"
}
```

## Updating Configuration

To update callout messages:

1. Edit `src/data/config.json`
2. Modify the desired callout message in the specific author's `callouts` object
3. The changes will be reflected everywhere that author's callout type is used

To update author information:

1. Edit the author's object in the `authors` section of `config.json`
2. Update name, email, or callout messages as needed

## Benefits

- **Author-Specific Callouts**: Each author has their own voice and callout messages
- **Per-Article Control**: Specify which author and callout type to use per article
- **Single Source of Truth**: Update once, use everywhere
- **Consistency**: Ensures the same message appears across all articles using that author's callout type
- **Maintainability**: Easy to update author information or callout messages
- **Flexibility**: Components can still override with custom messages when needed
- **Scalability**: Easy to add new authors with their own callout styles
