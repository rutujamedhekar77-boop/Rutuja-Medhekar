/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, Compass, ShieldCheck, Feather, HeartHandshake, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Category } from '../types';

export const HomePage: React.FC = () => {
  const { products, navigateTo, reviews, subscribeNewsletter } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMsg, setNewsletterMsg] = useState<{ success?: boolean; message?: string } | null>(null);

  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival || p.isSale).slice(0, 4);

  const categories: { label: string; key: Category | string; count: string; image: string }[] = [
    {
      label: "Men's Footwear",
      key: 'Men',
      count: 'Tailored Oxfords & Boots',
      image: '/src/assets/images/editorial_collection_men_1793280977039.jpg'
    },
    {
      label: "Women's Footwear",
      key: 'Women',
      count: 'Ballet Flats & Heels',
      image: '/src/assets/images/editorial_collection_women_1793280977166.jpg'
    },
    {
      label: 'Luxury Sneakers',
      key: 'Sneakers',
      count: 'Italian Calfskin Low-Tops',
      image: '/src/assets/images/hero_footwear_campaign_1793280976179.jpg'
    },
    {
      label: 'Formal Shoes',
      key: 'Formal',
      count: 'Goodyear & Blake Welted',
      image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80'
    },
    {
      label: 'Casual Shoes',
      key: 'Casual',
      count: 'Relaxed Daily Staples',
      image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80'
    },
    {
      label: 'Loafers & Slippers',
      key: 'Loafers',
      count: 'Hand-Stitched Penny Aprons',
      image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80'
    },
    {
      label: 'Chelsea Boots',
      key: 'Boots',
      count: 'Sculpted Wholecut Patterns',
      image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80'
    },
    {
      label: 'Anatomical Sandals',
      key: 'Sandals',
      count: 'Bridle Leather & Cork',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const handleCategoryClick = (key: string) => {
    sessionStorage.setItem('mds_nav_filter', key);
    navigateTo('shop');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const res = subscribeNewsletter(newsletterEmail);
    setNewsletterMsg(res);
    if (res.success) setNewsletterEmail('');
  };

  return (
    <div className="space-y-20 sm:space-y-28">
      
      {/* SECTION A: HERO CAMPAIGN */}
      <section className="relative overflow-hidden bg-[#EFE9DF] border-b border-[#E3DCCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 lg:pr-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase font-semibold tracking-[0.2em] text-[#9E7F53]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Autumn / Winter 2026 Collection</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1A18] leading-[1.15] text-balance">
                Step Into Your Signature Style.
              </h1>

              <p className="text-sm sm:text-base text-[#5C564E] leading-relaxed max-w-lg">
                Discover footwear that seamlessly balances timeless European benchcraft, sculptural modern silhouettes, and effortless all-day anatomical comfort.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => {
                    sessionStorage.removeItem('mds_nav_filter');
                    navigateTo('shop');
                  }}
                  className="px-8 py-4 bg-[#1C1A18] hover:bg-[#33312E] text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer group"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    sessionStorage.setItem('mds_nav_filter', 'new-arrivals');
                    navigateTo('shop');
                  }}
                  className="px-8 py-4 bg-transparent border border-[#1C1A18] hover:bg-white text-[#1C1A18] text-xs font-semibold uppercase tracking-[0.16em] transition-all text-center cursor-pointer"
                >
                  Explore New Arrivals
                </button>
              </div>

              {/* Editorial Trust Markers */}
              <div className="pt-6 border-t border-[#DFD7C9] grid grid-cols-3 gap-4 text-xs text-[#6B645C]">
                <div>
                  <span className="font-serif font-bold text-sm text-[#1C1A18] block">Full-Grain</span>
                  <span className="text-[11px]">Tuscan & French Leathers</span>
                </div>
                <div>
                  <span className="font-serif font-bold text-sm text-[#1C1A18] block">Blake & Welted</span>
                  <span className="text-[11px]">Artisanal Soling</span>
                </div>
                <div>
                  <span className="font-serif font-bold text-sm text-[#1C1A18] block">30 Days</span>
                  <span className="text-[11px]">Complimentary Returns</span>
                </div>
              </div>
            </div>

            {/* Right Visual Image Slot */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden shadow-2xl border border-[#D5CABE] bg-[#FAF8F5]">
                <img
                  src="/src/assets/images/hero_footwear_campaign_1793280976179.jpg"
                  alt="Maison Du Sole Signature Footwear Campaign"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#1C1A18]/85 backdrop-blur-md p-3 text-white flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#C5A880] block">Featured Silhouette</span>
                    <span className="font-serif font-semibold">The Signature White Sneaker & Classic Penny</span>
                  </div>
                  <button
                    onClick={() => navigateTo('product', 'the-signature-white-sneaker')}
                    className="text-[#C5A880] hover:text-white font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION B: SHOP BY CATEGORY (8 CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E8E2D8]">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#9E7F53] font-semibold block mb-1">
              Curated Departments
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1A18]">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem('mds_nav_filter');
              navigateTo('shop');
            }}
            className="text-xs font-semibold uppercase tracking-widest text-[#1C1A18] hover:text-[#9E7F53] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View All Footwear</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.label}
              onClick={() => handleCategoryClick(cat.key)}
              className="group relative aspect-[3/4] overflow-hidden bg-[#EFE9DF] border border-[#E3DCCF] cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.label}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-5 text-white transition-opacity">
                <span className="text-[10px] uppercase tracking-wider text-[#C5A880] mb-0.5">
                  {cat.count}
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold group-hover:text-[#C5A880] transition-colors">
                  {cat.label}
                </h3>
                <span className="text-[11px] text-stone-300 flex items-center gap-1 mt-1 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  <span>Explore category</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION C: BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E8E2D8]">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#9E7F53] font-semibold block mb-1">
              Collector Favorites
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1A18]">
              Best Sellers
            </h2>
          </div>
          <button
            onClick={() => {
              sessionStorage.setItem('mds_nav_filter', 'best-selling');
              navigateTo('shop');
            }}
            className="text-xs font-semibold uppercase tracking-widest text-[#1C1A18] hover:text-[#9E7F53] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>See All Best Sellers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION E: BRAND STORY BANNER */}
      <section className="bg-[#1C1A18] text-[#FAF8F5] overflow-hidden border-y border-[#33312E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Craftsmanship Image */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative aspect-[16/10] overflow-hidden shadow-2xl border border-[#3D3A35]">
                <img
                  src="/src/assets/images/brand_story_craftsmanship_1793280976078.jpg"
                  alt="Maison Du Sole Benchcraft Atelier"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-[#1C1A18]/90 text-[10px] text-[#C5A880] px-2.5 py-1 tracking-widest uppercase border border-[#3D3A35]">
                  Handcrafted Lasting
                </div>
              </div>
            </div>

            {/* Editorial Story */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 lg:pl-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase font-semibold tracking-[0.2em] text-[#C5A880]">
                <span>The Maison Philosophy</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                More Than Shoes. A Signature.
              </h2>

              <p className="text-sm text-[#A8A199] leading-relaxed">
                At Maison Du Sole, footwear is treated not as an afterthought, but as the foundation of personal posture, confidence, and distinction. Every pair begins with select hides chosen for resilience and supple suppleness.
              </p>

              <p className="text-sm text-[#A8A199] leading-relaxed">
                Our shoemakers shape each silhouette around anatomical forms designed to distribute pressure harmoniously across your stride. From the hand-sculpted waist of our dress Oxfords to the shock-cushioned rubber cupsoles of our sneakers, each step reflects uncompromising devotion to quiet luxury.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => navigateTo('about')}
                  className="inline-flex items-center gap-2 text-xs uppercase font-semibold tracking-[0.16em] text-[#C5A880] hover:text-white transition-colors cursor-pointer group"
                >
                  <span>Read the Full Atelier Chronicle</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION F: FEATURED EDITORIAL COLLECTION (SPLIT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-[#9E7F53] font-semibold block mb-1">
            Tailored Perspectives
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#1C1A18]">
            The Dual Collections
          </h2>
          <p className="text-xs sm:text-sm text-[#6B645C] mt-2">
            Meticulously edited silhouettes crafted for discerning gentlemen and women who appreciate timeless proportion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Men's Showcase */}
          <div
            onClick={() => handleCategoryClick('Men')}
            className="group relative aspect-[4/3] bg-[#EFE9DF] overflow-hidden border border-[#D5CABE] cursor-pointer"
          >
            <img
              src="/src/assets/images/editorial_collection_men_1793280977039.jpg"
              alt="Men's Curated Shoes"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] mb-1 font-semibold">
                Men's Footwear
              </span>
              <h3 className="font-serif text-2xl font-bold">
                Oxfords, Loafers & Chelsea Boots
              </h3>
              <p className="text-xs text-stone-300 mt-1 max-w-md">
                Formal elegance engineered with welted durability and rich hand-patinated leathers.
              </p>
              <div className="pt-4 flex items-center gap-2 text-xs font-semibold text-[#C5A880] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Explore Men's Collection</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Women's Showcase */}
          <div
            onClick={() => handleCategoryClick('Women')}
            className="group relative aspect-[4/3] bg-[#EFE9DF] overflow-hidden border border-[#D5CABE] cursor-pointer"
          >
            <img
              src="/src/assets/images/editorial_collection_women_1793280977166.jpg"
              alt="Women's Curated Shoes"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] mb-1 font-semibold">
                Women's Footwear
              </span>
              <h3 className="font-serif text-2xl font-bold">
                Ballet Flats & Sculptural Heels
              </h3>
              <p className="text-xs text-stone-300 mt-1 max-w-md">
                Sacchetto construction for glove-like flexibility and architecturally balanced heels.
              </p>
              <div className="pt-4 flex items-center gap-2 text-xs font-semibold text-[#C5A880] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Explore Women's Collection</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION D: NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E8E2D8]">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#9E7F53] font-semibold block mb-1">
              Fresh Off the Bench
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1A18]">
              New Arrivals
            </h2>
          </div>
          <button
            onClick={() => {
              sessionStorage.setItem('mds_nav_filter', 'new-arrivals');
              navigateTo('shop');
            }}
            className="px-5 py-2.5 bg-[#1C1A18] hover:bg-[#33312E] text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
          >
            Shop New Arrivals
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION G: WHY CHOOSE MAISON DU SOLE? (4 CARDS) */}
      <section className="bg-[#F4EFE9] border-y border-[#E8E2D8] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#9E7F53] font-semibold block mb-1">
              The Maison Standard
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1C1A18]">
              Why Choose Maison Du Sole?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Benefit 1 */}
            <div className="p-6 bg-white border border-[#E3DCCF] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#D5CABE] flex items-center justify-center text-[#9E7F53]">
                <Compass className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#1C1A18]">
                Timeless Design
              </h3>
              <p className="text-xs text-[#5C564E] leading-relaxed">
                We consciously reject fleeting micro-trends. Every shoe is designed to look as sophisticated ten years from now as it does today.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="p-6 bg-white border border-[#E3DCCF] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#D5CABE] flex items-center justify-center text-[#9E7F53]">
                <Feather className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#1C1A18]">
                Everyday Comfort
              </h3>
              <p className="text-xs text-[#5C564E] leading-relaxed">
                Anatomical arch support, memory latex insoles, and glove-soft leather linings eliminate uncomfortable break-in periods.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="p-6 bg-white border border-[#E3DCCF] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#D5CABE] flex items-center justify-center text-[#9E7F53]">
                <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#1C1A18]">
                Quality-Focused Craftsmanship
              </h3>
              <p className="text-xs text-[#5C564E] leading-relaxed">
                Handcrafted using durable Goodyear-welt and Blake-stitch methods with resoleable construction and certified full-grain leathers.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="p-6 bg-white border border-[#E3DCCF] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#D5CABE] flex items-center justify-center text-[#9E7F53]">
                <HeartHandshake className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#1C1A18]">
                Customer-First Service
              </h3>
              <p className="text-xs text-[#5C564E] leading-relaxed">
                Complimentary global shipping on qualifying orders, an extended 30-day return policy, and personalized concierge sizing advice.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION H: CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E8E2D8]">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#9E7F53] font-semibold block mb-1">
              Verified Patrons
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1A18]">
              Customer Reviews
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#6B645C]">
            <div className="flex text-[#C5A880]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-[#1C1A18]">4.9 out of 5</span>
            <span>(Over 400+ Verified Reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((rev) => (
            <div key={rev.id} className="p-6 bg-white border border-[#EBE5DC] space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#C5A880]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#8C827A] font-mono">{rev.date}</span>
                </div>
                <h4 className="font-serif font-bold text-sm text-[#1C1A18]">
                  "{rev.title}"
                </h4>
                <p className="text-xs text-[#5C564E] leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-[#1C1A18] block">{rev.author}</span>
                  <span className="text-[10px] text-[#2E5A36] flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Purchase
                  </span>
                </div>
                {rev.fitFeedback && (
                  <span className="text-[11px] text-[#8C827A] font-mono">
                    Fit: {rev.fitFeedback}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION J: INSTAGRAM / SOCIAL CURATED GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.2em] text-[#9E7F53] font-semibold block mb-1">
            #MaisonDuSole
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1A18]">
            Curated Footwear Gallery
          </h2>
          <p className="text-xs text-[#6B645C] mt-1">
            Follow our international journey and share your signature styling.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              src: '/src/assets/images/hero_footwear_campaign_1793280976179.jpg',
              title: 'Morning Light on the Atelier Stone'
            },
            {
              src: '/src/assets/images/editorial_collection_men_1793280977039.jpg',
              title: 'The Burnished Oxford & Chelsea Duo'
            },
            {
              src: '/src/assets/images/editorial_collection_women_1793280977166.jpg',
              title: 'Architectural Ballet Flats & Block Heels'
            },
            {
              src: '/src/assets/images/brand_story_craftsmanship_1793280976078.jpg',
              title: 'Artisan Sole Stitched by Hand'
            }
          ].map((item, idx) => (
            <div key={idx} className="group relative aspect-square overflow-hidden bg-[#EFE9DF] border border-[#E3DCCF]">
              <img
                src={item.src}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                <span className="text-xs text-white font-serif tracking-wide">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
