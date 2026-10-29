/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User as UserIcon, Menu, X, Shield } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PageView } from '../types';

export const Header: React.FC = () => {
  const {
    navigateTo,
    currentPage,
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsSearchOpen,
    currentUser,
    isAdmin
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageView; filter?: string }[] = [
    { label: 'Shop All', page: 'shop' },
    { label: 'Men', page: 'shop', filter: 'Men' },
    { label: 'Women', page: 'shop', filter: 'Women' },
    { label: 'Sneakers', page: 'shop', filter: 'Sneakers' },
    { label: 'Formal', page: 'shop', filter: 'Formal' },
    { label: 'Casual', page: 'shop', filter: 'Casual' },
    { label: 'New Arrivals', page: 'shop', filter: 'new-arrivals' },
    { label: 'Sale', page: 'shop', filter: 'sale' }
  ];

  const handleNavClick = (page: PageView, filter?: string) => {
    if (filter) {
      sessionStorage.setItem('mds_nav_filter', filter);
    } else {
      sessionStorage.removeItem('mds_nav_filter');
    }
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Mobile Hamburger Button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1C1A18] hover:text-[#C5A880] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Zone 1: Single Brand Wordmark in luxury serif */}
        <button
          onClick={() => navigateTo('home')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#1C1A18] group-hover:text-[#9E7F53] transition-colors whitespace-nowrap">
            MAISON DU SOLE
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-[0.08em] uppercase text-[#33312E]">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.page, link.filter)}
              className="relative py-2 hover:text-[#C5A880] transition-colors whitespace-nowrap group cursor-pointer"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions & Affordances */}
        <div className="flex items-center gap-4 sm:gap-6 text-[#1C1A18] shrink-0">
          
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1.5 hover:text-[#C5A880] transition-colors cursor-pointer"
            aria-label="Search catalogue"
          >
            <Search className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* Customer Account / Profile */}
          <button
            onClick={() => navigateTo('account')}
            className="p-1.5 hover:text-[#C5A880] transition-colors cursor-pointer relative"
            aria-label="Customer account"
          >
            <UserIcon className="w-5 h-5 stroke-[1.75]" />
            {currentUser && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C5A880]" />
            )}
          </button>

          {/* Wishlist */}
          <button
            onClick={() => navigateTo('wishlist')}
            className="p-1.5 hover:text-[#C5A880] transition-colors cursor-pointer relative"
            aria-label="View saved wishlist"
          >
            <Heart className="w-5 h-5 stroke-[1.75]" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#1C1A18] text-[#FAF8F5] text-[10px] font-medium flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3 py-2 bg-[#1C1A18] text-[#FAF8F5] hover:bg-[#33312E] transition-all rounded-none cursor-pointer group"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2] group-hover:scale-105 transition-transform" />
            <span className="text-xs font-semibold tracking-wider font-mono tabular-nums">
              {cartCount}
            </span>
          </button>

          {/* Admin Dashboard shortcut button if admin mode */}
          {isAdmin && (
            <button
              onClick={() => navigateTo('admin')}
              className="hidden md:flex items-center gap-1.5 text-xs text-[#9E7F53] border border-[#9E7F53] px-2.5 py-1 uppercase tracking-wider hover:bg-[#9E7F53] hover:text-white transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          )}

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-[#FAF8F5] z-50 border-t border-[#E8E2D8] flex flex-col justify-between p-6 overflow-y-auto animate-in slide-in-from-top duration-200">
          <div className="space-y-4">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-[#8C827A] uppercase mb-2">
              Collections & Departments
            </p>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.page, link.filter)}
                className="w-full text-left py-2.5 text-base font-serif tracking-wide text-[#1C1A18] border-b border-[#F0EBE1] hover:text-[#C5A880] transition-colors"
              >
                {link.label}
              </button>
            ))}

            <div className="pt-4 space-y-3">
              <button
                onClick={() => { navigateTo('tracking'); setMobileMenuOpen(false); }}
                className="w-full text-left text-sm text-[#4A4744] hover:text-[#1C1A18] py-1"
              >
                Track Your Order
              </button>
              <button
                onClick={() => { navigateTo('about'); setMobileMenuOpen(false); }}
                className="w-full text-left text-sm text-[#4A4744] hover:text-[#1C1A18] py-1"
              >
                The Atelier Story
              </button>
              <button
                onClick={() => { navigateTo('contact'); setMobileMenuOpen(false); }}
                className="w-full text-left text-sm text-[#4A4744] hover:text-[#1C1A18] py-1"
              >
                Client Concierge & Contact
              </button>
              <button
                onClick={() => { navigateTo('admin'); setMobileMenuOpen(false); }}
                className="w-full text-left text-sm text-[#9E7F53] font-medium py-1"
              >
                Administrative Portal
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E8E2D8] text-xs text-[#8C827A] space-y-1">
            <p className="font-serif text-[#1C1A18] text-sm">Maison Du Sole Atelier</p>
            <p>Shop No. 2, Karishma Society, Kothrud</p>
            <p>+1 (555) 014-7788</p>
          </div>
        </div>
      )}
    </header>
  );
};
