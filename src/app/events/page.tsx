import { getEvents, formatDate } from '@/lib/data';

export const metadata = {
  title: 'Events - Golf Girl Gazette',
  description: 'Join Golf Girl Gazette at extraordinary golf courses across Wisconsin, Michigan, Minnesota, and Ontario.',
};

export default function EventsPage() {
  const events = getEvents();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              Golf Girl Gazette Events
            </h1>
            <p className="text-xl lg:text-2xl leading-relaxed text-gray-100">
              Join us at extraordinary courses across Wisconsin, Michigan, Minnesota, and Ontario
            </p>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Event Image */}
                <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Event Image</span>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-8">
                  {/* Event Header */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
                      <span className="bg-primary-100 text-primary-800 text-xs font-medium px-3 py-1 rounded-full">
                        {event.status}
                      </span>
                    </div>
                    <time dateTime={event.date} className="text-lg text-gray-600 font-medium">
                      {formatDate(event.date)}
                    </time>
                  </div>

                  {/* Location */}
                  <div className="mb-6">
                    <div className="flex items-center text-gray-600 mb-2">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span className="font-medium">{event.location}</span>
                    </div>
                    <p className="text-gray-600">{event.course}</p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <span>Format: {event.format}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                      </svg>
                      <span>Capacity: {event.capacity} players</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                      </svg>
                      <span>Entry Fee: ${event.entryFee}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="flex space-x-4">
                    {event.status === 'Registration Open' && (
                      <button className="flex-1 bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium">
                        Register Now
                      </button>
                    )}
                    {event.status === 'Registration Closed' && (
                      <button className="flex-1 bg-gray-300 text-gray-600 px-6 py-3 rounded-lg cursor-not-allowed font-medium">
                        Registration Closed
                      </button>
                    )}
                    {event.status === 'Coming Soon' && (
                      <button className="flex-1 bg-secondary-500 text-white px-6 py-3 rounded-lg hover:bg-secondary-600 transition-colors duration-200 font-medium">
                        Get Notified
                      </button>
                    )}
                    <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
