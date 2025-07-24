'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    instgrm: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

interface InstagramEmbedProps {
  url: string;
  className?: string;
}

export default function InstagramEmbed({ url, className = '' }: InstagramEmbedProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [url]);

  return (
    <>
      <script async src="//www.instagram.com/embed.js"></script>
      <blockquote
        className={`instagram-media ${className}`}
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          margin: '1rem auto',
          maxWidth: 540,
          background: '#FFF',
          border: '1px solid #dbdbdb',
          borderRadius: '3px',
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
          marginBottom: '1rem'
        }}
      />
    </>
  );
}
