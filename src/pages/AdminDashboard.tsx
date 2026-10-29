/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Package,
  TrendingUp,
  ShoppingBag,
  Users,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle,
  Truck,
  Mail,
  Settings as SettingsIcon,
  Shield,
  Download,
  ArrowRight,
  Eye,
  RefreshCw
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, Order, OrderStatus, Category, Gender } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    settings,
    updateSettings,
    subscribers,
    contactMessages,
    markMessageRead,
    formatPrice,
    navigateTo,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'customers' | 'subscribers' | 'inquiries' | 'settings'>('overview');

  // Product Add / Edit modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    tagline: '',
    category: 'Sneakers' as Category,
    gender: 'Unisex' as Gender,
    price: 250,
    originalPrice: 0,
    sku: '',
    description: '',
    image: '',
    inStock: true
  });

  // Order status update modal state
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newOrderStatus, setNewOrderStatus] = useState<OrderStatus>('Processing');
  const [newTrackingNum, setNewTrackingNum] = useState('');
  const [newCarrier, setNewCarrier] = useState('');

  // Search & filter in tables
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');

  // Overview metrics calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
  const lowStockProducts = products.filter((p) =>
    p.sizes.some((s) => s.stock <= 4)
  );

  // Open Product Modal (Add or Edit)
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      tagline: 'Handcrafted European shoe design',
      category: 'Sneakers',
      gender: 'Unisex',
      price: 260,
      originalPrice: 0,
      sku: `MDS-NEW-${Math.floor(100 + Math.random() * 900)}`,
      description: 'Handcrafted with fine Italian calfskin and reinforced sole.',
      image: '/src/assets/images/hero_footwear_campaign_1793280976179.jpg',
      inStock: true
    });
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      tagline: prod.tagline,
      category: prod.category,
      gender: prod.gender,
      price: prod.price,
      originalPrice: prod.originalPrice || 0,
      sku: prod.sku,
      description: prod.description,
      image: prod.images[0] || '',
      inStock: prod.inStock
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim() || !productForm.sku.trim()) {
      showToast('Please provide shoe name and SKU', 'error');
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: productForm.name,
        tagline: productForm.tagline,
        category: productForm.category,
        gender: productForm.gender,
        price: Number(productForm.price),
        originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : undefined,
        sku: productForm.sku,
        description: productForm.description,
        images: [productForm.image, ...editingProduct.images.slice(1)],
        inStock: productForm.inStock
      });
    } else {
      addProduct({
        name: productForm.name,
        slug: productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        tagline: productForm.tagline,
        category: productForm.category,
        gender: productForm.gender,
        price: Number(productForm.price),
        originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : undefined,
        isBestSeller: false,
        isNewArrival: true,
        isSale: false,
        rating: 5.0,
        reviewCount: 1,
        images: [productForm.image],
        colors: [{ name: 'Classic Black', hex: '#111111' }, { name: 'Ivory White', hex: '#FAF9F6' }],
        sizes: [
          { size: 40, stock: 10 },
          { size: 41, stock: 15 },
          { size: 42, stock: 15 },
          { size: 43, stock: 10 }
        ],
        description: productForm.description,
        details: ['Handmade European construction', 'Full-grain leather', 'Ergonomic comfort footbed'],
        materials: ['Calfskin Upper', 'Leather & Rubber Sole'],
        careInstructions: ['Wipe clean with soft damp cloth', 'Use cedar shoe trees'],
        sku: productForm.sku,
        inStock: productForm.inStock
      });
    }

    setShowProductModal(false);
  };

  const handleSaveOrderStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;
    updateOrderStatus(
      selectedOrder.id,
      newOrderStatus,
      newTrackingNum || undefined,
      newCarrier || undefined
    );
    setSelectedOrder(null);
  };

  const handleExportSubscribers = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'ID,Email,Date\n' +
      subscribers.map((s) => `${s.id},${s.email},${s.date}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'maison_du_sole_subscribers.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Subscribers exported to CSV', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Top Bar */}
      <div className="mb-8 pb-4 border-b border-[#E8E2D8] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E7F53] font-semibold">
            <Shield className="w-3.5 h-3.5" />
            <span>Maison Du Sole Operating Management</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#1C1A18] mt-1">
            Administrator Atelier Portal
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="px-4 py-2 bg-white border border-[#D5CABE] text-[#1C1A18] text-xs font-semibold uppercase tracking-wider hover:bg-[#FAF8F5] transition-colors cursor-pointer"
          >
            Storefront View
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 border-b border-[#E8E2D8] text-xs">
        {[
          { id: 'overview', label: 'Overview Metrics', icon: TrendingUp },
          { id: 'products', label: `Products (${products.length})`, icon: Package },
          { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
          { id: 'subscribers', label: `Subscribers (${subscribers.length})`, icon: Mail },
          { id: 'inquiries', label: `Messages (${contactMessages.length})`, icon: Users },
          { id: 'settings', label: 'Store Settings', icon: SettingsIcon }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 whitespace-nowrap font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border ${
                activeTab === tab.id
                  ? 'bg-[#1C1A18] text-white border-[#1C1A18]'
                  : 'bg-white text-[#6B645C] border-[#E0D7C9] hover:border-[#1C1A18]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* KPI Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white border border-[#E8E2D8] shadow-sm space-y-2">
              <span className="text-[11px] font-semibold text-[#8C827A] uppercase tracking-wider">Total Revenue</span>
              <p className="font-mono text-2xl sm:text-3xl font-bold text-[#1C1A18] tabular-nums">
                {formatPrice(totalRevenue)}
              </p>
              <span className="text-[11px] text-[#2E5A36] font-medium block">Across {orders.length} lifetime orders</span>
            </div>

            <div className="p-6 bg-white border border-[#E8E2D8] shadow-sm space-y-2">
              <span className="text-[11px] font-semibold text-[#8C827A] uppercase tracking-wider">Active Footwear Models</span>
              <p className="font-mono text-2xl sm:text-3xl font-bold text-[#1C1A18] tabular-nums">
                {products.length}
              </p>
              <span className="text-[11px] text-[#8C827A] block">100% In-Stock & Verified</span>
            </div>

            <div className="p-6 bg-white border border-[#E8E2D8] shadow-sm space-y-2">
              <span className="text-[11px] font-semibold text-[#8C827A] uppercase tracking-wider">Pending Atelier Orders</span>
              <p className="font-mono text-2xl sm:text-3xl font-bold text-[#9E7F53] tabular-nums">
                {pendingOrders}
              </p>
              <span className="text-[11px] text-[#8C827A] block">Awaiting dispatch completion</span>
            </div>

            <div className="p-6 bg-white border border-[#E8E2D8] shadow-sm space-y-2">
              <span className="text-[11px] font-semibold text-[#8C827A] uppercase tracking-wider">Low-Stock Watch</span>
              <p className="font-mono text-2xl sm:text-3xl font-bold text-amber-700 tabular-nums">
                {lowStockProducts.length}
              </p>
              <span className="text-[11px] text-amber-700 font-medium block">Pairs with ≤ 4 stock</span>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="bg-white border border-[#E8E2D8] shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EBE1]">
              <h2 className="font-serif text-lg font-bold text-[#1C1A18]">
                Recent Orders Stream
              </h2>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs text-[#9E7F53] font-semibold hover:underline cursor-pointer"
              >
                View Full Log
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF8F5] text-[11px] uppercase tracking-wider text-[#8C827A] border-b border-[#E8E2D8]">
                  <tr>
                    <th className="py-2.5 px-3">Order ID</th>
                    <th className="py-2.5 px-3">Customer</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Total</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EBE1] font-mono tabular-nums">
                  {orders.slice(0, 5).map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#FAF8F5]">
                      <td className="py-3 px-3 font-bold text-[#1C1A18]">{ord.id}</td>
                      <td className="py-3 px-3 font-sans text-[#4A4744]">{ord.customer.name}</td>
                      <td className="py-3 px-3 text-[#8C827A]">{new Date(ord.date).toLocaleDateString()}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 bg-[#FAF8F5] border border-[#D5CABE] text-[#1C1A18] text-[10px] font-sans uppercase">
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-bold text-[#1C1A18]">{formatPrice(ord.total)}</td>
                      <td className="py-3 px-3 text-right font-sans">
                        <button
                          onClick={() => {
                            setSelectedOrder(ord);
                            setNewOrderStatus(ord.status);
                            setNewTrackingNum(ord.trackingNumber || '');
                            setNewCarrier(ord.carrier || '');
                          }}
                          className="text-[#9E7F53] font-semibold hover:underline cursor-pointer"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Low Stock Alerts */}
          {lowStockProducts.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-800 font-serif font-bold text-base">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Atelier Low-Stock Reorder Advisory</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                {lowStockProducts.map((p) => {
                  const lowSizes = p.sizes.filter((s) => s.stock <= 4);
                  return (
                    <div key={p.id} className="p-3 bg-white border border-amber-200 space-y-1">
                      <p className="font-bold text-[#1C1A18]">{p.name}</p>
                      <p className="text-[#8C827A] text-[11px] font-mono">SKU: {p.sku}</p>
                      <div className="text-amber-800 font-mono text-[11px]">
                        Low sizes: {lowSizes.map((s) => `EU ${s.size} (${s.stock} left)`).join(', ')}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 2: PRODUCT MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products by title, SKU, or category..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-[#D5CABE] text-xs text-[#1C1A18] focus:outline-none"
              />
            </div>

            <button
              onClick={handleOpenAddProduct}
              className="px-5 py-2.5 bg-[#1C1A18] hover:bg-[#33312E] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Footwear Model</span>
            </button>
          </div>

          <div className="bg-white border border-[#E8E2D8] shadow-sm overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#FAF8F5] text-[11px] uppercase tracking-wider text-[#8C827A] border-b border-[#E8E2D8]">
                <tr>
                  <th className="py-3 px-4">Footwear Model</th>
                  <th className="py-3 px-3">SKU</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Price</th>
                  <th className="py-3 px-3">Variants</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EBE1]">
                {products
                  .filter((p) => {
                    if (!productSearch) return true;
                    const q = productSearch.toLowerCase();
                    return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
                  })
                  .map((prod) => (
                    <tr key={prod.id} className="hover:bg-[#FAF8F5]">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 object-cover bg-[#F2EDE4] border border-[#E3DCCF]"
                          />
                          <div>
                            <span className="font-serif font-bold text-[#1C1A18] block">{prod.name}</span>
                            <span className="text-[11px] text-[#8C827A]">{prod.tagline}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-[#4A4744]">{prod.sku}</td>
                      <td className="py-3 px-3 text-[#4A4744]">{prod.category} · {prod.gender}</td>
                      <td className="py-3 px-3 font-mono font-bold text-[#1C1A18]">{formatPrice(prod.price)}</td>
                      <td className="py-3 px-3 font-mono text-[11px] text-[#6B645C]">
                        {prod.colors.length} shades · {prod.sizes.length} sizes
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border ${
                            prod.inStock
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-red-50 text-red-800 border-red-200'
                          }`}
                        >
                          {prod.inStock ? 'Published' : 'Draft / Sold'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditProduct(prod)}
                          className="p-1 text-[#8C827A] hover:text-[#1C1A18] cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove "${prod.name}" from catalog?`)) {
                              deleteProduct(prod.id);
                            }
                          }}
                          className="p-1 text-[#8C827A] hover:text-red-700 cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ORDER MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by order ID, customer name, email, or tracking..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-[#D5CABE] text-xs text-[#1C1A18] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#8C827A]">Status:</span>
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="bg-white border border-[#D5CABE] p-2 text-xs text-[#1C1A18] focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Order Placed">Order Placed</option>
                <option value="Payment Confirmed">Payment Confirmed</option>
                <option value="Processing">Processing</option>
                <option value="Packed">Packed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="bg-white border border-[#E8E2D8] shadow-sm overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#FAF8F5] text-[11px] uppercase tracking-wider text-[#8C827A] border-b border-[#E8E2D8]">
                <tr>
                  <th className="py-3 px-4">Order Reference</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Customer Coordinates</th>
                  <th className="py-3 px-3">Payment</th>
                  <th className="py-3 px-3">Courier Logistics</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Total</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EBE1]">
                {orders
                  .filter((ord) => {
                    if (orderStatusFilter !== 'All' && ord.status !== orderStatusFilter) return false;
                    if (orderSearch) {
                      const q = orderSearch.toLowerCase();
                      return (
                        ord.id.toLowerCase().includes(q) ||
                        ord.customer.name.toLowerCase().includes(q) ||
                        ord.customer.email.toLowerCase().includes(q) ||
                        (ord.trackingNumber && ord.trackingNumber.toLowerCase().includes(q))
                      );
                    }
                    return true;
                  })
                  .map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#FAF8F5]">
                      <td className="py-3 px-4 font-mono font-bold text-[#1C1A18]">{ord.id}</td>
                      <td className="py-3 px-3 text-[#8C827A] font-mono">{new Date(ord.date).toLocaleDateString()}</td>
                      <td className="py-3 px-3">
                        <strong className="text-[#1C1A18] block">{ord.customer.name}</strong>
                        <span className="text-[11px] text-[#6B645C] block">{ord.customer.email}</span>
                        <span className="text-[11px] text-[#8C827A]">{ord.shippingAddress.city}, {ord.shippingAddress.country}</span>
                      </td>
                      <td className="py-3 px-3 text-[#4A4744]">
                        <span className="block font-medium">{ord.paymentStatus}</span>
                        <span className="text-[10px] text-[#8C827A]">{ord.paymentMethod}</span>
                      </td>
                      <td className="py-3 px-3 text-[11px]">
                        <span className="block font-semibold text-[#1C1A18]">{ord.carrier || 'DHL Express'}</span>
                        <span className="font-mono text-[#9E7F53]">{ord.trackingNumber || 'No tracking'}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 bg-[#FAF8F5] border border-[#D5CABE] text-[#1C1A18] text-[10px] font-semibold uppercase">
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-[#1C1A18]">{formatPrice(ord.total)}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedOrder(ord);
                            setNewOrderStatus(ord.status);
                            setNewTrackingNum(ord.trackingNumber || '');
                            setNewCarrier(ord.carrier || '');
                          }}
                          className="px-3 py-1 bg-[#1C1A18] text-white text-[11px] uppercase tracking-wider font-semibold hover:bg-[#33312E] cursor-pointer"
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: SUBSCRIBERS */}
      {activeTab === 'subscribers' && (
        <div className="space-y-6 max-w-4xl">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1C1A18]">
                Newsletter Patron Registry ({subscribers.length})
              </h2>
              <p className="text-xs text-[#6B645C] mt-0.5">
                Patrons subscribed to the Maison Private Circle newsletters.
              </p>
            </div>

            <button
              onClick={handleExportSubscribers}
              className="px-4 py-2 bg-[#1C1A18] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="bg-white border border-[#E8E2D8] divide-y divide-[#F0EBE1]">
            {subscribers.map((sub) => (
              <div key={sub.id} className="p-4 flex items-center justify-between text-xs">
                <span className="font-medium text-[#1C1A18]">{sub.email}</span>
                <span className="text-[#8C827A] font-mono">Subscribed: {sub.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: INQUIRIES & MESSAGES */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6 max-w-4xl">
          <div className="pb-4 border-b border-[#E8E2D8]">
            <h2 className="font-serif text-xl font-bold text-[#1C1A18]">
              Client Concierge Messages Inbox ({contactMessages.length})
            </h2>
            <p className="text-xs text-[#6B645C] mt-0.5">
              Direct correspondences dispatched through the Contact Us form.
            </p>
          </div>

          <div className="space-y-4">
            {contactMessages.map((msg) => (
              <div key={msg.id} className="p-6 bg-white border border-[#E8E2D8] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-sm font-serif text-[#1C1A18]">{msg.name}</strong>
                    <span className="text-[#8C827A] ml-2">({msg.email} {msg.phone ? `· ${msg.phone}` : ''})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[#8C827A]">{msg.date}</span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-semibold uppercase ${
                        msg.status === 'Unread' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                      }`}
                    >
                      {msg.status}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF8F5] border border-[#F0EBE1] text-xs text-[#4A4744]">
                  <strong className="block text-[#1C1A18] mb-1">Subject: {msg.subject}</strong>
                  <p className="leading-relaxed whitespace-pre-line">{msg.message}</p>
                </div>

                <div className="flex justify-end gap-2 text-xs">
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                    className="px-3 py-1.5 border border-[#D5CABE] text-[#1C1A18] hover:bg-[#FAF8F5] cursor-pointer"
                  >
                    Reply via Email
                  </a>
                  {msg.status === 'Unread' && (
                    <button
                      onClick={() => markMessageRead(msg.id)}
                      className="px-3 py-1.5 bg-[#1C1A18] text-white hover:bg-[#33312E] cursor-pointer"
                    >
                      Mark as Replied
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: STORE SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white border border-[#E8E2D8] p-8 max-w-3xl space-y-6">
          <div className="pb-4 border-b border-[#F0EBE1]">
            <h2 className="font-serif text-xl font-bold text-[#1C1A18]">
              Maison Du Sole Configurable Settings
            </h2>
            <p className="text-xs text-[#6B645C] mt-0.5">
              Adjust business contact coordinates, tax rates, announcement message, and shipping thresholds.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                Top Announcement Bar Message
              </label>
              <input
                type="text"
                value={settings.announcementText}
                onChange={(e) => updateSettings({ announcementText: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-2.5 text-xs text-[#1C1A18] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                  Store Currency
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) => updateSettings({ currency: e.target.value as any })}
                  className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-2.5 text-xs text-[#1C1A18] focus:outline-none"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                  Complimentary Shipping Threshold ($)
                </label>
                <input
                  type="number"
                  value={settings.freeShippingThreshold}
                  onChange={(e) => updateSettings({ freeShippingThreshold: Number(e.target.value) })}
                  className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-2.5 text-xs text-[#1C1A18] font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                  Regional Sales Tax Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.taxRate * 100}
                  onChange={(e) => updateSettings({ taxRate: Number(e.target.value) / 100 })}
                  className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-2.5 text-xs text-[#1C1A18] font-mono focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                  Concierge Telephone
                </label>
                <input
                  type="text"
                  value={settings.businessPhone}
                  onChange={(e) => updateSettings({ businessPhone: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-2.5 text-xs text-[#1C1A18] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                  Concierge Email
                </label>
                <input
                  type="email"
                  value={settings.businessEmail}
                  onChange={(e) => updateSettings({ businessEmail: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-2.5 text-xs text-[#1C1A18] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                Flagship Atelier Address
              </label>
              <input
                type="text"
                value={settings.businessAddress}
                onChange={(e) => updateSettings({ businessAddress: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-2.5 text-xs text-[#1C1A18] focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT ADD/EDIT MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            onClick={() => setShowProductModal(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />
          <div className="relative min-h-screen p-4 flex items-center justify-center">
            <div className="relative w-full max-w-2xl bg-white p-6 sm:p-8 border border-[#D5CABE] shadow-2xl space-y-6 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
                <h3 className="font-serif text-lg font-bold text-[#1C1A18]">
                  {editingProduct ? `Edit "${editingProduct.name}"` : 'Add New Footwear Silhouette'}
                </h3>
                <button onClick={() => setShowProductModal(false)} className="text-[#8C827A] hover:text-black cursor-pointer">
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-[#1C1A18] block mb-1">Model Name *</label>
                    <input
                      type="text"
                      required
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      placeholder="e.g. The Monogram Loafer"
                      className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-2 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#1C1A18] block mb-1">SKU Reference *</label>
                    <input
                      type="text"
                      required
                      value={productForm.sku}
                      onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                      placeholder="MDS-LOA-901"
                      className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-2 text-xs font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#1C1A18] block mb-1">Tagline</label>
                  <input
                    type="text"
                    value={productForm.tagline}
                    onChange={(e) => setProductForm({ ...productForm, tagline: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-2 text-xs focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="font-semibold text-[#1C1A18] block mb-1">Category</label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value as Category })}
                      className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-2 text-xs focus:outline-none"
                    >
                      <option value="Sneakers">Sneakers</option>
                      <option value="Loafers">Loafers</option>
                      <option value="Formal">Formal</option>
                      <option value="Casual">Casual</option>
                      <option value="Boots">Boots</option>
                      <option value="Sandals">Sandals</option>
                      <option value="Women">Women</option>
                      <option value="Men">Men</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-[#1C1A18] block mb-1">Gender</label>
                    <select
                      value={productForm.gender}
                      onChange={(e) => setProductForm({ ...productForm, gender: e.target.value as Gender })}
                      className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-2 text-xs focus:outline-none"
                    >
                      <option value="Unisex">Unisex</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-[#1C1A18] block mb-1">Price ($)</label>
                    <input
                      type="number"
                      required
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                      className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-2 text-xs font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#1C1A18] block mb-1">Original Price ($)</label>
                    <input
                      type="number"
                      value={productForm.originalPrice}
                      onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                      className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-2 text-xs font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#1C1A18] block mb-1">Primary Image URL or Asset Path</label>
                  <input
                    type="text"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-2 text-xs font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#1C1A18] block mb-1">Editorial Description</label>
                  <textarea
                    rows={3}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-2 text-xs focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className="px-4 py-2 border border-[#D5CABE] text-[#1C1A18] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#1C1A18] text-white font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Save Footwear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ORDER STATUS UPDATE MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            onClick={() => setSelectedOrder(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />
          <div className="relative min-h-screen p-4 flex items-center justify-center">
            <div className="relative w-full max-w-lg bg-white p-6 sm:p-8 border border-[#D5CABE] shadow-2xl space-y-5 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
                <h3 className="font-serif text-lg font-bold text-[#1C1A18]">
                  Manage Order {selectedOrder.id}
                </h3>
                <button onClick={() => setSelectedOrder(null)} className="text-[#8C827A] hover:text-black cursor-pointer">
                  ✕
                </button>
              </div>

              <div className="p-3 bg-[#FAF8F5] border border-[#F0EBE1] space-y-1">
                <p><strong>Customer:</strong> {selectedOrder.customer.name} ({selectedOrder.customer.email})</p>
                <p><strong>Current Status:</strong> {selectedOrder.status}</p>
                <p><strong>Total:</strong> {formatPrice(selectedOrder.total)}</p>
              </div>

              <form onSubmit={handleSaveOrderStatus} className="space-y-4">
                <div>
                  <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                    Update Order Status
                  </label>
                  <select
                    value={newOrderStatus}
                    onChange={(e) => setNewOrderStatus(e.target.value as OrderStatus)}
                    className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-2.5 text-xs text-[#1C1A18] focus:outline-none"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Payment Confirmed">Payment Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Packed">Packed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                    Assigned Courier
                  </label>
                  <input
                    type="text"
                    value={newCarrier}
                    onChange={(e) => setNewCarrier(e.target.value)}
                    placeholder="e.g. DHL Express or BlueDart"
                    className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-2.5 text-xs text-[#1C1A18] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                    Tracking Number
                  </label>
                  <input
                    type="text"
                    value={newTrackingNum}
                    onChange={(e) => setNewTrackingNum(e.target.value)}
                    placeholder="e.g. MDS-TRK-99201"
                    className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-2.5 text-xs font-mono text-[#1C1A18] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedOrder(null)}
                    className="px-4 py-2 border border-[#D5CABE] text-[#1C1A18] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#1C1A18] text-white font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Update & Notify Patron
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
