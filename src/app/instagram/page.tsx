import InstagramFeed from '@/components/InstagramFeed';
import { getInstagramPosts, getFeaturedInstagramPosts, getInstagramPostsByCategory } from '@/lib/data';

export default function InstagramPage() {
  const allPosts = getInstagramPosts();
  const featuredPosts = getFeaturedInstagramPosts();
  const tournamentPosts = getInstagramPostsByCategory('tournament');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Instagram Feed</h1>

      {/* Featured Posts Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Featured Posts</h2>
        <InstagramFeed
          posts={featuredPosts}
          maxPosts={3}
          className="mb-8"
        />
      </section>

      {/* Tournament Posts Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Tournament Coverage</h2>
        <InstagramFeed
          posts={tournamentPosts}
          className="mb-8"
        />
      </section>

      {/* All Posts Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">All Posts</h2>
        <InstagramFeed
          posts={allPosts}
          maxPosts={6}
          className="mb-8"
        />
      </section>
    </div>
  );
}
