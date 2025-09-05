'use client';

import React from 'react';

interface LinkifyTextProps {
  text: string;
  className?: string;
}

export default function LinkifyText({ text, className }: LinkifyTextProps) {
  const linkifyText = (text: string) => {
    // Regex patterns for URLs and emails
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const emailPattern = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

    // Split text by URLs first
    let parts = text.split(urlPattern);

    // Process each part for emails
    parts = parts.flatMap((part) => {
      // If this part is a URL (matches the pattern), don't process it for emails
      if (urlPattern.test(part)) {
        return part;
      }

      // Split by email pattern
      return part.split(emailPattern);
    });

    return parts.map((part) => {
      // Check if it's a URL
      if (urlPattern.test(part)) {
        return (
          <a
            key={Math.random()}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 hover:text-primary-600"
          >
            {part}
          </a>
        );
      }

      // Check if it's an email
      if (emailPattern.test(part)) {
        return (
          <a
            key={Math.random()}
            href={`mailto:${part}`}
            className="text-primary-500 hover:text-primary-600"
          >
            {part}
          </a>
        );
      }

      // Regular text
      return part;
    });
  };

  return (
    <span className={className}>
      {linkifyText(text)}
    </span>
  );
}
