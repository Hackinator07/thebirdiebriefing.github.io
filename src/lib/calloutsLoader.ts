import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const authorsDirectory = path.join(process.cwd(), 'src/data/authors');

export interface Author {
  name: string;
  email: string;
  callouts: Record<string, string>;
}

export async function loadAuthorCallouts(authorId: string): Promise<Author | null> {
  try {
    const fullPath = path.join(authorsDirectory, `${authorId}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);

    // Parse the markdown content to extract callouts by headers
    const lines = content.split('\n');
    const callouts: Record<string, string> = {};
    let currentCalloutType = '';
    let currentCalloutContent: string[] = [];

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Check if this is a header (## Callout Type)
      if (trimmedLine.startsWith('## ')) {
        // Save previous callout if exists
        if (currentCalloutType && currentCalloutContent.length > 0) {
          const calloutKey = currentCalloutType.toLowerCase().replace(' callout', '');
          const calloutText = currentCalloutContent.join('\n').trim();
          callouts[calloutKey] = calloutText;
        }

        // Start new callout
        currentCalloutType = trimmedLine.replace('## ', '');
        currentCalloutContent = [];
      } else if (trimmedLine && currentCalloutType) {
        // Add content to current callout
        currentCalloutContent.push(trimmedLine);
      }
    }

    // Save the last callout
    if (currentCalloutType && currentCalloutContent.length > 0) {
      const calloutKey = currentCalloutType.toLowerCase().replace(' callout', '');
      const calloutText = currentCalloutContent.join('\n').trim();
      callouts[calloutKey] = calloutText;
    }

    return {
      name: data.name,
      email: data.email,
      callouts
    };
  } catch (error) {
    console.error(`Error loading author callouts for ${authorId}:`, error);
    return null;
  }
}

export async function loadAllAuthors(): Promise<Record<string, Author>> {
  try {
    const fileNames = fs.readdirSync(authorsDirectory);
    const mdFiles = fileNames.filter(fileName => fileName.endsWith('.md'));

    const authors: Record<string, Author> = {};

    for (const fileName of mdFiles) {
      const authorId = fileName.replace(/\.md$/, '');
      const author = await loadAuthorCallouts(authorId);
      if (author) {
        authors[authorId] = author;
      }
    }

    return authors;
  } catch (error) {
    console.error('Error loading all authors:', error);
    return {};
  }
}
