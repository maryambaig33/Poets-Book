import { Book } from './types';

export const FEATURED_BOOKS: Book[] = [
  {
    id: '1',
    title: 'Leaves of Grass',
    author: 'Walt Whitman',
    price: 24.99,
    coverUrl: 'https://picsum.photos/id/24/300/450',
    description: 'A collection of poetry that celebrates the self, nature, and the human spirit.',
    tags: ['classic', 'nature', 'american'],
  },
  {
    id: '2',
    title: 'The Waste Land',
    author: 'T.S. Eliot',
    price: 18.50,
    coverUrl: 'https://picsum.photos/id/25/300/450',
    description: 'One of the most important poems of the 20th century, exploring the decline of civilization.',
    tags: ['modernist', 'complex', 'melancholy'],
  },
  {
    id: '3',
    title: 'Milk and Honey',
    author: 'Rupi Kaur',
    price: 14.99,
    coverUrl: 'https://picsum.photos/id/28/300/450',
    description: 'A journey through the bitterest moments in life and finding sweetness in them.',
    tags: ['contemporary', 'healing', 'feminism'],
  },
  {
    id: '4',
    title: 'The Divine Comedy',
    author: 'Dante Alighieri',
    price: 32.00,
    coverUrl: 'https://picsum.photos/id/34/300/450',
    description: 'An epic poem describing Dante\'s travels through Hell, Purgatory, and Paradise.',
    tags: ['epic', 'religious', 'classic'],
  },
  {
    id: '5',
    title: 'Ariel',
    author: 'Sylvia Plath',
    price: 16.95,
    coverUrl: 'https://picsum.photos/id/42/300/450',
    description: 'Plath\'s final collection, containing her most famous and controversial poems.',
    tags: ['confessional', 'intense', 'classic'],
  },
  {
    id: '6',
    title: 'Devotions',
    author: 'Mary Oliver',
    price: 22.00,
    coverUrl: 'https://picsum.photos/id/56/300/450',
    description: 'The definitive collection of Mary Oliver\'s best work throughout her career.',
    tags: ['nature', 'spiritual', 'calm'],
  }
];

export const LIBRARIAN_SYSTEM_INSTRUCTION = `
You are the "Curator," a knowledgeable, empathetic, and slightly mysterious librarian at an exclusive poetry bookstore called "Poets & Pages." 
Your tone is elegant, literary, and warm. You love connecting specific human emotions to specific poems or poets.
When asked for recommendations, always try to provide a brief snippet of a relevant poem if possible (or a very vivid description of it).
You can discuss any literature, but your heart belongs to poetry.
Keep responses concise but evocative.
`;
