interface FieldDataProps {
  title: string;
  data: Record<string, string[]>;
  backgroundColor?: string;
}

export default function FieldData({ title, data, backgroundColor = 'bg-gray-50' }: FieldDataProps) {
  // Create sections dynamically from the data object
  const sections = Object.entries(data)
    .filter(([, value]) => Array.isArray(value) && value.length > 0)
    .map(([key, value]) => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
      data: value as string[]
    }));

  // Use primary styling if bg-primary-50 is specified
  const isPrimary = backgroundColor === 'bg-primary-50';
  const containerClass = isPrimary
    ? 'bg-primary-50 rounded-lg p-8 border border-primary-200'
    : `${backgroundColor} rounded-lg p-8 border border-gray-200`;

  const cardClass = isPrimary
    ? 'bg-white rounded-lg p-6 border border-primary-100'
    : 'bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200';

  const titleClass = isPrimary
    ? 'text-lg font-semibold text-primary-700 mb-3'
    : 'text-lg font-semibold text-gray-800 mb-4';

  return (
    <section className="my-12">
      <div className={containerClass}>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>
        <div className={isPrimary ? 'space-y-6' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
          {sections.map((section) => (
            <div key={section.key} className={cardClass}>
              <h4 className={titleClass}>{section.label}</h4>
              <div className={isPrimary ? 'space-y-2' : ''}>
                {isPrimary ? (
                  <div className="space-y-2">
                    {section.data?.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {section.data?.map((item, index) => (
                      <li key={index} className="text-sm text-gray-700 pl-4 border-l-2 border-gray-200 hover:border-primary-500 transition-colors duration-200">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
