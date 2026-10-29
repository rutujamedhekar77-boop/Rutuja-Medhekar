/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Category = 
  | 'Men' 
  | 'Women' 
  | 'Sneakers' 
  | 'Formal' 
  | 'Casual' 
  | 'Loafers' 
  | 'Boots' 
  | 'Sandals';

export type Gender = 'Men' | 'Women' | 'Unisex';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSize {
  size: number | string; // e.g. 40, 41, 42, 43, 44 or "38 EU / 7.5 US"
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: Category;
  gender: Gender;
  price: number;
  originalPrice?: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isSale?: boolean;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  description: string;
  details: string[];
  materials: string[];
  careInstructions: string[];
  sku: string;
  inStock: boolean;
}

export interface CartItem {
  id: string; // productId-color-size
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  selectedSize: string | number;
  selectedColor: ProductColor;
  quantity: number;
  maxStock: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  fitFeedback?: 'Runs Small' | 'True to Size' | 'Runs Large';
}

export type OrderStatus =
  | 'Order Placed'
  | 'Payment Confirmed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Return Requested';

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
}

export interface ShippingAddress {
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface DeliveryOption {
  id: string;
  name: string;
  price: number;
  estimatedWindow: string;
}

export interface Order {
  id: string;
  date: string;
  customer: OrderCustomer;
  shippingAddress: ShippingAddress;
  deliveryMethod: DeliveryOption;
  paymentMethod: string;
  paymentStatus: 'Paid' | 'Pending' | 'Cash on Delivery';
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  shippingCost: number;
  tax: number;
  total: number;
  status: OrderStatus;
  trackingNumber?: string;
  carrier?: string;
  notes?: string;
}

export interface UserAddress extends ShippingAddress {
  id: string;
  isDefault?: boolean;
  recipientName: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: UserAddress[];
  role: 'customer' | 'admin';
}

export interface CurrencyConfig {
  code: 'USD' | 'EUR' | 'GBP' | 'INR';
  symbol: string;
  rate: number; // 1 USD = rate
}

export interface StoreSettings {
  currency: 'USD' | 'EUR' | 'GBP' | 'INR';
  currencySymbol: string;
  exchangeRate: number;
  taxRate: number; // e.g. 0.08 for 8%
  freeShippingThreshold: number;
  standardShippingFee: number;
  expressShippingFee: number;
  announcementText: string;
  showAnnouncement: boolean;
  businessPhone: string;
  businessEmail: string;
  businessAddress: string;
  returnWindowDays: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  date: string;
  status: 'Unread' | 'Replied';
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  date: string;
}

export type PageView =
  | 'home'
  | 'shop'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'confirmation'
  | 'tracking'
  | 'account'
  | 'wishlist'
  | 'about'
  | 'contact'
  | 'faq'
  | 'shipping-returns'
  | 'refund-policy'
  | 'privacy-policy'
  | 'terms-conditions'
  | 'admin';

export interface FilterState {
  category: string;
  gender: string;
  size: string;
  color: string;
  priceRange: [number, number];
  inStockOnly: boolean;
  minRating: number;
  searchQuery: string;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'best-selling';
}
