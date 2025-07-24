# Golf Girl Gazette

Your premier source for LPGA women's golf news, tournament coverage, and exclusive content. Celebrating the stories, achievements, and voices of women in golf.

## 🚀 Live Site

Visit the live site: [https://yourusername.github.io/golfgirlgazette](https://yourusername.github.io/golfgirlgazette)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome, Material Icons
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
golfgirlgazette/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx        # Homepage
│   │   ├── news/           # News pages
│   │   ├── podcasts/       # Podcast pages
│   │   ├── events/         # Events pages
│   │   ├── about/          # About pages
│   │   └── layout.tsx      # Root layout
│   ├── components/         # Reusable components
│   └── lib/               # Utility functions
├── public/                # Static assets
├── data/                  # JSON data files
└── .github/workflows/     # GitHub Actions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/golfgirlgazette.git
   cd golfgirlgazette
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Build & Deployment

### Local Build
```bash
npm run build
```

### GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages:

1. **Push to main branch** - Automatic deployment triggers
2. **GitHub Actions** - Builds and deploys automatically
3. **Static Export** - Optimized for GitHub Pages

### Manual Deployment
```bash
npm run deploy
```

## 📝 Content Management

The site uses JSON files for content management:

- `data/news.json` - News articles
- `data/podcasts.json` - Podcast episodes
- `data/events.json` - Events calendar
- `data/cocktails.json` - Cocktail recipes
- `data/weekly-updates.json` - Weekly updates

## 🎨 Customization

### Brand Colors
```css
--primary-500: #645963
--secondary-500: #67405C
--accent-500: #596460
```

### Fonts
- **Primary**: Inter (Google Fonts)
- **Icons**: Font Awesome, Material Icons

## 🔧 Configuration

### Next.js Config
- Static export enabled for GitHub Pages
- Base path configured for repository deployment
- Image optimization disabled for static export

### Tailwind CSS
- Custom color palette
- Responsive design utilities
- Component-based styling

## 📱 Features

- ✅ **Responsive Design** - Mobile-first approach
- ✅ **SEO Optimized** - Meta tags and structured data
- ✅ **Newsletter Integration** - Email signup functionality
- ✅ **Podcast Integration** - Platform links and episodes
- ✅ **Translation Widget** - Multi-language support
- ✅ **Event Management** - Calendar and RSVP system
- ✅ **Content Management** - JSON-based data structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- LPGA for inspiration and content
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first styling
- Font Awesome for the beautiful icons

---

**Golf Girl Gazette** - Celebrating women in golf, one story at a time.
