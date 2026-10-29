/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, Package, Truck, ArrowRight, Printer, Sparkles, Compass } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderConfirmationPage: React.FC = () => {
  const { latestOrder, orders, navigateTo, formatPrice } = useStore();

  const order = latestOrder || orders[0];

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#1C1A18]">
          No recent order on record
        </h2>
        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-3 bg-[#1C1A18] text-white text-xs uppercase tracking-wider font-semibold cursor-pointer"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      
      {/* Confirmation Badge */}
      <div className="text-center space-y-4 mb-12">
        <div className="w-16 h-16 bg-[#2E5A36] text-white rounded-full mx-auto flex items-center justify-center shadow-lg">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] text-[#9E7F53] font-semibold block">
          Order Confirmed & Sent to Atelier
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1A18]">
          Thank You, {order.customer.name}
        </h1>

        <p className="text-xs sm:text-sm text-[#5C564E] max-w-lg mx-auto leading-relaxed">
          Your order <strong className="font-mono text-[#1C1A18] font-bold">{order.id}</strong> has been received by our master shoemakers. A bespoke confirmation email has been dispatched to <span className="text-[#1C1A18] font-semibold">{order.customer.email}</span>.
        </p>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => navigateTo('tracking')}
            className="px-6 py-3 bg-[#1C1A18] hover:bg-[#33312E] text-white text-xs font-semibold uppercase tracking-[0.16em] transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Truck className="w-4 h-4 text-[#C5A880]" />
            <span>Track Order Status</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-3 bg-white border border-[#D5CABE] text-[#1C1A18] hover:bg-[#FAF8F5] text-xs font-medium uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#8C827A]" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>

      {/* Order Details Card */}
      <div className="bg-white border border-[#E8E2D8] shadow-sm divide-y divide-[#F0EBE1]">
        
        {/* Top summary row */}
        <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[#8C827A] uppercase tracking-wider block text-[10px]">Order Reference</span>
            <span className="font-mono font-bold text-sm text-[#1C1A18]">{order.id}</span>
          </div>

          <div>
            <span className="text-[#8C827A] uppercase tracking-wider block text-[10px]">Date Placed</span>
            <span className="font-mono font-medium text-[#1C1A18]">{new Date(order.date).toLocaleDateString()}</span>
          </div>

          <div>
            <span className="text-[#8C827A] uppercase tracking-wider block text-[10px]">Payment Status</span>
            <span className="font-medium text-[#2E5A36]">{order.paymentStatus}</span>
          </div>

          <div>
            <span className="text-[#8C827A] uppercase tracking-wider block text-[10px]">Tracking Number</span>
            <span className="font-mono font-semibold text-[#9E7F53]">{order.trackingNumber || 'Pending Dispatch'}</span>
          </div>
        </div>

        {/* Shipping address & Courier */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#5C564E]">
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-[#1C1A18] uppercase tracking-wider text-xs mb-2">
              Delivery Coordinates
            </h4>
            <p className="font-medium text-[#1C1A18]">{order.customer.name}</p>
            <p>{order.shippingAddress.address}</p>
            {order.shippingAddress.apartment && <p>{order.shippingAddress.apartment}</p>}
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
            </p>
            <p>{order.shippingAddress.country}</p>
            <p className="pt-1 text-[#8C827A]">Phone: {order.customer.phone}</p>
          </div>

          <div className="space-y-1">
            <h4 className="font-serif font-bold text-[#1C1A18] uppercase tracking-wider text-xs mb-2">
              Shipping Logistics
            </h4>
            <p className="font-medium text-[#1C1A18]">{order.deliveryMethod.name}</p>
            <p className="text-[#8C827A]">Estimated: {order.deliveryMethod.estimatedWindow}</p>
            <p className="pt-2 text-[#8C827A]">Payment Gateway:</p>
            <p className="font-medium text-[#1C1A18]">{order.paymentMethod}</p>
          </div>
        </div>

        {/* Items List */}
        <div className="p-6 space-y-4">
          <h4 className="font-serif font-bold text-[#1C1A18] uppercase tracking-wider text-xs">
            Crafted Footwear in Shipment
          </h4>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-cover bg-[#F4EFE9] border border-[#E3DCCF]"
                  />
                  <div>
                    <h5 className="font-serif font-bold text-[#1C1A18]">{item.name}</h5>
                    <p className="text-[#8C827A] text-[11px]">
                      Size EU {item.selectedSize} · Tone: {item.selectedColor.name} · Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-mono tabular-nums font-bold text-[#1C1A18]">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Breakdown */}
        <div className="p-6 bg-[#FAF8F5] space-y-2 text-xs text-[#5C564E]">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-mono tabular-nums text-[#1C1A18]">{formatPrice(order.subtotal)}</span>
          </div>

          {order.discount > 0 && (
            <div className="flex justify-between text-[#2E5A36]">
              <span>Privilege Discount ({order.discountCode})</span>
              <span className="font-mono tabular-nums">-{formatPrice(order.discount)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-mono tabular-nums text-[#1C1A18]">
              {order.shippingCost === 0 ? 'Complimentary' : formatPrice(order.shippingCost)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Taxes</span>
            <span className="font-mono tabular-nums text-[#1C1A18]">{formatPrice(order.tax)}</span>
          </div>

          <div className="pt-3 border-t border-[#E8E2D8] flex justify-between text-base font-bold text-[#1C1A18]">
            <span className="font-serif">Total Paid</span>
            <span className="font-mono tabular-nums text-xl">{formatPrice(order.total)}</span>
          </div>
        </div>

      </div>

      {/* Post-purchase Guidance */}
      <div className="mt-8 text-center text-xs text-[#8C827A] space-y-2">
        <p>
          Need modifications or personal assistance? Contact our concierge at <a href="mailto:orders@maisondusole.com" className="text-[#1C1A18] underline">orders@maisondusole.com</a>.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="text-[#9E7F53] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer pt-2"
        >
          <span>Continue Exploring the Atelier</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
