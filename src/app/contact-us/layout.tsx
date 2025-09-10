import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - The Birdie Briefing',
  description: 'Get in touch with The Birdie Briefing team for inquiries, partnerships, press opportunities, and more.',
  openGraph: {
    title: 'Contact Us - The Birdie Briefing',
    description: 'Get in touch with The Birdie Briefing team for inquiries, partnerships, press opportunities, and more.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/contact-us`,
    siteName: 'The Birdie Briefing',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Contact The Birdie Briefing',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
