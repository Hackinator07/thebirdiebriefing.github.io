import Link from 'next/link';
import Image from 'next/image';
import SpotifyEmbed from '@/components/SpotifyEmbed';
import Socials from '@/components/Socials';
import VideoBackground from '@/components/VideoBackground';
import { getFeaturedArticles, formatDate } from '@/lib/data';

export default async function Home() {
  const featuredArticles = await getFeaturedArticles();

  // Force new deployment to test GitHub Pages

  return (
    <div className="bg-white">
      {/* Masthead Section */}
      <section className="relative overflow-hidden">
        {/* Video Background */}
        <VideoBackground />

        {/* Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 lg:py-12">
          <div className="max-w-6xl mx-auto">
            {/* Text Content with White Background */}
            <div className="bg-white rounded-lg p-6 lg:p-8">
              {/* Main Headlines */}
              <div className="text-center mb-8">
                                 <h1 className="text-5xl lg:text-7xl xl:text-8xl font-heading text-primary-500 leading-none mb-2">
                   The Birdie
                 </h1>
                <h2 className="text-5xl lg:text-7xl xl:text-8xl font-heading text-secondary-500 leading-none mb-8">
                  Briefing
                </h2>
              </div>

              {/* Introduction */}
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
                  At The Birdie Briefing, we amplify women in golf—sharing the stories of LPGA players, rising stars, and our community. With tournament coverage, insights, exclusive stories, and{' '}
                  <Link 
                    href="/contact-us?inquiry=user-submission" 
                    className="text-primary-500 hover:text-primary-600 transition-colors duration-200 font-medium relative group"
                  >
                    user-generated
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 ease-out group-hover:w-full"></span>
                  </Link>
                  {' '}reviews and articles, we bring the vibrant world of women's golf closer to fans everywhere.
                </p>

                {/* Author Attribution */}
                <div className="flex items-center justify-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 69.787 69.787" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <path d="M32.986,66.143c-2.564-1.354-3.708-1.365-5.809,0.236c-0.314-0.076-0.628-0.156-0.94-0.242
                          c-0.243-1.074,0.145-2.158,1.104-2.986c1.323-1.139,3.595-1.334,4.877-0.416C33.326,63.525,33.588,64.693,32.986,66.143z
                           M42.394,61.532c-1.236-0.669-3.148-0.296-4.465,0.872c-1.281,1.136-1.678,2.558-1.056,4.244c1.755-2.24,3.776-3.26,6.423-1.86
                          C43.736,63.075,43.448,62.1,42.394,61.532z M21.65,63.173c-0.968-0.758-2.434-0.956-3.66-0.589
                          c1.521,0.923,3.124,1.725,4.794,2.391C22.669,64.295,22.289,63.674,21.65,63.173z M51.105,59.695
                          c-1.574-0.174-2.713,0.727-3.629,1.883c-0.824,1.038-1.289,2.173-0.886,3.559c0.294-0.113,0.584-0.229,0.873-0.349
                          c1.086-1.274,2.261-2.259,3.995-2.004c0.359-0.212,0.717-0.429,1.064-0.651C52.816,60.814,52.304,59.829,51.105,59.695z
                           M49.109,53.766c0.078-1.519-0.451-2.552-1.764-2.959c-1.596-0.496-2.898,0.195-3.933,1.377c-1.037,1.188-1.531,2.541-1.069,3.938
                          c0.947-0.923,1.784-1.976,2.844-2.708C46.424,52.555,47.795,52.956,49.109,53.766z M54.058,42.518
                          c-0.109-1.395-0.439-2.562-1.728-3.174c-1.146-0.547-2.185-0.217-3.101,0.579c-1.268,1.101-1.693,2.697-1.203,4.449
                          C49.851,41.109,51.595,40.54,54.058,42.518z M52.365,54.766c1.521-3.313,2.863-4.137,5.316-3.187
                          c0.016-2.021-1.021-3.097-2.488-2.713C53.021,49.432,51.478,52.65,52.365,54.766z M61.28,40.441
                          c-0.13-0.555-0.112-1.066-0.354-1.379c-0.514-0.664-1.129-1.664-1.764-1.711c-0.734-0.057-1.744,0.596-2.264,1.238
                          c-0.916,1.139-0.946,2.584-0.647,4.156C57.754,39.331,58.892,38.797,61.28,40.441z M59.677,25.923
                          c-1.252,0.188-1.845,1.824-1.465,4.051c1.432-2.374,2.239-2.471,4.329-0.411C62.22,27.204,61.009,25.727,59.677,25.923z
                           M33.424,52.578c-1.645,1.044-2.306,2.982-1.613,4.738c1.418-3.987,2.864-4.939,6.436-4.076
                          C36.902,51.742,35.068,51.537,33.424,52.578z M22.131,53.236c-1.522,1.074-2.005,3-1.127,4.488
                          c0.309-3.498,2.507-4.851,6.248-3.845C25.918,52.33,23.793,52.062,22.131,53.236z M43.769,41.934
                          c-1.094-1.315-2.795-1.623-4.287-0.818c-1.731,0.934-2.707,3.49-1.77,5.179C38.273,42.473,40.207,41.117,43.769,41.934z
                           M55.353,28.83c-0.91-0.967-1.871-1.36-3.022-0.685c-1.345,0.787-1.841,2.768-1.194,4.535
                          C51.745,29.366,52.595,28.566,55.353,28.83z M60.599,16.398c0.026-0.109,0.055-0.218,0.082-0.328
                          c-0.66-0.13-1.572-0.598-1.937-0.327c-1.088,0.81-0.685,2.01-0.321,3.491C58.54,16.76,58.937,16.308,60.599,16.398z M69.754,34.926
                          c0,19.225-15.639,34.861-34.861,34.861c-19.224,0-34.861-15.639-34.861-34.861c0-11.481,5.582-21.685,14.172-28.039
                          C19.978,2.564,27.143,0,34.894,0c7.514,0,14.477,2.411,20.155,6.496C63.943,12.82,69.754,23.207,69.754,34.926z M64.245,48.729
                          c-0.011-0.561-0.327-1.188-0.468-1.775c-0.953,2.32-1.129,4.967-4.818,5.384c0.684,0.871,1.122,1.942,1.669,2.001
                          c0.075,0.008,0.157,0.006,0.24,0.001C62.172,52.596,63.306,50.717,64.245,48.729z M66.631,41.637
                          c0.271-1.285,0.466-2.597,0.58-3.932c-0.11-0.85-0.366-1.637-0.786-2.205c-0.389,2.047,0.104,4.602-3.139,5.205
                          c0.186,0.43,0.337,0.995,0.646,1.458c0.623,0.937,1.477,0.963,2.231,0.149C66.341,42.124,66.498,41.893,66.631,41.637z
                           M34.894,67.365c7.364,0,14.161-2.469,19.612-6.618c-0.248,0.187-0.496,0.373-0.751,0.554c0.068-0.119,0.136-0.24,0.207-0.354
                          c0.622-0.989,1.28-2.237,2.24-2.678c2.543-1.16,2.967-2.928,2.537-5.276c-0.433-2.367-0.089-4.454,1.672-6.197
                          c1.933-1.915,2.368-4.217,1.823-6.813c-0.407-1.938,0.156-3.672,1.484-5.09c0.756-0.81,1.643-1.539,2.584-2.125
                          c0.344-0.216,0.643-0.449,0.9-0.697c-0.188-2.132-0.58-4.205-1.161-6.199c-0.69-0.412-1.181-0.053-1.795,0.993
                          c-0.067-0.033-0.192-0.068-0.192-0.1c0.014-1.156-0.498-2.819,0.905-3.142c0.115-0.026,0.22-0.036,0.32-0.041
                          C60.671,11.274,48.79,2.489,34.894,2.489c-17.888,0-32.438,14.552-32.438,32.439c0,7.848,2.802,15.053,7.456,20.668
                          c0.025-1.133,0.532-2.018,1.465-2.617c1.578-1.014,3.288-0.744,5.161,1.07c-1.653-0.725-2.979-0.99-4.302-0.254
                          c-0.985,0.549-1.539,1.344-1.801,2.415c1.443,1.657,3.053,3.166,4.8,4.5c0.886,0.669,1.804,1.3,2.756,1.875
                          c-0.007,0.003-0.011,0.005-0.019,0.007C22.902,65.618,28.698,67.365,34.894,67.365z" fill="#F8F6F2"/>
                      </g>
                    </svg>
                  </div>
                  <div className="text-left">
                                         <p className="font-medium">
                       <Link href="/about#marie-hack" className="text-primary-500 hover:text-primary-600 transition-colors">
                         Marie Hack
                       </Link>
                     </p>
                    <p className="text-sm text-gray-600">Founder & Host</p>
                  </div>
                </div>

                {/* Call to Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link
                    href="/news"
                    className="bg-primary-500 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-primary-600 transition-all duration-300 hover:-translate-y-1 shadow-lg"
                  >
                    Latest Coverage
                  </Link>
                  <Link
                    href="/about"
                    className="text-lg font-medium text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      {featuredArticles.length > 0 && (
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gray-300 max-w-32"></div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight title-overlap">
                  Featured Articles
                </h2>
                <div className="flex-1 h-px bg-gray-300 max-w-32"></div>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Birdie worthy stories, handpicked for you.
              </p>
            </div>

            {/* Featured Articles - Horizontal scroll when hamburger menu is active, grid on xl screens and up */}
            <div className="flex gap-6 overflow-x-auto pb-4 xl:grid xl:grid-cols-3 xl:gap-8 xl:overflow-visible xl:pb-0" style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db #f3f4f6' }}>
              {featuredArticles.map((article, index) => (
                <article key={article.id} className="flex-shrink-0 w-80 xl:w-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 group">
                  {/* Image */}
                  <div className="aspect-[4/3] bg-gray-200">
                    <Link href={`/news/${article.slug}`}>
                      <Image
                        src={article.image.src}
                        alt={article.image.alt}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        priority={index < 3}
                      />
                    </Link>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category */}
                    <span className="inline-block text-primary-500 font-semibold text-sm uppercase tracking-wide mb-3">
                      {article.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2">
                      <Link
                        href={`/news/${article.slug}`}
                        className="group-hover:text-primary-500 transition-colors"
                      >
                        {article.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>By {article.author}</span>
                        <span>•</span>
                        <span>{formatDate(article.date)}</span>
                      </div>
                      <Link
                        href={`/news/${article.slug}`}
                        className="inline-flex items-center text-primary-500 hover:text-primary-600 font-semibold text-sm transition-colors"
                      >
                        Read More
                        <svg
                          className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Spotify Embed Section */}
      <section className="pt-8 pb-16 lg:pt-12 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex-1 h-px bg-gray-300 max-w-32"></div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight title-overlap">
                Listen to Our Podcast
              </h2>
              <div className="flex-1 h-px bg-gray-300 max-w-32"></div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your go-to LPGA podcast for women’s golf news, featuring tournament breakdowns, player interviews, and behind-the-scenes stories from the LPGA Tour.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <SpotifyEmbed />
          </div>
        </div>
      </section>

                           {/* Follow Along Section */}
                 <section className="bg-primary-500 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Socials />
        </div>
      </section>

                           {/* Call to Action */}
                                 <section className="bg-secondary-500 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gray-200 max-w-32"></div>
                                                           <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight title-overlap">
                  Become Part of the Birdie Briefing Community
                </h2>
              <div className="flex-1 h-px bg-gray-200 max-w-32"></div>
            </div>
                                                   <p className="text-xl text-gray-200 leading-relaxed mb-12 max-w-3xl mx-auto">
              Connect with golf fans, follow tournament action, and join a community celebrating women's golf.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="https://discord.com/invite/rqB6T7uVtN"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-500 px-8 py-4 rounded-md font-medium text-lg border border-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300 hover:-translate-y-1 inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                </svg>
                Join Discord
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
