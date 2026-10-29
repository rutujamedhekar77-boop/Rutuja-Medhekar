/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Sparkles, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
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

  if (!isCartOpen) return null;

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

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  const handleViewFullCart = () => {
    setIsCartOpen(false);
    navigateTo('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-[#E8E2D8]">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E8E2D8] flex items-center justify-between bg-[#F4EFE9]">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1C1A18] tracking-wider uppercase">
                Shopping Bag
              </h2>
              <span className="text-xs text-[#8C827A] font-medium">
                {cartCount} {cartCount === 1 ? 'handcrafted pair' : 'handcrafted pairs'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#4A4744] hover:text-[#1C1A18] transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Progress Bar */}
          <div className="px-6 py-3 bg-[#EFE9DF] border-b border-[#E3DCcf] text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-[#4A4744] mb-1.5">
                Add <span className="font-semibold text-[#1C1A18] font-mono">{formatPrice(remainingForFreeShipping)}</span> more for complimentary worldwide express delivery.
              </p>
            ) : (
              <p className="text-[#2E5A36] font-medium flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                You have unlocked Complimentary Worldwide Delivery!
              </p>
            )}
            <div className="w-full bg-[#DFD7C9] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#C5A880] h-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#F4EFE9] flex items-center justify-center text-[#8C827A] mb-4">
                  <Tag className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#1C1A18] mb-1">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#6B645C] max-w-xs mb-6 leading-relaxed">
                  Explore our collection of handcrafted leather footwear, luxury sneakers, and timeless classics.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="px-6 py-3 bg-[#1C1A18] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#33312E] transition-all cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 pb-6 border-b border-[#EBE5DC]">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-[#F2EDE4] shrink-0 overflow-hidden border border-[#E3DCCF]">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            setIsCartOpen(false);
                            navigateTo('product', item.productId);
                          }}
                          className="font-serif text-sm font-semibold text-[#1C1A18] hover:text-[#9E7F53] transition-colors cursor-pointer line-clamp-1"
                        >
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#A1988E] hover:text-red-700 transition-colors p-0.5 cursor-pointer"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#6B645C] mt-1 space-x-2">
                        <span>Size: <strong className="font-mono text-[#1C1A18]">EU {item.selectedSize}</strong></span>
                        <span aria-hidden="true">·</span>
                        <span>Tone: <strong className="text-[#1C1A18]">{item.selectedColor.name}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#D5CABE] bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#4A4744] hover:bg-[#F4EFE9] transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-mono font-medium text-[#1C1A18] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="px-2 py-0.5 text-xs text-[#4A4744] hover:bg-[#F4EFE9] transition-colors disabled:opacity-40 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Total for Item */}
                      <span className="font-mono tabular-nums text-sm font-semibold text-[#1C1A18]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area (if items exist) */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#F4EFE9] border-t border-[#E8E2D8] space-y-4">
              
              {/* Promo code field */}
              <div>
                {discountCode ? (
                  <div className="flex items-center justify-between bg-white px-3 py-2 border border-[#C5A880] text-xs">
                    <span className="font-mono font-medium text-[#1C1A18]">
                      Code: {discountCode} (-{formatPrice(discountAmount)})
                    </span>
                    <button
                      onClick={removeDiscountCode}
                      className="text-[#9E7F53] hover:text-red-700 underline text-[11px] cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. SIGNATURE15)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-white border border-[#D5CABE] px-3 py-2 text-xs text-[#1C1A18] placeholder:text-[#A1988E] focus:outline-none focus:border-[#1C1A18]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-[#E8E2D8] text-[#1C1A18] text-xs font-medium uppercase tracking-wider hover:bg-[#D5CABE] transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-700 mt-1">{promoError}</p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-[#4A4744]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-[#1C1A18] font-medium">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#2E5A36]">
                    <span>Privilege Discount</span>
                    <span className="font-mono tabular-nums font-medium">
                      -{formatPrice(discountAmount)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-mono tabular-nums text-[#1C1A18]">
                    {remainingForFreeShipping === 0 ? 'Complimentary' : formatPrice(settings.standardShippingFee)}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#DFD7C9] flex justify-between text-sm font-semibold text-[#1C1A18]">
                  <span className="font-serif">Estimated Total</span>
                  <span className="font-mono tabular-nums text-base">
                    {formatPrice(
                      cartSubtotal - discountAmount + (remainingForFreeShipping === 0 ? 0 : settings.standardShippingFee)
                    )}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 px-4 bg-[#1C1A18] hover:bg-[#33312E] text-white text-xs font-semibold uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleViewFullCart}
                  className="w-full py-2.5 px-4 bg-transparent border border-[#1C1A18] text-[#1C1A18] hover:bg-[#1C1A18] hover:text-white text-xs font-medium uppercase tracking-[0.12em] transition-all cursor-pointer"
                >
                  View Full Bag & Details
                </button>
              </div>

              {/* Trust statement */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-[#8C827A] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>30-Day Atelier Return Guarantee · Insured Shipping</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
