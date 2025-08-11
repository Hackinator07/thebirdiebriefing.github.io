'use client';

import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

// Custom Bluesky icon component
const BlueskyIcon = ({ size = 32 }: { size?: number }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M6.335 5.144c-1.654-1.199-4.335-2.127-4.335.826c0 .59.35 4.953.556 5.661c.713 2.463 3.13 2.75 5.444 2.369c-4.045.665-4.889 3.208-2.667 5.41c1.03 1.018 1.913 1.59 2.667 1.59c2 0 3.134-2.769 3.5-3.5c.333-.667.5-1.167.5-1.5c0 .333.167.833.5 1.5c.366.731 1.5 3.5 3.5 3.5c.754 0 1.637-.571 2.667-1.59c2.222-2.203 1.378-4.746-2.667-5.41c2.314.38 4.73.094 5.444-2.369c.206-.708.556-5.072.556-5.661c0-2.953-2.68-2.025-4.335-.826c-2.293 1.662-4.76 5.048-5.665 6.856c-.905-1.808-3.372-5.194-5.665-6.856z" />
	</svg>
);

const SOCIALS = [
	{ href: 'https://www.instagram.com/birdiebriefing/', label: 'Instagram', icon: <FaInstagram size={32} /> },
	{ href: 'https://bsky.app/profile/birdiebriefing.bsky.social', label: 'Bluesky', icon: <BlueskyIcon size={32} /> },
	{ href: 'https://www.facebook.com/birdiebriefing', label: 'Facebook', icon: <FaFacebook size={32} /> },
	{ href: 'https://www.youtube.com/channel/UCW2vyHWE3bMfum9FPq-8xGw', label: 'YouTube', icon: <FaYoutube size={32} /> },
];

export default function Socials({ className = '' }: { className?: string }) {
	return (
		<section
			className={`bg-white text-gray-900 rounded-xl shadow-sm ${className}`}
			style={{
				maxWidth: 600,
				margin: '0 auto',
				textAlign: 'center',
				padding: '2rem 1rem',
			}}
		>
			<h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Follow Along</h2>
			<p style={{ marginBottom: '2rem', color: '#6b7280', fontSize: '1.1rem' }}>
				Join the Birdie Briefing community on social for the latest updates, LPGA news, and to connect with fellow golf enthusiasts!
			</p>
			<div style={{ display: 'flex', justifyContent: 'center', gap: 32 }}>
				{SOCIALS.map((s) => (
					<a
						key={s.href}
						href={s.href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={s.label}
						style={{ color: 'black', transition: 'color 0.2s' }}
					>
						{s.icon}
					</a>
				))}
			</div>
		</section>
	);
}
