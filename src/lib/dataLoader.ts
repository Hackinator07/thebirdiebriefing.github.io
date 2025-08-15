// Dynamic data loader for better Turbopack compatibility
import { getArticles } from './articles';

export async function loadArticles() {
  try {
    return await getArticles();
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
}





export async function loadRankings() {
  try {
    const rankingsData = await import('@/data/rankings.json');
    return rankingsData.default;
  } catch (error) {
    console.error('Error loading rankings:', error);
    return null;
  }
}

export async function loadConfig() {
  try {
    const configData = await import('@/data/config.json');
    return configData.default;
  } catch (error) {
    console.error('Error loading config:', error);
    return null;
  }
}
