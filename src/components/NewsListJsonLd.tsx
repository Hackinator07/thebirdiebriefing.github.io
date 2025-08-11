'use client';

import { useEffect } from 'react';

interface NewsListJsonLdProps {
  articles: Array<{
    title: string;
    excerpt: string;
    author: string;
    authorId?: string;
    date: string;
    image: {
      src: string;
      alt: string;
    };
    slug: string;
    category: string;
  }>;
  url: string;
}

export default function NewsListJsonLd({ articles, url }: NewsListJsonLdProps) {
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "News - The Birdie Briefing",
      "description": "Latest LPGA women's golf news, tournament coverage, and exclusive content from The Birdie Briefing.",
      "url": url,
      "publisher": {
        "@type": "Organization",
        "name": "The Birdie Briefing",
        "logo": {
          "@type": "ImageObject",
          "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/logo.png`
        }
      },
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": articles.map((article, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Article",
            "headline": article.title,
            "description": article.excerpt,
            "image": {
              "@type": "ImageObject",
              "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}${article.image.src}`,
              "alt": article.image.alt
            },
            "author": {
              "@type": "Person",
              "name": article.author,
              "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/about${article.authorId === 'george-hack' ? '#george-hack' : ''}`
            },
            "datePublished": article.date,
            "articleSection": article.category,
            "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/news/${article.slug}`
          }
        }))
      }
    };

    // Create script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);

    // Add to head
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [articles, url]);

  return null;
}
