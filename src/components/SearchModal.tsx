/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    products,
    navigateTo,
    formatPrice
  } = useStore();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const query = searchQuery.trim().toLowerCase();
  const results = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.tagline.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      )
    : [];

  const handleSelectProduct = (slug: string) => {
    setIsSearchOpen(false);
    navigateTo('product', slug);
  };

  const handleQuickTag = (tag: string) => {
    setSearchQuery(tag);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative min-h-screen px-4 pt-16 pb-20 flex justify-center">
        <div className="relative w-full max-w-3xl bg-[#FAF8F5] shadow-2xl border border-[#D5CABE] overflow-hidden">
          
          {/* Search Header Bar */}
          <div className="p-4 sm:p-6 border-b border-[#E8E2D8] flex items-center gap-3 bg-[#F4EFE9]">
            <Search className="w-5 h-5 text-[#8C827A] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search by shoe name, category, leather type, or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm sm:text-base text-[#1C1A18] placeholder:text-[#A1988E] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#8C827A] hover:text-[#1C1A18] p-1 cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1.5 text-[#4A4744] hover:text-[#1C1A18] transition-colors cursor-pointer"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Suggestions Strip */}
          <div className="px-6 py-3 bg-[#EFE9DF] border-b border-[#E3DCCF] flex items-center gap-2 overflow-x-auto text-xs text-[#6B645C]">
            <span className="font-semibold uppercase tracking-wider text-[10px] text-[#8C827A] shrink-0">
              Popular Searches:
            </span>
            {['Sneakers', 'Loafers', 'Oxford', 'Ballet Flat', 'Chelsea Boot', 'Sandal'].map((tag) => (
              <button
                key={tag}
                onClick={() => handleQuickTag(tag)}
                className="px-2.5 py-1 bg-white hover:bg-[#1C1A18] hover:text-white transition-colors text-xs shrink-0 border border-[#D5CABE] cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Content */}
          <div className="max-h-[60vh] overflow-y-auto p-6">
            {query.length === 0 ? (
              <div className="text-center py-10 space-y-3">
                <p className="font-serif text-lg text-[#1C1A18]">
                  Discover Your Signature Step
                </p>
                <p className="text-xs text-[#8C827A] max-w-sm mx-auto">
                  Type any keyword to instantly browse our handcrafted collections, materials, and sizes.
                </p>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <p className="font-serif text-base text-[#1C1A18]">
                  No footwear found matching "{searchQuery}"
                </p>
                <p className="text-xs text-[#8C827A]">
                  Try searching for general terms like "Loafers", "Sneaker", "Calfskin", or browse our full catalogue.
                </p>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    navigateTo('shop');
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#9E7F53] font-semibold hover:underline cursor-pointer"
                >
                  <span>Browse All Footwear</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#8C827A] pb-2 border-b border-[#EBE5DC]">
                  <span>{results.length} results matching "{searchQuery}"</span>
                  <span className="hidden sm:inline">Press ESC to dismiss</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {results.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.slug)}
                      className="flex items-center gap-3 p-3 bg-white border border-[#E8E2D8] hover:border-[#9E7F53] transition-all cursor-pointer group"
                    >
                      <div className="w-16 h-16 bg-[#F4EFE9] shrink-0 overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-[#8C827A] block truncate">
                          {product.category} · {product.gender}
                        </span>
                        <h4 className="font-serif text-sm font-semibold text-[#1C1A18] group-hover:text-[#9E7F53] transition-colors truncate">
                          {product.name}
                        </h4>
                        <div className="flex items-center justify-between mt-1">
                          <span className="font-mono tabular-nums text-xs font-medium text-[#1C1A18]">
                            {formatPrice(product.price)}
                          </span>
                          <span className="text-[10px] text-[#9E7F53] font-medium flex items-center gap-0.5">
                            View <ArrowRight className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer bar */}
          <div className="p-3 bg-[#F4EFE9] border-t border-[#E8E2D8] flex items-center justify-between text-[11px] text-[#8C827A] px-6">
            <span>Free exchanges across all footwear models</span>
            <span className="flex items-center gap-1 font-mono text-[10px]">
              ESC <CornerDownLeft className="w-3 h-3" />
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
