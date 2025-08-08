'use client';

interface EmailShareButtonProps {
  title: string;
  excerpt: string;
  className?: string;
}

export default function EmailShareButton({ title, excerpt, className = "" }: EmailShareButtonProps) {
  const handleEmailShare = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(
      `Check out this article: ${title}\n\n${excerpt}\n\nRead more: ${window.location.href}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <button
      className={`w-10 h-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200 ${className}`}
      aria-label="Share via Email"
      onClick={handleEmailShare}
      type="button"
    >
      <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 9L12 12.5L17 9M3 7.5V16.5C3 17.3284 3.67157 18 4.5 18H19.5C20.3284 18 21 17.3284 21 16.5V7.5C21 6.67157 20.3284 6 19.5 6H4.5C3.67157 6 4.5 6.67157 4.5 7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}
