import Link from 'next/link';
import Image from 'next/image';
import VideoBackground from '@/components/VideoBackground';

export const metadata = {
  title: 'About Us - The Birdie Briefing',
  description: 'Learn about The Birdie Briefing, founded in 2025 to amplify the stories, achievements, and voices of women in golf.',
};

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section - Matching Podcast Page */}
      <section className="relative overflow-hidden">
        {/* Video Background */}
        <VideoBackground />

        {/* Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            {/* Text Content with White Background */}
            <div className="bg-white rounded-lg p-8 lg:p-12">
              <div className="text-center">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  <span className="text-primary-500">About</span>{' '}
                  <span className="text-secondary-500">Us</span>
                </h1>
                <div className="text-lg leading-relaxed text-gray-700 max-w-4xl mx-auto">
                  <p className="mb-4">
                    The Birdie Briefing is dedicated to amplifying the voices and stories of women in golf. We believe that women's golf deserves the same level of coverage, respect, and celebration as men's golf.
                  </p>
                  <p className="mb-4">
                    Our platform provides comprehensive coverage of LPGA tournaments, player spotlights, course reviews, and industry insights. We go beyond the scores to share the human stories behind the game - the challenges, triumphs, and personal journeys of the incredible women who make golf what it is today.
                  </p>
                  <p>
                    Whether you're a seasoned golfer, a casual fan, or just discovering the sport, The Birdie Briefing is your gateway to the vibrant world of women's golf.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="george-hack" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section with Full-Width Image */}
          <div className="relative mb-16">
            {/* Full-Width Image Container */}
            <div className="w-full mb-8">
              <div className="w-full h-96 bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                <Image
                  src="/images/articles/hull.png"
                  alt="George Hack"
                  width={1200}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Headlines */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gray-300 max-w-32"></div>
                <h2 className="text-5xl font-bold text-gray-900 leading-tight">George Hack</h2>
                <div className="flex-1 h-px bg-gray-300 max-w-32"></div>
              </div>
              <p className="text-2xl text-gray-600">Founder & Host</p>
            </div>
          </div>

          {/* Bio Content */}
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="text-lg leading-relaxed mb-6">
                I was raised on a farm in the Great Lakes, nestled beside a tributary of the Root River. My first swings came playing for my high school golf team and I practiced by carrying my clubs on the wagon, hitting shots over our farm&apos;s creek as swallows swooped after my secondhand golf balls. In college, my focus shifted to literature and writing, putting golf aside until a new round brought me back to the game.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                After graduate school, I moved to Seoul, South Korea, where screen golf was everywhere. Golf was more than a game there. Golf was a social fabric, a way to connect with friends and total strangers alike. The passion and joy I found in those indoor rounds, combined with watching Korean professional golfers revived my love for the sport.
              </p>
              <p className="text-lg leading-relaxed">
                LPGA players are the world&apos;s finest golfers. Athletes whose skill, resilience, and creativity command recognition across sport. Supporting women&apos;s golf to me means more than celebrating victories; it&apos;s about highlighting their stories, elevating their achievements, and confronting the persistent inequalities in golf culture. These remarkable individuals bring diversity and strength to the game, and I&apos;m honored to bring that passion to The Birdie Briefing as I help share their voices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-secondary-500 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gray-200 max-w-32"></div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                Get in Touch
              </h2>
              <div className="flex-1 h-px bg-gray-200 max-w-32"></div>
            </div>
            <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto">
              Have a story idea, feedback, or just want to connect? We&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact-us"
                className="bg-primary-500 text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-primary-600 transition-all duration-300 hover:-translate-y-1"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
