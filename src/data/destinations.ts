export type DestinationStatus = 'Not Yet' | 'On My Way' | 'Been Here';

export interface Destination {
  id: string;
  title: string;
  status: DestinationStatus;
  coordinates: [number, number]; // [longitude, latitude]
  year_planned?: number;
  why_matters?: string;
  when_opens?: string;
  feeling_prediction?: string;
  expectations?: string;
  reality?: string;
  images: string[];
  journal?: string[];
  countryCode?: string; // ISO_A3
}

export const destinations: Destination[] = [
  {
    id: 'bali',
    title: 'Bali',
    status: 'On My Way',
    coordinates: [115.1889, -8.4095],
    year_planned: 2026,
    why_matters: 'A place to disconnect from the noise and reconnect with the quiet rhythms of nature.',
    when_opens: 'When I need a reset. When I am ready to let go of routine.',
    feeling_prediction: 'Humid, heavy air, the smell of incense, and a profound sense of stillness.',
    images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2676&auto=format&fit=crop'],
    countryCode: 'IDN'
  },
  {
    id: 'switzerland',
    title: 'Switzerland',
    status: 'Not Yet',
    coordinates: [8.2275, 46.8182],
    year_planned: 2027,
    why_matters: 'To witness the scale of the mountains and realize how small I am.',
    when_opens: 'A winter chapter. A time for clarity and cold, crisp air.',
    feeling_prediction: 'Silent. Monumental. The kind of cold that wakes you up completely.',
    images: ['https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2670&auto=format&fit=crop'],
    countryCode: 'CHE'
  },
  {
    id: 'antarctica',
    title: 'Antarctica',
    status: 'Not Yet',
    coordinates: [0, -82.8628],
    year_planned: 2030,
    why_matters: 'The edge of the world. A testament to survival and isolation.',
    when_opens: 'Decades in the making. A milestone of endurance.',
    feeling_prediction: 'Isolating but incredibly pure. A stark contrast to everything else.',
    images: ['https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?q=80&w=2574&auto=format&fit=crop'],
    countryCode: 'ATA'
  },
  {
    id: 'kyoto',
    title: 'Kyoto',
    status: 'Been Here',
    coordinates: [135.7681, 35.0116],
    year_planned: 2023,
    why_matters: 'To understand dedication to craft and history.',
    expectations: 'A quiet, cinematic city preserved in amber.',
    reality: 'Busy but profoundly respectful. The silence exists, but you have to find it in the early mornings.',
    images: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2670&auto=format&fit=crop',
    ],
    countryCode: 'JPN',
    journal: [
      'Woke up at 5am to walk through Fushimi Inari before the crowds. The orange gates felt like a tunnel through time.',
      'Ate alone at a tiny ramen shop. Nothing needs to be said. The food speaks for itself.'
    ]
  }
];
