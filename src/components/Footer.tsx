/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, Shield, Instagram, Globe } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PageView } from '../types';

export const Footer: React.FC = () => {
  const {
    navigateTo,
    settings,
    subscribeNewsletter,
    setIsSizeGuideOpen,
    isAdmin,
    setIsAdmin
  } = useStore();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const res = subscribeNewsletter(newsletterEmail);
    setNewsletterStatus(res);
    if (res.success) {
      setNewsletterEmail('');
    }
  };

  const handleShopLink = (filter: string) => {
    sessionStorage.setItem('mds_nav_filter', filter);
    navigateTo('shop');
  };

  return (
    <footer className="bg-[#161514] text-[#FAF8F5] pt-16 pb-12 border-t border-[#292724]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tier: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-[#2B2926]">
          
          {/* Brand Introduction */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-serif text-2xl font-bold tracking-[0.2em] text-[#FAF8F5]">
              MAISON DU SOLE
            </h2>
            <p className="text-xs uppercase tracking-[0.2em] text-[#C5A880]">
              Step Into Your Signature Style
            </p>
            <p className="text-xs text-[#A8A199] leading-relaxed max-w-sm">
              Maison Du Sole creates footwear where European benchcraft traditions merge with modern architectural silhouettes. Hand-welted leathers, anatomical comfort, and unwavering attention to each stitch.
            </p>

            <div className="pt-2 flex items-center gap-4 text-[#A8A199]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#C5A880] transition-colors p-1"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#C5A880] transition-colors p-1"
                aria-label="Pinterest"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="lg:col-span-7 bg-[#1E1D1B] p-6 sm:p-8 border border-[#2B2926] space-y-3">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C5A880] block">
              The Maison Private Circle
            </span>
            <h3 className="font-serif text-xl font-bold text-white">
              A Step Ahead
            </h3>
            <p className="text-xs text-[#A8A199]">
              Be the first to discover new seasonal releases, atelier insights, and private trunk show invitations.
            </p>

            <form onSubmit={handleSubscribe} className="pt-2 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-1 bg-[#161514] border border-[#3D3A35] px-4 py-3 text-xs text-white placeholder:text-[#6E6861] focus:outline-none focus:border-[#C5A880]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#C5A880] hover:bg-[#A88A60] text-[#161514] text-xs font-semibold uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {newsletterStatus && (
              <p
                className={`text-[11px] mt-1 ${
                  newsletterStatus.success ? 'text-[#87C293]' : 'text-red-400'
                }`}
              >
                {newsletterStatus.message}
              </p>
            )}

            <p className="text-[10px] text-[#6E6861] pt-1">
              By subscribing, you agree to our Privacy Policy and consent to receive curated updates. Unsubscribe anytime.
            </p>
          </div>

        </div>

        {/* Middle Tier: Navigation Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#2B2926] text-xs">
          
          {/* Column 1: Collections */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white">
              Collections
            </h4>
            <ul className="space-y-2 text-[#A8A199]">
              <li>
                <button onClick={() => handleShopLink('all')} className="hover:text-white transition-colors cursor-pointer">
                  Shop All Styles
                </button>
              </li>
              <li>
                <button onClick={() => handleShopLink('Men')} className="hover:text-white transition-colors cursor-pointer">
                  Men's Shoes
                </button>
              </li>
              <li>
                <button onClick={() => handleShopLink('Women')} className="hover:text-white transition-colors cursor-pointer">
                  Women's Shoes
                </button>
              </li>
              <li>
                <button onClick={() => handleShopLink('Sneakers')} className="hover:text-white transition-colors cursor-pointer">
                  Luxury Sneakers
                </button>
              </li>
              <li>
                <button onClick={() => handleShopLink('Formal')} className="hover:text-white transition-colors cursor-pointer">
                  Formal & Dress Oxfords
                </button>
              </li>
              <li>
                <button onClick={() => handleShopLink('Loafers')} className="hover:text-white transition-colors cursor-pointer">
                  Loafers & Slip-Ons
                </button>
              </li>
              <li>
                <button onClick={() => handleShopLink('Boots')} className="hover:text-white transition-colors cursor-pointer">
                  Chelsea & Ankle Boots
                </button>
              </li>
              <li>
                <button onClick={() => handleShopLink('Sandals')} className="hover:text-white transition-colors cursor-pointer">
                  Anatomical Sandals
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Client Concierge */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white">
              Client Concierge
            </h4>
            <ul className="space-y-2 text-[#A8A199]">
              <li>
                <button onClick={() => navigateTo('tracking')} className="hover:text-white transition-colors cursor-pointer">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => setIsSizeGuideOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  Footwear Size Guide
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors cursor-pointer">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Customer Support
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-white transition-colors cursor-pointer">
                  Customer Portal & Orders
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('wishlist')} className="hover:text-white transition-colors cursor-pointer">
                  Saved Wishlist
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: The Atelier */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white">
              The Atelier & Policies
            </h4>
            <ul className="space-y-2 text-[#A8A199]">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors cursor-pointer">
                  Our Brand Heritage
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shipping-returns')} className="hover:text-white transition-colors cursor-pointer">
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('refund-policy')} className="hover:text-white transition-colors cursor-pointer">
                  Returns & Exchange Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy-policy')} className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('terms-conditions')} className="hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setIsAdmin(!isAdmin);
                    navigateTo('admin');
                  }}
                  className="hover:text-[#C5A880] text-[#9E7F53] flex items-center gap-1 font-medium transition-colors cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Store Management</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Contact Info */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white">
              Flagship Atelier
            </h4>
            <div className="space-y-2.5 text-[#A8A199]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>{settings.businessAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href={`tel:${settings.businessPhone}`} className="hover:text-white transition-colors">
                  {settings.businessPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href={`mailto:${settings.businessEmail}`} className="hover:text-white transition-colors">
                  {settings.businessEmail}
                </a>
              </div>
              <div className="pt-2 text-[11px] text-[#6E6861]">
                <p>Monday – Saturday: 10am – 8pm</p>
                <p>Sunday: 11am – 6pm</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Tier: Accepted Payments & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6E6861]">
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-wider text-[#A8A199]">Accepted Payments:</span>
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#A8A199]">
              <span className="px-1.5 py-0.5 border border-[#33312E] bg-[#1E1D1B]">Visa</span>
              <span className="px-1.5 py-0.5 border border-[#33312E] bg-[#1E1D1B]">MasterCard</span>
              <span className="px-1.5 py-0.5 border border-[#33312E] bg-[#1E1D1B]">Amex</span>
              <span className="px-1.5 py-0.5 border border-[#33312E] bg-[#1E1D1B]">Apple Pay</span>
              <span className="px-1.5 py-0.5 border border-[#33312E] bg-[#1E1D1B]">UPI</span>
              <span className="px-1.5 py-0.5 border border-[#33312E] bg-[#1E1D1B]">COD</span>
            </div>
          </div>

          <p className="text-center md:text-right">
            © 2026 Maison Du Sole. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
