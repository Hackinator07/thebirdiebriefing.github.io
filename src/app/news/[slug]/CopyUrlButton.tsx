'use client';

import { useState } from 'react';

export default function CopyUrlButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = window.location.href;

    try {
      // Check if clipboard API is available
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
      } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(url);
        setCopied(true);
      }
    } catch (err) {
      console.error('Failed to copy URL:', err);
      // Fallback for any errors
      fallbackCopyTextToClipboard(url);
      setCopied(true);
    }

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Fallback function for older browsers
  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (!successful) {
        console.warn('Fallback copy command failed');
      }
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }

    document.body.removeChild(textArea);
  };

  return (
    <button
      onClick={handleCopy}
      className="w-10 h-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200"
      title="Copy URL"
      aria-label="Copy article URL to clipboard"
      type="button"
    >
      {copied ? (
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
}
