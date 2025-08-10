import SpotifyEmbed from '@/components/SpotifyEmbed';
import VideoBackground from '@/components/VideoBackground';

export const metadata = {
  title: 'Podcast - The Birdie Briefing',
  description: 'Listen to the latest episodes of The Birdie Briefing podcast featuring LPGA news, player interviews, and golf insights.',
};

export default function PodcastPage() {
  return (
    <div className="bg-white">
      {/* Masthead Section - Matching Homepage */}
      <section className="relative overflow-hidden">
        {/* Video Background */}
        <VideoBackground />

        {/* Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            {/* Text Content with White Background */}
            <div className="bg-white rounded-lg p-8 lg:p-12">
              {/* Two Column Layout */}
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                {/* Podcast Image */}
                <div className="w-full lg:w-1/3 flex justify-center">
                  <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-white font-bold text-4xl">TB</span>
                      </div>
                      <h2 className="text-2xl font-bold text-primary-600">The Birdie Briefing</h2>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-2/3 text-center lg:text-left">
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    <span className="text-primary-500">The Birdie</span>{' '}
                    <span className="text-secondary-500">Briefing</span>{' '}
                    <span className="text-secondary-500">Podcast</span>
                  </h1>



                  <div className="mb-8 text-lg leading-relaxed text-gray-700">
                    <p className="mb-4">
                      Dive deep into the world of women's golf with our in-depth podcast episodes featuring player interviews, tournament analysis, and behind-the-scenes insights.
                    </p>
                    <p className="mb-4">
                      Join us every week as we explore the latest LPGA news, share exclusive player stories, and provide expert analysis of the world's most exciting golf tournaments.
                    </p>
                  </div>

                  {/* Subscribe Button */}
                  <div className="mb-8">
                    <a
                      href="#listen"
                      className="inline-block bg-primary-500 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-primary-600 transition-all duration-300 hover:-translate-y-1 shadow-lg"
                    >
                      Listen to The Birdie Briefing
                    </a>
                  </div>

                  {/* Platform Icons - Sleep Wave Style */}
                  <div className="subscribe-buttons">
                    <ul className="flex flex-wrap justify-center lg:justify-start gap-4">
                      <li>
                        <a
                          href="https://podcasts.apple.com/us/podcast/the-birdie-briefing"
                          target="_blank"
                          rel="noreferrer noopener"
                          title="Apple Podcasts"
                          className="block"
                        >
                          <button className="subscribe-icon bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex items-center gap-3">
                            <img
                              src="https://assets.podcastpage.io/img/icons/apple_podcasts.svg"
                              alt="Apple Podcasts"
                              width="24"
                              height="24"
                              className="subscribe-img"
                            />
                            <span className="icon-title text-sm font-medium text-gray-700">Apple Podcasts</span>
                          </button>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://open.spotify.com/show/your-podcast-id"
                          target="_blank"
                          rel="noreferrer noopener"
                          title="Spotify"
                          className="block"
                        >
                          <button className="subscribe-icon bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex items-center gap-3">
                            <img
                              src="https://assets.podcastpage.io/img/icons/spotify.svg"
                              alt="Spotify"
                              width="24"
                              height="24"
                              className="subscribe-img"
                            />
                            <span className="icon-title text-sm font-medium text-gray-700">Spotify</span>
                          </button>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://podcasts.google.com/feed/your-rss-feed"
                          target="_blank"
                          rel="noreferrer noopener"
                          title="Google Podcasts"
                          className="block"
                        >
                          <button className="subscribe-icon bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex items-center gap-3">
                            <img
                              src="https://assets.podcastpage.io/img/icons/google_podcasts.svg"
                              alt="Google Podcasts"
                              width="24"
                              height="24"
                              className="subscribe-img"
                            />
                            <span className="icon-title text-sm font-medium text-gray-700">Google Podcasts</span>
                          </button>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://music.amazon.com/podcasts/your-podcast-id"
                          target="_blank"
                          rel="noreferrer noopener"
                          title="Amazon Music"
                          className="block"
                        >
                          <button className="subscribe-icon bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex items-center gap-3">
                            <img
                              src="https://assets.podcastpage.io/img/icons/amazon_music.svg"
                              alt="Amazon Music"
                              width="24"
                              height="24"
                              className="subscribe-img"
                            />
                            <span className="icon-title text-sm font-medium text-gray-700">Amazon Music</span>
                          </button>
                        </a>
                      </li>
                      <li>
                        <a
                          href="/rss-feed.xml"
                          target="_blank"
                          rel="noreferrer noopener"
                          title="RSS"
                          className="block"
                        >
                          <button className="subscribe-icon bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex items-center gap-3">
                            <img
                              src="https://assets.podcastpage.io/img/icons/rss.svg"
                              alt="RSS"
                              width="24"
                              height="24"
                              className="subscribe-img"
                            />
                            <span className="icon-title text-sm font-medium text-gray-700">RSS</span>
                          </button>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spotify Embed Section */}
      <section id="listen" className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-300 max-w-32"></div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Listen Now
              </h2>
              <div className="flex-1 h-px bg-gray-300 max-w-32"></div>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stream our latest episodes and discover the perfect companion for your golf journey.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            <div className="p-8 lg:p-12">
              <SpotifyEmbed />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
