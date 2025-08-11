# Article Management Guide

## Article Ordering and Featured Articles

This guide explains how to control the order of articles on the `/news` page and mark articles as featured for the homepage.

### Article Fields

Each article in `articles.json` can have the following additional fields:

#### `order` (optional)
- **Type**: `number`
- **Purpose**: Controls the display order on the `/news` page
- **Behavior**:
  - Lower numbers appear first (1, 2, 3, etc.)
  - Articles without an `order` field are sorted by date (newest first)
  - Articles with `order` are prioritized over date-based sorting

#### `featured` (optional)
- **Type**: `boolean`
- **Purpose**: Marks an article as the featured story for the homepage
- **Behavior**:
  - Only one article should have `featured: true`
  - If no article is marked as featured, the first article (by order/date) is used
  - Featured article appears in the "Featured Story" section on the homepage

### Example Configuration

```json
{
  "id": "example-article",
  "slug": "example-article",
  "title": "Example Article Title",
  "author": "George Hack",
  "authorId": "george-hack",
  "date": "2025-08-13",
  "category": "LPGA Analysis",
  "order": 1,
  "featured": true,
  "excerpt": "Article excerpt...",
  "content": [...],
  "image": {...},
  "tags": [...],
  "sections": [...]
}
```

### Current Configuration

- **Jeeno Thitikul Article**: `order: 1, featured: true` (appears first on news page, featured on homepage)
- **Portland Classic Article**: `order: 2, featured: false` (appears second on news page)
- **Charley Hull Article**: `order: 3, featured: false` (appears third on news page)

### How to Change Order

1. **To reorder articles**: Update the `order` field for each article
2. **To change featured article**: Set `featured: true` on the desired article and `featured: false` on others
3. **To remove ordering**: Remove the `order` field to fall back to date-based sorting

### Best Practices

- Use consecutive numbers for order (1, 2, 3, etc.)
- Only mark one article as featured at a time
- Consider the featured article as your "top story" for the week
- Update order/featured status when publishing new articles
