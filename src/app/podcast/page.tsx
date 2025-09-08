import Image from "next/image";
import SpotifyEmbed from "@/components/SpotifyEmbed";
import VideoBackground from "@/components/VideoBackground";

export const metadata = {
  title: "Podcast - The Birdie Briefing",
  description:
    "Listen to our latest episode as Marie breaks down the players to watch and the atmosphere leading into the Portland Classic.",
  openGraph: {
    title: "Podcast - The Birdie Briefing",
    description: "Listen to our latest episode as Marie breaks down the players to watch and the atmosphere leading into the Portland Classic.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/podcast`,
    siteName: 'The Birdie Briefing',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/images/logo.png`,
        width: 1200,
        height: 630,
        alt: 'The Birdie Briefing Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Podcast - The Birdie Briefing",
    description: "Listen to our latest episode as Marie breaks down the players to watch and the atmosphere leading into the Portland Classic.",
    images: [`${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/images/logo.png`],
  },
};

export default function PodcastPage() {
  return (
    <div className='bg-white'>
      {/* Masthead Section - Matching Homepage */}
      <section className='relative overflow-hidden'>
        {/* Video Background */}
        <VideoBackground />

        {/* Content Overlay */}
        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16'>
          <div className='max-w-6xl mx-auto'>
            {/* Text Content with White Background */}
            <div className='bg-white rounded-lg p-8 lg:p-12'>
              {/* Two Column Layout */}
              <div className='flex flex-col lg:flex-row items-center gap-12 lg:gap-16'>
                {/* Podcast Image */}
                <div className='w-full lg:w-1/3 flex justify-center'>
                  <div className='w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden flex items-center justify-center'>
                    <Image
                      src='/images/logo.png'
                      alt='The Birdie Briefing Logo'
                      width={384}
                      height={384}
                      className='w-full h-full object-contain'
                    />
                  </div>
                </div>

                {/* Content */}
                <div className='w-full lg:w-2/3 text-center lg:text-left'>
                  <h1 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight'>
                    <span className='text-primary-500'>The Birdie</span>{" "}
                    <span className='text-secondary-500'>Briefing</span>{" "}
                    <span className='text-secondary-500'>Podcast</span>
                  </h1>

                  <div className='mb-8 text-lg leading-relaxed text-gray-700'>
                    <p className='mb-4'>
                      Your go-to LPGA podcast for quick weekly updates on tournaments, highlights, and women's golf news. The Birdie Briefing brings fresh insights--fast, focused, and no fluff.
                    </p>
                  </div>

                  {/* Subscribe Button */}
                  <div className='mb-8'>
                    <a
                      href='#listen'
                      className='inline-block bg-primary-500 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-primary-600 transition-all duration-300 hover:-translate-y-1 shadow-lg'
                    >
                      Listen to The Birdie Briefing
                    </a>
                  </div>

                  {/* Platform Icons */}
                  <div className='subscribe-buttons'>
                    <ul className='flex flex-wrap justify-center lg:justify-start gap-4'>
                      <li>
                        <a
                          href='https://open.spotify.com/show/3ZwjiD6IZeHqCNrCwBdrP2'
                          target='_blank'
                          rel='noreferrer noopener'
                          title='Spotify'
                          className='block'
                        >
                          <button className='subscribe-icon bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex items-center gap-3'>
                            <Image
                              src='https://assets.podcastpage.io/img/icons/spotify.svg'
                              alt='Spotify'
                              width={24}
                              height={24}
                              className='subscribe-img'
                            />
                            <span className='icon-title text-sm font-medium text-gray-700'>
                              Spotify
                            </span>
                          </button>
                        </a>
                      </li>

                      <li>
                        <a
                          href='https://podcasts.apple.com/us/podcast/the-birdie-briefing/id1832371066'
                          target='_blank'
                          rel='noreferrer noopener'
                          title='Apple Podcasts'
                          className='block'
                        >
                          <button className='subscribe-icon bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex items-center gap-3'>
                            <Image
                              src='https://assets.podcastpage.io/img/icons/apple_podcasts.svg'
                              alt='Apple Podcasts'
                              width={24}
                              height={24}
                              className='subscribe-img'
                            />
                            <span className='icon-title text-sm font-medium text-gray-700'>
                              Apple Podcasts
                            </span>
                          </button>
                        </a>
                      </li>
                      <li>
                        <a
                          href='https://music.amazon.com/podcasts/041a1ee9-c77c-4388-9aad-bfec50af1743'
                          target='_blank'
                          rel='noreferrer noopener'
                          title='Amazon Music'
                          className='block'
                        >
                          <button className='subscribe-icon bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex items-center gap-3'>
                            <Image
                              src='https://assets.podcastpage.io/img/icons/amazon_music.svg'
                              alt='Amazon Music'
                              width={24}
                              height={24}
                              className='subscribe-img'
                            />
                            <span className='icon-title text-sm font-medium text-gray-700'>
                              Amazon Music
                            </span>
                          </button>
                        </a>
                      </li>
                      <li>
                        <a
                          href='https://www.spreaker.com/show/6707146/episodes/feed'
                          target='_blank'
                          rel='noreferrer noopener'
                          title='RSS'
                          className='block'
                        >
                          <button className='subscribe-icon bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex items-center gap-3'>
                            <Image
                              src='https://assets.podcastpage.io/img/icons/rss.svg'
                              alt='RSS'
                              width={24}
                              height={24}
                              className='subscribe-img'
                            />
                            <span className='icon-title text-sm font-medium text-gray-700'>
                              RSS
                            </span>
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
      <section id='listen' className='py-20 lg:py-32'>
        <div className='max-w-4xl mx-auto px-6'>
          <div className='text-center mb-16'>
            <div className='flex items-center justify-center gap-4 mb-6'>
              <div className='flex-1 h-px bg-gray-300 max-w-32'></div>
              <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 leading-tight'>
                Listen Now
              </h2>
              <div className='flex-1 h-px bg-gray-300 max-w-32'></div>
            </div>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              Stream our latest episodes and discover the perfect companion for
              your golf journey.
            </p>
          </div>

          <div className='bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden'>
            <div className='p-8 lg:p-12'>
              <SpotifyEmbed />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
