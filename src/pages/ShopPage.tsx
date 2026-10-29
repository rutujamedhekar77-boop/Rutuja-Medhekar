/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  SlidersHorizontal,
  X,
  Search,
  Grid3X3,
  LayoutGrid,
  ChevronDown,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Category, Gender } from '../types';

export const ShopPage: React.FC = () => {
  const { products, formatPrice } = useStore();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(450);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [gridColumns, setGridColumns] = useState<3 | 4>(3);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Read initial filter from sessionStorage (set by header/category click)
  useEffect(() => {
    const navFilter = sessionStorage.getItem('mds_nav_filter');
    if (navFilter) {
      if (['Men', 'Women', 'Sneakers', 'Formal', 'Casual', 'Loafers', 'Boots', 'Sandals'].includes(navFilter)) {
        setSelectedCategory(navFilter);
      } else if (navFilter === 'new-arrivals') {
        setSortBy('newest');
      } else if (navFilter === 'best-selling') {
        setSortBy('best-selling');
      } else if (navFilter === 'sale') {
        // filter for sale items
      }
      sessionStorage.removeItem('mds_nav_filter');
    }
  }, []);

  const categories = [
    'All',
    'Men',
    'Women',
    'Sneakers',
    'Formal',
    'Casual',
    'Loafers',
    'Boots',
    'Sandals'
  ];

  const availableSizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];

  const availableColors = [
    { name: 'All', hex: 'transparent' },
    { name: 'White', hex: '#FAF9F6' },
    { name: 'Black', hex: '#1C1A18' },
    { name: 'Brown / Walnut', hex: '#4B3322' },
    { name: 'Espresso', hex: '#382218' },
    { name: 'Cognac', hex: '#7A3D18' },
    { name: 'Taupe / Sand', hex: '#B8B2A8' },
    { name: 'Navy', hex: '#1B2A4A' },
    { name: 'Olive', hex: '#585F49' }
  ];

  // Filtering & Sorting logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'All') {
          if (selectedCategory === 'Men' || selectedCategory === 'Women') {
            if (p.category !== selectedCategory && p.gender !== selectedCategory && p.gender !== 'Unisex') {
              return false;
            }
          } else if (p.category !== selectedCategory) {
            return false;
          }
        }

        // Gender filter
        if (selectedGender !== 'All') {
          if (p.gender !== selectedGender && p.gender !== 'Unisex') {
            return false;
          }
        }

        // Size filter
        if (selectedSize !== 'All') {
          const hasSize = p.sizes.some(
            (s) => String(s.size) === selectedSize && s.stock > 0
          );
          if (!hasSize) return false;
        }

        // Color filter
        if (selectedColor !== 'All') {
          const hasColor = p.colors.some((c) =>
            c.name.toLowerCase().includes(selectedColor.toLowerCase())
          );
          if (!hasColor) return false;
        }

        // Max price filter
        if (p.price > maxPrice) return false;

        // In-stock only
        if (inStockOnly && !p.inStock) return false;

        // Min rating
        if (minRating > 0 && p.rating < minRating) return false;

        // Search text
        if (searchFilter.trim()) {
          const query = searchFilter.toLowerCase();
          const match =
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.tagline.toLowerCase().includes(query) ||
            p.sku.toLowerCase().includes(query);
          if (!match) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        if (sortBy === 'best-selling') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        // default featured
        return b.rating - a.rating;
      });
  }, [
    products,
    selectedCategory,
    selectedGender,
    selectedSize,
    selectedColor,
    maxPrice,
    inStockOnly,
    minRating,
    searchFilter,
    sortBy
  ]);

  const activeFiltersCount = [
    selectedCategory !== 'All',
    selectedGender !== 'All',
    selectedSize !== 'All',
    selectedColor !== 'All',
    maxPrice < 450,
    inStockOnly,
    minRating > 0,
    searchFilter.trim() !== ''
  ].filter(Boolean).length;

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedGender('All');
    setSelectedSize('All');
    setSelectedColor('All');
    setMaxPrice(450);
    setInStockOnly(false);
    setMinRating(0);
    setSearchFilter('');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header Banner */}
      <div className="mb-8 pb-6 border-b border-[#E8E2D8]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#9E7F53] font-semibold block mb-1">
              Handcrafted Catalogue
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1A18]">
              {selectedCategory === 'All' ? 'Complete Footwear Collection' : `${selectedCategory} Collection`}
            </h1>
            <p className="text-xs sm:text-sm text-[#6B645C] mt-1.5 max-w-xl">
              Each silhouette is lasted on anatomical forms, bench-stitched with certified full-grain leathers, and built for lasting grace.
            </p>
          </div>

          <div className="text-xs text-[#8C827A] font-mono tabular-nums">
            Showing <strong className="text-[#1C1A18]">{filteredProducts.length}</strong> of {products.length} models
          </div>
        </div>
      </div>

      {/* Control Bar: Search, Sort, Grid View & Mobile Toggle */}
      <div className="mb-6 p-4 bg-[#F4EFE9] border border-[#E3DCCF] flex flex-wrap items-center justify-between gap-4">
        
        {/* Search within catalog */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search model, leather, or SKU..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#D5CABE] text-xs text-[#1C1A18] placeholder:text-[#A1988E] focus:outline-none focus:border-[#1C1A18]"
          />
          {searchFilter && (
            <button
              onClick={() => setSearchFilter('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8C827A] hover:text-black cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3 ml-auto">
          
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden px-3 py-2 bg-white border border-[#D5CABE] text-xs font-semibold text-[#1C1A18] flex items-center gap-2 cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#8C827A] uppercase tracking-wider hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#D5CABE] px-3 py-2 text-xs text-[#1C1A18] font-medium cursor-pointer focus:outline-none"
            >
              <option value="featured">Featured / Editorial</option>
              <option value="best-selling">Best Selling</option>
              <option value="newest">New Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Desktop Column Toggle */}
          <div className="hidden md:flex items-center border border-[#D5CABE] bg-white">
            <button
              onClick={() => setGridColumns(3)}
              className={`p-2 transition-colors cursor-pointer ${
                gridColumns === 3 ? 'bg-[#1C1A18] text-white' : 'text-[#8C827A] hover:text-[#1C1A18]'
              }`}
              title="3 Columns"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridColumns(4)}
              className={`p-2 transition-colors cursor-pointer ${
                gridColumns === 4 ? 'bg-[#1C1A18] text-white' : 'text-[#8C827A] hover:text-[#1C1A18]'
              }`}
              title="4 Columns"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFiltersCount > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#8C827A] font-medium">Active Filters:</span>
          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#D5CABE] text-[#1C1A18]">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory('All')} className="hover:text-red-700 cursor-pointer">✕</button>
            </span>
          )}
          {selectedGender !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#D5CABE] text-[#1C1A18]">
              Gender: {selectedGender}
              <button onClick={() => setSelectedGender('All')} className="hover:text-red-700 cursor-pointer">✕</button>
            </span>
          )}
          {selectedSize !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#D5CABE] text-[#1C1A18]">
              Size: EU {selectedSize}
              <button onClick={() => setSelectedSize('All')} className="hover:text-red-700 cursor-pointer">✕</button>
            </span>
          )}
          {selectedColor !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#D5CABE] text-[#1C1A18]">
              Color: {selectedColor}
              <button onClick={() => setSelectedColor('All')} className="hover:text-red-700 cursor-pointer">✕</button>
            </span>
          )}
          {maxPrice < 450 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#D5CABE] text-[#1C1A18]">
              Under {formatPrice(maxPrice)}
              <button onClick={() => setMaxPrice(450)} className="hover:text-red-700 cursor-pointer">✕</button>
            </span>
          )}
          {inStockOnly && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#D5CABE] text-[#1C1A18]">
              In Stock Only
              <button onClick={() => setInStockOnly(false)} className="hover:text-red-700 cursor-pointer">✕</button>
            </span>
          )}
          {minRating > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#D5CABE] text-[#1C1A18]">
              ★ {minRating}+ Stars
              <button onClick={() => setMinRating(0)} className="hover:text-red-700 cursor-pointer">✕</button>
            </span>
          )}
          {searchFilter && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#D5CABE] text-[#1C1A18]">
              Query: "{searchFilter}"
              <button onClick={() => setSearchFilter('')} className="hover:text-red-700 cursor-pointer">✕</button>
            </span>
          )}

          <button
            onClick={handleResetFilters}
            className="text-xs text-[#9E7F53] hover:underline font-semibold flex items-center gap-1 ml-2 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear All</span>
          </button>
        </div>
      )}

      {/* Main Content Layout: Sidebar Filters + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Sidebar Filters */}
        <aside className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="p-6 bg-white border border-[#E8E2D8] space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#1C1A18] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#9E7F53]" />
                <span>Filter Collection</span>
              </h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-[#9E7F53] hover:underline cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Department / Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#1C1A18] block">
                Category
              </label>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left py-1 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      selectedCategory === cat ? 'font-bold text-[#1C1A18]' : 'text-[#6B645C] hover:text-[#1C1A18]'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <span className="text-[#9E7F53]">●</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div className="space-y-2 pt-3 border-t border-[#F0EBE1]">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#1C1A18] block">
                Gender
              </label>
              <div className="grid grid-cols-3 gap-1 bg-[#FAF8F5] p-1 border border-[#E8E2D8]">
                {['All', 'Men', 'Women'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`py-1 text-xs font-medium transition-colors text-center cursor-pointer ${
                      selectedGender === g ? 'bg-white shadow-xs text-[#1C1A18] font-bold' : 'text-[#8C827A] hover:text-[#1C1A18]'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="space-y-2 pt-3 border-t border-[#F0EBE1]">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold uppercase tracking-wider text-[#1C1A18]">
                  Size (EU)
                </label>
                {selectedSize !== 'All' && (
                  <button onClick={() => setSelectedSize('All')} className="text-[10px] text-[#8C827A] hover:underline cursor-pointer">
                    Any
                  </button>
                )}
              </div>
              <div className="grid grid-cols-4 gap-1.5 font-mono">
                {availableSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(selectedSize === String(sz) ? 'All' : String(sz))}
                    className={`py-1.5 text-xs text-center border transition-colors cursor-pointer ${
                      selectedSize === String(sz)
                        ? 'bg-[#1C1A18] text-white border-[#1C1A18]'
                        : 'bg-white text-[#4A4744] border-[#E0D7C9] hover:border-[#1C1A18]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatch Filter */}
            <div className="space-y-2 pt-3 border-t border-[#F0EBE1]">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#1C1A18] block">
                Leather Color
              </label>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(selectedColor === c.name ? 'All' : c.name)}
                    title={c.name}
                    className={`w-6 h-6 rounded-full border transition-transform flex items-center justify-center cursor-pointer ${
                      selectedColor === c.name ? 'ring-2 ring-offset-2 ring-[#1C1A18] scale-110' : 'border-slate-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.name === 'All' ? '#e2e8f0' : c.hex }}
                  >
                    {c.name === 'All' && <span className="text-[8px] font-bold text-slate-700">All</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2 pt-3 border-t border-[#F0EBE1]">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold uppercase tracking-wider text-[#1C1A18]">
                  Max Price
                </label>
                <span className="font-mono tabular-nums text-[#1C1A18] font-bold">
                  {formatPrice(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="180"
                max="450"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#1C1A18] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8C827A] font-mono">
                <span>{formatPrice(180)}</span>
                <span>{formatPrice(450)}</span>
              </div>
            </div>

            {/* Stock Availability Toggle */}
            <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between">
              <label htmlFor="instock-toggle" className="text-xs text-[#1C1A18] cursor-pointer">
                In-Stock Only
              </label>
              <input
                id="instock-toggle"
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 accent-[#1C1A18] cursor-pointer"
              />
            </div>

          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center bg-white border border-[#E8E2D8] space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#D5CABE] mx-auto flex items-center justify-center text-[#9E7F53]">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1C1A18]">
                No footwear matches your selected criteria
              </h3>
              <p className="text-xs text-[#6B645C] max-w-md mx-auto leading-relaxed">
                We couldn't find any shoes matching your specific size, category, or price filters. Try widening your filters or resetting to view the full atelier collection.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-3 bg-[#1C1A18] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#33312E] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                gridColumns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
              } gap-6`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>

      </div>

    </div>
  );
};
