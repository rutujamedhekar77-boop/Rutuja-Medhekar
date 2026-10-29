/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StoreSettings, Order } from '../types';

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  currency: 'USD',
  currencySymbol: '$',
  exchangeRate: 1,
  taxRate: 0.08, // 8% sales tax
  freeShippingThreshold: 250,
  standardShippingFee: 15,
  expressShippingFee: 35,
  announcementText: 'Complimentary Worldwide Shipping on Orders Over $250 · Extended 30-Day Returns',
  showAnnouncement: true,
  businessPhone: '+1 (555) 014-7788',
  businessEmail: 'orders@maisondusole.com',
  businessAddress: 'Shop No. 2, Karishma Society, Kothrud',
  returnWindowDays: 30
};

export const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1.0, label: 'USD ($)' },
  { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR (€)' },
  { code: 'GBP', symbol: '£', rate: 0.79, label: 'GBP (£)' },
  { code: 'INR', symbol: '₹', rate: 84.5, label: 'INR (₹)' }
] as const;

export interface FaqItem {
  id: string;
  category: 'Sizing & Fit' | 'Orders & Shipping' | 'Returns & Refunds' | 'Materials & Care' | 'Payments';
  question: string;
  answer: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Sizing & Fit',
    question: 'How do I choose my shoe size?',
    answer: 'Our footwear follows standard European sizing (EU 36–46). Most styles fit true to size. If you are typically between sizes or have a wider foot profile, we recommend taking the larger size. You can also consult our interactive Size Guide on any product page, which provides exact millimeter measurements and US/UK conversion charts.'
  },
  {
    id: 'faq-2',
    category: 'Orders & Shipping',
    question: 'How can I track my order?',
    answer: 'Once your order is dispatched, you will receive an automated dispatch notification with your carrier tracking number. You can also enter your order reference (e.g. MDS-10024) and email into our dedicated "Track Order" portal in the navigation bar to inspect live milestones.'
  },
  {
    id: 'faq-3',
    category: 'Payments',
    question: 'What payment methods are accepted?',
    answer: 'We accept major international credit and debit cards (Visa, MasterCard, American Express), Apple Pay, Google Pay, UPI (for regional payments), Net Banking, and select digital wallets. Cash on Delivery (COD) is also available in eligible delivery zones with SMS/phone verification.'
  },
  {
    id: 'faq-4',
    category: 'Orders & Shipping',
    question: 'How long does delivery take?',
    answer: 'Standard Complimentary shipping arrives within 3 to 5 business days. Express Priority Courier arrives within 1 to 2 business days. Remote or international addresses may require 5 to 8 business days.'
  },
  {
    id: 'faq-5',
    category: 'Returns & Refunds',
    question: 'What is the return and exchange policy?',
    answer: 'We provide an extended 30-day return and exchange window from the date of delivery. Shoes must be unworn, undamaged, in their original presentation box, and accompanied by the fabric dust bags. Try your footwear on a carpeted surface to avoid scuffing the fine leather soles.'
  },
  {
    id: 'faq-6',
    category: 'Orders & Shipping',
    question: 'Can I cancel or modify an order?',
    answer: 'Orders can be modified or cancelled within 2 hours of placement before our atelier begins packaging. Please contact our concierge immediately at orders@maisondusole.com or call +1 (555) 014-7788.'
  },
  {
    id: 'faq-7',
    category: 'Orders & Shipping',
    question: 'How do I contact customer support?',
    answer: 'Our concierge team is available Monday through Saturday from 10:00 AM to 8:00 PM, and Sunday from 11:00 AM to 6:00 PM. You can reach us via our Contact Us form, email us at orders@maisondusole.com, or telephone +1 (555) 014-7788.'
  },
  {
    id: 'faq-8',
    category: 'Returns & Refunds',
    question: 'What should I do if my shoes arrive damaged?',
    answer: 'Every pair passes a three-stage quality inspection before leaving our atelier. However, if any transit damage occurs, notify us within 48 hours of receipt with clear photographs. We will immediately dispatch a pristine replacement and arrange complimentary pickup.'
  },
  {
    id: 'faq-9',
    category: 'Orders & Shipping',
    question: 'Can I change my shipping address?',
    answer: 'If your order has not yet been collected by the courier, our team can promptly update your shipping destination. Reach out to concierge support as soon as possible.'
  },
  {
    id: 'faq-10',
    category: 'Materials & Care',
    question: 'How should I care for my leather soles?',
    answer: 'Natural leather soles will initially conform to your foot and acquire a gentle patina. For prolonged longevity, avoid wearing them in wet deluge conditions and allow 24 hours between wears using cedar shoe trees to absorb moisture.'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'MDS-10024',
    date: '2026-10-25T14:30:00Z',
    customer: {
      name: 'Eleanor Vance',
      email: 'eleanor.vance@example.com',
      phone: '+1 (555) 234-8991'
    },
    shippingAddress: {
      address: '742 Evergreen Terrace',
      apartment: 'Suite 4B',
      city: 'Portland',
      state: 'OR',
      postalCode: '97201',
      country: 'United States'
    },
    deliveryMethod: {
      id: 'express',
      name: 'Express Priority Courier',
      price: 35,
      estimatedWindow: '1-2 Business Days'
    },
    paymentMethod: 'Credit Card (Visa ending in 4242)',
    paymentStatus: 'Paid',
    items: [
      {
        id: 'mds-001-Pure White & Gum-42',
        productId: 'mds-001',
        name: 'The Signature White Sneaker',
        price: 240,
        image: '/src/assets/images/hero_footwear_campaign_1793280976179.jpg',
        selectedSize: 42,
        selectedColor: { name: 'Pure White & Gum', hex: '#FAF9F6' },
        quantity: 1,
        maxStock: 18
      }
    ],
    subtotal: 240,
    discount: 0,
    shippingCost: 35,
    tax: 19.2,
    total: 294.2,
    status: 'Shipped',
    trackingNumber: 'MDS-TRK-774921',
    carrier: 'DHL Express International',
    notes: 'Signature required upon delivery.'
  },
  {
    id: 'MDS-10025',
    date: '2026-10-27T09:15:00Z',
    customer: {
      name: 'Rohan Mehta',
      email: 'rohan.mehta@example.com',
      phone: '+1 (555) 782-9900'
    },
    shippingAddress: {
      address: 'Flat 12, Karishma Society',
      apartment: 'Building C',
      city: 'Kothrud, Pune',
      state: 'MH',
      postalCode: '411038',
      country: 'India'
    },
    deliveryMethod: {
      id: 'standard',
      name: 'Complimentary Express',
      price: 0,
      estimatedWindow: '2-4 Business Days'
    },
    paymentMethod: 'UPI (rohan@okhdfcbank)',
    paymentStatus: 'Paid',
    items: [
      {
        id: 'mds-002-Espresso Calf-41',
        productId: 'mds-002',
        name: 'Classic Leather Loafer',
        price: 320,
        image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80',
        selectedSize: 41,
        selectedColor: { name: 'Espresso Calf', hex: '#382218' },
        quantity: 1,
        maxStock: 11
      }
    ],
    subtotal: 320,
    discount: 32,
    discountCode: 'SIGNATURE10',
    shippingCost: 0,
    tax: 23.04,
    total: 311.04,
    status: 'Processing',
    trackingNumber: 'MDS-TRK-881290',
    carrier: 'BlueDart Air Express'
  }
];
