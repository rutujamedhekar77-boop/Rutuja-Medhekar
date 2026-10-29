/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Review } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'mds-001',
    name: 'The Signature White Sneaker',
    slug: 'the-signature-white-sneaker',
    tagline: 'Minimalist low-top crafted in butter-soft Italian calfskin.',
    category: 'Sneakers',
    gender: 'Unisex',
    price: 240,
    originalPrice: 280,
    isBestSeller: true,
    isNewArrival: false,
    isSale: true,
    rating: 4.9,
    reviewCount: 142,
    images: [
      '/src/assets/images/hero_footwear_campaign_1793280976179.jpg',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Pure White & Gum', hex: '#FAF9F6' },
      { name: 'Onyx Charcoal', hex: '#1C1A18' },
      { name: 'Chalk Beige', hex: '#E6DFD5' }
    ],
    sizes: [
      { size: 39, stock: 8 },
      { size: 40, stock: 12 },
      { size: 41, stock: 15 },
      { size: 42, stock: 18 },
      { size: 43, stock: 14 },
      { size: 44, stock: 6 },
      { size: 45, stock: 4 }
    ],
    description: 'An architectural study in minimalist proportion. Handcrafted from full-grain Florentine calfskin with an ultra-cushioned anatomical leather footbed, Margom natural rubber sole, and hand-burnished edge finishing.',
    details: [
      'Full-grain Italian Nappa calfskin upper',
      'Reinforced natural Margom rubber cupsole',
      'Orthopedic memory foam footbed lined in calf leather',
      'Subtle debossed gold foil monogram on heel tab',
      '100% waxed organic cotton laces with brass aglets'
    ],
    materials: ['Full-Grain Calfskin', 'Natural Rubber Sole', 'Calf Leather Lining'],
    careInstructions: [
      'Wipe with a soft microfibre cloth after wear',
      'Apply clear leather cream every 3-4 months',
      'Use cedar shoe trees to maintain natural shape'
    ],
    sku: 'MDS-SNK-001',
    inStock: true
  },
  {
    id: 'mds-002',
    name: 'Classic Leather Loafer',
    slug: 'classic-leather-loafer',
    tagline: 'Timeless penny loafer with hand-stitched apron.',
    category: 'Loafers',
    gender: 'Men',
    price: 320,
    originalPrice: undefined,
    isBestSeller: true,
    isNewArrival: false,
    isSale: false,
    rating: 4.8,
    reviewCount: 96,
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80',
      '/src/assets/images/editorial_collection_men_1793280977039.jpg',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Espresso Calf', hex: '#382218' },
      { name: 'Bordeaux Oxblood', hex: '#4A1521' },
      { name: 'Classic Black', hex: '#111111' }
    ],
    sizes: [
      { size: 40, stock: 5 },
      { size: 41, stock: 11 },
      { size: 42, stock: 14 },
      { size: 43, stock: 9 },
      { size: 44, stock: 3 }
    ],
    description: 'The epitome of refined sartorial ease. Built with traditional Blake stitch construction for exceptional flexibility and a sculpted silhouette that contours gracefully to your instep.',
    details: [
      'Hand-patinated calfskin with deep tonal luster',
      'Flexible Blake stitch sole construction',
      'Oak-bark tanned leather outsole with recessed rubber heel strike',
      'Full leather sock liner with gentle arch reinforcement'
    ],
    materials: ['Tuscan Burnished Calfskin', 'Oak-Bark Leather Sole', 'Brass Shank'],
    careInstructions: [
      'Condition with neutral beeswax cream',
      'Brush lightly with genuine horsehair brush',
      'Avoid heavy rainfall; dry naturally away from direct heat'
    ],
    sku: 'MDS-LOA-002',
    inStock: true
  },
  {
    id: 'mds-003',
    name: 'Urban Everyday Runner',
    slug: 'urban-everyday-runner',
    tagline: 'Athletic precision meets tailored European minimalism.',
    category: 'Sneakers',
    gender: 'Unisex',
    price: 260,
    originalPrice: 295,
    isBestSeller: false,
    isNewArrival: true,
    isSale: true,
    rating: 4.7,
    reviewCount: 58,
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Stone Grey & Cream', hex: '#B8B2A8' },
      { name: 'Sand Drift', hex: '#D2C3B0' },
      { name: 'Midnight Charcoal', hex: '#222328' }
    ],
    sizes: [
      { size: 39, stock: 4 },
      { size: 40, stock: 7 },
      { size: 41, stock: 12 },
      { size: 42, stock: 16 },
      { size: 43, stock: 8 },
      { size: 44, stock: 5 }
    ],
    description: 'Engineered for high-tempo metropolitan transit. Combines technical water-repellent Japanese micro-ripstop with velvety Italian suede and our custom dual-density EVA midsole.',
    details: [
      'Italian split suede and technical woven nylon',
      'Shock-absorbing high-rebound EVA midsole',
      'Vibram multi-surface lug traction pattern',
      'Antimicrobial cork-topped ergonomic footbed'
    ],
    materials: ['Italian Suede', 'Technical Nylon', 'Vibram Outsole'],
    careInstructions: [
      'Use suede dry sponge for daily dust removal',
      'Treat with water-repellent suede shield spray'
    ],
    sku: 'MDS-RN-003',
    inStock: true
  },
  {
    id: 'mds-004',
    name: 'Minimalist Court Sneaker',
    slug: 'minimalist-court-sneaker',
    tagline: 'Clean vintage tennis lines reimagined for modern dressing.',
    category: 'Sneakers',
    gender: 'Unisex',
    price: 220,
    originalPrice: undefined,
    isBestSeller: true,
    isNewArrival: false,
    isSale: false,
    rating: 4.9,
    reviewCount: 110,
    images: [
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=1000&q=80',
      '/src/assets/images/hero_footwear_campaign_1793280976179.jpg',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Ivory White', hex: '#F7F5F0' },
      { name: 'Forest Accent', hex: '#23382D' },
      { name: 'Navy Heel', hex: '#1B2A4A' }
    ],
    sizes: [
      { size: 38, stock: 6 },
      { size: 39, stock: 9 },
      { size: 40, stock: 14 },
      { size: 41, stock: 17 },
      { size: 42, stock: 15 },
      { size: 43, stock: 11 },
      { size: 44, stock: 4 }
    ],
    description: 'A discreet wardrobe cornerstone. Uncluttered lines, perforated breathability ports, and buttery soft leather that grows softer and molds uniquely to your gait with every wear.',
    details: [
      'Smooth Napa leather with side ventilation perforations',
      'Cushioned collar and reinforced achilles support',
      'Durable non-marking cupsole',
      'Removable cushioned inner sole'
    ],
    materials: ['Full Napa Leather', 'Vulcanised Rubber', 'Organic Cotton'],
    careInstructions: ['Clean gently with damp cloth', 'Air dry in ambient temperature'],
    sku: 'MDS-CRT-004',
    inStock: true
  },
  {
    id: 'mds-005',
    name: 'Premium Formal Oxford',
    slug: 'premium-formal-oxford',
    tagline: 'Sculpted cap-toe dress shoe in hand-finished calfskin.',
    category: 'Formal',
    gender: 'Men',
    price: 380,
    originalPrice: 420,
    isBestSeller: false,
    isNewArrival: true,
    isSale: false,
    rating: 5.0,
    reviewCount: 47,
    images: [
      '/src/assets/images/editorial_collection_men_1793280977039.jpg',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Burnished Walnut', hex: '#4B3322' },
      { name: 'Patent Obsidian', hex: '#0D0D0E' }
    ],
    sizes: [
      { size: 40, stock: 4 },
      { size: 41, stock: 8 },
      { size: 42, stock: 12 },
      { size: 43, stock: 7 },
      { size: 44, stock: 2 }
    ],
    description: 'The definitive formal silhouette for black tie, pivotal boardroom presentations, and milestone galas. Hand-welted closed-lacing architecture with bevelled waist and mirrored toe shine.',
    details: [
      'Goodyear-welted construction for lifetime resoleability',
      'Bevelled waist with channelled oak bark leather sole',
      'Full French calf leather lining',
      'Brass eyelets concealed inside facings'
    ],
    materials: ['French Box Calf', 'Goodyear Welt', 'Oak Bark Sole'],
    careInstructions: [
      'Polish with carnauba shoe wax for high mirror gloss',
      'Insert cedar shoe trees immediately after removal'
    ],
    sku: 'MDS-OXF-005',
    inStock: true
  },
  {
    id: 'mds-006',
    name: 'Modern Chelsea Boot',
    slug: 'modern-chelsea-boot',
    tagline: 'Streamlined wholecut boot with sculpted elastic gusset.',
    category: 'Boots',
    gender: 'Men',
    price: 360,
    originalPrice: undefined,
    isBestSeller: true,
    isNewArrival: false,
    isSale: false,
    rating: 4.8,
    reviewCount: 84,
    images: [
      '/src/assets/images/editorial_collection_men_1793280977039.jpg',
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Snuff Suede', hex: '#5E412F' },
      { name: 'Matte Charcoal', hex: '#232220' },
      { name: 'Cognac Leather', hex: '#7A3D18' }
    ],
    sizes: [
      { size: 40, stock: 6 },
      { size: 41, stock: 10 },
      { size: 42, stock: 15 },
      { size: 43, stock: 9 },
      { size: 44, stock: 4 }
    ],
    description: 'A seamless transition from daywear to evening sophistication. Cut from a continuous piece of fine leather or English suede to eliminate bulky side seams, paired with a low-profile protective Dainite rubber sole.',
    details: [
      'Single-piece wholecut upper pattern',
      'Heavy-duty tonal elastane stretch side gores',
      'Woven pull tabs with Maison Du Sole insignia',
      'Weather-resistant storm welt perimeter'
    ],
    materials: ['Water-Resistant English Suede', 'Dainite Rubber Sole', 'Calf Lining'],
    careInstructions: [
      'Brush regularly with crepe brush',
      'Apply seasonal weatherproofing mist'
    ],
    sku: 'MDS-BOT-006',
    inStock: true
  },
  {
    id: 'mds-007',
    name: 'Everyday Comfort Slip-On',
    slug: 'everyday-comfort-slip-on',
    tagline: 'Featherlight deconstructed suede slip-on with cushioned footbed.',
    category: 'Casual',
    gender: 'Unisex',
    price: 195,
    originalPrice: 230,
    isBestSeller: false,
    isNewArrival: false,
    isSale: true,
    rating: 4.7,
    reviewCount: 63,
    images: [
      'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Warm Taupe', hex: '#9E9484' },
      { name: 'Sage Olive', hex: '#687259' },
      { name: 'Deep Navy', hex: '#1E2530' }
    ],
    sizes: [
      { size: 39, stock: 7 },
      { size: 40, stock: 11 },
      { size: 41, stock: 14 },
      { size: 42, stock: 12 },
      { size: 43, stock: 8 },
      { size: 44, stock: 3 }
    ],
    description: 'Unlined, deconstructed comfort that feels like a second skin. Designed for effortless weekend travels, relaxed terrace dining, and warm-weather strolls.',
    details: [
      'Unlined velvety reverse-split calf suede',
      'Collapsible heel counter (wear upright or stepped-down)',
      'Flexible honey rubber driving sole',
      'Ergonomic memory latex insole'
    ],
    materials: ['Reverse Suede', 'Honey Gum Sole', 'Latex Core'],
    careInstructions: ['Dry brush only', 'Avoid prolonged dampness'],
    sku: 'MDS-SLP-007',
    inStock: true
  },
  {
    id: 'mds-008',
    name: "Elegant Women's Ballet Flat",
    slug: 'womens-ballet-flat',
    tagline: 'Architectural almond-toe flat with delicate grosgrain trim.',
    category: 'Women',
    gender: 'Women',
    price: 260,
    originalPrice: undefined,
    isBestSeller: true,
    isNewArrival: true,
    isSale: false,
    rating: 4.9,
    reviewCount: 88,
    images: [
      '/src/assets/images/editorial_collection_women_1793280977166.jpg',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Ivory Cream', hex: '#F6F3EC' },
      { name: 'Black Patent', hex: '#141414' },
      { name: 'Dusty Rose', hex: '#CDB1AC' }
    ],
    sizes: [
      { size: 36, stock: 5 },
      { size: 37, stock: 9 },
      { size: 38, stock: 14 },
      { size: 39, stock: 12 },
      { size: 40, stock: 8 },
      { size: 41, stock: 4 }
    ],
    description: 'A poetic blend of classical Parisian dance heritage and modern structural tailoring. Features a gently squared almond toe, functional fine bow tie for micro-adjustments, and 5mm hidden heel lift.',
    details: [
      'Glove-soft Italian nappa leather',
      'Traditional sacchetto construction for sock-like flexibility',
      'Breathable leather insole with arch cushioning',
      '5mm stacked leather heel with non-slip insert'
    ],
    materials: ['Nappa Lambskin', 'Sacchetto Leather Sole', 'Grosgrain Ribbon'],
    careInstructions: ['Wipe clean with soft cloth', 'Store in provided cotton dust bag'],
    sku: 'MDS-BAL-008',
    inStock: true
  },
  {
    id: 'mds-009',
    name: "Women's Classic Heel",
    slug: 'womens-classic-heel',
    tagline: 'Sculptural block heel designed for 12-hour grace.',
    category: 'Formal',
    gender: 'Women',
    price: 340,
    originalPrice: 380,
    isBestSeller: true,
    isNewArrival: false,
    isSale: true,
    rating: 4.8,
    reviewCount: 71,
    images: [
      '/src/assets/images/editorial_collection_women_1793280977166.jpg',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Champagne Ivory', hex: '#ECE4D4' },
      { name: 'Smoky Noir', hex: '#1C1C1E' },
      { name: 'Caramel Macchiato', hex: '#935F3A' }
    ],
    sizes: [
      { size: 36, stock: 3 },
      { size: 37, stock: 7 },
      { size: 38, stock: 11 },
      { size: 39, stock: 10 },
      { size: 40, stock: 6 },
      { size: 41, stock: 2 }
    ],
    description: 'Sculpted stability meets sensual poise. Engineered with an architectural flared block heel that distributes body weight evenly across the footbed, eliminating the pressure points of conventional stilettos.',
    details: [
      '65mm (2.5 inch) architectural flared block heel',
      'Tri-density footbed with dual forefoot cushioning pods',
      'Hand-shaped ankle strap with brass prong buckle',
      'Polished Italian leather sole with anti-slip rubber forepart'
    ],
    materials: ['Fine Calfskin', 'Leather Soles with Rubber Island', 'Brass Hardware'],
    careInstructions: [
      'Buff gently with dry cloth',
      'Heel taps replaceable at any fine cobbler'
    ],
    sku: 'MDS-HEL-009',
    inStock: true
  },
  {
    id: 'mds-010',
    name: 'Casual Canvas Sneaker',
    slug: 'casual-canvas-sneaker',
    tagline: 'Heavyweight organic cotton duck with vulcanised sole.',
    category: 'Casual',
    gender: 'Unisex',
    price: 180,
    originalPrice: undefined,
    isBestSeller: false,
    isNewArrival: false,
    isSale: false,
    rating: 4.6,
    reviewCount: 41,
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Ecru Natural', hex: '#EDE6D6' },
      { name: 'Washed Black', hex: '#2A2928' },
      { name: 'Dusty Olive', hex: '#585F49' }
    ],
    sizes: [
      { size: 38, stock: 5 },
      { size: 39, stock: 8 },
      { size: 40, stock: 12 },
      { size: 41, stock: 14 },
      { size: 42, stock: 13 },
      { size: 43, stock: 9 },
      { size: 44, stock: 4 }
    ],
    description: 'An ode to vintage maritime athletic sneakers. Crafted from 14oz ring-spun organic duck canvas, fired in a kiln using authentic Japanese vulcanisation techniques for unbreakable sole bonding.',
    details: [
      '14oz durable organic cotton duck canvas',
      'Traditional kiln-fired vulcanised rubber foxing',
      'Nickel-free aluminum eyelets',
      'Removable molded insole with arch cradle'
    ],
    materials: ['Organic Duck Canvas', 'Natural Rubber Foxing', 'Aluminum Hardware'],
    careInstructions: [
      'Spot clean with mild soap and cold water',
      'Do not machine wash or tumble dry'
    ],
    sku: 'MDS-CNV-010',
    inStock: true
  },
  {
    id: 'mds-011',
    name: 'Weekend Suede Loafer',
    slug: 'weekend-suede-loafer',
    tagline: 'Water-resistant Italian repello suede with relaxed profile.',
    category: 'Loafers',
    gender: 'Men',
    price: 310,
    originalPrice: 350,
    isBestSeller: false,
    isNewArrival: true,
    isSale: true,
    rating: 4.9,
    reviewCount: 39,
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80',
      '/src/assets/images/editorial_collection_men_1793280977039.jpg'
    ],
    colors: [
      { name: 'Warm Tobacco', hex: '#774C2F' },
      { name: 'Oatmeal Sand', hex: '#D7CBBD' },
      { name: 'Midnight Navy', hex: '#1C2433' }
    ],
    sizes: [
      { size: 40, stock: 4 },
      { size: 41, stock: 7 },
      { size: 42, stock: 12 },
      { size: 43, stock: 8 },
      { size: 44, stock: 3 }
    ],
    description: 'Effortlessly polished for coastal getaways and weekend brunches. Tailored in treated waterproof suede from Tuscany with a flexible hand-stitched moccasin toe and leather-trimmed piping.',
    details: [
      'Hydrophobic treated suede that repels liquids and stains',
      'Soft unlined upper for relaxed barefoot wear',
      'Split rubber sole islands inserted into leather outsole',
      'Subtle braided saddle accent across vamp'
    ],
    materials: ['Italian Repello Suede', 'Leather/Rubber Hybrid Sole', 'Calf Insole'],
    careInstructions: ['Brush with brass/nylon suede brush', 'Use water repellent spray'],
    sku: 'MDS-SUD-011',
    inStock: true
  },
  {
    id: 'mds-012',
    name: 'Essential Everyday Sandal',
    slug: 'essential-everyday-sandal',
    tagline: 'Molded anatomical cork footbed with vegetable-tanned straps.',
    category: 'Sandals',
    gender: 'Unisex',
    price: 185,
    originalPrice: undefined,
    isBestSeller: true,
    isNewArrival: false,
    isSale: false,
    rating: 4.8,
    reviewCount: 92,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Cognac Saddle', hex: '#7D4427' },
      { name: 'Natural Sand', hex: '#CFBEA7' },
      { name: 'Pitch Black', hex: '#171615' }
    ],
    sizes: [
      { size: 37, stock: 6 },
      { size: 38, stock: 10 },
      { size: 39, stock: 12 },
      { size: 40, stock: 14 },
      { size: 41, stock: 11 },
      { size: 42, stock: 9 },
      { size: 43, stock: 5 }
    ],
    description: 'An architectural expression of summer repose. Features thick oiled vegetable-tanned bridle leather straps fastened with brushed antique brass buckles atop a natural Portuguese cork footbed that customizes to your sole contour.',
    details: [
      '3.5mm thick vegetable-tanned bridle leather',
      'Natural Portuguese cork and tree sap latex footbed',
      'Brushed solid brass hardware that patinates over time',
      'Durable EVA traction outsole for shock absorption'
    ],
    materials: ['Bridle Leather', 'Natural Cork & Latex', 'Solid Brass'],
    careInstructions: [
      'Feed leather with saddle balm once per season',
      'Seal cork edges with cork sealant if dried'
    ],
    sku: 'MDS-SAN-012',
    inStock: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    productId: 'mds-001',
    author: 'Julian Vane',
    rating: 5,
    date: '2026-09-14',
    title: 'The benchmark of luxury sneakers',
    comment: 'The leather grain is noticeably superior to common luxury fashion houses. Broke in within half an hour and pairs seamlessly with tailored wool trousers or denim.',
    verified: true,
    fitFeedback: 'True to Size'
  },
  {
    id: 'rev-02',
    productId: 'mds-001',
    author: 'Clara Montgomery',
    rating: 5,
    date: '2026-09-28',
    title: 'Flawless finishing and comfort',
    comment: 'The subtle gold foil detail and the butter-soft lining make this my favorite daily pair. Worth every penny.',
    verified: true,
    fitFeedback: 'True to Size'
  },
  {
    id: 'rev-03',
    productId: 'mds-002',
    author: 'Marcus Sterling',
    rating: 5,
    date: '2026-10-02',
    title: 'Impeccable Blake stitch flexibility',
    comment: 'The burnish on the espresso calfskin is magnificent. Zero heel slippage and the arch support is surprisingly substantial for a loafer.',
    verified: true,
    fitFeedback: 'True to Size'
  },
  {
    id: 'rev-04',
    productId: 'mds-005',
    author: 'Alexander Wright',
    rating: 5,
    date: '2026-10-18',
    title: 'Goodyear welt perfection for formal wear',
    comment: 'Wore these for my wedding weekend. Elegant bevelled waist and remarkable leather quality. Highly recommended.',
    verified: true,
    fitFeedback: 'True to Size'
  },
  {
    id: 'rev-05',
    productId: 'mds-008',
    author: 'Elena Rostova',
    rating: 5,
    date: '2026-10-21',
    title: 'Sublime softness, no blister break-in',
    comment: 'The sacchetto construction makes these feel like a glove. Beautiful square-toe cut that looks high fashion without being exaggerated.',
    verified: true,
    fitFeedback: 'True to Size'
  }
];
