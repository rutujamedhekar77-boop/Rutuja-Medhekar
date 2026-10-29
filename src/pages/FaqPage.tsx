/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, ArrowRight, Phone, Mail } from 'lucide-react';
import { FAQ_DATA, FaqItem } from '../data/storeConfig';
import { useStore } from '../context/StoreContext';

export const FaqPage: React.FC = () => {
  const { navigateTo, settings, setIsSizeGuideOpen } = useStore();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ 'faq-1': true, 'faq-2': true });

  const categories = ['All', 'Sizing & Fit', 'Orders & Shipping', 'Returns & Refunds', 'Materials & Care', 'Payments'];

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = FAQ_DATA.filter((item) => {
    if (activeCategory !== 'All' && item.category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-[0.2em] text-[#9E7F53] font-semibold block mb-1">
          Client Support & Inquiries
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1A18]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[#6B645C] mt-2 leading-relaxed">
          Everything you need to know about Maison Du Sole sizing, international delivery, benchcraft care, and returns.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mb-8">
        <Search className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search question or keyword (e.g. sizing, returns, delivery time)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-[#D5CABE] text-xs text-[#1C1A18] placeholder:text-[#A1988E] focus:outline-none focus:border-[#1C1A18]"
        />
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 whitespace-nowrap uppercase tracking-wider transition-all cursor-pointer font-medium border ${
              activeCategory === cat
                ? 'bg-[#1C1A18] text-white border-[#1C1A18]'
                : 'bg-white text-[#6B645C] border-[#E0D7C9] hover:border-[#1C1A18]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion FAQ Items */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center bg-white border border-[#E8E2D8] text-xs text-[#8C827A]">
            No answers match your search. Contact our client concierge directly for immediate assistance.
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = !!openItems[faq.id];
            return (
              <div
                key={faq.id}
                className="bg-white border border-[#E8E2D8] transition-all"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5] transition-colors"
                >
                  <span className="font-serif text-base font-bold text-[#1C1A18]">
                    {faq.question}
                  </span>
                  <span className="text-[#9E7F53] shrink-0 p-1">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#5C564E] leading-relaxed border-t border-[#F0EBE1] animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                    {faq.id === 'faq-1' && (
                      <button
                        onClick={() => setIsSizeGuideOpen(true)}
                        className="mt-3 text-xs text-[#9E7F53] font-semibold underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Open Complete Size & Fit Conversion Table</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Need Assistance Banner */}
      <div className="mt-14 p-8 bg-[#F4EFE9] border border-[#E3DCCF] text-center space-y-4">
        <h3 className="font-serif text-xl font-bold text-[#1C1A18]">
          Have an unlisted question?
        </h3>
        <p className="text-xs text-[#6B645C] max-w-md mx-auto leading-relaxed">
          Our senior concierge team is available to offer personalized fitting guidance or coordinate custom shipments.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => navigateTo('contact')}
            className="px-6 py-3 bg-[#1C1A18] hover:bg-[#33312E] text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
          >
            Contact Client Concierge
          </button>
          <a
            href={`tel:${settings.businessPhone}`}
            className="px-6 py-3 bg-white border border-[#D5CABE] text-[#1C1A18] text-xs font-semibold uppercase tracking-wider hover:bg-[#FAF8F5] transition-colors"
          >
            Call {settings.businessPhone}
          </a>
        </div>
      </div>

    </div>
  );
};
