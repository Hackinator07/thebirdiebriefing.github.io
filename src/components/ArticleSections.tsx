import ArticleLinks from './ArticleLinks';
import TVSchedule from './TVSchedule';
import FieldData from './FieldData';
import FieldTable from './FieldTable';

interface Section {
  type: 'links' | 'tv-schedule' | 'field-data' | 'field-table';
  title: string;
  links?: Array<{
    text: string;
    url: string;
    description: string;
  }>;
  schedule?: Array<{
    day: string;
    times: string[];
  }>;
  data?: Record<string, string[]>;
  headers?: string[];
  tableData?: string[][];
  backgroundColor?: string;
}

interface ArticleSectionsProps {
  sections?: Section[];
}

export default function ArticleSections({ sections }: ArticleSectionsProps) {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      {sections.map((section, index) => {
        switch (section.type) {
          case 'links':
            return (
              <ArticleLinks
                key={index}
                title={section.title}
                links={section.links || []}
              />
            );
          case 'tv-schedule':
            return (
              <TVSchedule
                key={index}
                title={section.title}
                schedule={section.schedule || []}
              />
            );
          case 'field-data':
            return (
              <FieldData
                key={index}
                title={section.title}
                data={section.data || {}}
                backgroundColor={section.backgroundColor}
              />
            );
          case 'field-table':
            return (
              <FieldTable
                key={index}
                title={section.title}
                headers={section.headers || []}
                data={section.tableData || []}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
