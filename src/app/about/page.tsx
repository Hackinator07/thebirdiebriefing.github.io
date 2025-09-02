import Link from 'next/link';
import Image from 'next/image';
import VideoBackground from '@/components/VideoBackground';
import MarkdownContent from '@/components/MarkdownContent';
import { getMission, getTeamMember, getContact } from '@/lib/data';

export const metadata = {
  title: 'About Us - The Birdie Briefing',
  description: 'Learn about The Birdie Briefing, founded in 2025 to amplify the stories, achievements, and voices of women in golf.',
  openGraph: {
    title: 'About Us - The Birdie Briefing',
    description: 'Learn about The Birdie Briefing, founded in 2025 to amplify the stories, achievements, and voices of women in golf.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/about`,
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
    title: 'About Us - The Birdie Briefing',
    description: 'Learn about The Birdie Briefing, founded in 2025 to amplify the stories, achievements, and voices of women in golf.',
    images: [`${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/images/logo.png`],
  },
};

export default async function About() {
  const mission = await getMission();
  const marie = await getTeamMember('marie');
  const george = await getTeamMember('george');
  const contact = await getContact();

  // Handle null cases
  if (!mission || !marie || !george || !contact) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Content Not Found</h1>
          <p className="text-gray-600">Unable to load about page content.</p>
        </div>
      </div>
    );
  }

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
                  <span className="text-primary-500">{mission.title.split(' ')[0]}</span>{' '}
                  <span className="text-secondary-500">{mission.title.split(' ').slice(1).join(' ')}</span>
                </h1>
                <div className="text-lg leading-relaxed text-gray-700 max-w-4xl mx-auto">
                  {mission.content.map((paragraph, index) => (
                    <MarkdownContent
                      key={index}
                      content={paragraph}
                      className={index < mission.content.length - 1 ? "mb-4" : ""}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}

      {/* Marie Hack Section */}
      {marie && (
        <section id="marie-hack" className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              {/* Name Header */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-gray-300 max-w-32"></div>
                  <h2 className="text-5xl font-bold text-gray-900 leading-tight">{marie.name}</h2>
                  <div className="flex-1 h-px bg-gray-300 max-w-32"></div>
                </div>
                <p className="text-2xl text-gray-600">{marie.title}</p>
              </div>

              {/* Image and Bio Content */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                {/* Image */}
                <div className="w-full lg:w-1/3 flex-shrink-0">
                  <div className="w-full max-w-sm mx-auto">
                    <Image
                      src={marie.image}
                      alt={marie.imageAlt}
                      width={400}
                      height={500}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                </div>

                {/* Bio Content */}
                <div className="w-full lg:w-2/3">
                  <div className="prose prose-lg text-gray-600">
                    {marie.bio.map((paragraph, index) => (
                      <MarkdownContent
                        key={index}
                        content={paragraph}
                        className={index < marie.bio.length - 1 ? "mb-6" : ""}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* George Hack Section */}
      {george && (
        <section id="george-hack" className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              {/* Name Header */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-gray-300 max-w-32"></div>
                  <h2 className="text-5xl font-bold text-gray-900 leading-tight">{george.name}</h2>
                  <div className="flex-1 h-px bg-gray-300 max-w-32"></div>
                </div>
                <p className="text-2xl text-gray-600">{george.title}</p>
              </div>

              {/* Image and Bio Content */}
              <div className="flex flex-col lg:flex-row-reverse items-center lg:items-start gap-8">
                {/* Image */}
                <div className="w-full lg:w-1/3 flex-shrink-0">
                  <div className="w-full max-w-sm mx-auto">
                    <Image
                      src={george.image}
                      alt={george.imageAlt}
                      width={400}
                      height={500}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                </div>

                {/* Bio Content */}
                <div className="w-full lg:w-2/3">
                  <div className="prose prose-lg text-gray-600">
                    {george.bio.map((paragraph, index) => (
                      <MarkdownContent
                        key={index}
                        content={paragraph}
                        className={index < george.bio.length - 1 ? "mb-6" : ""}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="bg-secondary-500 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gray-200 max-w-32"></div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                {contact.title}
              </h2>
              <div className="flex-1 h-px bg-gray-200 max-w-32"></div>
            </div>
            <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto">
              {contact.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href={contact.buttonLink}
                className="bg-primary-500 text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-primary-600 transition-all duration-300 hover:-translate-y-1"
              >
                {contact.buttonText}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
