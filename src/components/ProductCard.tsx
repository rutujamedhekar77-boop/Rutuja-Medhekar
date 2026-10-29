/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    navigateTo,
    formatPrice,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    addToCart
  } = useStore();

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickAddSizes, setShowQuickAddSizes] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleCardClick = () => {
    navigateTo('product', product.slug);
  };

  const handleQuickAdd = (sizeVal: number | string, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, sizeVal, selectedColor, 1);
    setShowQuickAddSizes(false);
  };

  return (
    <div
      className="group relative flex flex-col bg-[#FAF8F5] border border-[#EBE5DC] hover:border-[#D5CABE] transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickAddSizes(false);
      }}
    >
      {/* Visual Image Slot */}
      <div
        onClick={handleCardClick}
        className="relative aspect-[4/3] sm:aspect-[4/3] w-full overflow-hidden bg-[#F2EDE4] cursor-pointer"
      >
        {!imageError && product.images[0] ? (
          <img
            src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#EFE9DF]">
            <span className="font-serif text-lg text-[#5C564E]">{product.name}</span>
            <span className="text-xs text-[#8C827A] mt-1">{product.tagline}</span>
          </div>
        )}

        {/* Quiet Editorial Tag (Zero-Pill: clean unboxed text) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
          {product.isNewArrival && (
            <span className="text-[10px] uppercase font-semibold tracking-[0.2em] text-[#1C1A18] bg-white/90 backdrop-blur-sm px-2 py-0.5">
              New Arrival
            </span>
          )}
          {product.isSale && (
            <span className="text-[10px] uppercase font-semibold tracking-[0.2em] text-[#935F3A] bg-white/90 backdrop-blur-sm px-2 py-0.5">
              Special Privilege
            </span>
          )}
          {!product.inStock && (
            <span className="text-[10px] uppercase font-semibold tracking-[0.2em] text-red-700 bg-white/90 backdrop-blur-sm px-2 py-0.5">
              Sold Out
            </span>
          )}
        </div>

        {/* Top Right: Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-[#1C1A18] transition-all rounded-full shadow-sm hover:scale-105 z-10 cursor-pointer"
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited ? 'fill-[#9E7F53] text-[#9E7F53]' : 'text-[#1C1A18]'
            }`}
          />
        </button>

        {/* Hover Action Overlay: Quick View + Quick Add */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2 px-3 bg-white/95 hover:bg-white text-[#1C1A18] text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowQuickAddSizes(!showQuickAddSizes);
            }}
            className="py-2 px-3 bg-[#1C1A18] hover:bg-[#33312E] text-white text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-1 transition-all shadow-sm cursor-pointer"
            aria-label="Select size to add"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Select Size</span>
          </button>
        </div>

        {/* Quick Size Selection Flyout on Card */}
        {showQuickAddSizes && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-2 bottom-2 bg-[#FAF8F5] p-3 shadow-xl border border-[#D5CABE] z-20 animate-in fade-in duration-150"
          >
            <div className="flex items-center justify-between text-xs font-semibold text-[#1C1A18] mb-2 uppercase tracking-wider">
              <span>Choose Size (EU)</span>
              <button
                onClick={() => setShowQuickAddSizes(false)}
                className="text-xs text-[#8C827A] hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  disabled={s.stock === 0}
                  onClick={(e) => handleQuickAdd(s.size, e)}
                  className={`py-1.5 text-xs text-center border font-mono transition-colors cursor-pointer ${
                    s.stock > 0
                      ? 'border-[#D5CABE] hover:bg-[#1C1A18] hover:text-white text-[#1C1A18]'
                      : 'border-slate-200 text-slate-300 cursor-not-allowed line-through'
                  }`}
                >
                  {s.size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Info & Clean Metadata */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Unboxed Metadata Line with typographic separators */}
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.12em] text-[#8C827A] mb-1">
            <span className="truncate">{product.category} · {product.gender}</span>
            <div className="flex items-center gap-1 text-[#C5A880] shrink-0">
              <Star className="w-3 h-3 fill-current text-[#C5A880]" />
              <span className="font-mono text-[11px] text-[#4A4744] font-medium">{product.rating}</span>
              <span className="text-[#8C827A]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={handleCardClick}
            className="font-serif text-base font-semibold text-[#1C1A18] hover:text-[#9E7F53] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#6B645C] line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Bottom Strip: Color Swatches & Price */}
        <div className="pt-2 border-t border-[#EBE5DC] flex items-center justify-between gap-2">
          {/* Swatches */}
          <div className="flex items-center gap-1.5">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                title={color.name}
                className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                  selectedColor.name === color.name
                    ? 'ring-1 ring-offset-1 ring-[#1C1A18] scale-110'
                    : 'border-slate-300 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                aria-label={`Select ${color.name}`}
              />
            ))}
            <span className="text-[10px] text-[#8C827A] ml-1 hidden sm:inline truncate max-w-[80px]">
              {selectedColor.name}
            </span>
          </div>

          {/* Pricing with Tabular Numerals */}
          <div className="text-right shrink-0">
            {product.originalPrice ? (
              <div className="flex items-center gap-1.5 font-mono tabular-nums text-sm">
                <span className="text-xs text-[#8C827A] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="font-semibold text-[#1C1A18]">
                  {formatPrice(product.price)}
                </span>
              </div>
            ) : (
              <span className="font-mono tabular-nums font-semibold text-sm text-[#1C1A18]">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
