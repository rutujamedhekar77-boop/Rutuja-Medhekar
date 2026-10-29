/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  User as UserIcon,
  Package,
  MapPin,
  Heart,
  Lock,
  LogOut,
  ChevronRight,
  Shield,
  Eye,
  Plus
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';

export const AccountPage: React.FC = () => {
  const {
    currentUser,
    login,
    logout,
    register,
    orders,
    wishlist,
    products,
    navigateTo,
    formatPrice,
    showToast,
    isAdmin,
    setIsAdmin
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist' | 'profile'>('orders');

  // Sign In / Register state for guests
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  // Address add modal/form state
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddr, setNewAddr] = useState({
    recipientName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States'
  });

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      login(emailInput || 'patron@maisondusole.com');
    } else {
      register(nameInput || 'Valued Patron', emailInput);
    }
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.address || !newAddr.city) {
      showToast('Please enter full street address and city', 'error');
      return;
    }
    showToast('New shipping address saved to your profile', 'success');
    setShowAddressForm(false);
  };

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  // If user is not logged in, render elegant authentication portal
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
        <div className="bg-white p-8 border border-[#E8E2D8] shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9E7F53]">
              Private Patron Portal
            </span>
            <h1 className="font-serif text-2xl font-bold text-[#1C1A18]">
              {authMode === 'login' ? 'Sign In to Your Account' : 'Create Your Patron Account'}
            </h1>
            <p className="text-xs text-[#6B645C]">
              Access saved sizes, order chronicles, and private bespoke previews.
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
            {authMode === 'register' && (
              <div>
                <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Julian Vane"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-3 text-xs text-[#1C1A18] focus:outline-none focus:border-[#1C1A18]"
                />
              </div>
            )}

            <div>
              <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="you@domain.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-3 text-xs text-[#1C1A18] focus:outline-none focus:border-[#1C1A18]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-[#1C1A18] uppercase tracking-wider">
                  Password
                </label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => showToast('Password reset instructions sent to your email.', 'info')}
                    className="text-[10px] text-[#9E7F53] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-3 text-xs text-[#1C1A18] focus:outline-none focus:border-[#1C1A18]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#1C1A18] hover:bg-[#33312E] text-white text-xs font-semibold uppercase tracking-[0.16em] transition-all cursor-pointer shadow-md mt-2"
            >
              {authMode === 'login' ? 'Sign In' : 'Join the Circle'}
            </button>
          </form>

          {/* Quick Demo Sign In */}
          <div className="pt-2 border-t border-[#F0EBE1] text-center">
            <button
              type="button"
              onClick={() => login('julian.vane@example.com')}
              className="text-xs text-[#9E7F53] font-semibold hover:underline cursor-pointer"
            >
              ⚡ Instant Demo Sign-In (Julian Vane)
            </button>
          </div>

          <div className="text-center text-xs text-[#8C827A]">
            {authMode === 'login' ? (
              <p>
                Don't have an account yet?{' '}
                <button
                  onClick={() => setAuthMode('register')}
                  className="font-semibold text-[#1C1A18] hover:underline cursor-pointer"
                >
                  Create one
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setAuthMode('login')}
                  className="font-semibold text-[#1C1A18] hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Header Profile Title */}
      <div className="mb-10 pb-6 border-b border-[#E8E2D8] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#9E7F53] font-semibold block mb-1">
            Private Patron Portal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1A18]">
            Welcome, {currentUser.name}
          </h1>
          <p className="text-xs text-[#6B645C] mt-1">
            Member ID: <span className="font-mono text-[#1C1A18] font-bold">{currentUser.id}</span> · {currentUser.email}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsAdmin(!isAdmin);
              navigateTo('admin');
            }}
            className="px-3.5 py-2 border border-[#9E7F53] text-[#9E7F53] hover:bg-[#9E7F53] hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Store Admin</span>
          </button>

          <button
            onClick={logout}
            className="px-3.5 py-2 bg-white border border-[#D5CABE] hover:bg-[#FAF8F5] text-[#1C1A18] text-xs font-medium uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-[#8C827A]" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 bg-white border border-[#E8E2D8] p-4 divide-y divide-[#F0EBE1] text-xs">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left p-3 flex items-center justify-between font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
              activeTab === 'orders' ? 'bg-[#FAF8F5] text-[#1C1A18] border-l-2 border-[#1C1A18]' : 'text-[#6B645C] hover:text-[#1C1A18]'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Package className="w-4 h-4 text-[#9E7F53]" />
              <span>Order Chronicles ({orders.length})</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full text-left p-3 flex items-center justify-between font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
              activeTab === 'addresses' ? 'bg-[#FAF8F5] text-[#1C1A18] border-l-2 border-[#1C1A18]' : 'text-[#6B645C] hover:text-[#1C1A18]'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#9E7F53]" />
              <span>Saved Addresses</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`w-full text-left p-3 flex items-center justify-between font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
              activeTab === 'wishlist' ? 'bg-[#FAF8F5] text-[#1C1A18] border-l-2 border-[#1C1A18]' : 'text-[#6B645C] hover:text-[#1C1A18]'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Heart className="w-4 h-4 text-[#9E7F53]" />
              <span>Saved Wishlist ({wishlist.length})</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left p-3 flex items-center justify-between font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
              activeTab === 'profile' ? 'bg-[#FAF8F5] text-[#1C1A18] border-l-2 border-[#1C1A18]' : 'text-[#6B645C] hover:text-[#1C1A18]'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <UserIcon className="w-4 h-4 text-[#9E7F53]" />
              <span>Profile Preferences</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </aside>

        {/* Tab Content Area */}
        <main className="lg:col-span-9 bg-white border border-[#E8E2D8] p-6 sm:p-8">
          
          {/* TAB: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
                <h2 className="font-serif text-xl font-bold text-[#1C1A18]">
                  Your Order History
                </h2>
                <span className="text-xs text-[#8C827A] font-mono">
                  {orders.length} lifetime orders
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <p className="text-xs text-[#8C827A]">No footwear orders have been placed yet.</p>
                  <button
                    onClick={() => navigateTo('shop')}
                    className="px-6 py-2.5 bg-[#1C1A18] text-white text-xs uppercase tracking-wider font-semibold cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div key={ord.id} className="p-5 border border-[#E8E2D8] bg-[#FAF8F5] space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EBE5DC] text-xs">
                        <div>
                          <span className="font-mono font-bold text-sm text-[#1C1A18] block">{ord.id}</span>
                          <span className="text-[#8C827A]">Placed {new Date(ord.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 bg-white border border-[#D5CABE] text-[#1C1A18] font-medium uppercase text-[10px] tracking-wider">
                            {ord.status}
                          </span>
                          <button
                            onClick={() => navigateTo('tracking')}
                            className="text-[#9E7F53] font-semibold hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <span>Track</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2">
                        {ord.items.map((it) => (
                          <div key={it.id} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              <img
                                src={it.image}
                                alt={it.name}
                                referrerPolicy="no-referrer"
                                className="w-10 h-10 object-cover bg-white"
                              />
                              <div>
                                <span className="font-serif font-bold text-[#1C1A18]">{it.name}</span>
                                <span className="text-[#8C827A] text-[11px] block">
                                  EU {it.selectedSize} · {it.selectedColor.name} · Qty: {it.quantity}
                                </span>
                              </div>
                            </div>
                            <span className="font-mono tabular-nums font-bold text-[#1C1A18]">
                              {formatPrice(it.price * it.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-[#EBE5DC] flex justify-between text-xs font-bold text-[#1C1A18]">
                        <span>Total Paid ({ord.paymentMethod})</span>
                        <span className="font-mono text-sm">{formatPrice(ord.total)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
                <h2 className="font-serif text-xl font-bold text-[#1C1A18]">
                  Saved Shipping Destinations
                </h2>
                <button
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="px-4 py-2 bg-[#1C1A18] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              </div>

              {showAddressForm && (
                <form onSubmit={handleAddAddress} className="p-5 bg-[#FAF8F5] border border-[#D5CABE] space-y-4 text-xs">
                  <h3 className="font-serif text-sm font-bold text-[#1C1A18] uppercase tracking-wider">
                    Add Shipping Destination
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-[#1C1A18] block mb-1">Recipient Name</label>
                      <input
                        type="text"
                        required
                        value={newAddr.recipientName}
                        onChange={(e) => setNewAddr({ ...newAddr, recipientName: e.target.value })}
                        className="w-full bg-white border border-[#D5CABE] p-2 text-xs text-[#1C1A18] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#1C1A18] block mb-1">Street Address</label>
                      <input
                        type="text"
                        required
                        value={newAddr.address}
                        onChange={(e) => setNewAddr({ ...newAddr, address: e.target.value })}
                        className="w-full bg-white border border-[#D5CABE] p-2 text-xs text-[#1C1A18] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="font-semibold text-[#1C1A18] block mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={newAddr.city}
                        onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                        className="w-full bg-white border border-[#D5CABE] p-2 text-xs text-[#1C1A18] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#1C1A18] block mb-1">State</label>
                      <input
                        type="text"
                        required
                        value={newAddr.state}
                        onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                        className="w-full bg-white border border-[#D5CABE] p-2 text-xs text-[#1C1A18] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#1C1A18] block mb-1">Postal Code</label>
                      <input
                        type="text"
                        required
                        value={newAddr.postalCode}
                        onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                        className="w-full bg-white border border-[#D5CABE] p-2 text-xs text-[#1C1A18] focus:outline-none"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#1C1A18] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Save Address
                  </button>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentUser.addresses.map((addr) => (
                  <div key={addr.id} className="p-5 border border-[#E8E2D8] bg-[#FAF8F5] space-y-2 text-xs">
                    <div className="flex items-center justify-between font-bold text-[#1C1A18]">
                      <span>{addr.recipientName}</span>
                      {addr.isDefault && (
                        <span className="text-[10px] bg-[#9E7F53]/20 text-[#9E7F53] px-2 py-0.5 uppercase tracking-wider">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-[#5C564E]">{addr.address}</p>
                    {addr.apartment && <p className="text-[#5C564E]">{addr.apartment}</p>}
                    <p className="text-[#5C564E]">
                      {addr.city}, {addr.state} {addr.postalCode}
                    </p>
                    <p className="text-[#5C564E]">{addr.country}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
                <h2 className="font-serif text-xl font-bold text-[#1C1A18]">
                  Saved Silhouettes ({wishlistProducts.length})
                </h2>
                <button
                  onClick={() => navigateTo('wishlist')}
                  className="text-xs text-[#9E7F53] font-semibold hover:underline cursor-pointer"
                >
                  Open Dedicated Wishlist View
                </button>
              </div>

              {wishlistProducts.length === 0 ? (
                <p className="text-xs text-[#8C827A] italic py-8 text-center">
                  You have not bookmarked any footwear models yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {wishlistProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: PROFILE PREFERENCES */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-xl">
              <div className="pb-4 border-b border-[#E8E2D8]">
                <h2 className="font-serif text-xl font-bold text-[#1C1A18]">
                  Patron Profile Details
                </h2>
                <p className="text-xs text-[#6B645C] mt-0.5">
                  Update your contact details and communication options.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={currentUser.name}
                    className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-3 text-xs text-[#1C1A18] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={currentUser.email}
                    className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-3 text-xs text-[#1C1A18] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                    Preferred Shoe Size
                  </label>
                  <select className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-3 text-xs text-[#1C1A18] focus:outline-none">
                    <option value="41">EU 41 / US 8.5</option>
                    <option value="42">EU 42 / US 9.0</option>
                    <option value="43">EU 43 / US 10.0</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => showToast('Patron profile preferences updated', 'success')}
                  className="px-6 py-3 bg-[#1C1A18] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
