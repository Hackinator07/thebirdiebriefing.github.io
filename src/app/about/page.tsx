import Link from 'next/link';
import SpotifyEmbed from '@/components/SpotifyEmbed';

export const metadata = {
  title: 'About Us - The Birdie Briefing',
  description: 'Learn about The Birdie Briefing, founded in 2025 to amplify the stories, achievements, and voices of women in golf.',
};

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-7xl font-bold title-overlap mb-8">
              About The Birdie Briefing
            </h1>
            <p className="text-xl lg:text-2xl leading-relaxed text-gray-100 mb-12 max-w-3xl mx-auto">
              Your premier source for LPGA women&apos;s golf news, tournament coverage, and exclusive content.
              Celebrating the stories, achievements, and voices of women in golf.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-cream-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
              Our Mission
            </h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="text-xl leading-relaxed mb-6">
                The Birdie Briefing is dedicated to amplifying the voices and stories of women in golf.
                We believe that women&apos;s golf deserves the same level of coverage, respect, and
                celebration as men&apos;s golf.
              </p>
              <p className="text-xl leading-relaxed mb-6">
                Our platform provides comprehensive coverage of LPGA tournaments, player spotlights,
                course reviews, and industry insights. We go beyond the scores to share the human
                stories behind the game - the challenges, triumphs, and personal journeys of the
                incredible women who make golf what it is today.
              </p>
              <p className="text-xl leading-relaxed">
                Whether you&apos;re a seasoned golfer, a casual fan, or just discovering the
                sport, The Birdie Briefing is your gateway to the vibrant world of women&apos;s golf.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Spotify Podcast Section */}
      <section className="py-16 lg:py-24">
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


      {/* Contact Section */}
      <section className="bg-cream-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Have a story idea, feedback, or just want to connect? We&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact-us"
                className="bg-primary-500 text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-primary-600 transition-all duration-300 hover:-translate-y-1"
              >
                Contact Us
              </Link>
              <Link
                href="/news"
                className="text-lg font-medium text-primary-500 hover:text-primary-600 transition-colors"
              >
                Read Our Stories →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
