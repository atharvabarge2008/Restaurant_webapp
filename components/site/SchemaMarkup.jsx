import { BRAND } from '@/lib/site-data'

export default function SchemaMarkup() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://shindeshahi.example.com'

  const restaurant = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${base}/#restaurant`,
    name: BRAND.fullName,
    alternateName: [BRAND.name, BRAND.marathi],
    description: 'Satara\'s most-loved Indo-Chinese restaurant. Home of Chicken Dinosaur Rice, Chicken Lollipop, Manchow Soup and the legendary ShindeShahi Special Noodles. 4.5\u2605 on Google with 855+ reviews.',
    url: base,
    telephone: BRAND.phone,
    email: BRAND.email,
    priceRange: '\u20b9\u20b9',
    servesCuisine: ['Chinese', 'Indo-Chinese', 'Sichuan', 'Hakka', 'Momos', 'Fast Food'],
    image: [
      'https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1623689046286-01d812cc8bad?auto=format&fit=crop&w=1600&q=85',
      'https://images.pexels.com/photos/37241099/pexels-photo-37241099.jpeg?auto=compress&cs=tinysrgb&w=1600'
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shop 8, Sarvoday Complex, Opp. Y.C. College, Guruwar Peth',
      addressLocality: 'Satara',
      addressRegion: 'Maharashtra',
      postalCode: '415003',
      addressCountry: 'IN'
    },
    geo: { '@type': 'GeoCoordinates', latitude: 17.6805, longitude: 74.0183 },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '11:00', closes: '22:15' }
    ],
    acceptsReservations: true,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '855',
      bestRating: '5',
      worstRating: '1'
    },
    hasMenu: `${base}/menu`,
    menu: `${base}/menu`,
    sameAs: [
      BRAND.socials.instagram, BRAND.socials.facebook, BRAND.socials.zomato, BRAND.socials.swiggy
    ].filter(Boolean),
    potentialAction: {
      '@type': 'OrderAction',
      target: [
        { '@type': 'EntryPoint', urlTemplate: BRAND.order.zomato, actionPlatform: ['https://schema.org/DesktopWebPlatform','https://schema.org/MobileWebPlatform'] }
      ],
      deliveryMethod: ['http://purl.org/goodrelations/v1#DeliveryModeOwnFleet','http://purl.org/goodrelations/v1#DeliveryModePickUp']
    }
  }

  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.fullName,
    url: base,
    logo: `${base}/icon.png`,
    contactPoint: [{ '@type': 'ContactPoint', telephone: BRAND.phone, contactType: 'reservations', areaServed: 'IN', availableLanguage: ['English','Marathi','Hindi'] }]
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.fullName,
    url: base,
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${base}/menu?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurant) }}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}/>
    </>
  )
}
