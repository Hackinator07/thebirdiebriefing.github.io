import { getArticles } from '@/lib/articles';
import NewsList from './NewsList';

export default async function NewsListServer() {
  const articles = await getArticles();
  return <NewsList articles={articles} />;
}
