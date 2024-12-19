// src/data/projects.ts

export type ProjectData = {
  id: number
  country: string
  city: string
  district: string
  projectName: string
  abbreviation: string
  manager: string
  partCount: number
}

// Mock veya dummy veriler
export const dummyData: ProjectData[] = [
  {
    id: 1,
    projectName: 'Etap 1',
    manager: 'Erbil Vurgun',
    country: 'Türkiye',
    city: 'Hatay',
    district: 'Antakya',
    abbreviation: 'HP',
    partCount: 4
  },
  {
    id: 2,
    projectName: 'Etap 1',
    manager: 'Berkay Ustem',
    country: 'Türkiye',
    city: 'Istanbul',
    district: 'Ataşehir',
    abbreviation: 'IE',
    partCount: 4
  },
  {
    id: 3,
    projectName: 'Etap 2',
    manager: 'Berkay Ustem',
    country: 'Türkiye',
    city: 'Istanbul',
    district: 'Ataşehir',
    abbreviation: 'IE-1',
    partCount: 4
  }
]
