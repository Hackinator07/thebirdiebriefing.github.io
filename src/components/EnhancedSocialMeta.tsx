import { Article } from '@/lib/data';

interface EnhancedSocialMetaProps {
  article: Article;
  url: string;
}

export default function EnhancedSocialMeta({ article, url }: EnhancedSocialMetaProps) {
  const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}${article.image.src}`;
  const readTime = Math.max(1, Math.ceil(article.content.join(" ").split(" ").length / 200));
  
  // Enhanced description with call-to-action
  const enhancedDescription = `${article.excerpt} | ${readTime} min read | The Birdie Briefing - Your source for LPGA news and insights`;
  
  // Generate keywords from tags and content
  const keywords = [
    ...article.tags,
    'LPGA',
    'women golf',
    'golf news',
    article.category.toLowerCase(),
    article.author.toLowerCase().replace(' ', '-')
  ].join(', ');

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": {
      "@type": "ImageObject",
      "url": imageUrl,
      "alt": article.image.alt,
      "width": 1200,
      "height": 630
    },
    "author": {
      "@type": "Person",
      "name": article.author,
      "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/about${article.authorId === 'george-hack' ? '#george-hack' : ''}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Birdie Briefing",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/images/logo.png`
      }
    },
    "datePublished": article.date,
    "dateModified": article.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "articleSection": article.category,
    "keywords": keywords,
    "wordCount": article.content.join(" ").split(" ").length,
    "timeRequired": `PT${readTime}M`,
    "url": url,
    "isAccessibleForFree": true,
    "genre": "Sports",
    "about": {
      "@type": "Thing",
      "name": "LPGA Tour",
      "description": "Ladies Professional Golf Association Tour"
    },
    "mentions": article.tags.map(tag => ({
      "@type": "Thing",
      "name": tag
    }))
  };

  return (
    <>
      {/* Enhanced meta tags */}
      <meta name="description" content={enhancedDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="article:author" content={article.author} />
      <meta name="article:published_time" content={article.date} />
      <meta name="article:section" content={article.category} />
      <meta name="article:tag" content={article.tags.join(', ')} />
      <meta name="estimated-read-time" content={`${readTime} minutes`} />
      
      {/* Enhanced Open Graph */}
      <meta property="og:title" content={article.title} />
      <meta property="og:description" content={enhancedDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={article.image.alt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="The Birdie Briefing" />
      <meta property="article:author" content={article.author} />
      <meta property="article:published_time" content={article.date} />
      <meta property="article:section" content={article.category} />
      <meta property="article:tag" content={article.tags.join(', ')} />
      
      {/* Enhanced Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={article.title} />
      <meta name="twitter:description" content={enhancedDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={article.image.alt} />
      <meta name="twitter:creator" content="@birdiebriefing" />
      <meta name="twitter:site" content="@birdiebriefing" />
      
      {/* Additional meta tags for better SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={url} />
      
      {/* JSON-LD for enhanced structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
