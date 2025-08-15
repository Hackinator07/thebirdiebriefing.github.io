import { Bios, TeamMember, Mission, Contact } from './biosLoader';

// Server-side functions
let cachedBios: Bios | null = null;

export async function getBios(): Promise<Bios> {
  if (cachedBios) {
    return cachedBios;
  }

  // Dynamic import to avoid bundling fs in client
  const { loadAllBios } = await import('./biosLoader');
  cachedBios = await loadAllBios();
  return cachedBios;
}

export async function getTeamMember(memberId: 'marie' | 'george'): Promise<TeamMember | null> {
  const bios = await getBios();
  return bios.team[memberId] || null;
}

export async function getMission(): Promise<Mission | null> {
  const bios = await getBios();
  return bios.mission;
}

export async function getContact(): Promise<Contact | null> {
  const bios = await getBios();
  return bios.contact;
}
