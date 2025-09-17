import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
  className?: string;
  isCourtesy?: boolean;
}

export default function MarkdownContent({ content, className = '', isCourtesy = false }: MarkdownContentProps) {
  // Safety check for content
  if (!content || typeof content !== 'string') {
    return null;
  }

  // Clean the content to prevent React errors
  const cleanContent = content.trim();

  if (!cleanContent) {
    return null;
  }

  return (
    <div className={`break-words overflow-hidden ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Customize link styling
          a: ({ ...props }) => (
            <a
              {...props}
              className="text-primary-600 hover:text-primary-700 transition-colors duration-200 [font-size:inherit]"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
          // Customize strong/bold styling
          strong: ({ ...props }) => (
            <strong {...props} className="font-semibold text-gray-900" />
          ),
          // Customize emphasis/italic styling
          em: ({ ...props }) => (
            <em {...props} className="italic text-gray-800" />
          ),
          // Customize paragraph styling
          p: ({ ...props }) => (
            <p {...props} className={isCourtesy ? "text-xs text-gray-500 italic mb-0 leading-none inline break-words" : "text-lg leading-relaxed text-gray-600 mb-6 last:mb-0 font-lock-lg break-words"} />
          ),
        }}
      >
        {cleanContent}
      </ReactMarkdown>
    </div>
  );
}
