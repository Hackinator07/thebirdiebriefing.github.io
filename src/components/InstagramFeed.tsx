'use client';

import { useState, useEffect } from 'react';
import InstagramEmbed from './InstagramEmbed';

interface InstagramPost {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
}

interface InstagramFeedProps {
  posts: InstagramPost[];
  showFeaturedOnly?: boolean;
  category?: string;
  maxPosts?: number;
  className?: string;
}

export default function InstagramFeed({
  posts,
  showFeaturedOnly = false,
  category,
  maxPosts,
  className = ''
}: InstagramFeedProps) {
  const [filteredPosts, setFilteredPosts] = useState<InstagramPost[]>([]);

  useEffect(() => {
    let filtered = [...posts];

    // Filter by featured posts if requested
    if (showFeaturedOnly) {
      filtered = filtered.filter(post => post.featured);
    }

    // Filter by category if specified
    if (category) {
      filtered = filtered.filter(post => post.category === category);
    }

    // Limit number of posts if specified
    if (maxPosts) {
      filtered = filtered.slice(0, maxPosts);
    }

    setFilteredPosts(filtered);
  }, [posts, showFeaturedOnly, category, maxPosts]);

  if (filteredPosts.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-500">No Instagram posts found.</p>
      </div>
    );
  }

  return (
    <div className={`instagram-feed ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="instagram-post">
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.description}</p>
            </div>
            <InstagramEmbed url={post.url} />
          </div>
        ))}
      </div>
    </div>
  );
}
