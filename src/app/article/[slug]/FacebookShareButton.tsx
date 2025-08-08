'use client';

interface FacebookShareButtonProps {
  title: string;
  excerpt: string;
  className?: string;
}

export default function FacebookShareButton({ title, excerpt, className = "" }: FacebookShareButtonProps) {
  const handleFacebookShare = () => {
    const url = encodeURIComponent(window.location.href);
    const quote = encodeURIComponent(`${title}\n\n${excerpt}`);

    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  return (
    <button
      className={`w-10 h-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200 ${className}`}
      aria-label="Share on Facebook"
      onClick={handleFacebookShare}
      type="button"
    >
      <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 2H14C12.6739 2 11.4021 2.52678 10.4645 3.46447C9.52678 4.40215 9 5.67392 9 7V10H6V14H9V22H13V14H16L17 10H13V7C13 6.73478 13.1054 6.48043 13.2929 6.29289C13.4804 6.10536 13.7348 6 14 6H17V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
