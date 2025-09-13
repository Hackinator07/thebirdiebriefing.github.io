import Link from 'next/link';
import NewsletterSignup from './NewsletterSignup';
import { FaInstagram, FaYoutube, FaEnvelope } from 'react-icons/fa';

interface FooterProps {
  onToggleScores?: () => void;
}

export default function Footer({ onToggleScores }: FooterProps) {
  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'News', href: '/news' },
      { name: 'Podcast', href: '/podcast' },
      { name: 'Rankings', href: '/rankings' },
      { name: 'Schedule', href: '/schedule' },
      { name: 'About Us', href: '/about' },
      { name: 'Contact Us', href: '/contact-us' },
      { name: 'Scorecard', href: undefined },
    ],
    social: [
      {
        name: 'Instagram',
        href: 'https://www.instagram.com/birdiebriefing/',
        icon: (props: React.SVGProps<SVGSVGElement>) => <FaInstagram {...props} />,
      },
      {
        name: 'Bluesky',
        href: 'https://bsky.app/profile/birdiebriefing.bsky.social',
        icon: (props: React.SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M6.335 5.144c-1.654-1.199-4.335-2.127-4.335.826c0 .59.35 4.953.556 5.661c.713 2.463 3.13 2.75 5.444 2.369c-4.045.665-4.889 3.208-2.667 5.41c1.03 1.018 1.913 1.59 2.667 1.59c2 0 3.134-2.769 3.5-3.5c.333-.667.5-1.167.5-1.5c0 .333.167.833.5 1.5c.366.731 1.5 3.5 3.5 3.5c.754 0 1.637-.571 2.667-1.59c2.222-2.203 1.378-4.746-2.667-5.41c2.314.38 4.73.094 5.444-2.369c.206-.708.556-5.072.556-5.661c0-2.953-2.68-2.025-4.335-.826c-2.293 1.662-4.76 5.048-5.665 6.856c-.905-1.808-3.372-5.194-5.665-6.856z" />
          </svg>
        ),
      },
      {
        name: 'YouTube',
        href: 'https://www.youtube.com/channel/UCW2vyHWE3bMfum9FPq-8xGw',
        icon: (props: React.SVGProps<SVGSVGElement>) => <FaYoutube {...props} />,
      },
      {
        name: 'Email',
        href: 'mailto:contact@birdiebriefing.com',
        icon: (props: React.SVGProps<SVGSVGElement>) => <FaEnvelope {...props} />,
      },
    ],
  };

  return (
    <footer className="text-white" style={{backgroundColor: '#004677'}}>
      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <h3 className="text-2xl font-bold text-white mb-4 font-heading">The Birdie Briefing</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Your premier source for LPGA women's golf news, tournament coverage, and exclusive content.
              Celebrating the stories, achievements, and voices of women in golf.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  {!item.href ? (
                    <button
                      onClick={onToggleScores}
                      className="text-gray-300 hover:text-white transition-colors duration-200 relative group cursor-pointer"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 relative group"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup Section - Spans 6 columns now */}
          <div className="lg:col-span-6">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-4">
              Get the latest LPGA news, tournament updates, and exclusive content delivered to your inbox.
            </p>
            <NewsletterSignup />
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 The Birdie Briefing. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-400 text-sm">
                Website developed by{' '}
                <a
                  href="https://foxsideweb.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 relative group"
                >
                  Foxside Web Development
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
