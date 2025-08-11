import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export default function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Customize link styling
          a: ({ node, ...props }) => (
            <a
              {...props}
              className="text-primary-600 hover:text-primary-700 underline transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
          // Customize strong/bold styling
          strong: ({ node, ...props }) => (
            <strong {...props} className="font-semibold text-gray-900" />
          ),
          // Customize emphasis/italic styling
          em: ({ node, ...props }) => (
            <em {...props} className="italic text-gray-800" />
          ),
          // Customize paragraph styling
          p: ({ node, ...props }) => (
            <p {...props} className="text-lg leading-relaxed text-gray-600 mb-6 last:mb-0" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
