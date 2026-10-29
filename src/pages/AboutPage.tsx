/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Compass, Feather, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="space-y-20 sm:space-y-28 py-10 sm:py-16">
      
      {/* Hero Narrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#9E7F53] font-semibold block">
            The Maison Chronicle
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1A18] leading-[1.15]">
            More Than Shoes. A Signature.
          </h1>
          <p className="text-sm sm:text-base text-[#5C564E] leading-relaxed max-w-2xl mx-auto pt-2">
            Maison Du Sole was conceived around a singular principle: footwear is the architectural anchor of personal presence, posture, and poise.
          </p>
        </div>
      </section>

      {/* Editorial Split: The Vision & Craftsmanship */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative aspect-[4/3] bg-[#F2EDE4] border border-[#E3DCCF] overflow-hidden shadow-lg">
            <img
              src="/src/assets/images/brand_story_craftsmanship_1793280976078.jpg"
              alt="Artisan Benchcraft Shoemaker"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <span className="text-xs uppercase tracking-[0.2em] text-[#9E7F53] font-semibold block">
              01. The Design Philosophy
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1C1A18]">
              Where European Heritage Meets Modern Proportion
            </h2>
            <p className="text-xs sm:text-sm text-[#5C564E] leading-relaxed">
              We design for individuals who recognize that true luxury does not shout with ostentatious logos. It reveals itself quietly through the burnished grain of Tuscan calfskin, the balance of an arch, and the silent authority of a tailored silhouette.
            </p>
            <p className="text-xs sm:text-sm text-[#5C564E] leading-relaxed">
              Every curve, toe-spring, and stitch margin is calculated to complement the human body's natural kinetics. By pairing traditional lasting techniques with modern shock-absorbing footbed cores, our shoes provide all-day ease from morning board meetings to late-evening galas.
            </p>
          </div>

        </div>
      </section>

      {/* Second Split: Material Ethics */}
      <section className="bg-[#F4EFE9] border-y border-[#E8E2D8] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 order-2 lg:order-1 space-y-6 lg:pr-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#9E7F53] font-semibold block">
                02. Material Integrity
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1C1A18]">
                Certified Leathers & Natural Soling
              </h2>
              <p className="text-xs sm:text-sm text-[#5C564E] leading-relaxed">
                We select full-grain calfskins, vegetable-tanned bridle hides, and velvety reverse suedes from certified European tanneries adhering to strict water stewardship and environmental standards.
              </p>
              <div className="space-y-3 pt-2 text-xs text-[#4A4744]">
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 bg-[#9E7F53] rounded-full mt-1.5" />
                  <span><strong>Full-Grain Calfskin:</strong> Retains its natural epidermis layer, developing a rich organic patina over years of wear.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 bg-[#9E7F53] rounded-full mt-1.5" />
                  <span><strong>Oak-Bark Soles:</strong> Tanned naturally over months for extraordinary density, abrasion resistance, and breathability.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 bg-[#9E7F53] rounded-full mt-1.5" />
                  <span><strong>Anatomical Cork Insole:</strong> Shapes intimately to the contours of your footbed, creating a custom personalized fit.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 relative aspect-[4/3] bg-white border border-[#E3DCCF] overflow-hidden shadow-lg">
              <img
                src="/src/assets/images/hero_footwear_campaign_1793280976179.jpg"
                alt="Finished Luxury Footwear"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Brand Values Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-[#9E7F53] font-semibold block mb-1">
            Our Pillars
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#1C1A18]">
            The Four Core Commitments
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white border border-[#E8E2D8] space-y-3">
            <Compass className="w-6 h-6 text-[#9E7F53]" />
            <h3 className="font-serif text-base font-bold text-[#1C1A18]">Timeless Proportion</h3>
            <p className="text-xs text-[#5C564E] leading-relaxed">
              We design silhouettes unaffected by passing seasonal fads, engineered to endure for decades in your curated wardrobe.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E8E2D8] space-y-3">
            <Feather className="w-6 h-6 text-[#9E7F53]" />
            <h3 className="font-serif text-base font-bold text-[#1C1A18]">Uncompromising Comfort</h3>
            <p className="text-xs text-[#5C564E] leading-relaxed">
              Every design is subjected to ergonomic stride tests, ensuring immediate wearability without blistering or painful break-in.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E8E2D8] space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#9E7F53]" />
            <h3 className="font-serif text-base font-bold text-[#1C1A18]">Resoleable Benchcraft</h3>
            <p className="text-xs text-[#5C564E] leading-relaxed">
              Traditional welt construction guarantees that your footwear can be resoled repeatedly by any master cobbler over a lifetime.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E8E2D8] space-y-3">
            <HeartHandshake className="w-6 h-6 text-[#9E7F53]" />
            <h3 className="font-serif text-base font-bold text-[#1C1A18]">Concierge Devotion</h3>
            <p className="text-xs text-[#5C564E] leading-relaxed">
              From individualized size consultations to insured global fulfillment, our patrons always come first.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1C1A18] text-white py-16 text-center border-y border-[#33312E]">
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
            Experience the Difference
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Step Into Your Signature Style
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto leading-relaxed">
            Discover the collection today. Enjoy complimentary worldwide express shipping and our extended 30-day return policy.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('shop')}
              className="px-8 py-4 bg-[#C5A880] hover:bg-[#A88A60] text-[#1C1A18] text-xs font-semibold uppercase tracking-[0.18em] transition-all cursor-pointer shadow-lg inline-flex items-center gap-2"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
