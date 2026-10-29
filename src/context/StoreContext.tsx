/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  CartItem,
  Order,
  OrderStatus,
  StoreSettings,
  PageView,
  User,
  ProductColor,
  ContactMessage,
  NewsletterSubscriber,
  Review
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from '../data/products';
import { DEFAULT_STORE_SETTINGS, CURRENCIES, INITIAL_ORDERS } from '../data/storeConfig';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextType {
  // Navigation & Page State
  currentPage: PageView;
  selectedProductSlug: string | null;
  navigateTo: (page: PageView, productSlug?: string) => void;

  // Catalog & Inventory
  products: Product[];
  reviews: Review[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addReview: (review: Omit<Review, 'id' | 'date' | 'verified'>) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: number | string, color: ProductColor, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  discountCode: string;
  discountAmount: number;
  applyDiscountCode: (code: string) => { success: boolean; message: string };
  removeDiscountCode: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  latestOrder: Order | null;
  placeOrder: (orderData: {
    customer: Order['customer'];
    shippingAddress: Order['shippingAddress'];
    deliveryMethod: Order['deliveryMethod'];
    paymentMethod: string;
    paymentStatus: Order['paymentStatus'];
    notes?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string, carrier?: string) => void;
  getOrderById: (orderId: string) => Order | undefined;

  // User & Auth
  currentUser: User | null;
  login: (email: string, role?: 'customer' | 'admin') => void;
  logout: () => void;
  register: (name: string, email: string) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;

  // Store Settings & Currency
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  formatPrice: (amountInUSD: number) => string;
  setCurrency: (currency: StoreSettings['currency']) => void;

  // Newsletter & Inquiries
  subscribers: NewsletterSubscriber[];
  subscribeNewsletter: (email: string) => { success: boolean; message: string };
  contactMessages: ContactMessage[];
  submitContactMessage: (msg: { name: string; email: string; phone?: string; subject: string; message: string }) => { success: boolean; message: string };
  markMessageRead: (id: string) => void;

  // Modals & UI
  toasts: ToastItem[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation State with window.location hash support
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(null);

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('mds_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('mds_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mds_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mds_wishlist');
      return saved ? JSON.parse(saved) : ['mds-001', 'mds-006'];
    } catch {
      return ['mds-001', 'mds-006'];
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('mds_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // User Auth
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('mds_user');
      return saved ? JSON.parse(saved) : {
        id: 'usr-1',
        name: 'Julian Vane',
        email: 'julian.vane@example.com',
        phone: '+1 (555) 019-8234',
        role: 'customer',
        addresses: [
          {
            id: 'addr-1',
            recipientName: 'Julian Vane',
            address: '450 Sutter St',
            apartment: 'Floor 14',
            city: 'San Francisco',
            state: 'CA',
            postalCode: '94108',
            country: 'United States',
            isDefault: true
          }
        ]
      };
    } catch {
      return null;
    }
  });
  const [isAdmin, setIsAdmin] = useState(false);

  // Store Settings
  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('mds_settings');
      return saved ? JSON.parse(saved) : DEFAULT_STORE_SETTINGS;
    } catch {
      return DEFAULT_STORE_SETTINGS;
    }
  });

  // Newsletter & Contact
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(() => {
    try {
      const saved = localStorage.getItem('mds_subscribers');
      return saved ? JSON.parse(saved) : [
        { id: 'sub-1', email: 'clara.montgomery@example.com', date: '2026-10-15' },
        { id: 'sub-2', email: 'marcus.sterling@example.com', date: '2026-10-20' }
      ];
    } catch {
      return [];
    }
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem('mds_messages');
      return saved ? JSON.parse(saved) : [
        {
          id: 'msg-1',
          name: 'Sarah Jenkins',
          email: 'sarah.j@example.com',
          phone: '+1 (555) 890-1234',
          subject: 'Custom Width Sizing Inquiry',
          message: 'Hello, I adore the Ballet Flat design! Does your atelier offer customized wide width lasting for size 39?',
          date: '2026-10-27',
          status: 'Unread'
        }
      ];
    } catch {
      return [];
    }
  });

  // UI & Modals
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Persist products
  useEffect(() => {
    localStorage.setItem('mds_products', JSON.stringify(products));
  }, [products]);

  // Persist reviews
  useEffect(() => {
    localStorage.setItem('mds_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('mds_cart', JSON.stringify(cart));
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    localStorage.setItem('mds_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Persist orders
  useEffect(() => {
    localStorage.setItem('mds_orders', JSON.stringify(orders));
  }, [orders]);

  // Persist user
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('mds_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('mds_user');
    }
  }, [currentUser]);

  // Persist settings
  useEffect(() => {
    localStorage.setItem('mds_settings', JSON.stringify(settings));
  }, [settings]);

  // Persist subscribers
  useEffect(() => {
    localStorage.setItem('mds_subscribers', JSON.stringify(subscribers));
  }, [subscribers]);

  // Persist contact messages
  useEffect(() => {
    localStorage.setItem('mds_messages', JSON.stringify(contactMessages));
  }, [contactMessages]);

  // URL hash sync on popstate
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === '') {
        setCurrentPage('home');
        setSelectedProductSlug(null);
      } else if (hash.startsWith('product/')) {
        const slug = hash.replace('product/', '');
        setSelectedProductSlug(slug);
        setCurrentPage('product');
      } else {
        const validPages: PageView[] = [
          'home', 'shop', 'product', 'cart', 'checkout', 'confirmation',
          'tracking', 'account', 'wishlist', 'about', 'contact', 'faq',
          'shipping-returns', 'refund-policy', 'privacy-policy', 'terms-conditions', 'admin'
        ];
        if (validPages.includes(hash as PageView)) {
          setCurrentPage(hash as PageView);
        }
      }
    };

    handleHash();
    window.addEventListener('popstate', handleHash);
    return () => window.removeEventListener('popstate', handleHash);
  }, []);

  const navigateTo = (page: PageView, productSlug?: string) => {
    setCurrentPage(page);
    if (page === 'product' && productSlug) {
      setSelectedProductSlug(productSlug);
      window.location.hash = `product/${productSlug}`;
    } else if (page === 'home') {
      window.location.hash = '';
      setSelectedProductSlug(null);
    } else {
      window.location.hash = page;
      setSelectedProductSlug(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast feedback
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Price formatting based on configured currency
  const formatPrice = (amountInUSD: number): string => {
    const converted = amountInUSD * settings.exchangeRate;
    if (settings.currency === 'INR') {
      return `${settings.currencySymbol}${Math.round(converted).toLocaleString('en-IN')}`;
    }
    return `${settings.currencySymbol}${converted.toFixed(2)}`;
  };

  const setCurrency = (currCode: StoreSettings['currency']) => {
    const match = CURRENCIES.find((c) => c.code === currCode);
    if (match) {
      setSettings((prev) => ({
        ...prev,
        currency: match.code,
        currencySymbol: match.symbol,
        exchangeRate: match.rate
      }));
      showToast(`Currency updated to ${match.code} (${match.symbol})`, 'info');
    }
  };

  // Cart operations
  const addToCart = (product: Product, size: number | string, color: ProductColor, quantity = 1) => {
    if (!size || !color) {
      showToast('Please select your size and color variant', 'error');
      return;
    }

    const cartItemId = `${product.id}-${color.name}-${size}`;
    const sizeObj = product.sizes.find((s) => String(s.size) === String(size));
    const maxStock = sizeObj ? sizeObj.stock : 10;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, maxStock);
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQty } : item
        );
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            productId: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.images[0] || '',
            selectedSize: size,
            selectedColor: color,
            quantity: Math.min(quantity, maxStock),
            maxStock
          }
        ];
      }
    });

    showToast(`Added ${product.name} (EU ${size}) to shopping bag`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from shopping bag', 'info');
  };

  const updateCartQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const clamped = Math.min(newQuantity, item.maxStock);
          return { ...item, quantity: clamped };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setDiscountCode('');
    setDiscountPercent(0);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const applyDiscountCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SIGNATURE15' || clean === 'SOLE15') {
      setDiscountCode(clean);
      setDiscountPercent(0.15);
      showToast('15% Signature discount applied!', 'success');
      return { success: true, message: '15% privilege discount applied' };
    }
    if (clean === 'WELCOME10' || clean === 'FIRST10') {
      setDiscountCode(clean);
      setDiscountPercent(0.1);
      showToast('10% Welcome discount applied!', 'success');
      return { success: true, message: '10% welcome discount applied' };
    }
    if (clean === 'VIP20') {
      setDiscountCode(clean);
      setDiscountPercent(0.2);
      showToast('20% VIP collector discount applied!', 'success');
      return { success: true, message: '20% VIP collector discount applied' };
    }
    showToast('Invalid or expired promotional code', 'error');
    return { success: false, message: 'Invalid or expired promotional code' };
  };

  const removeDiscountCode = () => {
    setDiscountCode('');
    setDiscountPercent(0);
    showToast('Promotional code removed', 'info');
  };

  const discountAmount = cartSubtotal * discountPercent;

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Item removed from your wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders
  const placeOrder = (orderData: {
    customer: Order['customer'];
    shippingAddress: Order['shippingAddress'];
    deliveryMethod: Order['deliveryMethod'];
    paymentMethod: string;
    paymentStatus: Order['paymentStatus'];
    notes?: string;
  }): Order => {
    const orderNum = `MDS-${Math.floor(10000 + Math.random() * 90000)}`;
    const shippingCost = orderData.deliveryMethod.price;
    const tax = Number(((cartSubtotal - discountAmount) * settings.taxRate).toFixed(2));
    const total = Number((cartSubtotal - discountAmount + shippingCost + tax).toFixed(2));

    const newOrder: Order = {
      id: orderNum,
      date: new Date().toISOString(),
      customer: orderData.customer,
      shippingAddress: orderData.shippingAddress,
      deliveryMethod: orderData.deliveryMethod,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentStatus,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      discountCode: discountCode || undefined,
      shippingCost,
      tax,
      total,
      status: 'Order Placed',
      trackingNumber: `MDS-TRK-${Math.floor(100000 + Math.random() * 900000)}`,
      carrier: 'DHL Express International',
      notes: orderData.notes
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    trackingNumber?: string,
    carrier?: string
  ) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status,
            trackingNumber: trackingNumber ?? ord.trackingNumber,
            carrier: carrier ?? ord.carrier
          };
        }
        return ord;
      })
    );
    showToast(`Order ${orderId} updated to "${status}"`, 'success');
  };

  const getOrderById = (orderId: string): Order | undefined => {
    const clean = orderId.trim().toUpperCase();
    return orders.find(
      (o) => o.id.toUpperCase() === clean || o.id.toUpperCase().replace('-', '') === clean.replace('-', '')
    );
  };

  // User Auth
  const login = (email: string, role: 'customer' | 'admin' = 'customer') => {
    const user: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace(/[._]/g, ' '),
      email,
      role,
      addresses: [
        {
          id: 'addr-default',
          recipientName: email.split('@')[0],
          address: '742 Evergreen Terrace',
          city: 'Portland',
          state: 'OR',
          postalCode: '97201',
          country: 'United States',
          isDefault: true
        }
      ]
    };
    setCurrentUser(user);
    if (role === 'admin') setIsAdmin(true);
    showToast(`Welcome back, ${user.name}`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    showToast('Signed out successfully', 'info');
  };

  const register = (name: string, email: string) => {
    const user: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: 'customer',
      addresses: []
    };
    setCurrentUser(user);
    showToast(`Welcome to Maison Du Sole, ${name}`, 'success');
  };

  // Product Admin Operations
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `mds-${Date.now()}`;
    const product: Product = { ...newProd, id };
    setProducts((prev) => [product, ...prev]);
    showToast(`Product "${product.name}" created`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Product updated successfully', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog', 'info');
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'verified'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      verified: true
    };
    setReviews((prev) => [newRev, ...prev]);
    // Recalculate product rating
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === reviewData.productId) {
          const prodReviews = [...reviews.filter((r) => r.productId === p.id), newRev];
          const avg = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
          return {
            ...p,
            rating: Number(avg.toFixed(1)),
            reviewCount: prodReviews.length
          };
        }
        return p;
      })
    );
    showToast('Thank you! Your verified review has been published.', 'success');
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Store settings updated', 'success');
  };

  // Newsletter
  const subscribeNewsletter = (email: string) => {
    const clean = email.trim().toLowerCase();
    if (!clean || !clean.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    if (subscribers.some((s) => s.email === clean)) {
      return { success: false, message: 'You are already subscribed to Maison Du Sole.' };
    }
    const newSub: NewsletterSubscriber = {
      id: `sub-${Date.now()}`,
      email: clean,
      date: new Date().toISOString().split('T')[0]
    };
    setSubscribers((prev) => [newSub, ...prev]);
    showToast('Thank you for subscribing to Maison Du Sole.', 'success');
    return { success: true, message: 'Subscription confirmed. Welcome to our private circle.' };
  };

  // Contact Form Submission
  const submitContactMessage = (msg: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) => {
    if (!msg.name.trim() || !msg.email.trim() || !msg.message.trim()) {
      return { success: false, message: 'Please complete all required fields.' };
    }
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: msg.name,
      email: msg.email,
      phone: msg.phone,
      subject: msg.subject || 'Customer Inquiry',
      message: msg.message,
      date: new Date().toISOString().split('T')[0],
      status: 'Unread'
    };
    setContactMessages((prev) => [newMsg, ...prev]);
    showToast('Your message has been delivered to our concierge atelier.', 'success');
    return { success: true, message: 'Message sent successfully. Our team will respond within 24 hours.' };
  };

  const markMessageRead = (id: string) => {
    setContactMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'Replied' } : m))
    );
  };

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        selectedProductSlug,
        navigateTo,
        products,
        reviews,
        addProduct,
        updateProduct,
        deleteProduct,
        addReview,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        discountCode,
        discountAmount,
        applyDiscountCode,
        removeDiscountCode,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        latestOrder,
        placeOrder,
        updateOrderStatus,
        getOrderById,
        currentUser,
        login,
        logout,
        register,
        isAdmin,
        setIsAdmin,
        settings,
        updateSettings,
        formatPrice,
        setCurrency,
        subscribers,
        subscribeNewsletter,
        contactMessages,
        submitContactMessage,
        markMessageRead,
        toasts,
        showToast,
        removeToast,
        quickViewProduct,
        setQuickViewProduct,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
