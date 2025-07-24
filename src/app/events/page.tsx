import { getEvents, formatDate } from '@/lib/data';

export const metadata = {
  title: 'Events - Golf Girl Gazette',
  description: 'Join us for exclusive golf events, clinics, and tournaments featuring LPGA professionals.',
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
              Golf Events
            </h1>
            <p className="text-xl lg:text-2xl leading-relaxed text-gray-100">
              Join us for exclusive golf events, clinics, and tournaments featuring LPGA professionals
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
                        Upcoming
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
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                      </svg>
                      <span>Price: {event.price}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="flex space-x-4">
                    <button className="flex-1 bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium">
                      Register Now
                    </button>
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
