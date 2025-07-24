import { getCourseBySlug, getStates } from '@/lib/data';
import { notFound } from 'next/navigation';

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const states = getStates();
  const slugs = states.flatMap(state =>
    state.courses.map(course => ({ slug: course.slug }))
  );
  return slugs;
}

export async function generateMetadata({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return {
      title: 'Course Not Found - Golf Girl Gazette',
      description: 'The requested golf course could not be found.',
    };
  }

  return {
    title: `${course.name} - Golf Girl Gazette`,
    description: course.description,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              {course.name}
            </h1>
            <p className="text-xl lg:text-2xl leading-relaxed text-gray-100">
              {course.location}
            </p>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Overview</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {course.content.overview}
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {course.content.details}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {course.content.conclusion}
                </p>
              </div>
            </div>

            {/* Key Information */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">{course.phone}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">{course.address}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Website</h4>
                    <a
                      href={course.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-500 hover:text-primary-600"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Access */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Location */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Location</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
                  <p className="text-gray-600">{course.address}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
                  <p className="text-gray-600">Phone: {course.phone}</p>
                </div>
              </div>
            </div>

            {/* Access */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Access</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Getting There</h3>
                  <p className="text-gray-600 mb-4">
                    {course.access.gettingThere}
                  </p>
                  <ul className="text-gray-600 space-y-1">
                    {course.access.amenities.map((amenity, index) => (
                      <li key={index}>• {amenity}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Best Times to Visit</h3>
                  <p className="text-gray-600">
                    {course.access.bestTimes}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Nearby Attractions</h3>
                  <ul className="text-gray-600 space-y-1">
                    {course.access.nearbyAttractions.map((attraction, index) => (
                      <li key={index}>• {attraction}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary-500 text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Play?</h2>
          <p className="text-xl mb-8 text-gray-100">
            Book your tee time or visit the official website for more information about {course.name}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={course.website}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary-500 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium text-lg"
            >
              Visit Official Website
            </a>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-primary-500 transition-colors duration-200 font-medium text-lg">
              Book Tee Time
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
