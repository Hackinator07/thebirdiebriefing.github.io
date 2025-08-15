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
| `featured` | boolean | No | Whether to feature on homepage (default: false) |
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
```yaml
- type: "field-data"
  title: "Tournament Field"
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

#### Article Ordering
Articles are automatically sorted by date (newest first). The featured article appears on the homepage.

#### Markdown Features Available in Content
- **Bold**: `**text**`
- *Italic*: `*text*`
- [Links](https://example.com): `[text](url)`
- ~~Strikethrough~~: `~~text~~`
- Headers: `# H1`, `## H2`, etc.
- Lists: `- item` or `1. item`
- Blockquotes: `> quote`

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

#### Markdown Features Available in Bios
- **Bold**: `**text**`
- *Italic*: `*text*`
- [Links](https://example.com): `[text](url)`
- ~~Strikethrough~~: `~~text~~`
- Headers: `# H1`, `## H2`, etc.
- Lists: `- item` or `1. item`
- Blockquotes: `> quote`

**Note**: Markdown support is available in articles, bios, author callouts, image captions, and courtesy text.

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

#### Markdown Features Available in Callouts
- **Bold**: `**text**`
- *Italic*: `*text*`
- [Links](https://example.com): `[text](url)`
- ~~Strikethrough~~: `~~text~~`
- Headers: `# H1`, `## H2`, etc.
- Lists: `- item` or `1. item`
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

## 🤖 Automation Scripts

### LPGA Rankings Automation

The system automatically fetches and updates LPGA Rolex World Rankings data.

#### Manual Update
```bash
node scripts/fetch-rankings.js
```

#### Automated Updates
The rankings are automatically updated nightly via GitHub Actions (`.github/workflows/update-rankings.yml`).

**Schedule:** Every day at 2:00 AM UTC

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
- Only mark one article as `featured: true` at a time
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
