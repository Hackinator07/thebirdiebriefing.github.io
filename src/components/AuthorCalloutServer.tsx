import { getAuthorCallout } from '@/lib/data';
import AuthorCallout from './AuthorCallout';

interface AuthorCalloutServerProps {
  message?: string;
  calloutType?: string;
  authorId?: string;
  className?: string;
}

export default async function AuthorCalloutServer({
  message,
  calloutType = 'author',
  authorId,
  className = ''
}: AuthorCalloutServerProps) {
  // Load the callout message server-side
  let calloutMessage = message;

  if (!calloutMessage && authorId) {
    calloutMessage = await getAuthorCallout(authorId, calloutType);
  } else if (!calloutMessage) {
    // Fallback to default author if no authorId provided
    calloutMessage = await getAuthorCallout('george-hack', calloutType);
  }

  return (
    <AuthorCallout
      message={calloutMessage}
      calloutType={calloutType}
      authorId={authorId}
      className={className}
    />
  );
}
