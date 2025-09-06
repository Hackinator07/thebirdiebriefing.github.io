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
- **Content Management**: Easy-to-edit JSON files for all content
- **Markdown Support**: Rich formatting in bio content
- **Image Optimization**: Automatic WebP conversion and optimization
- **Custom Domain**: www.birdiebriefing.com

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: GitHub Pages
- **Translation**: JigsawStack Translation Widget
- **Markdown**: react-markdown with remark-gfm
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

3. Run development server
   ```bash
   npm run dev
   ```

4. Build for production
   ```bash
   npm run build
   ```

## 📝 Content Management

### Adding/Editing Articles
Articles are managed in `src/data/articles.json`:

```json
{
  "id": "article-slug",
  "slug": "article-slug",
  "title": "Article Title",
  "author": "Author Name",
  "authorId": "author-id",
  "date": "2025-01-01",
  "category": "Category",
  "excerpt": "Brief description",
  "content": ["Paragraph 1", "Paragraph 2"],
  "image": {
    "src": "/optimized/image.webp",
    "alt": "Alt text",
    "caption": "Image caption with [markdown links](https://example.com)",
    "courtesy": "Photo by [Photographer](https://photographer.com/) via [Getty Images](https://gettyimages.com/)"
  },
  "tags": ["tag1", "tag2"],
  "featured": true,
  "sections": [
    {
      "type": "links",
      "title": "Related Links",
      "links": [
        {
          "text": "Link Title",
          "url": "https://example.com",
          "description": "Link description"
        }
      ]
    },
    {
      "type": "tv-schedule",
      "title": "How to Watch",
      "schedule": [
        {
          "day": "Thursday and Friday",
          "times": ["Golf Channel: 10:00 AM – 12:00 PM"]
        }
      ]
    },
    {
      "type": "field-data",
      "title": "Tournament Field",
      "data": {
        "pastChampions": ["Player Name (2024)", "Player Name (2023)"],
        "rolexTop25": ["Player Name (1)", "Player Name (2)"],
        "rookies2025": ["Rookie Player 1", "Rookie Player 2"]
      }
    }
  ]
}
```

**Article Ordering**: Articles display in the order they appear in the JSON file. No `order` field is needed.

### Managing Team Bios
Team member information is in `src/data/bios.json`:

```json
{
  "team": {
    "marie": {
      "name": "Marie Hack",
      "title": "Founder & Host",
      "image": "/images/bios/marie.jpg",
      "imageAlt": "Marie Hack",
      "bio": [
        "**Bold text** and [links](https://example.com) supported",
        "Markdown formatting available"
      ]
    }
  }
}
```

**Markdown Features Available:**
- **Bold**: `**text**`
- *Italic*: `*text*`
- [Links](https://example.com): `[text](url)`
- ~~Strikethrough~~: `~~text~~`

**Note**: Markdown support is available in articles, bios, author callouts, image captions, and courtesy text.



### Managing Podcasts
Podcast episodes are in `src/data/podcasts.json`:

```json
{
  "id": "episode-slug",
  "title": "Episode Title",
  "description": "Episode description",
  "duration": "45:30",
  "date": "2025-01-01",
  "platforms": {
    "spotify": "https://open.spotify.com/...",
    "apple": "https://podcasts.apple.com/...",
    "google": "https://podcasts.google.com/...",
    "amazon": "https://music.amazon.com/..."
  }
}
```

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

### Site Configuration
Global configuration is in `src/data/config.json`:

```json
{
  "site": {
    "title": "The Birdie Briefing",
    "description": "Site description",
    "url": "https://www.birdiebriefing.com"
  },
  "authors": {
    "author-id": {
      "name": "Author Name",
      "email": "author@example.com",
      "callouts": {
        "author": "Author callout message",
        "default": "Default callout message"
      }
    }
  }
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
- **Quality**: 85% (configurable in `scripts/optimize-images.js`)

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
│   ├── data/                # Content JSON files
│   │   ├── articles.json    # Article content
│   │   ├── bios.json        # Team bios
│   │   ├── podcasts.json    # Podcast episodes
│   │   ├── rankings.json    # Player rankings
│   │   └── config.json      # Site configuration
│   └── lib/                 # Utility functions
│       └── data.ts          # Data access functions
├── public/                  # Static assets
│   ├── images/              # Original images
│   ├── optimized/           # Optimized WebP images
│   └── videos/              # Video files
├── scripts/                 # Build scripts
│   └── optimize-images.js  # Image optimization
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
- Check JSON syntax in content files
- Verify Markdown syntax is correct
- Ensure content is properly escaped
- Check that MarkdownContent component is being used (not LinkifyText)

**Images not loading:**
- Check file paths in JSON files
- Ensure images exist in `public/` directory
- Run image optimization: `npm run optimize-images`

**Deployment issues:**
- Check GitHub Actions tab for build logs
- Verify CNAME file is present
- Ensure custom domain is configured in GitHub settings

### Development Tips

1. **Content updates**: Edit JSON files, no code changes needed
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
- **Markdown**: Use for rich formatting in bios, content, and image captions
- **Field Data**: Include comprehensive tournament information for tournament previews
- **Sections**: Use appropriate section types (links, tv-schedule, field-data) to enhance articles

### Article Management Best Practices

#### Featured Articles
- Only mark one article as `featured: true` at a time
- Consider the featured article as your "top story" for the week
- Update featured status when publishing new articles

#### Article Ordering
- Articles display in the order they appear in the JSON file
- No `order` field is needed - simply arrange articles in the desired order in `articles.json`
- The first article in the array appears first on the `/news` page

#### Section Types
- **links**: For related resources and external links
- **tv-schedule**: For tournament broadcast schedules
- **field-data**: For tournament field information (past champions, rankings, rookies, etc.)

---

**Live Site**: [www.birdiebriefing.com](https://www.birdiebriefing.com)

**Repository**: [GitHub](https://github.com/Hackinator07/thebirdiebriefing.github.io)
