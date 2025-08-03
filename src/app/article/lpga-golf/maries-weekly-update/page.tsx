import { getLatestWeeklyUpdate, formatDate } from '@/lib/data';

export const metadata = {
  title: "Marie's Weekly Update - The Birdie Briefing",
  description: "Marie Johnson's weekly insights and analysis on the latest developments in women's professional golf.",
};

export default function MariesWeeklyUpdatePage() {
  const update = getLatestWeeklyUpdate();

  if (!update) {
    return (
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Weekly Update Not Found</h1>
          <p className="text-gray-600">The weekly update you're looking for is not available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-primary-500 text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold title-overlap mb-6">
            Marie's Weekly Update
          </h1>
          <p className="text-xl lg:text-2xl leading-relaxed text-gray-100">
            Expert insights and analysis on the latest developments in women's professional golf
          </p>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <article className="prose prose-lg max-w-none">
            {/* Article Header */}
            <header className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">M</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{update.title}</h2>
                    <p className="text-gray-600">By {update.author}</p>
                  </div>
                </div>
                <time dateTime={update.date} className="text-gray-500 font-medium">
                  {formatDate(update.date)}
                </time>
              </div>
            </header>

            {/* Article Body */}
            <div className="text-gray-800 leading-relaxed">
              {update.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">M</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{update.author}</p>
                    <p className="text-sm text-gray-600">The Birdie Briefing Contributor</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <p>Published {formatDate(update.date)}</p>
                </div>
              </div>
            </footer>
          </article>
        </div>
      </section>
    </div>
  );
}
