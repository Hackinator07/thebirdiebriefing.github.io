# The Birdie Briefing

A modern, responsive website for The Birdie Briefing - your premier source for LPGA women's golf news, tournament coverage, and exclusive content.

## 🌟 Features

- **Responsive Design**: Optimized for all devices
- **Modern UI**: Built with Next.js 15 and Tailwind CSS
- **Static Export**: Deployed to GitHub Pages
- **Translation Widget**: Multi-language support
- **Instagram Integration**: Social media feed
- **Spotify Embed**: Podcast and music integration
- **Video Background**: Dynamic homepage with golf video
- **Content Management**: Markdown-based articles with YAML frontmatter
- **Markdown Support**: Rich formatting in all content
- **Image Optimization**: Automatic WebP conversion and optimization
- **Custom Domain**: www.birdiebriefing.com

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: GitHub Pages
- **Translation**: JigsawStack Translation Widget
- **Markdown**: gray-matter, remark, remark-html
- **Image Processing**: Sharp for optimization

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
1. Clone the repository
   ```bash
   git clone git@github.com:Hackinator07/thebirdiebriefing.github.io.git
   cd thebirdiebriefing.github.io
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables (optional)
   ```bash
   # Create .env.local file
   cp .env.example .env.local
   # Edit .env.local and add your translation widget API key
   ```

4. Run development server
   ```bash
   npm run dev
   ```

5. Build for production
   ```bash
   npm run build
   ```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Translation Widget API Key (required for translation functionality)
# Get your free API key from: https://jigsawstack.com/translation-widget
NEXT_PUBLIC_TRANSLATION_WIDGET_KEY=your_api_key_here

# Base URL for the site
NEXT_PUBLIC_BASE_URL=https://www.birdiebriefing.com
```

**Note**: The translation widget requires an API key to function. Get a free API key from JigsawStack to enable multi-language support.

## 📊 Rankings Management

The LPGA Rolex World Rankings are automatically updated from the official Rolex Rankings API.

### Manual Update
To manually update the rankings data:
```bash
npm run fetch-rankings
```

### Automatic Updates
A GitHub Action runs weekly on Sundays at 2 AM UTC to automatically fetch and update the latest rankings data. The workflow:
- Fetches data from the Rolex Rankings API
- Updates `src/data/rankings.json`
- Commits and pushes changes to the repository

### Rankings Data Structure
The rankings data is stored in `src/data/rankings.json` and includes:
- `lastUpdated`: Timestamp of when data was last fetched
- `week`: Current rankings week information (start_date, end_date, etc.)
- `players`: Array of player rankings with points and statistics

## 📝 Content Management

### Adding/Editing Articles
Articles are now managed as individual markdown files in `src/data/articles/`. Each article is a separate `.md` file with YAML frontmatter and markdown content.

#### Article File Structure
Create a new file: `src/data/articles/your-article-slug.md`

```markdown
---
id: "your-article-slug"
slug: "your-article-slug"
title: "Your Article Title"
author: "Author Name"
authorId: "author-id"
date: "2025-01-01"
category: "Category"
featured: false
excerpt: "Brief description of the article"
image:
  src: "/optimized/image.webp"
  alt: "Alt text for the image"
  caption: "Image caption with [markdown links](https://example.com)"
  courtesy: "Photo by [Photographer](https://photographer.com/) via [Getty Images](https://gettyimages.com/)"
calloutType: "author"
tags:
  - "tag1"
  - "tag2"
sections:
  - type: "links"
    title: "Related Links"
    links:
      - text: "Link Title"
        url: "https://example.com"
        description: "Link description"
  - type: "tv-schedule"
    title: "How to Watch"
    schedule:
      - day: "Thursday and Friday"
        times:
          - "Golf Channel: 10:00 AM – 12:00 PM"
  - type: "field-data"
    title: "Tournament Field"
    data:
      pastChampions:
        - "Player Name (2024)"
        - "Player Name (2023)"
      rolexTop25:
        - "Player Name (1)"
        - "Player Name (2)"
      rookies2025:
        - "Rookie Player 1"
        - "Rookie Player 2"
      sponsorExemptions:
        - "Player Name (a)"
      mondayQualifiers:
        - "Player Name"
---

Your article content goes here in markdown format.

You can use **bold text**, *italic text*, and [links](https://example.com).

Each paragraph should be separated by a blank line.

This makes it easy to write and edit content without dealing with JSON formatting.
```

#### Article Metadata Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (same as slug) |
| `slug` | string | Yes | URL-friendly identifier |
| `title` | string | Yes | Article title |
| `author` | string | Yes | Author name |
| `authorId` | string | Yes | Author identifier (e.g., "george-hack") |
| `date` | string | Yes | Publication date (YYYY-MM-DD) |
| `category` | string | Yes | Article category |
| `excerpt` | string | Yes | Brief description for previews |
| `image` | object | Yes | Article image metadata |
| `calloutType` | string | No | Type of author callout |
| `tags` | array | No | Article tags |
| `sections` | array | No | Additional content sections |

#### Image Object Structure
```yaml
image:
  src: "/optimized/image.webp"  # Path to optimized image
  alt: "Alt text for accessibility"
  caption: "Image caption with [markdown links](https://example.com)"
  courtesy: "Photo by [Photographer](https://photographer.com/) via [Getty Images](https://gettyimages.com/)"
```

#### Section Types

**Links Section:**
```yaml
- type: "links"
  title: "Related Links"
  links:
    - text: "Link Title"
      url: "https://example.com"
      description: "Link description"
```

**TV Schedule Section:**
```yaml
- type: "tv-schedule"
  title: "How to Watch"
  schedule:
    - day: "Thursday and Friday"
      times:
        - "Golf Channel: 10:00 AM – 12:00 PM"
        - "NBC Sports: 12:00 PM – 1:00 PM"
```

**Field Data Section:**
The field-data section is now fully dynamic and supports custom background colors:

```yaml
- type: "field-data"
  title: "Tournament Field"
  backgroundColor: "bg-primary-50"  # Optional: Custom background color
  data:
    pastChampions:
      - "Player Name (2024)"
      - "Player Name (2023)"
    lpga2025Winners:
      - "Player Name"
    rolexTop25:
      - "Player Name (1)"
    rookies2025:
      - "Rookie Player 1"
    sponsorExemptions:
      - "Player Name (a)"
    mondayQualifiers:
      - "Player Name"
```

**Dynamic Features:**
- **Dynamic sections**: Sections are automatically generated from the data object keys
- **Auto-generated labels**: Section titles are automatically formatted from keys (e.g., `pastChampions` → "Past Champions")
- **Custom styling**: Use `backgroundColor: "bg-primary-50"` for TV schedule-like styling
- **Flexible data**: Any key-value pairs in the data object will create sections

**Field Table Section:**
For tabular data like leaderboards:

```yaml
- type: "field-table"
  title: "Leaderboard After Round 1"
  headers: ["Position", "Player", "To Par", "Score"]
  tableData:
    - ["1", "Player Name", "-8", "64"]
    - ["T2", "Player Name", "-7", "65"]
```

#### Article Ordering
Articles are automatically sorted by date (newest first). The featured article is determined by the `featuredArticleId` setting in `src/data/config.json`.

#### Featured Article Management
The featured article is now managed globally in the site configuration:

```json
{
  "siteName": "The Birdie Briefing",
  "featuredArticleId": "portland-classic-round-1-2025"
}
```

To change the featured article:
1. Update the `featuredArticleId` in `src/data/config.json`
2. Use the exact article ID (same as the slug)
3. The homepage will automatically display the new featured article

**Benefits:**
- ✅ **Single source of truth** - One place to manage the featured article
- ✅ **No markdown changes** - Don't need to edit individual article files
- ✅ **Easy switching** - Change featured article without touching content
- ✅ **Fallback protection** - If configured article not found, uses first article

**Note**: All content supports comprehensive markdown formatting. See the [Markdown Features Guide](#markdown-features-guide) for complete details.

### Managing Team Bios
Team member information is now managed as individual markdown files in `src/data/bios/`. Each team member has their own `.md` file with YAML frontmatter and markdown content.

#### Team Member File Structure
Create a new file: `src/data/bios/member-name.md`

```markdown
---
name: "Member Name"
title: "Member Title"
image: "/optimized/member-image.webp"
imageAlt: "Member Name"
---

Your bio content goes here in markdown format.

You can use **bold text**, *italic text*, and [links](https://example.com).

Each paragraph should be separated by a blank line.

This makes it easy to write and edit bios without dealing with JSON formatting.
```

#### Current Team Members
- `marie.md` - Marie Hack (Founder & Host)
- `george.md` - George Hack (Writer, Analyst, & Head of Marketing)

#### Mission and Contact
- `mission.md` - About Us section content
- `contact.md` - Contact section metadata

**Note**: All bio content supports comprehensive markdown formatting. See the [Markdown Features Guide](#markdown-features-guide) for complete details.

### Managing Podcasts
Podcast episodes are managed through the Spotify embed on the podcast page:

The podcast page uses a static Spotify embed component (`src/components/SpotifyEmbed.tsx`) to display the latest episodes. The page includes hardcoded links to various podcast platforms.

### Updating Rankings
Rankings are managed in `src/data/rankings.json`:

```json
{
  "lastUpdated": "2025-01-01",
  "week": {
    "id": 1,
    "start_date": "2025-01-01",
    "end_date": "2025-01-07",
    "publish_date": "2025-01-01"
  },
  "players": [
    {
      "id": 1,
      "rank": 1,
      "rankDelta": 0,
      "nameFirst": "First",
      "nameLast": "Last",
      "fullName": "First Last",
      "countryCode": "USA",
      "pointsAverage": 10.5,
      "pointsTotal": 105.0,
      "tournamentCount": 10
    }
  ]
}
```

### Managing Author Callouts
Author callouts are now managed as individual markdown files in `src/data/authors/`. Each author has their own `.md` file with YAML frontmatter and markdown content for different callout types.

#### Author Callout File Structure
Create a new file: `src/data/authors/author-id.md`

```markdown
---
name: "Author Name"
email: "author@example.com"
---

## Author Callout

Your author callout message goes here. This appears at the end of articles.

You can use **bold text**, *italic text*, and [links](https://example.com).

## Newsletter Callout

Your newsletter callout message goes here.

## Podcast Callout

Your podcast callout message goes here.

## Social Callout

Your social media callout message goes here.

## Feedback Callout

Your feedback callout message goes here.
```

#### Current Authors
- `george-hack.md` - George Hack
- `marie-hack.md` - Marie Hack

#### Callout Types
- **Author Callout**: Appears at the end of articles
- **Newsletter Callout**: For newsletter signup prompts
- **Podcast Callout**: For podcast promotion
- **Social Callout**: For social media engagement
- **Feedback Callout**: For reader feedback requests

## Markdown Features Guide

The site now supports comprehensive markdown formatting throughout all content areas. Here's what you can use:

### Basic Text Formatting
```markdown
- **Bold text**: `**bold**` or `__bold__`
- *Italic text*: `*italic*` or `_italic_`
- ~~Strikethrough~~: `~~strikethrough~~`
- `Inline code`: `` `code` ``
```

### Links and References
```markdown
- [External links](https://example.com): `[text](url)`
- [Links with titles](https://example.com): `[text](url "title")`
- Email links: `[email us](mailto:user@example.com)`
- Phone links: `[call us](tel:+1234567890)`
```

### Lists
```markdown
**Unordered lists:**
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3

**Ordered lists:**
1. First item
2. Second item
   1. Nested numbered item
   2. Another nested item
3. Third item
```

### Headers
```markdown
# H1 Header
## H2 Header
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header
```

### Code Blocks
````markdown
```javascript
// Code block with syntax highlighting
function example() {
  return "Hello World!";
}
```
````

### Blockquotes
```markdown
> This is a blockquote
>
> It can span multiple lines
>
> > And even be nested
```

### Tables
```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |
| Row 3    | Data     | Data     |
```

### Task Lists
```markdown
- [x] Completed task
- [ ] Pending task
- [ ] Another pending task
```

### Horizontal Rules
```markdown
---
```

### Escaping Characters
```markdown
Use backslashes to escape special characters: \*not italic\*
```

### Where Markdown Works
- **Article content** - All article paragraphs support full markdown
- **Article excerpts** - Brief descriptions with basic formatting
- **Image captions** - Rich captions with links and formatting
- **Image courtesy text** - Attribution with links
- **Author callouts** - All callout types support markdown
- **Bio content** - Team member bios and mission statements
- **Article sections** - Field data, links, and schedules

### Examples for Different Content Types

#### Article Content
````markdown
```markdown
This is a **bold paragraph** with *italic emphasis* and a [link to the LPGA](https://www.lpga.com/).

> "This is a quote from a player or official."

- List item 1
- List item 2
  - Nested item

| Player | Score | Position |
|--------|-------|----------|
| Player A | -5 | 1st |
| Player B | -3 | 2nd |
```
````

#### Image Captions
````markdown
```markdown
**Player Name** during the [Tournament Name](https://tournament.com/) with a spectacular shot on the 18th hole.
```
````

#### Author Callouts
````markdown
```markdown
## Author Callout

If something here made you laugh, smile, or throw your ball into the nearest water hazard, you can **[email us](mailto:george@birdiebriefing.com)**.

**Stay in the loop** with the latest LPGA updates and golf insights. Subscribe to our newsletter for *exclusive content* delivered to your inbox.
```
````

#### Bio Content
````markdown
```markdown
Marie is a **passionate golf enthusiast** with over 10 years of experience covering the LPGA Tour. She specializes in:

- Player interviews and profiles
- Tournament analysis and predictions
- Behind-the-scenes stories
- Community engagement

> "Golf is more than a game—it's a way of life that teaches patience, precision, and perseverance."
```
````

### Advanced Markdown Features

#### Footnotes
```markdown
You can add footnotes to your content[^1].

[^1]: This is a footnote that appears at the bottom of the content.
```

#### Definition Lists
```markdown
Term 1
: Definition 1

Term 2
: Definition 2
```

#### Strikethrough and Emphasis
```markdown
~~Old information~~ and **new information** with *emphasis*.
```

#### Code with Language Specification
````markdown
```javascript
// JavaScript code
const player = "Nelly Korda";
console.log(`${player} is amazing!`);
```

```css
/* CSS styling */
.player-name {
  font-weight: bold;
  color: #8B5A8C;
}
```
````

### Best Practices for Content Creation

#### Article Writing
1. **Use headers** to structure your content logically
2. **Include relevant links** to official sources, player social media, etc.
3. **Use blockquotes** for player quotes and official statements
4. **Create tables** for tournament results, player statistics, etc.
5. **Use lists** for key points, player highlights, or tournament features

#### Image Captions
- Keep captions concise but informative
- Include player names in **bold**
- Link to tournament websites or player profiles
- Use proper attribution with courtesy links

#### Author Callouts
- Keep messages personal and engaging
- Use **bold** for key calls-to-action
- Include email links for direct contact
- Vary callout types for different contexts

#### Bio Content
- Use a mix of paragraphs and lists
- Include relevant experience and specialties
- Add personal quotes or mission statements
- Keep content professional but approachable

### Markdown Tips and Tricks

#### Linking to Internal Pages
- Use relative URLs for internal links: `[About Us](/about)`
- Link to specific articles: `[Latest News](/news)`
- Link to rankings: `[Current Rankings](/rankings)`

#### Creating Rich Content
- Use tables for tournament schedules and results
- Create task lists for tournament checklists
- Use blockquotes for player and official quotes
- Add footnotes for additional context

#### SEO-Friendly Content
- Use descriptive link text: `[LPGA Official Site](https://www.lpga.com/)` instead of `[click here](url)`
- Include relevant keywords naturally in your content
- Use headers to create logical content structure
- Add alt text descriptions in image captions

### Technical Implementation

#### Markdown Processing Pipeline
1. **Content Creation**: Write markdown in `.md` files with YAML frontmatter
2. **Server-Side Loading**: `markdownLoader.ts`, `biosLoader.ts`, `calloutsLoader.ts` parse files
3. **Data Access**: Modular functions in `articles.ts`, `bios.ts`, `callouts.ts` provide clean APIs
4. **Client Rendering**: `MarkdownContent` component uses `ReactMarkdown` with `remarkGfm`
5. **Styling**: Custom CSS classes applied to different markdown elements

#### Supported Markdown Libraries
- **ReactMarkdown**: Core markdown rendering
- **remarkGfm**: GitHub Flavored Markdown support
- **gray-matter**: YAML frontmatter parsing
- **remark/remark-html**: Server-side markdown processing (for callouts)

#### Custom Styling
The `MarkdownContent` component applies custom styling:
- **Links**: Primary color with hover effects
- **Bold text**: Semibold weight with dark color
- **Italic text**: Italic style with medium gray
- **Paragraphs**: Large text with relaxed line height

#### Performance Considerations
- **Caching**: Data is cached after first load to avoid repeated file system access
- **Server Components**: Markdown processing happens on the server for better performance
- **Dynamic Imports**: Server-side modules are dynamically imported to prevent client bundling
- **Static Generation**: All markdown content is processed at build time for optimal performance
- Blockquotes: `> quote`

### Site Configuration
Global configuration is in `src/data/config.json`:

```json
{
  "siteName": "The Birdie Briefing"
}
```

## 🖼️ Image Management

### Adding New Images
1. Place images in `public/images/`
2. Run image optimization:
   ```bash
   npm run optimize-images
   ```
3. Optimized images will be saved to `public/optimized/` as WebP files
4. Reference optimized images in content: `/optimized/filename.webp`

### Image Guidelines
- **Quality**: Use high-resolution images that look crisp on all devices
- **Optimization**: Compress images for web use to improve loading speed
- **Accessibility**: Ensure images have good contrast for text overlay
- **Branding**: Choose images that align with The Birdie Briefing brand and aesthetic

### Image Sources
If you need images for the website, consider:
- Stock photo websites (Unsplash, Pexels, Shutterstock)
- LPGA official media resources
- Professional golf photography
- Golf course promotional materials (with permission)

### Image Optimization
- **Build-time optimization**: Automatically runs during `npm run build`
- **Manual optimization**: `npm run optimize-images`
- **Supported formats**: JPG, PNG, WebP
- **Output format**: WebP (modern, efficient)
- **Quality**: 85% (configurable in `scripts/optimize-images-build.js`)

## 🚀 Deployment

### GitHub Pages Deployment
The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

**Deployment Process:**
1. Push changes to `main` branch
2. GitHub Actions builds the site
3. Optimizes images and copies CNAME file
4. Deploys to GitHub Pages
5. Available at www.birdiebriefing.com

**⚠️ Note**: Brief 404 errors (1-5 minutes) are normal during deployment due to:
- DNS propagation delays
- GitHub Pages cache invalidation
- Build process timing

### Custom Domain
- **Domain**: www.birdiebriefing.com
- **CNAME file**: Automatically copied during build
- **SSL**: Automatically enabled by GitHub Pages

### Manual Deployment
```bash
npm run build
# The 'out' directory contains the built site
```

## 🔧 Development Scripts

```bash
npm run dev              # Start development server
npm run dev:turbo        # Start with Turbopack
npm run build            # Build for production
npm run build:no-optimize # Build without image optimization
npm run start            # Start production server
npm run lint             # Run ESLint
npm run optimize-images  # Optimize images manually
npm run export           # Build and export static files
```

## 🔄 Development Workflow

### Content Editing Workflow
The site uses a simple and reliable development workflow for content editing:

1. **Edit markdown files** in your preferred editor
2. **Save the file** (Cmd+S)
3. **Refresh browser** (Cmd+R) to see changes
4. **Repeat** as needed

### Why Manual Refresh?
- **Reliability**: No complex auto-reload configurations to maintain
- **Stability**: Avoids browser auto-refresh glitches during content editing
- **Simplicity**: Straightforward workflow that works consistently
- **Performance**: Server-side content compilation is fast and efficient

### File Watching
The development server automatically detects changes to:
- ✅ **React components** (automatic hot reload)
- ✅ **TypeScript files** (automatic hot reload)
- ✅ **CSS files** (automatic hot reload)
- ✅ **Markdown files** (server-side reload, manual browser refresh)

### Content File Locations
- **Articles**: `src/data/articles/*.md`
- **Author callouts**: `src/data/authors/*.md`
- **Team bios**: `src/data/bios/*.md`
- **Site config**: `src/data/config.json`
- **Rankings**: `src/data/rankings.json`

**Note**: This workflow is optimized for content-heavy sites where reliability is more important than automatic browser refresh for data files.

## 🤖 Automation Scripts

### LPGA Rankings Automation

The system automatically fetches and updates LPGA Rolex World Rankings data.

#### Manual Update
```bash
node scripts/fetch-rankings.js
```

#### Automated Updates
The rankings are automatically updated nightly via GitHub Actions (`.github/workflows/update-rankings.yml`).

**Schedule:** Every Sunday at 2:00 AM UTC

**What it does:**
1. Fetches latest rankings from Rolex Rankings API
2. Saves data to `src/data/rankings.json`
3. Commits and pushes changes to the repository

#### Data Structure
The rankings data includes:
- **lastUpdated**: ISO timestamp of when data was fetched
- **week**: Information about the current ranking week
- **players**: Array of player objects with ranking details

#### API Source
Data is sourced from the official Rolex Women's World Golf Rankings API:
- **URL**: https://www.rolexrankings.com/core/rankings/list
- **Format**: JSON
- **Update Frequency**: Weekly (typically Mondays)

## 📁 Project Structure

```
thebirdiebriefing.github.io/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── about/           # About page
│   │   ├── contact-us/      # Contact page
│   │   ├── news/            # News articles
│   │   ├── podcast/         # Podcast page
│   │   └── rankings/        # Rankings page
│   ├── components/          # React components
│   │   ├── MarkdownContent.tsx  # Markdown renderer
│   │   ├── Header.tsx       # Site header
│   │   ├── Footer.tsx       # Site footer
│   │   └── ...
│   ├── data/                # Content files
│   │   ├── articles/        # Individual markdown article files
│   │   ├── authors/         # Individual markdown author callout files
│   │   ├── bios/            # Individual markdown bio files
│   │   ├── rankings.json    # LPGA rankings data
│   │   └── config.json      # Site configuration
│   └── lib/                 # Utility functions
│       ├── articles.ts      # Article loading functions
│       ├── bios.ts          # Bios loading functions
│       ├── biosLoader.ts    # Bios markdown parsing utilities
│       ├── callouts.ts      # Author callouts loading functions
│       ├── calloutsLoader.ts # Author callouts markdown parsing utilities
│       ├── markdownLoader.ts # Article markdown parsing utilities
│       └── data.ts          # Data access functions
├── public/                  # Static assets
│   ├── images/              # Original images
│   ├── optimized/           # Optimized WebP images
│   └── videos/              # Video files
├── scripts/                 # Build scripts
│   └── optimize-images-build.js  # Image optimization
└── .github/workflows/       # GitHub Actions
    └── deploy.yml           # Deployment workflow
```

## 🎨 Styling

### Tailwind CSS
- **Custom colors**: Primary and secondary color schemes
- **Responsive design**: Mobile-first approach
- **Component classes**: Reusable utility classes

### Custom Components
- **MarkdownContent**: Renders Markdown with custom styling for articles, bios, callouts, and image captions
- **FieldData**: Displays tournament field information in organized cards
- **ArticleLinks**: Shows related links and resources
- **TVSchedule**: Displays tournament broadcast schedules
- **VideoBackground**: Dynamic video backgrounds
- **InstagramSlider**: Social media integration
- **SpotifyEmbed**: Podcast embedding

## 🔍 SEO & Performance

### SEO Features
- **Meta tags**: Dynamic meta descriptions and titles
- **Open Graph**: Social media sharing optimization
- **Structured data**: Rich snippets for search engines
- **Sitemap**: Automatic sitemap generation

### Performance Optimizations
- **Image optimization**: WebP format with compression
- **Static generation**: Pre-built pages for fast loading
- **Code splitting**: Automatic bundle optimization
- **CDN**: GitHub Pages CDN for global delivery

## 🐛 Troubleshooting

### Common Issues

**Build fails with image optimization error:**
```bash
npm run build:no-optimize
```

**Markdown not rendering:**
- Check YAML frontmatter syntax in markdown files
- Verify Markdown syntax is correct
- Ensure content is properly formatted
- Check that MarkdownContent component is being used

**Images not loading:**
- Check file paths in markdown frontmatter
- Ensure images exist in `public/` directory
- Run image optimization: `npm run optimize-images`

**Deployment issues:**
- Check GitHub Actions tab for build logs
- Verify CNAME file is present
- Ensure custom domain is configured in GitHub settings

### Development Tips

1. **Content updates**: Edit markdown files, no code changes needed
2. **Image optimization**: Always run after adding new images
3. **Markdown testing**: Use development server to preview changes
4. **Deployment**: Push to main branch for automatic deployment

## 📞 Support

For technical issues or questions about managing the site:
- Check the GitHub Issues tab
- Review the deployment logs in GitHub Actions
- Test changes locally before deploying

## 🔄 Updates & Maintenance

### Regular Tasks
- **Weekly**: Update rankings data
- **Bi-weekly**: Add new articles and news
- **Monthly**: Review and optimize images
- **Quarterly**: Update team bios and mission content

### Content Guidelines
- **Articles**: 500-2000 words, include images
- **Images**: Use WebP format, optimize for web
- **Links**: Always include alt text and proper attribution
- **Markdown**: Use for rich formatting in all content
- **Field Data**: Include comprehensive tournament information for tournament previews
- **Sections**: Use appropriate section types (links, tv-schedule, field-data) to enhance articles

### Article Management Best Practices

#### Creating New Articles
1. Create a new `.md` file in `src/data/articles/`
2. Use the filename as the slug (e.g., `my-article.md` for slug `my-article`)
3. Add YAML frontmatter with all required metadata
4. Write content in markdown format
5. Test locally with `npm run dev`

#### Featured Articles
- Use the global `featuredArticleId` setting in `src/data/config.json` to manage the featured article
- Consider the featured article as your "top story" for the week
- Update featured status when publishing new articles

#### Article Organization
- Articles are automatically sorted by date (newest first)
- No manual ordering needed - just set the correct date in frontmatter
- The featured article appears on the homepage

#### Section Types
- **links**: For related resources and external links
- **tv-schedule**: For tournament broadcast schedules
- **field-data**: For tournament field information (past champions, rankings, rookies, etc.)

#### Markdown Writing Tips
- Use blank lines to separate paragraphs
- Use markdown formatting for emphasis and links
- Keep image captions and courtesy text concise
- Test your markdown locally before deploying

---

**Live Site**: [www.birdiebriefing.com](https://www.birdiebriefing.com)

**Repository**: [GitHub](https://github.com/Hackinator07/thebirdiebriefing.github.io)
