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

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag, index) => (
        <span
          key={index}
          className={`bg-gray-100 text-gray-700 rounded-full font-medium ${sizeClasses[size]} hover:bg-gray-200 transition-colors`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
