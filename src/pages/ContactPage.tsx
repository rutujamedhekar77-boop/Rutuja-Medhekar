/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { settings, submitContactMessage, navigateTo } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bespoke Sizing & Fit Guidance',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);

    setTimeout(() => {
      const res = submitContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        message: formData.message
      });

      setIsSubmitting(false);
      setFormStatus(res);

      if (res.success) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'Bespoke Sizing & Fit Guidance',
          message: ''
        });
      }
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.2em] text-[#9E7F53] font-semibold block mb-1">
          Client Concierge Atelier
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1A18]">
          Contact Maison Du Sole
        </h1>
        <p className="text-xs sm:text-sm text-[#6B645C] mt-2 leading-relaxed">
          Whether you need bespoke sizing counsel, leather maintenance advice, or order tracking guidance, our dedicated atelier concierge is at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Contact Cards & Operating Hours */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Info Box */}
          <div className="p-8 bg-white border border-[#E8E2D8] space-y-6 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-[#1C1A18] pb-3 border-b border-[#F0EBE1]">
              Flagship Atelier & Offices
            </h2>

            <div className="space-y-5 text-xs text-[#5C564E]">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#D5CABE] flex items-center justify-center text-[#9E7F53] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-[#1C1A18] block font-mono text-[11px] uppercase tracking-wider">
                    Physical Atelier Location
                  </strong>
                  <p className="mt-0.5 text-sm font-serif text-[#1C1A18]">{settings.businessAddress}</p>
                  <p className="text-[#8C827A] text-[11px] mt-0.5">Private appointments available upon request.</p>
                </div>
              </div>

              {/* Telephone */}
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#D5CABE] flex items-center justify-center text-[#9E7F53] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-[#1C1A18] block font-mono text-[11px] uppercase tracking-wider">
                    Concierge Direct Line
                  </strong>
                  <a
                    href={`tel:${settings.businessPhone}`}
                    className="mt-0.5 text-sm font-semibold text-[#1C1A18] hover:text-[#9E7F53] transition-colors block"
                  >
                    {settings.businessPhone}
                  </a>
                  <p className="text-[#8C827A] text-[11px]">Toll-free international client support</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#D5CABE] flex items-center justify-center text-[#9E7F53] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-[#1C1A18] block font-mono text-[11px] uppercase tracking-wider">
                    Electronic Dispatch & Orders
                  </strong>
                  <a
                    href={`mailto:${settings.businessEmail}`}
                    className="mt-0.5 text-sm font-semibold text-[#1C1A18] hover:text-[#9E7F53] transition-colors block"
                  >
                    {settings.businessEmail}
                  </a>
                  <p className="text-[#8C827A] text-[11px]">Average response under 4 business hours</p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3.5 pt-2 border-t border-[#F0EBE1]">
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#D5CABE] flex items-center justify-center text-[#9E7F53] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-[#1C1A18] block font-mono text-[11px] uppercase tracking-wider">
                    Atelier Operating Hours
                  </strong>
                  <p className="mt-0.5 text-[#1C1A18]">Monday – Saturday: 10:00 AM – 8:00 PM</p>
                  <p className="text-[#1C1A18]">Sunday: 11:00 AM – 6:00 PM</p>
                  <span className="text-[10px] text-[#8C827A] mt-1 block">Timezone: IST / UTC+5:30</span>
                </div>
              </div>
            </div>

          </div>

          {/* FAQ quick banner */}
          <div className="p-6 bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-[#9E7F53] shrink-0" />
              <div>
                <strong className="text-[#1C1A18] block font-serif">Have questions regarding sizing?</strong>
                <span className="text-[#6B645C]">Explore our comprehensive sizing, returns, and delivery FAQs.</span>
              </div>
            </div>
            <button
              onClick={() => navigateTo('faq')}
              className="text-[#9E7F53] font-semibold hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>View FAQs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 border border-[#E8E2D8] shadow-sm">
          <div className="pb-4 mb-6 border-b border-[#F0EBE1]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9E7F53]">
              Send an Atelier Inquiry
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#1C1A18] mt-1">
              Client Correspondence
            </h2>
            <p className="text-xs text-[#6B645C] mt-1">
              Fill in your details below. Our senior client concierge will respond promptly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-3 text-xs text-[#1C1A18] focus:outline-none focus:border-[#1C1A18]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-3 text-xs text-[#1C1A18] focus:outline-none focus:border-[#1C1A18]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                  Telephone (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-3 text-xs text-[#1C1A18] focus:outline-none focus:border-[#1C1A18]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                  Inquiry Topic
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-3 text-xs text-[#1C1A18] focus:outline-none focus:border-[#1C1A18]"
                >
                  <option value="Bespoke Sizing & Fit Guidance">Bespoke Sizing & Fit Guidance</option>
                  <option value="Order Status & Dispatch Expedite">Order Status & Dispatch Expedite</option>
                  <option value="Return or Exchange Coordination">Return or Exchange Coordination</option>
                  <option value="Leather Care & Cobbler Services">Leather Care & Cobbler Services</option>
                  <option value="Press & Corporate Gifting">Press & Corporate Gifting</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                Your Message *
              </label>
              <textarea
                required
                rows={5}
                placeholder="Kindly articulate your request, shoe size questions, or specific requirements..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-3 text-xs text-[#1C1A18] focus:outline-none focus:border-[#1C1A18]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 bg-[#1C1A18] hover:bg-[#33312E] text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Dispatching Message...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Concierge</span>
                  </>
                )}
              </button>
            </div>

            {formStatus && (
              <div
                className={`p-4 text-xs flex items-center gap-2.5 mt-4 ${
                  formStatus.success
                    ? 'bg-[#EAF5EC] border border-[#CDE5D2] text-[#2E5A36]'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}
              >
                {formStatus.success && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                <span>{formStatus.message}</span>
              </div>
            )}
          </form>
        </div>

      </div>

    </div>
  );
};
