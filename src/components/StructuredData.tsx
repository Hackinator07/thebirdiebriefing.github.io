export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "The Birdie Briefing",
    "description": "Your premier source for LPGA women's golf news, tournament coverage, exclusive content, and comprehensive rankings. Listen to our podcast for behind-the-scenes stories from the LPGA Tour.",
    "url": "https://thebirdiebriefing.github.io",
    "publisher": {
      "@type": "Organization",
      "name": "The Birdie Briefing",
      "logo": {
        "@type": "ImageObject",
        "url": "https://thebirdiebriefing.github.io/images/logo.png"
      }
    },
    "author": {
      "@type": "Person",
      "name": "Marie Hack",
      "jobTitle": "Founder & Host",
      "description": "Founder and host of The Birdie Briefing podcast"
    },
    "mainEntity": {
      "@type": "PodcastSeries",
      "name": "The Birdie Briefing",
      "description": "Your go-to LPGA podcast for women's golf news, featuring tournament breakdowns, player interviews, and behind-the-scenes stories from the LPGA Tour.",
      "url": "https://thebirdiebriefing.github.io/podcast",
      "publisher": {
        "@type": "Organization",
        "name": "The Birdie Briefing"
      },
      "genre": "Sports",
      "category": "Golf"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://thebirdiebriefing.github.io/news?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://discord.com/invite/rqB6T7uVtN"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
