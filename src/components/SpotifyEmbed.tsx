'use client';

import { Spotify } from 'react-spotify-embed';

export default function SpotifyEmbed() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            The Birdie Briefing Playlist
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tune in to our curated playlist featuring the best golf vibes,
            perfect for your pre-round warmup or post-game relaxation.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center">
            <Spotify
              link="https://open.spotify.com/album/0fUy6IdLHDpGNwavIlhEsl?si=mTiITmlHQpaGkoivGTv8Jw"
            />
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Follow us on Spotify for more golf-inspired playlists and music recommendations
          </p>
        </div>
      </div>
    </section>
  );
}
