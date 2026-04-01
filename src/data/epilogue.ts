export interface EpilogueMoment {
  id: string;
  type: 'image' | 'thought';
  content: string;
  image_url?: string;
  date?: string;
  rotation?: number; // degree
  scale?: number;
}

export const epilogueMoments: EpilogueMoment[] = [
  {
    id: 'moment-1',
    type: 'thought',
    content: "The best chapters are the ones where you forget to check the page numbers.",
    date: 'March 2024',
    rotation: -3,
    scale: 1.05
  },
  {
    id: 'moment-2',
    type: 'image',
    content: "The first light in Kyoto.",
    image_url: 'https://images.unsplash.com/photo-1528164344705-4754268799af?auto=format&fit=crop&q=80',
    date: 'Nov 2023',
    rotation: 2,
    scale: 0.98
  },
  {
    id: 'moment-3',
    type: 'thought',
    content: "Waiting for a flight feels like existing in a void. A necessary bridge between who you were and who you're about to be.",
    date: 'Dec 2023',
    rotation: 5,
    scale: 1.1
  },
  {
    id: 'moment-4',
    type: 'image',
    content: "A rainy window in Tokyo. Quiet but loud.",
    image_url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80',
    date: 'Nov 2023',
    rotation: -4,
    scale: 1.02
  },
  {
    id: 'moment-5',
    type: 'thought',
    content: "Some memories don't have a location. They just have a feeling.",
    date: 'Jan 2024',
    rotation: -2,
    scale: 0.95
  },
  {
    id: 'moment-6',
    type: 'image',
    content: "The texture of the sand in Bali. Soon.",
    image_url: 'https://images.unsplash.com/photo-1518548419970-58e3b40e9bd1?auto=format&fit=crop&q=80',
    date: 'Upcoming',
    rotation: 3,
    scale: 1.08
  },
  {
    id: 'moment-7',
    type: 'thought',
    content: "The smell of mountain air before the snow falls.",
    date: 'Feb 2024',
    rotation: 6,
    scale: 0.9
  },
  {
    id: 'moment-8',
    type: 'image',
    content: "A blurry morning in Zurich.",
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80',
    date: 'Feb 2024',
    rotation: -5,
    scale: 1.12
  }
];
