
export const VENUES = [
  {
    id: '1',
    slug: 'quilox',
    name: 'Quilox',
    type: 'Nightclub',
    description: 'Lagos premier nightclub. Luxury experience with top-tier music and ambiance.',
    address: 'Victoria Island, Lagos',
    cover: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800',
    logo: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=200',
    followers: 15420,
    instagram: '@quiloxlagos',
    tables: [
      { id: 't1', section: 'VIP', number: 1, capacity: 8, price: 500000, available: true },
      { id: 't2', section: 'VIP', number: 2, capacity: 8, price: 500000, available: false },
      { id: 't3', section: 'VIP', number: 3, capacity: 6, price: 400000, available: true },
      { id: 't4', section: 'Regular', number: 4, capacity: 6, price: 250000, available: true },
      { id: 't5', section: 'Regular', number: 5, capacity: 6, price: 250000, available: true },
      { id: 't6', section: 'Regular', number: 6, capacity: 4, price: 200000, available: false },
      { id: 't7', section: 'Balcony', number: 7, capacity: 4, price: 150000, available: true },
      { id: 't8', section: 'Balcony', number: 8, capacity: 4, price: 150000, available: true },
    ]
  },
  {
    id: '2',
    slug: 'the-vault',
    name: 'The Vault Social House',
    type: 'Lounge',
    description: 'Upscale lounge and event space. Perfect for premium experiences.',
    address: 'Lagos',
    cover: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800',
    logo: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=200',
    followers: 8900,
    instagram: '@thevaultlagos',
    tables: [
      { id: 't1', section: 'VIP', number: 1, capacity: 10, price: 400000, available: true },
      { id: 't2', section: 'VIP', number: 2, capacity: 8, price: 350000, available: true },
      { id: 't3', section: 'Regular', number: 3, capacity: 6, price: 200000, available: false },
      { id: 't4', section: 'Regular', number: 4, capacity: 6, price: 200000, available: true },
      { id: 't5', section: 'Regular', number: 5, capacity: 4, price: 150000, available: true },
    ]
  },
  {
    id: '3',
    slug: 'praia',
    name: 'Praia',
    type: 'Beach Club',
    description: 'Beachfront venue with amazing vibes, food, and entertainment.',
    address: 'Victoria Island, Lagos',
    cover: 'https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?w=800',
    logo: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200',
    followers: 12300,
    instagram: '@praialagos',
    tables: [
      { id: 't1', section: 'Beachfront', number: 1, capacity: 8, price: 300000, available: true },
      { id: 't2', section: 'Beachfront', number: 2, capacity: 8, price: 300000, available: true },
      { id: 't3', section: 'Regular', number: 3, capacity: 6, price: 180000, available: false },
      { id: 't4', section: 'Regular', number: 4, capacity: 6, price: 180000, available: true },
    ]
  },
  {
    id: '4',
    slug: 'trib3',
    name: 'Trib3 Lagos',
    type: 'Nightclub',
    description: 'Electric atmosphere, cutting-edge sound, unforgettable nights.',
    address: 'Victoria Island, Lagos',
    cover: 'https://images.unsplash.com/photo-1571266028243-d220c6c2e9ae?w=800',
    logo: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=200',
    followers: 9800,
    instagram: '@trib3lagos',
    tables: [
      { id: 't1', section: 'VIP', number: 1, capacity: 10, price: 450000, available: true },
      { id: 't2', section: 'VIP', number: 2, capacity: 8, price: 400000, available: false },
      { id: 't3', section: 'Regular', number: 3, capacity: 6, price: 220000, available: true },
      { id: 't4', section: 'Regular', number: 4, capacity: 6, price: 220000, available: true },
    ]
  }
]