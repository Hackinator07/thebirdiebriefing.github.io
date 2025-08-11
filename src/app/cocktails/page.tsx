import Link from 'next/link';

export const metadata = {
  title: 'Cocktails - The Birdie Briefing',
  description: 'Discover delicious cocktails perfect for the golf course or home entertaining from The Birdie Briefing.',
};

export default function CocktailsPage() {
  const categories = [
    {
      name: 'On The Course',
      description: 'Refreshing drinks perfect for enjoying during your round of golf',
      slug: 'on-the-course',
      image: '/images/cocktails/on-the-course.jpg',
      featuredDrinks: ['Arnold Palmer', 'Golf Cart Cooler', 'Fairway Fizz']
    },
    {
      name: 'At Home',
      description: 'Craft cocktails to make in your own kitchen and enjoy with friends',
      slug: 'at-home',
      image: '/images/cocktails/at-home.jpg',
      featuredDrinks: ['Golf Club Manhattan', 'Putting Green Punch', 'Hole-in-One Highball']
    },
    {
      name: 'Nineteenth Hole',
      description: 'Celebratory drinks for the clubhouse after a great round',
      slug: 'nineteenth-hole',
      image: '/images/cocktails/nineteenth-hole.jpg',
      featuredDrinks: ['Victory Vodka', 'Eagle Elixir', 'Birdie Bourbon']
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-primary-500 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold title-overlap mb-6">
              Golf Course Cocktails
            </h1>
            <p className="text-xl lg:text-2xl leading-relaxed text-gray-100">
              Perfect drinks for every part of your golf experience
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div key={category.slug} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Category Image */}
                <div className="aspect-[4/3] bg-gray-200">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Category Image</span>
                  </div>
                </div>

                {/* Category Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      <Link href={`/cocktails/${category.slug}`} className="hover:text-primary-500 transition-colors">
                        {category.name}
                      </Link>
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {category.description}
                    </p>
                  </div>

                  {/* Featured Drinks */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Featured Drinks</h3>
                    <ul className="space-y-2">
                      {category.featuredDrinks.map((drink, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                          {drink}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <Link
                      href={`/cocktails/${category.slug}`}
                      className="w-full bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium text-center block"
                    >
                      View {category.name} Drinks
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-300 max-w-32"></div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Featured This Month
              </h2>
              <div className="flex-1 h-px bg-gray-300 max-w-32"></div>
            </div>
            <p className="text-xl text-gray-600">
              Our top picks for the perfect golf course refreshment
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-[4/3] bg-gray-200">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Featured Drink Image</span>
                </div>
              </div>
              <div className="p-8 lg:p-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  <Link href="/cocktails/nineteenth-hole" className="hover:text-primary-500 transition-colors">
                    The Perfect Nineteenth Hole
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">Celebratory Drinks</p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  After a great round of golf, nothing beats the perfect celebratory drink. Our Nineteenth Hole
                  collection features sophisticated cocktails that are perfect for toasting your achievements,
                  whether you're celebrating a personal best or just enjoying the camaraderie of the game.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/cocktails/nineteenth-hole"
                    className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium text-center"
                  >
                    Explore Nineteenth Hole
                  </Link>
                  <Link
                    href="/cocktails/on-the-course"
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-center"
                  >
                    On The Course Drinks
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
