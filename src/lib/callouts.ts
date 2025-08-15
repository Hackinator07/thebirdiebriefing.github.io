import { Author } from './calloutsLoader';

// Server-side functions
let cachedAuthors: Record<string, Author> | null = null;

export async function getAuthor(authorId: string): Promise<Author | null> {
  if (!cachedAuthors) {
    // Dynamic import to avoid bundling fs in client
    const { loadAllAuthors } = await import('./calloutsLoader');
    cachedAuthors = await loadAllAuthors();
  }

  return cachedAuthors[authorId] || null;
}

export async function getAuthorCallout(authorId: string, calloutType: string = 'author'): Promise<string> {
  const author = await getAuthor(authorId);
  if (!author) {
    // Fallback to default author if author not found
    const defaultAuthor = await getAuthor('george-hack');
    return defaultAuthor?.callouts[calloutType] || 'Contact us for more information.';
  }
  return author.callouts[calloutType] || author.callouts.author || 'Contact us for more information.';
}

export async function getAllAuthors(): Promise<Record<string, Author>> {
  if (!cachedAuthors) {
    // Dynamic import to avoid bundling fs in client
    const { loadAllAuthors } = await import('./calloutsLoader');
    cachedAuthors = await loadAllAuthors();
  }

  return cachedAuthors;
}

export async function getAllCallouts(): Promise<Record<string, string>> {
  // Legacy function - returns default author's callouts
  const defaultAuthor = await getAuthor('george-hack');
  return defaultAuthor?.callouts || {};
}

export async function updateCallout(authorId: string, type: string, newMessage: string): Promise<void> {
  // This function can be used to update callout messages
  // In a real application, you might want to persist this to a database
  console.log(`Callout "${type}" for author "${authorId}" updated to: ${newMessage}`);
}
