/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Star, Heart, Check, Ruler, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductColor } from '../types';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    formatPrice,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    navigateTo
  } = useStore();

  const product = quickViewProduct;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | string | null>(null);

  if (!product) return null;

  const currentColor = selectedColor || product.colors[0];
  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select your shoe size.');
      return;
    }
    addToCart(product, selectedSize, currentColor, 1);
    setQuickViewProduct(null);
  };

  const handleGoToDetails = () => {
    const slug = product.slug;
    setQuickViewProduct(null);
    navigateTo('product', slug);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative min-h-screen px-4 pt-10 pb-16 flex items-center justify-center">
        <div className="relative w-full max-w-4xl bg-[#FAF8F5] shadow-2xl border border-[#D5CABE] overflow-hidden">
          
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-[#1C1A18] rounded-full transition-colors cursor-pointer"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Gallery Column */}
            <div className="p-6 bg-[#F2EDE4] flex flex-col justify-between">
              <div className="aspect-square w-full overflow-hidden bg-white border border-[#E3DCCF]">
                <img
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-14 h-14 bg-white border shrink-0 overflow-hidden cursor-pointer transition-all ${
                        activeImageIdx === idx ? 'border-[#1C1A18] ring-1 ring-[#1C1A18]' : 'border-[#D5CABE] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info & Options Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              
              <div>
                {/* Category & Rating */}
                <div className="flex items-center justify-between text-xs text-[#8C827A] uppercase tracking-wider mb-1">
                  <span>{product.category} · {product.gender}</span>
                  <div className="flex items-center gap-1 text-[#C5A880]">
                    <Star className="w-3.5 h-3.5 fill-current text-[#C5A880]" />
                    <span className="font-mono text-[#1C1A18] font-medium">{product.rating}</span>
                    <span>({product.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Name */}
                <h2 className="font-serif text-2xl font-bold text-[#1C1A18] tracking-tight">
                  {product.name}
                </h2>
                <p className="text-xs text-[#6B645C] mt-1">{product.tagline}</p>

                {/* Price */}
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-mono text-xl font-bold text-[#1C1A18] tabular-nums">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="font-mono text-sm text-[#8C827A] line-through tabular-nums">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#4A4744] mt-3 line-clamp-3 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Color swatches */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold uppercase tracking-wider text-[#1C1A18]">
                    Selected Color: <span className="font-normal text-[#6B645C]">{currentColor.name}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-7 h-7 rounded-full border transition-transform flex items-center justify-center cursor-pointer ${
                        currentColor.name === c.name
                          ? 'ring-2 ring-offset-2 ring-[#1C1A18] scale-105'
                          : 'border-slate-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {currentColor.name === c.name && (
                        <Check className={`w-3.5 h-3.5 ${c.hex === '#FAF9F6' ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold uppercase tracking-wider text-[#1C1A18]">
                    Select Size (EU): {selectedSize && <span className="font-mono">{selectedSize}</span>}
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[11px] text-[#9E7F53] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.size}
                      disabled={s.stock === 0}
                      onClick={() => setSelectedSize(s.size)}
                      className={`py-2 text-xs font-mono font-medium border text-center transition-all cursor-pointer ${
                        selectedSize === s.size
                          ? 'bg-[#1C1A18] text-white border-[#1C1A18] shadow-sm'
                          : s.stock > 0
                          ? 'bg-white text-[#1C1A18] border-[#D5CABE] hover:border-[#1C1A18]'
                          : 'bg-[#F2EDE4] text-[#A1988E] border-[#E0D7C9] cursor-not-allowed line-through'
                      }`}
                    >
                      {s.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-[#E8E2D8]">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-4 bg-[#1C1A18] hover:bg-[#33312E] text-white text-xs font-semibold uppercase tracking-[0.16em] transition-all shadow-md cursor-pointer"
                  >
                    Add to Bag
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-3.5 bg-white border border-[#D5CABE] hover:border-[#1C1A18] transition-colors cursor-pointer"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#9E7F53] text-[#9E7F53]' : 'text-[#1C1A18]'}`} />
                  </button>
                </div>

                <button
                  onClick={handleGoToDetails}
                  className="w-full py-2 text-center text-xs text-[#8C827A] hover:text-[#1C1A18] flex items-center justify-center gap-1 font-medium transition-colors cursor-pointer"
                >
                  <span>View Complete Editorial Page & Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
