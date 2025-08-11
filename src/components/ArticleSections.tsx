import ArticleLinks from './ArticleLinks';
import TVSchedule from './TVSchedule';

interface Section {
  type: 'links' | 'tv-schedule';
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
          default:
            return null;
        }
      })}
    </div>
  );
}
