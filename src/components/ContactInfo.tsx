import { getConfig, getAllAuthors } from '@/lib/data';

export default function ContactInfo() {
  const config = getConfig();
  const authors = getAllAuthors();

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
      <div className="space-y-2 text-gray-700 mb-6">
        <p><strong>Site:</strong> {config.siteName}</p>
      </div>

      <h4 className="text-md font-semibold text-gray-900 mb-3">Authors & Their Callouts</h4>
      <div className="space-y-4">
        {Object.entries(authors).map(([authorId, author]) => (
          <div key={authorId} className="border border-gray-200 rounded-lg p-3 bg-white">
            <h5 className="font-medium text-gray-800 mb-2">{author.name}</h5>
            <p className="text-sm text-gray-600 mb-2">{author.email}</p>
            <div className="text-xs text-gray-500">
              <strong>Callout Types:</strong> {Object.keys(author.callouts).join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
