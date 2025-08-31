import Link from 'next/link';

interface TagListProps {
  tags?: string[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function TagList({ tags = [], className = '', size = 'md' }: TagListProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  // Return null if no tags to display
  if (!tags || tags.length === 0) {
    return null;
  }

  // Function to get the URL for a tag
  const getTagUrl = (tag: string) => {
    switch (tag) {
      case 'Tournament Preview':
        return '/news/tournament-preview';
      case 'Tournament Golf':
        return '/news/tournament-golf';
      case 'LPGA Analysis':
        return '/news/lpga-analysis';
      case 'Opinion':
        return '/news/opinion';
      default:
        return `/news/tag/${encodeURIComponent(tag)}`;
    }
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag, index) => (
        <Link
          key={index}
          href={getTagUrl(tag)}
          className={`bg-gray-100 text-gray-700 rounded-full font-medium ${sizeClasses[size]} hover:bg-gray-200 transition-colors cursor-pointer`}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
