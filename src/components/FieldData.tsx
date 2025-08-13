interface FieldDataProps {
  title: string;
  data: {
    pastChampions?: string[];
    lpga2025Winners?: string[];
    rolexTop25?: string[];
    rookies2025?: string[];
    sponsorExemptions?: string[];
    mondayQualifiers?: string[];
  };
}

export default function FieldData({ title, data }: FieldDataProps) {
  const sections = [
    { key: 'pastChampions', label: 'Past Champions', data: data.pastChampions },
    { key: 'lpga2025Winners', label: 'LPGA 2025 Winners', data: data.lpga2025Winners },
    { key: 'rolexTop25', label: 'Rolex Rankings Top 25', data: data.rolexTop25 },
    { key: 'rookies2025', label: '2025 Rookies', data: data.rookies2025 },
    { key: 'sponsorExemptions', label: 'Sponsor Exemptions', data: data.sponsorExemptions },
    { key: 'mondayQualifiers', label: 'Monday Qualifiers', data: data.mondayQualifiers },
  ].filter(section => section.data && section.data.length > 0);

  return (
    <section className="my-12">
      <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <div key={section.key} className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">{section.label}</h4>
              <ul className="space-y-2">
                {section.data?.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700 pl-4 border-l-2 border-gray-200 hover:border-primary-500 transition-colors duration-200">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
