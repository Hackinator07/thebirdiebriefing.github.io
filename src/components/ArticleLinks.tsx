interface Link {
  text: string;
  url: string;
  description: string;
}

interface ArticleLinksProps {
  title: string;
  links: Link[];
}

export default function ArticleLinks({ title, links }: ArticleLinksProps) {
  return (
    <section className="my-12">
      <div className="bg-gray-50 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>
        <div className="grid gap-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-500 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {link.text}
                  </h4>
                  <p className="text-gray-600 text-sm mt-1">{link.description}</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
