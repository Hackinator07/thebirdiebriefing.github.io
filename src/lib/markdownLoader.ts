import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article, ArticleSection } from './data';

// This file should only be used on the server side
const articlesDirectory = path.join(process.cwd(), 'src/data/articles');

export async function loadMarkdownArticle(slug: string): Promise<Article | null> {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);

    // Convert content to array of paragraphs
    const contentArray = content
      .split('\n\n')
      .filter(paragraph => paragraph.trim().length > 0)
      .map(paragraph => paragraph.trim());

    // Parse sections if they exist
    let sections: ArticleSection[] | undefined;
    if (data.sections) {
      sections = data.sections.map((section: Record<string, unknown>) => ({
        type: section.type as ArticleSection['type'],
        title: section.title as string,
        links: section.links as ArticleSection['links'],
        schedule: section.schedule as ArticleSection['schedule'],
        data: section.data as ArticleSection['data'],
        headers: section.headers as string[],
        tableData: section.tableData as string[][],
        backgroundColor: section.backgroundColor as string
      }));
    }

    const article: Article = {
      id: data.id,
      slug: data.slug,
      title: data.title,
      author: data.author,
      authorId: data.authorId,
      date: data.date,
      category: data.category,
      excerpt: data.excerpt,
      content: contentArray,
      image: data.image,
      calloutType: data.calloutType,
      tags: data.tags,
      sections
    };

    return article;
  } catch (error) {
    console.error(`Error loading article ${slug}:`, error);
    return null;
  }
}

export async function loadAllMarkdownArticles(): Promise<Article[]> {
  try {
    const fileNames = fs.readdirSync(articlesDirectory);
    const mdFiles = fileNames.filter(fileName => fileName.endsWith('.md'));

    const articles = await Promise.all(
      mdFiles.map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        return await loadMarkdownArticle(slug);
      })
    );

    // Filter out null articles and sort by date (newest first)
    return articles
      .filter((article): article is Article => article !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading all articles:', error);
    return [];
  }
}

export function getAllArticleSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(articlesDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error getting article slugs:', error);
    return [];
  }
}
