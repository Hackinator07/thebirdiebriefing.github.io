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
   cd golfgirlgazette
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
    "caption": "Image caption",
    "courtesy": "Photo credit"
  },
  "tags": ["tag1", "tag2"],
  "featured": true,
  "order": 1
}
```

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

**Note**: Markdown support is available in articles, bios, author callouts, and news excerpts.

### Adding News Articles
News articles are in `src/data/news.json`:

```json
{
  "id": "news-slug",
  "title": "News Title",
  "slug": "news-slug",
  "excerpt": "Brief description",
  "content": "Full article content",
  "date": "2025-01-01",
  "category": "Category",
  "author": "Author Name",
  "image": "/path/to/image.jpg"
}
```

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

## 📁 Project Structure

```
golfgirlgazette/
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
│   │   ├── news.json        # News articles
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
- **MarkdownContent**: Renders Markdown with custom styling for articles, bios, and callouts
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
- **Markdown**: Use for rich formatting in bios and content

---

**Live Site**: [www.birdiebriefing.com](https://www.birdiebriefing.com)

**Repository**: [GitHub](https://github.com/Hackinator07/thebirdiebriefing.github.io)
