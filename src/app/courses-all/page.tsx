import Link from 'next/link';
import { getStates, getFeaturedCourse } from '@/lib/data';

export const metadata = {
  title: 'Golf Courses - The Birdie Briefing',
  description: 'Discover exceptional golf courses across Minnesota, Wisconsin, Michigan, and Ontario with detailed reviews and course information.',
};

export default function CoursesAllPage() {
  const states = getStates();
  const featuredCourse = getFeaturedCourse();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-primary-500 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold title-overlap mb-6">
              Golf Courses
            </h1>
            <p className="text-xl lg:text-2xl leading-relaxed text-gray-100">
              Discover exceptional golf courses across Minnesota, Wisconsin, Michigan, and Ontario
            </p>
          </div>
        </div>
      </section>

      {/* Courses by State */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {states.map((state) => (
            <div key={state.name} id={state.name.toLowerCase()} className="mb-16 scroll-mt-20">
              <div className="mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {state.name} Golf Courses
                </h2>
                <p className="text-lg text-gray-600">
                  Explore the finest golf courses in {state.name}, from historic championship venues to hidden gems.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {state.courses.map((course) => (
                  <div key={`${state.name.toLowerCase()}-${course.slug}`} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    {/* Course Image */}
                    <div className="aspect-[16/10] bg-gray-200">
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Course Image</span>
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        <Link href={`/courses/${course.slug}`} className="hover:text-primary-500 transition-colors">
                          {course.name}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{course.location}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {course.description}
                      </p>
                      <div className="mt-4">
                        <Link
                          href={`/courses/${course.slug}`}
                          className="text-primary-500 hover:text-primary-600 font-medium text-sm inline-flex items-center"
                        >
                          View Course Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Course */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Course
            </h2>
            <p className="text-xl text-gray-600">
              This month's spotlight on an exceptional golf destination
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-[4/3] bg-gray-200">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Featured Course Image</span>
                </div>
              </div>
              <div className="p-8 lg:p-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  <Link href={`/courses/${featuredCourse.slug}`} className="hover:text-primary-500 transition-colors">
                    {featuredCourse.name}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">{featuredCourse.location}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredCourse.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/courses/${featuredCourse.slug}`}
                    className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium text-center"
                  >
                    View Course Details
                  </Link>
                  <a
                    href={featuredCourse.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-center"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
