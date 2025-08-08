import LinkifyText from '@/app/news/[slug]/LinkifyText';
import { FaGolfBall } from 'react-icons/fa';
import { getAuthorCallout } from '@/lib/data';

interface AuthorCalloutProps {
  message?: string;
  calloutType?: string;
  authorId?: string;
  className?: string;
}

export default function AuthorCallout({
  message,
  calloutType = 'author',
  authorId,
  className = ''
}: AuthorCalloutProps) {
  // Use provided message, or get author-specific callout, or fall back to default
  let calloutMessage = message;

  if (!calloutMessage && authorId) {
    calloutMessage = getAuthorCallout(authorId, calloutType);
  } else if (!calloutMessage) {
    // Fallback to default author if no authorId provided
    calloutMessage = getAuthorCallout('george-hack', calloutType);
  }

  return (
    <div className={`my-8 ${className}`}>
      {/* Using same styling as latest news cards */}
      <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
        <div className="p-6">
          {/* Golf ball accent */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center shadow-sm">
                {/* Golf ball icon from react-icons */}
                <FaGolfBall className="h-4 w-4 text-white" />
              </div>
            </div>

            {/* Message content with editorial styling */}
            <div className="flex-1">
              <div className="text-gray-700 font-medium italic leading-relaxed text-lg">
                <LinkifyText text={calloutMessage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
