import { getPodcastEpisodes, formatDate } from '@/lib/data';

export const metadata = {
  title: 'Podcasts - The Birdie Briefing',
  description: 'Listen to the latest episodes of The Birdie Briefing podcast featuring LPGA news, player interviews, and golf insights.',
};

export default function PodcastsPage() {
  const episodes = getPodcastEpisodes();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-primary-500 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold title-overlap mb-6">
              The Birdie Briefing Podcast
            </h1>
            <p className="text-xl lg:text-2xl leading-relaxed text-gray-100">
              Your premier source for LPGA insights, player interviews, and golf analysis
            </p>
          </div>
        </div>
      </section>

      {/* Podcast Episodes */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {episodes.map((episode) => (
              <div key={episode.id} className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300">
                {/* Episode Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{episode.title}</h2>
                    <span className="text-sm text-gray-500">{episode.duration}</span>
                  </div>
                  <time dateTime={episode.date} className="text-sm text-gray-500">
                    {formatDate(episode.date)}
                  </time>
                </div>

                {/* Episode Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {episode.description}
                </p>

                {/* Platform Links */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Listen on:</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {episode.platforms.spotify && (
                      <a
                        href={episode.platforms.spotify}
                        className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                        Spotify
                      </a>
                    )}
                    {episode.platforms.apple && (
                      <a
                        href={episode.platforms.apple}
                        className="flex items-center justify-center px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                        </svg>
                        Apple Podcasts
                      </a>
                    )}
                    {episode.platforms.google && (
                      <a
                        href={episode.platforms.google}
                        className="flex items-center justify-center px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                        </svg>
                        Google Podcasts
                      </a>
                    )}
                    {episode.platforms.amazon && (
                      <a
                        href={episode.platforms.amazon}
                        className="flex items-center justify-center px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M15.93 17.27c-.33.09-.68.13-1.04.13-1.53 0-2.8-.52-3.81-1.56-1.01-1.04-1.52-2.31-1.52-3.81 0-1.49.51-2.75 1.52-3.78 1.01-1.03 2.28-1.55 3.81-1.55.36 0 .71.04 1.04.13l-.33 1.5c-.24-.06-.49-.09-.71-.09-1.1 0-2.02.37-2.74 1.12-.72.75-1.08 1.72-1.08 2.9 0 1.18.36 2.15 1.08 2.9.72.75 1.64 1.13 2.74 1.13.22 0 .47-.03.71-.09l.33 1.5zM19.5 17.27c-.33.09-.68.13-1.04.13-1.53 0-2.8-.52-3.81-1.56-1.01-1.04-1.52-2.31-1.52-3.81 0-1.49.51-2.75 1.52-3.78 1.01-1.03 2.28-1.55 3.81-1.55.36 0 .71.04 1.04.13l-.33 1.5c-.24-.06-.49-.09-.71-.09-1.1 0-2.02.37-2.74 1.12-.72.75-1.08 1.72-1.08 2.9 0 1.18.36 2.15 1.08 2.9.72.75 1.64 1.13 2.74 1.13.22 0 .47-.03.71-.09l.33 1.5z"/>
                        </svg>
                        Amazon Music
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
