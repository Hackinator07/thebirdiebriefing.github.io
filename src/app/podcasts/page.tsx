import SpotifyEmbed from '@/components/SpotifyEmbed';

export const metadata = {
  title: 'Podcasts - The Birdie Briefing',
  description: 'Listen to the latest episodes of The Birdie Briefing podcast featuring LPGA news, player interviews, and golf insights.',
};

export default function PodcastsPage() {
  return (
    <div className="bg-white">
      {/* Hidden page title for accessibility */}
      <h1 className="sr-only">Podcasts</h1>

      {/* Spotify Embed Section */}
      <section className="pt-8 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Listen to Our Podcast
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dive deep into the world of women's golf with our in-depth podcast episodes featuring player interviews, tournament analysis, and behind-the-scenes insights.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <SpotifyEmbed />
          </div>
        </div>
      </section>
    </div>
  );
}
