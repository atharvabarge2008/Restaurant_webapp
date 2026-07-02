export const BRAND = {
  name: 'Golden Dragon',
  chinese: '金龙轩',
  tagline: 'Modern Chinese Fine Dining',
  phone: '+1 (415) 555-0188',
  email: 'reserve@goldendragon.co',
  address: '888 Grant Avenue, Chinatown, San Francisco, CA 94108',
  hours: [
    { day: 'Monday – Thursday', time: '5:30 PM – 10:30 PM' },
    { day: 'Friday – Saturday', time: '5:00 PM – 11:30 PM' },
    { day: 'Sunday Brunch', time: '11:00 AM – 3:00 PM' }
  ],
  socials: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    youtube: 'https://youtube.com'
  }
}

export const IMG = {
  hero: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=2000&q=85',
  interior1: 'https://images.unsplash.com/photo-1725781747036-8071bd5497fb?auto=format&fit=crop&w=1600&q=85',
  interior2: 'https://images.pexels.com/photos/3603453/pexels-photo-3603453.jpeg?auto=compress&cs=tinysrgb&w=1600',
  lantern1: 'https://images.pexels.com/photos/14512855/pexels-photo-14512855.jpeg?auto=compress&cs=tinysrgb&w=1600',
  lantern2: 'https://images.pexels.com/photos/16133738/pexels-photo-16133738/free-photo-of-red-chinese-lanterns-on-ceiling.jpeg?auto=compress&cs=tinysrgb&w=1600',
  dimsum1: 'https://images.pexels.com/photos/32083372/pexels-photo-32083372/free-photo-of-steamed-dumplings-in-bamboo-basket.jpeg?auto=compress&cs=tinysrgb&w=1600',
  dimsum2: 'https://images.pexels.com/photos/29310223/pexels-photo-29310223/free-photo-of-close-up-of-delicious-dim-sum-dishes-on-a-table.jpeg?auto=compress&cs=tinysrgb&w=1600',
  dimsum3: 'https://images.pexels.com/photos/32860331/pexels-photo-32860331/free-photo-of-delicious-chinese-dim-sum-spread-in-bamboo-steamers.jpeg?auto=compress&cs=tinysrgb&w=1600',
  duck1: 'https://images.unsplash.com/photo-1765743691388-6a5608004b9c?auto=format&fit=crop&w=1600&q=85',
  duck2: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=1600&q=85',
  hotpot1: 'https://images.unsplash.com/photo-1614104030967-5ca61a54247b?auto=format&fit=crop&w=1600&q=85',
  hotpot2: 'https://images.unsplash.com/photo-1703945530505-2f06e3e1cf97?auto=format&fit=crop&w=1600&q=85',
  noodles: 'https://images.unsplash.com/flagged/photo-1556742524-750f2ab99913?auto=format&fit=crop&w=1600&q=85',
  chef: 'https://images.unsplash.com/photo-1470114755716-3e1124c6c3bd?auto=format&fit=crop&w=1600&q=85',
}

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Reservation', href: '/reservation' },
  { label: 'Contact', href: '/contact' }
]

export const FEATURED_DISHES = [
  { id: 'peking-duck', name: 'Imperial Peking Duck', chinese: '北京烤鸭', price: 88, category: 'Signature', tag: "Chef's Choice", image: IMG.duck1, description: 'Wood-fired for 24 hours. Carved tableside. Served with hand-rolled pancakes, spring onion, cucumber & house hoisin.' },
  { id: 'dim-sum-platter', name: 'Royal Dim Sum Platter', chinese: '御用点心', price: 42, category: 'Dim Sum', tag: 'Bestseller', image: IMG.dimsum1, description: 'Nine varieties of hand-crafted dumplings including har gow, siu mai, and truffle xiao long bao.' },
  { id: 'wagyu-hotpot', name: 'A5 Wagyu Hot Pot', chinese: '和牛火锅', price: 128, category: 'Hot Pot', tag: 'Premium', image: IMG.hotpot1, description: 'Grade A5 Miyazaki wagyu, mushroom broth, hand-cut vegetables and a curated selection of house dips.' },
  { id: 'kung-pao', name: 'Sichuan Kung Pao Lobster', chinese: '宫保龙虾', price: 68, category: 'Sichuan', tag: 'New', image: IMG.hotpot2, description: 'Whole Maine lobster in Sichuan chili oil, roasted cashews, dried chili & a whisper of citrus zest.' },
  { id: 'hand-pulled', name: 'Master\u2019s Hand-Pulled Noodles', chinese: '手工拉面', price: 32, category: 'Noodles', tag: "Chef's Choice", image: IMG.noodles, description: 'Pulled to order. Slow-braised beef shank, chili broth, cilantro, pickled mustard greens.' },
  { id: 'char-siu', name: 'Honey Glazed Char Siu', chinese: '蜜汁叉烧', price: 38, category: 'BBQ', tag: 'Popular', image: IMG.duck2, description: 'Iberico pork shoulder marinated 36 hours, glazed with wildflower honey and roasted over lychee wood.' }
]

export const MENU_CATEGORIES = ['Signature', 'Dim Sum', 'Hot Pot', 'Sichuan', 'Noodles', 'BBQ', 'Dessert']

export const FULL_MENU = [
  ...FEATURED_DISHES,
  { id: 'har-gow', name: 'Crystal Shrimp Har Gow', chinese: '水晶虾饺', price: 16, category: 'Dim Sum', image: IMG.dimsum2, description: 'Translucent wrapper, plump tiger prawns, bamboo shoot.' },
  { id: 'siu-mai', name: 'Truffle Siu Mai', chinese: '松露烧卖', price: 18, category: 'Dim Sum', image: IMG.dimsum3, description: 'Pork, prawn and shiitake, finished with fresh black truffle.' },
  { id: 'xlb', name: 'Truffle Xiao Long Bao', chinese: '松露小笼包', price: 22, category: 'Dim Sum', image: IMG.dimsum1, description: 'Signature soup dumplings, ginger-vinegar dip.' },
  { id: 'mapo', name: 'Grandmother\u2019s Mapo Tofu', chinese: '麻婆豆腐', price: 28, category: 'Sichuan', image: IMG.hotpot2, description: 'Silken tofu, fermented broad bean, Sichuan peppercorn.' },
  { id: 'dan-dan', name: 'Chengdu Dan Dan Noodles', chinese: '担担面', price: 24, category: 'Noodles', image: IMG.noodles, description: 'Peanut, chili oil, minced pork, preserved vegetable.' },
  { id: 'wagyu-fried-rice', name: 'A4 Wagyu Fried Rice', chinese: '和牛炒饭', price: 42, category: 'Signature', image: IMG.chef, description: 'Aged jasmine rice, A4 wagyu, salted duck yolk.' },
  { id: 'lobster-hp', name: 'Lobster & Abalone Hot Pot', chinese: '龙虾鲍鱼锅', price: 168, category: 'Hot Pot', image: IMG.hotpot1, description: 'Live Maine lobster, South African abalone, house dashi.' },
  { id: 'char-siu-bbq', name: 'Pipa Duck', chinese: '琵琶鸭', price: 78, category: 'BBQ', image: IMG.duck2, description: 'Whole roast duck, spiced plum glaze, lotus buns.' },
  { id: 'mango-pudding', name: 'Alphonso Mango Pudding', chinese: '芒果布丁', price: 14, category: 'Dessert', image: IMG.dimsum2, description: 'Alphonso mango, coconut cream, passionfruit pearls.' },
  { id: 'sesame-ball', name: 'Molten Sesame Ball', chinese: '流沙芝麻球', price: 12, category: 'Dessert', image: IMG.dimsum3, description: 'Crisp glutinous rice, molten black sesame center.' }
]

export const REVIEWS = [
  { name: 'Michelin Guide', role: 'Two-Star Recognition, 2024', text: 'A masterful reinterpretation of Chinese classics. Every plate is choreography — precision, restraint and unmistakable soul.', rating: 5, initials: 'MG' },
  { name: 'Sarah Chen', role: 'Food & Wine Magazine', text: 'The Peking duck ceremony alone is worth the flight. Golden Dragon has redefined what modern Chinese fine dining can be.', rating: 5, initials: 'SC' },
  { name: 'James Whitfield', role: 'Regular Guest, 6 years', text: 'This is the only restaurant I would fly across the country for. Chef Wong is a poet with a wok.', rating: 5, initials: 'JW' },
  { name: 'Aria Nakamura', role: 'The New York Times', text: 'A serene, gilded stage for some of the most electrifying flavors in the city. Book weeks ahead.', rating: 5, initials: 'AN' },
  { name: 'David Park', role: 'Bon Appétit', text: 'The dim sum reads like poetry. The hot pot broth is the best I have tasted outside Chengdu.', rating: 5, initials: 'DP' },
  { name: 'Emma Liu', role: 'Traveler', text: 'From the moment the doors opened, we felt transported. A truly unforgettable evening.', rating: 5, initials: 'EL' }
]

export const WHY_US = [
  { title: '40 Years of Mastery', chinese: '四十载传承', desc: 'Third-generation Cantonese chefs trained in Hong Kong, Chengdu and Beijing.', icon: 'crown' },
  { title: 'Live Wood-Fired Kitchen', chinese: '明火厨房', desc: 'Lychee-wood ovens, hand-hammered woks and a 900°C duck oven — the way it was meant to be.', icon: 'flame' },
  { title: 'Sourced from the Seas', chinese: '海鲜臻选', desc: 'Live seafood, A5 Wagyu, Iberico pork and rare ingredients flown in daily.', icon: 'fish' },
  { title: 'Private Tea Ceremony', chinese: '茶艺私宴', desc: 'Curated 12-course tasting menu paired with rare pu-erh and premium oolong.', icon: 'tea' }
]

export const GALLERY = [
  IMG.interior1, IMG.duck1, IMG.dimsum1, IMG.lantern1,
  IMG.hotpot1, IMG.noodles, IMG.dimsum2, IMG.interior2,
  IMG.chef, IMG.dimsum3, IMG.lantern2, IMG.hotpot2
]
