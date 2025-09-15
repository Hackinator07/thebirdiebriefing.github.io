interface FieldTableProps {
  title: string;
  headers: string[];
  data: string[][];
}

export default function FieldTable({ title, headers, data }: FieldTableProps) {
  return (
    <section className="my-12" aria-labelledby={`table-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="bg-gray-50 rounded-lg p-4 sm:p-8 border border-gray-200">
        <h3 id={`table-${title.toLowerCase().replace(/\s+/g, '-')}`} className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 font-lock-2xl">{title}</h3>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200" role="table" aria-label={title}>
              <thead className="bg-gray-50">
                <tr role="row">
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      role="columnheader"
                      scope="col"
                      className={`px-2 sm:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-lock-table-header ${
                        // Allow wrapping for longer headers like "Prize Money"
                        header.length > 8 ? 'whitespace-normal' : 'whitespace-nowrap'
                      } ${
                        // Optimize column widths - check if this is a golf course table (has "Hole" as first header)
                        headers[0] === 'Hole' ? (
                          index === 0 ? 'w-20' : // Hole
                          index === headers.length - 1 ? 'w-16' : // Out/Total column
                          'w-12' // Individual hole columns
                        ) : (
                          // Original tournament table widths
                          index === 0 ? 'w-16' : // Position
                          index === 1 ? 'w-32' : // Player name
                          index === 2 ? 'w-16' : // To Par
                          index === 3 ? 'w-24' : // Scores
                          index === 4 ? 'w-16' : // Total
                          index === 5 ? 'w-16' : // Points
                          index === 6 ? 'w-24' : // Prize Money
                          ''
                        )
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50" role="row">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        role="cell"
                        className={`px-2 sm:px-3 py-4 text-sm text-gray-900 font-lock-table ${
                          // Allow wrapping for longer content like player names and prize money
                          cellIndex === 1 || cellIndex === 6 ? 'whitespace-normal' : 'whitespace-nowrap'
                        } ${
                          // Optimize column widths to match headers - check if this is a golf course table
                          headers[0] === 'Hole' ? (
                            cellIndex === 0 ? 'w-20' : // Hole
                            cellIndex === headers.length - 1 ? 'w-16' : // Out/Total column
                            'w-12' // Individual hole columns
                          ) : (
                            // Original tournament table widths
                            cellIndex === 0 ? 'w-16' : // Position
                            cellIndex === 1 ? 'w-32' : // Player name
                            cellIndex === 2 ? 'w-16' : // To Par
                            cellIndex === 3 ? 'w-24' : // Scores
                            cellIndex === 4 ? 'w-16' : // Total
                            cellIndex === 5 ? 'w-16' : // Points
                            cellIndex === 6 ? 'w-24' : // Prize Money
                            ''
                          )
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
