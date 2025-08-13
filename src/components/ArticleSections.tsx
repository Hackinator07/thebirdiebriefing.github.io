import ArticleLinks from './ArticleLinks';
import TVSchedule from './TVSchedule';
import FieldData from './FieldData';

interface Section {
  type: 'links' | 'tv-schedule' | 'field-data';
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
  data?: {
    pastChampions?: string[];
    lpga2025Winners?: string[];
    rolexTop25?: string[];
    rookies2025?: string[];
    sponsorExemptions?: string[];
    mondayQualifiers?: string[];
  };
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
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
