/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Truck, RotateCcw, FileText, Lock, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PageView } from '../types';

interface PolicyPageProps {
  type: 'shipping-returns' | 'refund-policy' | 'privacy-policy' | 'terms-conditions';
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ type }) => {
  const { navigateTo, settings } = useStore();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      
      {/* Back button */}
      <button
        onClick={() => navigateTo('home')}
        className="mb-8 text-xs font-semibold uppercase tracking-wider text-[#8C827A] hover:text-[#1C1A18] flex items-center gap-1.5 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Storefront</span>
      </button>

      {/* Navigation tabs between policies */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-10 border-b border-[#E8E2D8] text-xs">
        {[
          { label: 'Shipping & Delivery', page: 'shipping-returns' as PageView },
          { label: 'Returns & Exchanges', page: 'refund-policy' as PageView },
          { label: 'Privacy Policy', page: 'privacy-policy' as PageView },
          { label: 'Terms & Conditions', page: 'terms-conditions' as PageView }
        ].map((tab) => (
          <button
            key={tab.page}
            onClick={() => navigateTo(tab.page)}
            className={`px-4 py-2 uppercase tracking-wider transition-all cursor-pointer font-medium whitespace-nowrap border ${
              type === tab.page
                ? 'bg-[#1C1A18] text-white border-[#1C1A18]'
                : 'bg-white text-[#6B645C] border-[#E0D7C9] hover:border-[#1C1A18]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content depending on type */}
      <div className="bg-white p-8 sm:p-12 border border-[#E8E2D8] shadow-sm space-y-8 text-xs text-[#5C564E] leading-relaxed">
        
        {/* SHIPPING POLICY */}
        {type === 'shipping-returns' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-[#F0EBE1]">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#9E7F53] font-semibold block mb-1">
                Atelier Fulfillment
              </span>
              <h1 className="font-serif text-3xl font-bold text-[#1C1A18]">
                Shipping & Global Delivery Policy
              </h1>
              <p className="text-xs text-[#8C827A] mt-1 font-mono">
                Effective Date: October 2026 · Maison Du Sole Concierge
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="font-serif text-base font-bold text-[#1C1A18] uppercase tracking-wider">
                1. Complimentary Worldwide Shipping
              </h2>
              <p>
                Maison Du Sole provides complimentary express courier dispatch on all orders exceeding ${settings.freeShippingThreshold} (or equivalent in chosen currency). Orders below this threshold incur a standardized dispatch fee of ${settings.standardShippingFee}.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-base font-bold text-[#1C1A18] uppercase tracking-wider">
                2. Transit Times & Priority Delivery
              </h2>
              <p>
                Orders are processed and packaged within 24 to 48 business hours from our regional distribution hubs.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Standard Express Courier:</strong> 2 to 4 business days.</li>
                <li><strong>Priority Atelier Overnight:</strong> 1 to 2 business days (${settings.expressShippingFee}).</li>
                <li><strong>Remote & International Deliveries:</strong> 4 to 7 business days via DHL International Express.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-base font-bold text-[#1C1A18] uppercase tracking-wider">
                3. Tamper-Evident Packaging & Insurance
              </h2>
              <p>
                Every pair of footwear leaves our facility inside our signature embossed presentation box, encased within protective velvet dust sleeves and a numbered tamper-evident outer seal. All transit risks are 100% insured by Maison Du Sole until physical delivery signature.
              </p>
            </section>
          </div>
        )}

        {/* RETURNS & REFUNDS POLICY */}
        {type === 'refund-policy' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-[#F0EBE1]">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#9E7F53] font-semibold block mb-1">
                Client Satisfaction
              </span>
              <h1 className="font-serif text-3xl font-bold text-[#1C1A18]">
                30-Day Returns & Exchange Policy
              </h1>
              <p className="text-xs text-[#8C827A] mt-1 font-mono">
                Extended {settings.returnWindowDays}-Day Complimentary Returns
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="font-serif text-base font-bold text-[#1C1A18] uppercase tracking-wider">
                1. Eligibility Conditions
              </h2>
              <p>
                We offer a 30-day window from the confirmed delivery date to request a size exchange or full refund. To qualify:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Footwear must be in unworn, brand-new condition without scuffs or creases on leather outsoles.</li>
                <li>Footwear should always be tried on a soft, carpeted surface.</li>
                <li>Original shoe box, branded dust bags, and spare accessories must be returned intact.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-base font-bold text-[#1C1A18] uppercase tracking-wider">
                2. Complimentary Exchanges
              </h2>
              <p>
                Size or shade exchanges are processed free of charge. Contact orders@maisondusole.com or initiate an exchange via your Patron Portal to receive a prepaid courier collection label.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-base font-bold text-[#1C1A18] uppercase tracking-wider">
                3. Refund Disbursement
              </h2>
              <p>
                Once returned footwear is inspected at our atelier (typically within 2 business days of receipt), refunds are credited directly to your original payment method within 3–5 business banking days.
              </p>
            </section>
          </div>
        )}

        {/* PRIVACY POLICY */}
        {type === 'privacy-policy' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-[#F0EBE1]">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#9E7F53] font-semibold block mb-1">
                Data Protection
              </span>
              <h1 className="font-serif text-3xl font-bold text-[#1C1A18]">
                Privacy & Data Governance Policy
              </h1>
              <p className="text-xs text-[#8C827A] mt-1 font-mono">
                Compliance: GDPR, CCPA, and Global Consumer Privacy Standards
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="font-serif text-base font-bold text-[#1C1A18] uppercase tracking-wider">
                1. Information We Collect
              </h2>
              <p>
                Maison Du Sole collects necessary personal coordinates solely to fulfill transactions: your full name, shipping destination, email address, telephone contact, and transaction chronicle.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-base font-bold text-[#1C1A18] uppercase tracking-wider">
                2. Zero Raw Financial Storage
              </h2>
              <p>
                We do NOT store credit or debit card numbers, CVC security codes, or bank passwords. All payments are encrypted through PCI-DSS Level 1 compliant gateways.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-base font-bold text-[#1C1A18] uppercase tracking-wider">
                3. Third-Party Restraint
              </h2>
              <p>
                We never monetize, rent, or vend customer datasets to external brokers. Data is shared exclusively with licensed logistics couriers to facilitate parcel handover.
              </p>
            </section>
          </div>
        )}

        {/* TERMS & CONDITIONS */}
        {type === 'terms-conditions' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-[#F0EBE1]">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#9E7F53] font-semibold block mb-1">
                Legal Framework
              </span>
              <h1 className="font-serif text-3xl font-bold text-[#1C1A18]">
                Terms of Service & Atelier Sale
              </h1>
              <p className="text-xs text-[#8C827A] mt-1 font-mono">
                Maison Du Sole Operating Standards · Shop No. 2, Karishma Society, Kothrud
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="font-serif text-base font-bold text-[#1C1A18] uppercase tracking-wider">
                1. Order Placement & Price Integrity
              </h2>
              <p>
                By placing an order via this digital storefront, you affirm that the information submitted is accurate and that you are authorized to utilize the designated payment facility. Prices are denominated in the selected currency and include applicable regional duties.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-base font-bold text-[#1C1A18] uppercase tracking-wider">
                2. Natural Material Variations
              </h2>
              <p>
                Because our shoes are crafted from genuine, unadulterated full-grain leathers, subtle nuances in grain pattern, tonal depth, and natural character marks are authentic hallmarks of artisanal craft, rather than manufacturing defects.
              </p>
            </section>
          </div>
        )}

      </div>

    </div>
  );
};
