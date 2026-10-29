/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, Trash2, ShoppingBag, ArrowRight, Eye, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

export const WishlistPage: React.FC = () => {
  const {
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    formatPrice,
    navigateTo,
    setQuickViewProduct
  } = useStore();

  const [selectedSizes, setSelectedSizes] = useState<Record<string, number | string>>({});

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleSelectSize = (productId: string, size: number | string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleMoveToBag = (product: Product) => {
    const size = selectedSizes[product.id] || product.sizes.find((s) => s.stock > 0)?.size;
    if (!size) {
      alert('Please choose an available size.');
      return;
    }
    addToCart(product, size, product.colors[0], 1);
    toggleWishlist(product.id);
  };

  if (savedProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-[#F4EFE9] border border-[#E3DCCF] rounded-full mx-auto flex items-center justify-center text-[#8C827A]">
          <Heart className="w-8 h-8 stroke-[1.25]" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#1C1A18]">
          Your Saved Wishlist is Empty
        </h1>
        <p className="text-xs sm:text-sm text-[#6B645C] max-w-md mx-auto leading-relaxed">
          Bookmark your favored handcrafted silhouettes while exploring. Return anytime to compare leather choices, select your size, and acquire your pair.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-8 py-4 bg-[#1C1A18] text-white text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#33312E] transition-all cursor-pointer shadow-lg"
        >
          Explore the Full Collection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-[#E8E2D8] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#9E7F53] font-semibold block mb-1">
            Personal Registry
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1A18]">
            Saved Footwear Silhouettes
          </h1>
        </div>
        <span className="text-xs font-mono text-[#8C827A] tabular-nums">
          {savedProducts.length} {savedProducts.length === 1 ? 'saved model' : 'saved models'}
        </span>
      </div>

      {/* Grid of Wishlist Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {savedProducts.map((product) => {
          const chosenSize = selectedSizes[product.id] || product.sizes.find((s) => s.stock > 0)?.size;

          return (
            <div
              key={product.id}
              className="bg-white border border-[#E8E2D8] flex flex-col justify-between shadow-xs hover:border-[#D5CABE] transition-all"
            >
              {/* Image with remove badge */}
              <div className="relative aspect-[4/3] bg-[#F4EFE9] overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-stone-500 hover:text-red-700 rounded-full transition-colors cursor-pointer shadow-sm"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Information */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8C827A] uppercase tracking-wider mb-1">
                    <span>{product.category} · {product.gender}</span>
                    <span className="font-semibold text-[#2E5A36]">In Stock</span>
                  </div>

                  <h3
                    onClick={() => navigateTo('product', product.slug)}
                    className="font-serif text-lg font-bold text-[#1C1A18] hover:text-[#9E7F53] transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#6B645C] line-clamp-1 mt-0.5">
                    {product.tagline}
                  </p>

                  <div className="mt-2 font-mono tabular-nums text-base font-bold text-[#1C1A18]">
                    {formatPrice(product.price)}
                  </div>
                </div>

                {/* Size quick select */}
                <div className="space-y-1.5 pt-2 border-t border-[#F0EBE1]">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1C1A18] block">
                    Choose Size (EU):
                  </span>
                  <div className="grid grid-cols-5 gap-1 font-mono text-xs">
                    {product.sizes.map((s) => (
                      <button
                        key={s.size}
                        disabled={s.stock === 0}
                        onClick={() => handleSelectSize(product.id, s.size)}
                        className={`py-1 text-center border transition-all cursor-pointer ${
                          chosenSize === s.size
                            ? 'bg-[#1C1A18] text-white border-[#1C1A18] font-bold'
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

                {/* Move to bag button */}
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => handleMoveToBag(product)}
                    className="flex-1 py-3 bg-[#1C1A18] hover:bg-[#33312E] text-white text-xs font-semibold uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>

                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="p-3 bg-[#FAF8F5] border border-[#D5CABE] hover:border-[#1C1A18] transition-colors cursor-pointer"
                    title="Quick preview"
                  >
                    <Eye className="w-4 h-4 text-[#1C1A18]" />
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
