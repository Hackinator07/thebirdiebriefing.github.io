'use client';

interface BlueskyShareButtonProps {
  title: string;
  excerpt: string;
  className?: string;
}

export default function BlueskyShareButton({ title, excerpt, className = "" }: BlueskyShareButtonProps) {
  const handleBlueskyShare = () => {
    const url = window.location.href;
    const text = `${title}\n\n${excerpt}\n\n${url}`;
    const encodedText = encodeURIComponent(text);

    const blueskyUrl = `https://bsky.app/intent/compose?text=${encodedText}`;
    window.open(blueskyUrl, '_blank', 'width=600,height=400');
  };

  return (
    <button
      className={`w-10 h-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200 ${className}`}
      aria-label="Share on Bluesky"
      onClick={handleBlueskyShare}
      type="button"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.335 5.144c-1.654-1.199-4.335-2.127-4.335.826c0 .59.35 4.953.556 5.661c.713 2.463 3.13 2.75 5.444 2.369c-4.045.665-4.889 3.208-2.667 5.41c1.03 1.018 1.913 1.59 2.667 1.59c2 0 3.134-2.769 3.5-3.5c.333-.667.5-1.167.5-1.5c0 .333.167.833.5 1.5c.366.731 1.5 3.5 3.5 3.5c.754 0 1.637-.571 2.667-1.59c2.222-2.203 1.378-4.746-2.667-5.41c2.314.38 4.73.094 5.444-2.369c.206-.708.556-5.072.556-5.661c0-2.953-2.68-2.025-4.335-.826c-2.293 1.662-4.76 5.048-5.665 6.856c-.905-1.808-3.372-5.194-5.665-6.856z" />
      </svg>
    </button>
  );
}
