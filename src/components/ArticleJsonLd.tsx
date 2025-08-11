'use client';

import { useEffect } from 'react';

interface ArticleJsonLdProps {
  article: {
    title: string;
    excerpt: string;
    content: string[];
    author: string;
    authorId?: string;
    date: string;
    image: {
      src: string;
      alt: string;
    };
    slug: string;
    category: string;
    tags: string[];
  };
  url: string;
}

export default function ArticleJsonLd({ article, url }: ArticleJsonLdProps) {
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
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
      "publisher": {
        "@type": "Organization",
        "name": "The Birdie Briefing",
        "logo": {
          "@type": "ImageObject",
          "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/logo.png`
        }
      },
      "datePublished": article.date,
      "dateModified": article.date,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      },
      "articleSection": article.category,
      "keywords": article.tags.join(", "),
      "wordCount": article.content.join(" ").split(" ").length,
      "timeRequired": `PT${Math.ceil(article.content.join(" ").split(" ").length / 200)}M`, // Rough estimate: 200 words per minute
      "url": url
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
  }, [article, url]);

  return null;
}
