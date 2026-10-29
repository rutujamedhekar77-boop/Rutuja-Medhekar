/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  Package,
  MapPin,
  Calendar,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderStatus, Order } from '../types';

export const OrderTrackingPage: React.FC = () => {
  const { orders, getOrderById, formatPrice, navigateTo } = useStore();

  const [inputOrderNumber, setInputOrderNumber] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(() => orders[0] || null);
  const [hasSearched, setHasSearched] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const allMilestones: OrderStatus[] = [
    'Order Placed',
    'Payment Confirmed',
    'Processing',
    'Packed',
    'Shipped',
    'Out for Delivery',
    'Delivered'
  ];

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const cleanId = inputOrderNumber.trim();
    if (!cleanId) {
      setErrorMessage('Please enter your order reference number.');
      return;
    }

    const found = getOrderById(cleanId);
    if (found) {
      setSearchedOrder(found);
      setHasSearched(true);
    } else {
      setSearchedOrder(null);
      setHasSearched(true);
      setErrorMessage(`No order found matching "${cleanId}". Please check your order confirmation email.`);
    }
  };

  const getStepProgress = (status: OrderStatus): number => {
    const idx = allMilestones.indexOf(status);
    return idx === -1 ? 0 : idx;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-[0.2em] text-[#9E7F53] font-semibold block mb-1">
          Concierge Logistics
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1A18]">
          Track Your Footwear Shipment
        </h1>
        <p className="text-xs sm:text-sm text-[#6B645C] mt-2 leading-relaxed">
          Monitor your handcrafted shoes from our European cobbler bench to your doorstep.
        </p>
      </div>

      {/* Lookup Card */}
      <div className="p-6 bg-white border border-[#E8E2D8] shadow-sm mb-10">
        <form onSubmit={handleTrackSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#1C1A18] uppercase tracking-wider block mb-1">
                Order Reference Number *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. MDS-10024"
                value={inputOrderNumber}
                onChange={(e) => setInputOrderNumber(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-3 text-xs text-[#1C1A18] font-mono focus:outline-none focus:border-[#1C1A18]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1C1A18] uppercase tracking-wider block mb-1">
                Email / Phone Verification (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. eleanor.vance@example.com"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-3 text-xs text-[#1C1A18] focus:outline-none focus:border-[#1C1A18]"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            {/* Quick Demo Pre-fill buttons */}
            <div className="flex items-center gap-2 text-xs text-[#8C827A]">
              <span>Sample Orders:</span>
              <button
                type="button"
                onClick={() => {
                  setInputOrderNumber('MDS-10024');
                  const o = getOrderById('MDS-10024');
                  if (o) setSearchedOrder(o);
                }}
                className="text-[#9E7F53] underline font-mono cursor-pointer"
              >
                MDS-10024 (Shipped)
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => {
                  setInputOrderNumber('MDS-10025');
                  const o = getOrderById('MDS-10025');
                  if (o) setSearchedOrder(o);
                }}
                className="text-[#9E7F53] underline font-mono cursor-pointer"
              >
                MDS-10025 (Processing)
              </button>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-[#1C1A18] hover:bg-[#33312E] text-white text-xs font-semibold uppercase tracking-[0.16em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track Parcel</span>
            </button>
          </div>
        </form>

        {errorMessage && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Results Display */}
      {searchedOrder && (
        <div className="bg-white border border-[#E8E2D8] shadow-sm divide-y divide-[#F0EBE1] animate-in fade-in duration-300">
          
          {/* Header Status Bar */}
          <div className="p-6 bg-[#FAF8F5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-semibold text-[#8C827A] uppercase tracking-wider block">
                Order Status
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#1C1A18] flex items-center gap-2">
                <span>{searchedOrder.status}</span>
                <span className="text-xs px-2.5 py-0.5 bg-[#9E7F53]/15 text-[#9E7F53] font-sans font-medium uppercase tracking-wider">
                  Live Dispatch
                </span>
              </h2>
              <p className="text-xs text-[#6B645C] mt-1 font-mono">
                Order ID: <strong>{searchedOrder.id}</strong> · Placed on {new Date(searchedOrder.date).toLocaleDateString()}
              </p>
            </div>

            <div className="text-right text-xs">
              <span className="text-[#8C827A] block text-[10px] uppercase tracking-wider">Carrier & Tracking</span>
              <span className="font-semibold text-[#1C1A18]">{searchedOrder.carrier || 'DHL Express'}</span>
              <p className="font-mono text-[#9E7F53] font-semibold">{searchedOrder.trackingNumber}</p>
            </div>
          </div>

          {/* Visual Milestone Progress Tracker */}
          <div className="p-6 sm:p-8">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#1C1A18] mb-6">
              Journey Milestones
            </h3>

            <div className="relative">
              {/* Desktop timeline horizontal */}
              <div className="hidden sm:grid grid-cols-7 gap-2 text-center relative z-10">
                {allMilestones.map((m, idx) => {
                  const currentIdx = getStepProgress(searchedOrder.status);
                  const isDone = currentIdx >= idx;
                  const isCurrent = currentIdx === idx;
                  return (
                    <div key={m} className="flex flex-col items-center">
                      <div
                        className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                          isDone
                            ? 'bg-[#1C1A18] text-white'
                            : 'bg-[#F2EDE4] text-[#A1988E] border border-[#D5CABE]'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4 text-[#C5A880]" /> : idx + 1}
                      </div>
                      <span
                        className={`text-[10px] mt-2 font-medium uppercase tracking-wider max-w-[80px] leading-tight ${
                          isCurrent ? 'text-[#9E7F53] font-bold' : isDone ? 'text-[#1C1A18]' : 'text-[#A1988E]'
                        }`}
                      >
                        {m}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Connecting line behind icons */}
              <div className="hidden sm:block absolute top-3.5 inset-x-8 h-0.5 bg-[#E8E2D8] -z-0" />

              {/* Mobile vertical timeline */}
              <div className="sm:hidden space-y-4">
                {allMilestones.map((m, idx) => {
                  const currentIdx = getStepProgress(searchedOrder.status);
                  const isDone = currentIdx >= idx;
                  const isCurrent = currentIdx === idx;
                  return (
                    <div key={m} className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                          isDone ? 'bg-[#1C1A18] text-white' : 'bg-[#F2EDE4] text-[#A1988E]'
                        }`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>
                      <span
                        className={`text-xs ${
                          isCurrent ? 'font-bold text-[#9E7F53]' : isDone ? 'text-[#1C1A18]' : 'text-[#A1988E]'
                        }`}
                      >
                        {m}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Shipping Address & Summary */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#5C564E]">
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-[#1C1A18] uppercase tracking-wider text-xs mb-2">
                Delivery Coordinates
              </h4>
              <p className="font-medium text-[#1C1A18]">{searchedOrder.customer.name}</p>
              <p>{searchedOrder.shippingAddress.address}</p>
              {searchedOrder.shippingAddress.apartment && <p>{searchedOrder.shippingAddress.apartment}</p>}
              <p>
                {searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.state} {searchedOrder.shippingAddress.postalCode}
              </p>
              <p>{searchedOrder.shippingAddress.country}</p>
            </div>

            <div className="space-y-1">
              <h4 className="font-serif font-bold text-[#1C1A18] uppercase tracking-wider text-xs mb-2">
                Order Content
              </h4>
              {searchedOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-1">
                  <span>{item.name} (EU {item.selectedSize}) × {item.quantity}</span>
                  <span className="font-mono tabular-nums font-bold text-[#1C1A18]">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-[#F0EBE1] flex justify-between font-bold text-[#1C1A18]">
                <span>Total Value</span>
                <span className="font-mono tabular-nums">{formatPrice(searchedOrder.total)}</span>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
