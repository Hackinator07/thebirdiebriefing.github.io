// Dynamic data loader for better Turbopack compatibility

export async function loadArticles() {
  try {
    const articlesData = await import('@/data/articles.json');
    return articlesData.default.articles || [];
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
}

export async function loadNews() {
  try {
    const newsData = await import('@/data/news.json');
    return newsData.default.articles || [];
  } catch (error) {
    console.error('Error loading news:', error);
    return [];
  }
}

export async function loadPodcasts() {
  try {
    const podcastsData = await import('@/data/podcasts.json');
    return podcastsData.default.episodes || [];
  } catch (error) {
    console.error('Error loading podcasts:', error);
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
