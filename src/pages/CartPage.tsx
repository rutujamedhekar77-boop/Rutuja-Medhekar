/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Trash2, ArrowRight, ArrowLeft, ShieldCheck, Sparkles, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartCount,
    discountCode,
    discountAmount,
    applyDiscountCode,
    removeDiscountCode,
    formatPrice,
    settings,
    navigateTo
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const threshold = settings.freeShippingThreshold;
  const progressPercent = Math.min(100, (cartSubtotal / threshold) * 100);
  const remainingForFreeShipping = Math.max(0, threshold - cartSubtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const res = applyDiscountCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-[#F4EFE9] border border-[#E3DCCF] rounded-full mx-auto flex items-center justify-center text-[#8C827A]">
          <Tag className="w-8 h-8 stroke-[1.25]" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#1C1A18]">
          Your Shopping Bag is Currently Empty
        </h1>
        <p className="text-xs sm:text-sm text-[#6B645C] max-w-md mx-auto leading-relaxed">
          Take your time to browse our handcrafted footwear collection. Each pair is lasted by master European artisans for lifelong style and comfort.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-8 py-4 bg-[#1C1A18] text-white text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#33312E] transition-all cursor-pointer shadow-lg"
        >
          Explore the Full Catalogue
        </button>
      </div>
    );
  }

  const shippingCost = remainingForFreeShipping === 0 ? 0 : settings.standardShippingFee;
  const tax = (cartSubtotal - discountAmount) * settings.taxRate;
  const grandTotal = cartSubtotal - discountAmount + shippingCost + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Title & Item Counter */}
      <div className="mb-10 pb-4 border-b border-[#E8E2D8] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#9E7F53] font-semibold block mb-1">
            Order Review
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1A18]">
            Your Shopping Bag
          </h1>
        </div>
        <button
          onClick={() => navigateTo('shop')}
          className="text-xs font-semibold uppercase tracking-wider text-[#6B645C] hover:text-[#1C1A18] flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Line Items Table */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Complimentary Shipping Progress */}
          <div className="p-4 bg-[#EFE9DF] border border-[#E3DCCF] text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-[#4A4744] mb-1.5">
                Add <span className="font-semibold text-[#1C1A18] font-mono">{formatPrice(remainingForFreeShipping)}</span> more for complimentary express delivery worldwide.
              </p>
            ) : (
              <p className="text-[#2E5A36] font-medium flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-4 h-4 text-[#C5A880]" />
                You have unlocked Complimentary Worldwide Express Shipping!
              </p>
            )}
            <div className="w-full bg-[#DFD7C9] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#C5A880] h-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Table */}
          <div className="bg-white border border-[#E8E2D8] divide-y divide-[#F0EBE1]">
            {cart.map((item) => (
              <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                
                {/* Image & Title */}
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#F2EDE4] shrink-0 overflow-hidden border border-[#E3DCCF]">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3
                      onClick={() => navigateTo('product', item.productId)}
                      className="font-serif text-base font-semibold text-[#1C1A18] hover:text-[#9E7F53] transition-colors cursor-pointer"
                    >
                      {item.name}
                    </h3>
                    <div className="text-xs text-[#6B645C] mt-1 space-x-2">
                      <span>Size: <strong className="font-mono text-[#1C1A18]">EU {item.selectedSize}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span>Color: <strong className="text-[#1C1A18]">{item.selectedColor.name}</strong></span>
                    </div>
                    <span className="font-mono tabular-nums text-xs font-semibold text-[#8C827A] mt-1 block">
                      {formatPrice(item.price)} each
                    </span>
                  </div>
                </div>

                {/* Steppers & Total */}
                <div className="flex items-center justify-between w-full sm:w-auto sm:gap-8">
                  {/* Stepper */}
                  <div className="flex items-center border border-[#D5CABE] bg-[#FAF8F5]">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-xs text-[#1C1A18] hover:bg-[#EFE9DF] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 font-mono text-xs font-bold text-[#1C1A18] tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.maxStock}
                      className="px-2.5 py-1 text-xs text-[#1C1A18] hover:bg-[#EFE9DF] disabled:opacity-30 cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal for line item */}
                  <span className="font-mono tabular-nums text-base font-bold text-[#1C1A18]">
                    {formatPrice(item.price * item.quantity)}
                  </span>

                  {/* Delete button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#A1988E] hover:text-red-700 transition-colors p-1 cursor-pointer"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Guarantees */}
          <div className="p-4 bg-[#F4EFE9] border border-[#E8E2D8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B645C]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#9E7F53]" />
              <span>30-Day Return & Exchange Window</span>
            </div>
            <span>Insured Courier Delivery Worldwide</span>
          </div>

        </div>

        {/* Right Column: Order Summary & Coupon */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-white border border-[#E8E2D8] space-y-6 shadow-sm">
            <h2 className="font-serif text-lg font-bold uppercase tracking-wider text-[#1C1A18] pb-3 border-b border-[#E8E2D8]">
              Summary
            </h2>

            {/* Promo Code Input */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#1C1A18] block mb-2">
                Promotional Privilege Code
              </label>
              {discountCode ? (
                <div className="flex items-center justify-between bg-[#FAF8F5] p-3 border border-[#C5A880] text-xs">
                  <div>
                    <span className="font-mono font-bold text-[#1C1A18] block">{discountCode}</span>
                    <span className="text-[11px] text-[#2E5A36]">-{formatPrice(discountAmount)} applied</span>
                  </div>
                  <button
                    onClick={removeDiscountCode}
                    className="text-xs text-red-700 hover:underline cursor-pointer font-medium"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code (e.g. SIGNATURE15)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 bg-[#FAF8F5] border border-[#D5CABE] px-3 py-2 text-xs text-[#1C1A18] focus:outline-none focus:border-[#1C1A18]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1C1A18] text-white text-xs font-medium uppercase tracking-wider hover:bg-[#33312E] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && <p className="text-[11px] text-red-700 mt-1">{promoError}</p>}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3 text-xs text-[#5C564E] pt-2 border-t border-[#F0EBE1]">
              <div className="flex justify-between">
                <span>Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
                <span className="font-mono tabular-nums text-[#1C1A18] font-bold">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#2E5A36]">
                  <span>Privilege Discount ({discountCode})</span>
                  <span className="font-mono tabular-nums font-bold">
                    -{formatPrice(discountAmount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-mono tabular-nums text-[#1C1A18]">
                  {shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Tax ({(settings.taxRate * 100).toFixed(0)}%)</span>
                <span className="font-mono tabular-nums text-[#1C1A18]">
                  {formatPrice(tax)}
                </span>
              </div>

              <div className="pt-3 border-t border-[#E8E2D8] flex items-baseline justify-between text-base font-bold text-[#1C1A18]">
                <span className="font-serif">Final Total</span>
                <span className="font-mono tabular-nums text-xl">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => navigateTo('checkout')}
              className="w-full py-4 bg-[#1C1A18] hover:bg-[#33312E] text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>
        </div>

      </div>

    </div>
  );
};
