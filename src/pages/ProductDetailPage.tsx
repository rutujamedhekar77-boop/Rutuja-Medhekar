/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Star,
  Heart,
  Share2,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ZoomIn
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ProductColor } from '../types';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductSlug,
    navigateTo,
    addToCart,
    formatPrice,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    reviews,
    addReview,
    showToast
  } = useStore();

  const product =
    products.find((p) => p.slug === selectedProductSlug || p.id === selectedProductSlug) ||
    products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<number | string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [zoomMode, setZoomMode] = useState(false);
  const [zipCode, setZipCode] = useState('');
  const [deliveryEstimate, setDeliveryEstimate] = useState<string | null>(null);

  // Review Form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newFit, setNewFit] = useState<'Runs Small' | 'True to Size' | 'Runs Large'>('True to Size');

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(null);
      setActiveImageIndex(0);
      setQuantity(1);
    }
  }, [product]);

  const isFavorited = isInWishlist(product.id);
  const productReviews = reviews.filter((r) => r.productId === product.id);
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast('Please select your footwear size', 'error');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      showToast('Please select your footwear size', 'error');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    navigateTo('checkout');
  };

  const handleCalculateDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipCode.trim()) return;
    const days = zipCode.startsWith('9') || zipCode.startsWith('1') ? '2-3 business days' : '3-4 business days';
    setDeliveryEstimate(`Estimated Delivery: ${days} via DHL Express Courier`);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) {
      showToast('Please complete your name and review remarks', 'error');
      return;
    }
    addReview({
      productId: product.id,
      author: newAuthor,
      rating: newRating,
      title: newTitle || 'Exceptional craftsmanship',
      comment: newComment,
      fitFeedback: newFit
    });
    setNewAuthor('');
    setNewTitle('');
    setNewComment('');
    setShowReviewForm(false);
  };

  const selectedSizeObj = product.sizes.find((s) => String(s.size) === String(selectedSize));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#8C827A] mb-8 font-medium">
        <button onClick={() => navigateTo('home')} className="hover:text-[#1C1A18] transition-colors cursor-pointer">
          Home
        </button>
        <ChevronRight className="w-3 h-3" />
        <button
          onClick={() => {
            sessionStorage.setItem('mds_nav_filter', product.category);
            navigateTo('shop');
          }}
          className="hover:text-[#1C1A18] transition-colors cursor-pointer"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#1C1A18] font-serif truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Contiguous PDP Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: Gallery & Zoom */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Large Image */}
          <div
            onClick={() => setZoomMode(!zoomMode)}
            className="relative aspect-[4/3] w-full overflow-hidden bg-[#F2EDE4] border border-[#E3DCCF] cursor-zoom-in group shadow-xs"
          >
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-transform duration-500 ${
                zoomMode ? 'scale-150 cursor-zoom-out' : 'group-hover:scale-105'
              }`}
            />
            
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 text-[#1C1A18] rounded-full shadow-sm">
              <ZoomIn className="w-4 h-4" />
            </div>

            {/* Zero-Pill Quiet Status Tag */}
            {product.isNewArrival && (
              <span className="absolute top-4 left-4 bg-white/95 px-2.5 py-1 text-[10px] uppercase font-semibold tracking-[0.2em] text-[#1C1A18]">
                New Arrival
              </span>
            )}
          </div>

          {/* Thumbnail Gallery Strip */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveImageIndex(idx);
                  setZoomMode(false);
                }}
                className={`relative w-20 h-20 sm:w-24 sm:h-24 bg-[#F2EDE4] border shrink-0 overflow-hidden cursor-pointer transition-all ${
                  activeImageIndex === idx
                    ? 'border-[#1C1A18] ring-1 ring-[#1C1A18]'
                    : 'border-[#E3DCCF] opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`View ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Craftsmanship Specifications Accordion */}
          <div className="pt-8 space-y-4 border-t border-[#E8E2D8]">
            <h3 className="font-serif text-lg font-bold text-[#1C1A18]">
              Atelier Specifications & Construction
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-white border border-[#EBE5DC]">
                <strong className="text-[#1C1A18] block uppercase tracking-wider mb-2 font-mono text-[11px]">
                  Materials & Provenance
                </strong>
                <ul className="space-y-1.5 text-[#5C564E]">
                  {product.materials.map((m, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-white border border-[#EBE5DC]">
                <strong className="text-[#1C1A18] block uppercase tracking-wider mb-2 font-mono text-[11px]">
                  Footwear Details
                </strong>
                <ul className="space-y-1.5 text-[#5C564E]">
                  {product.details.map((d, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 bg-[#F4EFE9] border border-[#E3DCCF] text-xs text-[#5C564E] space-y-1">
              <strong className="text-[#1C1A18] block font-mono text-[11px] uppercase tracking-wider">
                Care Recommendations
              </strong>
              {product.careInstructions.map((c, idx) => (
                <p key={idx} className="leading-relaxed">· {c}</p>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Contiguous Purchase Module (Sticky on desktop) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
          
          <div className="p-6 sm:p-8 bg-white border border-[#E8E2D8] shadow-sm space-y-6">
            
            {/* Header: SKU & Ratings */}
            <div className="flex items-center justify-between text-xs text-[#8C827A] uppercase tracking-wider">
              <span>SKU: {product.sku}</span>
              <div className="flex items-center gap-1 text-[#C5A880]">
                <Star className="w-3.5 h-3.5 fill-current text-[#C5A880]" />
                <span className="font-mono text-[#1C1A18] font-bold">{product.rating}</span>
                <span>({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Title & Tagline */}
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1A18] tracking-tight">
                {product.name}
              </h1>
              <p className="text-xs text-[#8C827A] mt-1 font-medium uppercase tracking-wider">
                {product.category} · {product.gender}
              </p>
            </div>

            {/* Price with Tabular Numerals */}
            <div className="flex items-baseline gap-3 pb-4 border-b border-[#F0EBE1]">
              <span className="font-mono text-2xl font-bold text-[#1C1A18] tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="font-mono text-sm text-[#8C827A] line-through tabular-nums">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-[11px] text-[#9E7F53] font-semibold uppercase tracking-wider">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              )}
            </div>

            {/* Short Narrative */}
            <p className="text-xs text-[#5C564E] leading-relaxed">
              {product.description}
            </p>

            {/* Color Swatch Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#1C1A18]">
                  Color Shade: <span className="font-normal text-[#6B645C]">{selectedColor.name}</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-7 h-7 rounded-full border transition-all flex items-center justify-center cursor-pointer ${
                      selectedColor.name === c.name
                        ? 'ring-2 ring-offset-2 ring-[#1C1A18] scale-110'
                        : 'border-slate-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor.name === c.name && (
                      <Check className={`w-3.5 h-3.5 ${c.hex === '#FAF9F6' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector with Size Guide */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#1C1A18]">
                  Select Size (EU) {selectedSize && <span className="font-mono text-[#9E7F53]">· {selectedSize}</span>}
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[11px] text-[#9E7F53] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Chart</span>
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 font-mono">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    disabled={s.stock === 0}
                    onClick={() => setSelectedSize(s.size)}
                    className={`py-2 text-xs font-semibold border text-center transition-all cursor-pointer ${
                      selectedSize === s.size
                        ? 'bg-[#1C1A18] text-white border-[#1C1A18] shadow-sm'
                        : s.stock > 0
                        ? 'bg-white text-[#1C1A18] border-[#D5CABE] hover:border-[#1C1A18]'
                        : 'bg-[#F2EDE4] text-[#A1988E] border-[#E3DCCF] cursor-not-allowed line-through'
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>

              {/* Stock indicator */}
              {selectedSizeObj && selectedSizeObj.stock <= 5 && selectedSizeObj.stock > 0 && (
                <p className="text-[11px] text-[#935F3A] font-medium pt-1">
                  Only {selectedSizeObj.stock} pairs remain in our European warehouse.
                </p>
              )}
            </div>

            {/* Quantity Stepper & Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#D5CABE] bg-[#FAF8F5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-xs text-[#1C1A18] hover:bg-[#EFE9DF] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-mono text-xs font-bold text-[#1C1A18] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-xs text-[#1C1A18] hover:bg-[#EFE9DF] cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-3 border border-[#D5CABE] hover:border-[#1C1A18] transition-colors cursor-pointer"
                  aria-label="Save to wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#9E7F53] text-[#9E7F53]' : 'text-[#1C1A18]'}`} />
                </button>
              </div>

              {/* Primary Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-[#1C1A18] hover:bg-[#33312E] text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all shadow-md cursor-pointer"
              >
                Add to Shopping Bag
              </button>

              {/* Secondary Buy Now */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3 bg-[#FAF8F5] border border-[#1C1A18] text-[#1C1A18] hover:bg-[#1C1A18] hover:text-white text-xs font-semibold uppercase tracking-[0.16em] transition-all cursor-pointer"
              >
                Instant Buy & Checkout
              </button>
            </div>

            {/* Delivery Estimator Form */}
            <div className="pt-4 border-t border-[#F0EBE1] space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#1C1A18] font-semibold uppercase tracking-wider">
                <Truck className="w-4 h-4 text-[#9E7F53]" />
                <span>Estimate Dispatch & Arrival</span>
              </div>

              <form onSubmit={handleCalculateDelivery} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter postal / ZIP code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="flex-1 bg-[#FAF8F5] border border-[#D5CABE] px-3 py-1.5 text-xs text-[#1C1A18] placeholder:text-[#A1988E] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#E8E2D8] text-[#1C1A18] text-xs font-medium uppercase tracking-wider hover:bg-[#D5CABE] cursor-pointer"
                >
                  Calculate
                </button>
              </form>

              {deliveryEstimate && (
                <p className="text-[11px] text-[#2E5A36] font-medium mt-1">
                  {deliveryEstimate}
                </p>
              )}
            </div>

            {/* Atelier Guarantees */}
            <div className="pt-4 border-t border-[#F0EBE1] space-y-2 text-xs text-[#5C564E]">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#9E7F53] shrink-0" />
                <span>Complimentary 30-day extended returns & exchanges</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#9E7F53] shrink-0" />
                <span>100% Insured courier transit with tamper-evident seal</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Customer Reviews & Verification Section */}
      <section className="mt-20 pt-12 border-t border-[#E8E2D8]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#1C1A18]">
              Customer Experiences & Reviews
            </h3>
            <p className="text-xs text-[#6B645C] mt-1">
              Verified feedback from patrons who have walked in this silhouette.
            </p>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-5 py-2.5 bg-[#1C1A18] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#33312E] transition-colors cursor-pointer"
          >
            {showReviewForm ? 'Cancel' : 'Write a Verified Review'}
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <form
            onSubmit={handleReviewSubmit}
            className="mb-10 p-6 bg-white border border-[#D5CABE] max-w-2xl space-y-4 shadow-sm"
          >
            <h4 className="font-serif text-base font-bold text-[#1C1A18]">
              Review "{product.name}"
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#1C1A18] block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. Julian Vane"
                  className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-2 text-xs text-[#1C1A18] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1C1A18] block mb-1">Star Rating</label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-2 text-xs text-[#1C1A18] focus:outline-none"
                >
                  <option value={5}>★★★★★ (5 Stars - Flawless)</option>
                  <option value={4}>★★★★☆ (4 Stars - Very Good)</option>
                  <option value={3}>★★★☆☆ (3 Stars - Average)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#1C1A18] block mb-1">Headline / Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Magnificent comfort and leather texture"
                  className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-2 text-xs text-[#1C1A18] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1C1A18] block mb-1">Fit Assessment</label>
                <select
                  value={newFit}
                  onChange={(e) => setNewFit(e.target.value as any)}
                  className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-2 text-xs text-[#1C1A18] focus:outline-none"
                >
                  <option value="True to Size">True to Size</option>
                  <option value="Runs Small">Runs Small (Size Up)</option>
                  <option value="Runs Large">Runs Large (Size Down)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1C1A18] block mb-1">Your Detailed Experience</label>
              <textarea
                required
                rows={4}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Describe the break-in, leather feel, weight distribution, and pairing versatility..."
                className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-2 text-xs text-[#1C1A18] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#1C1A18] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#33312E] cursor-pointer"
            >
              Submit Review
            </button>
          </form>
        )}

        {/* Existing Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productReviews.length === 0 ? (
            <p className="text-xs text-[#8C827A] italic">
              Be the first verified customer to share an editorial review for this handcrafted model.
            </p>
          ) : (
            productReviews.map((r) => (
              <div key={r.id} className="p-6 bg-white border border-[#E8E2D8] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex text-[#C5A880]">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[#8C827A] font-mono">{r.date}</span>
                </div>
                <h4 className="font-serif font-bold text-sm text-[#1C1A18]">
                  "{r.title}"
                </h4>
                <p className="text-xs text-[#5C564E] leading-relaxed">
                  {r.comment}
                </p>
                <div className="pt-2 border-t border-[#F0EBE1] flex items-center justify-between text-[11px] text-[#8C827A]">
                  <span className="font-semibold text-[#1C1A18]">{r.author} (Verified Buyer)</span>
                  {r.fitFeedback && <span>Fit: {r.fitFeedback}</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Related Products Carousel/Grid */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-[#E8E2D8]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif text-2xl font-bold text-[#1C1A18]">
              Complementary Silhouettes
            </h3>
            <button
              onClick={() => {
                sessionStorage.removeItem('mds_nav_filter');
                navigateTo('shop');
              }}
              className="text-xs font-semibold uppercase tracking-wider text-[#9E7F53] hover:underline cursor-pointer"
            >
              View Full Collection
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky Add to Cart Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#FAF8F5] border-t border-[#D5CABE] p-3 z-30 shadow-xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-[#8C827A] block truncate max-w-[120px]">{product.name}</span>
          <span className="font-mono text-sm font-bold text-[#1C1A18]">{formatPrice(product.price)}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="px-4 py-2.5 bg-[#1C1A18] text-white text-xs uppercase tracking-wider font-semibold cursor-pointer"
          >
            Add to Bag
          </button>
        </div>
      </div>

    </div>
  );
};
