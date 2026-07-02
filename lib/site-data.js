export const BRAND = {
  name: 'Shinde Shahi Chinese Restro',
  fullName: 'Shinde Shahi Chinese Restro – Satara',
  marathi: 'शिंदेश चायनीज रेस्टॉरंट - सातारा',
  chinese: '王家中餐',
  tagline: 'Taste That Wins Hearts',
  taglineMarathi: 'चव जो मन जिंके',
  phone: '+91 98604 67474',
  phoneAlt: '+91 83291 36583',
  email: 'hello@shindesh.in',
  address: 'Shop 8, Sarvoday Complex, Opp. Y.C. College, Guruwar Peth, Satara – 415003, Maharashtra',
  addressShort: 'Guruwar Peth, Satara',
  city: 'Satara',
  hours: [
    { day: 'Monday – Sunday', time: '11:00 AM – 10:15 PM' },
    { day: 'Kitchen Last Order', time: '9:45 PM' },
    { day: 'Late Night (Fri/Sat)', time: 'Extended till 11:00 PM' }
  ],
  ratings: [
    { platform: 'Google',   score: '4.5', reviews: '855',   color: '#4285F4' },
    { platform: 'Zomato',   score: '4.6', reviews: '35',    color: '#e23744' },
    { platform: 'Swiggy',   score: '4.2', reviews: '1.5K+', color: '#fc8019' },
    { platform: 'JustDial', score: '4.5', reviews: '905',   color: '#f57c00' }
  ],
  order: {
    zomato: 'https://www.zomato.com/satara/shinde-shahi-chinese-restro-satara-locality',
    swiggy: 'https://www.swiggy.com/city/satara/shinde-shahi-chinese-restaurant-guruwar-peth-y-c-collage-rest143185',
    call: 'tel:+919860467474',
    whatsapp: 'https://wa.me/919860467474?text=Hi%20Shinde%20Shahi%20Chinese%20Restro%2C%20I%27d%20like%20to%20place%20an%20order'
  },
  socials: {
    instagram: 'https://instagram.com/shindesh_chinese_resto',
    facebook: 'https://facebook.com/ShindeshChineseResto',
    zomato: 'https://www.zomato.com/satara/shinde-shahi-chinese-restro-satara-locality',
    swiggy: 'https://www.swiggy.com/city/satara/shinde-shahi-chinese-restaurant-guruwar-peth-y-c-collage-rest143185'
  }
}

export const IMG = {
  hero: 'https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?auto=format&fit=crop&w=2000&q=85',
  interior1: 'https://images.unsplash.com/photo-1725781747036-8071bd5497fb?auto=format&fit=crop&w=1600&q=85',
  interior2: 'https://images.pexels.com/photos/3603453/pexels-photo-3603453.jpeg?auto=compress&cs=tinysrgb&w=1600',
  lantern1: 'https://images.pexels.com/photos/14512855/pexels-photo-14512855.jpeg?auto=compress&cs=tinysrgb&w=1600',
  lantern2: 'https://images.pexels.com/photos/16133738/pexels-photo-16133738/free-photo-of-red-chinese-lanterns-on-ceiling.jpeg?auto=compress&cs=tinysrgb&w=1600',
  // Indo-Chinese food (real menu)
  lollipop: 'https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?auto=format&fit=crop&w=1600&q=85',
  chickenChilli: 'https://images.unsplash.com/photo-1623689046286-01d812cc8bad?auto=format&fit=crop&w=1600&q=85',
  chickenCrispy: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1600&q=85',
  chickenManchurian: 'https://images.unsplash.com/photo-1623689048105-a17b1e1936b8?auto=format&fit=crop&w=1600&q=85',
  friedRice1: 'https://images.pexels.com/photos/37241099/pexels-photo-37241099.jpeg?auto=compress&cs=tinysrgb&w=1600',
  friedRice2: 'https://images.pexels.com/photos/36293910/pexels-photo-36293910.jpeg?auto=compress&cs=tinysrgb&w=1600',
  triple: 'https://images.pexels.com/photos/34683317/pexels-photo-34683317.jpeg?auto=compress&cs=tinysrgb&w=1600',
  schezwanRice: 'https://images.pexels.com/photos/3926124/pexels-photo-3926124.jpeg?auto=compress&cs=tinysrgb&w=1600',
  noodles1: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=1600&q=85',
  noodles2: 'https://images.pexels.com/photos/5409014/pexels-photo-5409014.jpeg?auto=compress&cs=tinysrgb&w=1600',
  momos1: 'https://images.pexels.com/photos/32083367/pexels-photo-32083367.jpeg?auto=compress&cs=tinysrgb&w=1600',
  momos2: 'https://images.pexels.com/photos/34912738/pexels-photo-34912738.jpeg?auto=compress&cs=tinysrgb&w=1600',
  soup: 'https://images.pexels.com/photos/5409014/pexels-photo-5409014.jpeg?auto=compress&cs=tinysrgb&w=1600'
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

// Featured / signature dishes (real Shinde Shahi Chinese Restro bestsellers)
export const FEATURED_DISHES = [
  { id: 'chicken-shindesh-rice', name: 'Chicken Shinde Shahi Special Rice', marathi: 'चिकन शिंदेश स्पेशल राईस', price: 290, halfPrice: 150, category: 'Signature', tag: "Signature", image: IMG.schezwanRice, description: 'Our legendary house special — the dish that put Shinde Shahi Chinese Restro on the map. Fragrant basmati wok-tossed with our secret masala, spring onions and chicken chunks.' },
  { id: 'chicken-dinosaur-rice', name: 'Chicken Dinosaur Rice', marathi: 'चिकन डायनोसॉर राईस', price: 270, halfPrice: 140, category: 'Signature', tag: 'Bestseller', image: IMG.friedRice1, description: 'The dish our fans travel across Satara for. Loaded with juicy chicken chunks, crunchy veggies, in-house dinosaur gravy — flavour bombs in every bite.' },
  { id: 'chicken-lollipop', name: 'Chicken Lollipop (6 pc)', marathi: 'चिकन लॉलीपॉप', price: 190, halfPrice: 99, category: 'Starters', tag: 'Must Try', image: IMG.lollipop, description: 'Crispy fried chicken drumsticks glazed in a fiery secret sauce. The reason regulars keep coming back.' },
  { id: 'chicken-manchow-soup', name: 'Chicken Manchow Soup', marathi: 'चिकन मंचो सूप', price: 99, category: 'Soups', tag: 'Popular', image: IMG.soup, description: 'A steaming bowl of spicy-sour Manchow topped with golden crispy noodles. Comfort in a cup.' },
  { id: 'shindesh-noodles', name: 'Chicken Shinde Shahi Special Noodles', marathi: 'चिकन शिंदेश नूडल्स', price: 290, halfPrice: 150, category: 'Signature', tag: 'Signature', image: IMG.noodles1, description: 'Hakka noodles reimagined the Shinde Shahi way — in our house gravy with chicken chunks, capsicum, and a hint of smoky wok magic.' },
  { id: 'chicken-crispy', name: 'Chicken Crispy', marathi: 'चिकन क्रिस्पी', price: 220, category: 'Starters', tag: 'Crowd Favourite', image: IMG.chickenCrispy, description: 'Thin, crackling chicken shreds tossed with onions, chillies and coriander. Trust us — order this.' }
]

export const MENU_CATEGORIES = ['Soups', 'Starters', 'Signature', 'Rice', 'Noodles', 'Manchurian', 'Momos', 'Bhel']

// Full menu (from actual Shinde Shahi menu card — all prices in ₹)
export const FULL_MENU = [
  ...FEATURED_DISHES,
  // Veg Soups
  { id: 'veg-manchow', name: 'Veg Manchow Soup', marathi: 'व्हेज मंचो सूप', price: 99, category: 'Soups', image: IMG.soup, description: 'Spicy-tangy Manchow with fresh vegetables and crispy noodles.' },
  { id: 'veg-hot-sour', name: 'Veg Hot & Sour Soup', marathi: 'व्हेज हॉट ऐंड सॉर सूप', price: 99, category: 'Soups', image: IMG.soup, description: 'Classic Indo-Chinese hot & sour with tofu and mixed veg.' },
  { id: 'veg-sweet-corn', name: 'Veg Sweet Corn Soup', marathi: 'व्हेज स्वीट कॉर्न सूप', price: 109, category: 'Soups', image: IMG.soup, description: 'Creamy sweet corn kernels in a light chicken-style broth.' },
  { id: 'chicken-thukpa', name: 'Chicken Thukpa Soup', marathi: 'चिकन थुक्पा सूप', price: 139, category: 'Soups', image: IMG.soup, description: 'Himalayan noodle broth with tender chicken and veg.' },

  // Starters
  { id: 'paneer-crispy', name: 'Paneer Crispy', marathi: 'पनीर क्रिस्पी', price: 220, category: 'Starters', image: IMG.chickenCrispy, description: 'Batter-fried paneer cubes tossed in tangy Indo-Chinese sauce.' },
  { id: 'paneer-chilli', name: 'Paneer Chilli', marathi: 'पनीर चिल्ली', price: 220, category: 'Starters', image: IMG.chickenChilli, description: 'Cottage cheese cubes in spicy soy-chilli glaze with capsicum.' },
  { id: 'chicken-chilli', name: 'Chicken Chilli Dry', marathi: 'चिकन चिल्ली ड्राय', price: 199, halfPrice: 99, category: 'Starters', image: IMG.chickenChilli, description: 'Sichuan-style chicken tossed with onion, capsicum and green chillies.' },
  { id: 'chicken-manchurian-dry', name: 'Chicken Manchurian Dry', marathi: 'चिकन मंच्युरियन ड्राय', price: 180, halfPrice: 95, category: 'Starters', image: IMG.chickenManchurian, description: 'Classic dry Manchurian balls in tangy soy-vinegar glaze.' },
  { id: 'drumsticks', name: 'Chicken Drumsticks (3 pc)', marathi: 'चिकन ड्रमस्टिक', price: 220, category: 'Starters', tag: 'Signature', image: IMG.lollipop, description: 'Marinated & fried drumsticks in a rich creamy Indo-Chinese sauce.' },
  { id: 'chicken-65', name: 'Chicken 65', marathi: 'चिकन 65', price: 210, category: 'Starters', image: IMG.chickenCrispy, description: 'South-meets-Chinese fried chicken with curry leaves & chillies.' },
  { id: 'chicken-popcorn', name: 'Chicken Popcorn', marathi: 'चिकन पॉपकॉर्न', price: 210, category: 'Starters', image: IMG.chickenCrispy, description: 'Bite-sized crunchy chicken poppers — great for sharing.' },

  // Lollipop varieties
  { id: 'lollipop-masala', name: 'Chicken Lollipop Masala Dry', marathi: 'चिकन लॉलीपॉप मसाला', price: 230, halfPrice: 125, category: 'Starters', image: IMG.lollipop, description: 'Masala-tossed drumsticks with kadai spice and coriander.' },
  { id: 'lollipop-gravy', name: 'Chicken Lollipop Gravy', marathi: 'चिकन लॉलीपॉप ग्रेव्ही', price: 230, halfPrice: 125, category: 'Starters', image: IMG.lollipop, description: 'Lollipops swimming in rich house Indo-Chinese gravy.' },

  // Manchurian
  { id: 'veg-manchurian-dry', name: 'Veg Manchurian Dry', marathi: 'व्हेज मंच्युरियन ड्राय', price: 175, halfPrice: 90, category: 'Manchurian', tag: 'Popular', image: IMG.chickenManchurian, description: 'Crispy veg balls tossed in tangy Indo-Chinese Manchurian sauce.' },
  { id: 'veg-manchurian-gravy', name: 'Veg Manchurian Gravy', marathi: 'व्हेज मंच्युरियन ग्रेव्ही', price: 195, halfPrice: 99, category: 'Manchurian', image: IMG.chickenManchurian, description: 'Signature veg Manchurian in silky gravy — pair with fried rice.' },
  { id: 'chicken-manchurian-gravy', name: 'Chicken Manchurian Gravy', marathi: 'चिकन मंच्युरियन ग्रेव्ही', price: 210, halfPrice: 110, category: 'Manchurian', image: IMG.chickenManchurian, description: 'Tender chicken balls in savoury soy-ginger gravy.' },

  // Rice
  { id: 'veg-fried-rice', name: 'Veg Fried Rice', marathi: 'व्हेज फ्राईड राईस', price: 170, halfPrice: 90, category: 'Rice', image: IMG.friedRice2, description: 'Wok-tossed basmati with garden vegetables and soy.' },
  { id: 'veg-schezwan-rice', name: 'Veg Schezwan Rice', marathi: 'व्हेज शेजवान राईस', price: 180, halfPrice: 95, category: 'Rice', image: IMG.schezwanRice, description: 'Spicy Schezwan sauce, veggies, spring onions.' },
  { id: 'veg-triple-rice', name: 'Veg Triple Rice + Gravy', marathi: 'व्हेज ट्रिपल राईस', price: 210, halfPrice: 110, category: 'Rice', image: IMG.triple, description: 'Fried rice + hakka noodles + a bowl of Manchurian gravy. A three-in-one crowd-pleaser.' },
  { id: 'veg-shindesh-rice', name: 'Veg Shinde Shahi Rice + Gravy', marathi: 'व्हेज शिंदेश राईस', price: 270, halfPrice: 140, category: 'Rice', tag: 'Signature', image: IMG.schezwanRice, description: 'Vegetarian version of our house signature — full-flavour, family-size.' },
  { id: 'chicken-fried-rice', name: 'Chicken Fried Rice', marathi: 'चिकन फ्राईड राईस', price: 185, halfPrice: 95, category: 'Rice', image: IMG.friedRice2, description: 'Classic chicken fried rice, wok-smoky and generous.' },
  { id: 'chicken-schezwan-rice', name: 'Chicken Schezwan Rice', marathi: 'चिकन शेजवान राईस', price: 195, halfPrice: 99, category: 'Rice', image: IMG.schezwanRice, description: 'Fiery Schezwan chicken rice with capsicum and spring onion.' },
  { id: 'chicken-triple-rice', name: 'Chicken Triple Rice + Gravy', marathi: 'चिकन ट्रिपल राईस', price: 230, halfPrice: 120, category: 'Rice', tag: 'Popular', image: IMG.triple, description: 'Rice + noodles + Manchurian gravy — the ultimate combo plate.' },

  // Noodles
  { id: 'veg-hakka-noodles', name: 'Veg Hakka Noodles', marathi: 'व्हेज हाक्का नूडल्स', price: 170, halfPrice: 90, category: 'Noodles', image: IMG.noodles2, description: 'Silky wok-tossed noodles with vegetables and soy.' },
  { id: 'veg-schezwan-noodles', name: 'Veg Schezwan Noodles', marathi: 'व्हेज शेजवान नूडल्स', price: 180, halfPrice: 95, category: 'Noodles', image: IMG.noodles1, description: 'Spicy Schezwan-tossed noodles — a crowd favourite.' },
  { id: 'chicken-hakka-noodles', name: 'Chicken Hakka Noodles', marathi: 'चिकन हाक्का नूडल्स', price: 185, halfPrice: 95, category: 'Noodles', image: IMG.noodles2, description: 'Perfectly stir-fried chicken noodles, comforting and generous.' },
  { id: 'chicken-dinosaur-noodles', name: 'Chicken Dinosaur Noodles + Gravy', marathi: 'चिकन डायनोसॉर नूडल्स', price: 270, halfPrice: 140, category: 'Noodles', tag: 'Bestseller', image: IMG.noodles1, description: 'Our famous dinosaur gravy over silky hakka noodles.' },

  // Momos
  { id: 'veg-steam-momos', name: 'Veg Steam Momos (8 pc)', marathi: 'व्हेज स्टीम मोमोज', price: 120, category: 'Momos', image: IMG.momos1, description: 'Delicate steamed dumplings with veg stuffing & spicy chutney.' },
  { id: 'veg-fry-momos', name: 'Veg Fry Momos (8 pc)', marathi: 'व्हेज फ्राय मोमोज', price: 130, category: 'Momos', image: IMG.momos2, description: 'Crispy pan-fried veg momos with tangy schezwan chutney.' },
  { id: 'veg-schezwan-momos', name: 'Veg Schezwan Masala Momos', marathi: 'व्हेज शेजवान मोमोज', price: 150, category: 'Momos', tag: 'Spicy', image: IMG.momos1, description: 'Fried momos tossed in fiery schezwan masala.' },
  { id: 'chicken-steam-momos', name: 'Chicken Steam Momos (8 pc)', marathi: 'चिकन स्टीम मोमोज', price: 120, category: 'Momos', image: IMG.momos1, description: 'Juicy chicken-filled steamed momos, served hot.' },
  { id: 'chicken-peri-momos', name: 'Chicken Peri Peri Momos', marathi: 'चिकन पेरी पेरी मोमोज', price: 140, category: 'Momos', tag: 'New', image: IMG.momos2, description: 'Fried chicken momos in smoky peri-peri masala.' },

  // Bhel / Chopsy
  { id: 'chinese-bhel', name: 'Veg Chinese Bhel', marathi: 'व्हेज चायनीज भेळ', price: 150, category: 'Bhel', image: IMG.noodles1, description: 'Crispy noodle bhel with veggies, chutneys and sev.' },
  { id: 'schezwan-bhel', name: 'Schezwan Bhel', marathi: 'शेजवान भेळ', price: 160, category: 'Bhel', tag: 'Local Favourite', image: IMG.noodles1, description: 'Extra-spicy crispy schezwan noodle bhel.' },
  { id: 'veg-chopsy', name: 'Veg American Chopsy', marathi: 'व्हेज अमेरिकन चॉप्सी', price: 160, category: 'Bhel', image: IMG.noodles2, description: 'Crispy fried noodles topped with sweet-sour veg gravy.' }
]

// Real Google reviews from Shinde Shahi Chinese Restro
export const REVIEWS = [
  { name: 'Samindra Art', role: 'Google Review · 6 months ago', text: 'Shinde Shahi Chinese Restro offers a fantastic ambiance and top notch service at a very pocket friendly price. The Manchow soup, Chicken Dinosaur Rice are absolute must tries — flavorful, fresh, and uniquely tasty.', rating: 5, initials: 'SA' },
  { name: 'Kisan Rathod', role: 'Local Guide · 99 reviews', text: 'Shinde Shahi is one of the best Chinese resto in Satara. Food is delicious and very tasty. Quantity is also sufficient in every order. An unforgettable dining experience that delights the palate.', rating: 5, initials: 'KR' },
  { name: 'Aniket Sonmale', role: 'Local Guide · 39 reviews', text: 'Highly recommended restaurant in Satara city to enjoy Chinese food. The owner is very friendly and kind enough with his suggestions. Went twice within a week!', rating: 5, initials: 'AS' },
  { name: 'Nam__', role: 'Local Guide · 215 photos', text: 'All Chinese dishes are delicious here with good quantity. Must Try chicken crispy — mouthwatering! Affordable prices, good service, polite towards customers.', rating: 5, initials: 'N' },
  { name: 'JAEE DIXIT', role: 'Google Review · 6 months ago', text: 'Very good experience, nice ambience and great service. Had Chicken Chopper Rice and Drumsticks — it\'s a must try. 5/5, would visit again.', rating: 5, initials: 'JD' },
  { name: 'Sumit Kadam', role: 'Google Review', text: 'My family and I had a wonderful experience. We ordered Chicken Shinde Shahi Special, Drumstick, and Chicken Manchow Soup. The food was delicious, especially the Drumsticks with rich creamy sauce.', rating: 5, initials: 'SK' },
  { name: 'Smit Shingare', role: 'Google Review · 5 months ago', text: 'I really liked the Chinese, it was very tasty and I really liked the quality of food. I would highly recommend the chicken lollipop of this place. Must visit!', rating: 5, initials: 'SS' },
  { name: 'reshma kadam', role: 'Google Review', text: 'Fantastic authentic Chinese food very different from the regular Chinese we eat at restaurants and service was very impressive. Overall a very good experience & highly recommend.', rating: 5, initials: 'RK' },
  { name: 'SANJIT BANE', role: 'Local Guide · 101 reviews', text: 'Taste is good, service is fast, hotel atmosphere is great, I like the Kung Fu Panda theme in the hotel!', rating: 5, initials: 'SB' }
]

export const WHY_US = [
  { title: 'Satara\'s Loudest Loyalty', marathi: 'चव जो मन जिंके', desc: '855+ Google reviews. 3,000+ ratings across Zomato, Swiggy & JustDial. There\'s a reason locals keep coming back.', icon: 'star' },
  { title: 'The Shinde Shahi Signature', marathi: 'स्पेशल रेसिपी', desc: 'A house-secret masala perfected over years — in our Dinosaur Rice, Special Noodles and legendary Chicken Lollipop.', icon: 'flame' },
  { title: 'Fresh, Fast, Affordable', marathi: 'ताजे आणि आटोपशीर', desc: 'Wok-fired to order, generous portions, honest prices. From ₹90 half plates to family-size feasts.', icon: 'wok' },
  { title: 'Home Delivery Ready', marathi: 'घरपोहोच गरमागरम', desc: 'Order in one tap on Zomato & Swiggy. Or call us — hot food, sealed packing, delivered fast across Satara.', icon: 'delivery' }
]

export const GALLERY = [
  IMG.chickenChilli, IMG.friedRice1, IMG.momos1, IMG.lantern1,
  IMG.noodles1, IMG.lollipop, IMG.triple, IMG.interior2,
  IMG.chickenCrispy, IMG.momos2, IMG.schezwanRice, IMG.chickenManchurian,
  IMG.friedRice2, IMG.noodles2
]
