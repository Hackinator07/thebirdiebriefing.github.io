import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const biosDirectory = path.join(process.cwd(), 'src/data/bios');

export interface TeamMember {
  name: string;
  title: string;
  image: string;
  imageAlt: string;
  bio: string[];
}

export interface Mission {
  title: string;
  description: string;
  content: string[];
}

export interface Contact {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

export interface Bios {
  team: {
    marie: TeamMember;
    george: TeamMember;
  };
  mission: Mission;
  contact: Contact;
}

export async function loadTeamMember(memberId: string): Promise<TeamMember | null> {
  try {
    const fullPath = path.join(biosDirectory, `${memberId}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);

    // Convert content to array of paragraphs
    const bioArray = content
      .split('\n\n')
      .filter(paragraph => paragraph.trim().length > 0)
      .map(paragraph => paragraph.trim());

    return {
      name: data.name,
      title: data.title,
      image: data.image,
      imageAlt: data.imageAlt,
      bio: bioArray
    };
  } catch (error) {
    console.error(`Error loading team member ${memberId}:`, error);
    return null;
  }
}

export async function loadMission(): Promise<Mission | null> {
  try {
    const fullPath = path.join(biosDirectory, 'mission.md');
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);

    // Convert content to array of paragraphs
    const contentArray = content
      .split('\n\n')
      .filter(paragraph => paragraph.trim().length > 0)
      .map(paragraph => paragraph.trim());

    return {
      title: data.title,
      description: data.description,
      content: contentArray
    };
  } catch (error) {
    console.error('Error loading mission:', error);
    return null;
  }
}

export async function loadContact(): Promise<Contact | null> {
  try {
    const fullPath = path.join(biosDirectory, 'contact.md');
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data } = matter(fileContents);

    return {
      title: data.title,
      subtitle: data.subtitle,
      buttonText: data.buttonText,
      buttonLink: data.buttonLink
    };
  } catch (error) {
    console.error('Error loading contact:', error);
    return null;
  }
}

export async function loadAllBios(): Promise<Bios> {
  const marie = await loadTeamMember('marie');
  const george = await loadTeamMember('george');
  const mission = await loadMission();
  const contact = await loadContact();

  if (!marie || !george || !mission || !contact) {
    throw new Error('Failed to load all bios data');
  }

  return {
    team: {
      marie,
      george
    },
    mission,
    contact
  };
}
