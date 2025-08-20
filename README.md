# The Birdie Briefing

A Next.js website for LPGA golf news and insights.

## Quick Start

```bash
npm install
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run export` - Export static site
- `npm run optimize-images` - Optimize all images to WebP format

## Maintenance Mode

The site includes a comprehensive maintenance mode system that can be used during deployments or site updates.

### Quick Commands

```bash
# Enable maintenance mode for next build
npm run build:maintenance

# Build in normal mode
npm run build:normal

# Check maintenance status
npm run maintenance:status
```

### Manual Maintenance Control

```bash
# Enable maintenance mode (after build)
npm run maintenance:enable

# Disable maintenance mode
npm run maintenance:disable

# Check current status
npm run maintenance:status
```

### How It Works

1. **Flag-based Control**: Create a `.maintenance` file to enable maintenance mode for the next build
2. **Automatic Integration**: The GitHub Actions workflow uses `npm run build` which automatically detects maintenance flags
3. **Backup System**: The original `index.html` is backed up when maintenance mode is enabled
4. **Production Ready**: Maintenance page includes video background, social links, and auto-refresh functionality

### Maintenance Page Features

- 🎥 Full-screen golf video background
- 🎨 Brand-consistent design with "The Birdie Briefing" styling
- 📱 Social media links (Instagram, Bluesky, YouTube, Podcast)
- 🔄 Auto-refresh every 30 seconds
- 👆 Click anywhere to manually refresh
- 📱 Mobile-responsive design

## Configuration

### Featured Article

Set the featured article on the homepage by editing `src/data/config.json`:

```json
{
  "siteName": "The Birdie Briefing",
  "featuredArticleId": "your-article-slug"
}
```

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the main branch.

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
├── data/               # Content and configuration
│   ├── articles/       # Markdown articles
│   ├── authors/        # Author information
│   └── config.json     # Site configuration
└── lib/                # Utility functions
```

## Content Management

Articles are written in Markdown with YAML frontmatter and stored in `src/data/articles/`. The build process automatically optimizes images and generates the site.
