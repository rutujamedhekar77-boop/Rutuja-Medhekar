/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Check,
  ShieldCheck,
  Truck,
  CreditCard,
  Building,
  Smartphone,
  Banknote,
  ArrowRight,
  ArrowLeft,
  Lock,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { DeliveryOption, ShippingAddress } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    discountCode,
    settings,
    formatPrice,
    placeOrder,
    currentUser,
    navigateTo,
    showToast
  } = useStore();

  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Customer Info
  const [customerInfo, setCustomerInfo] = useState({
    name: currentUser?.name || 'Julian Vane',
    email: currentUser?.email || 'julian.vane@example.com',
    phone: currentUser?.phone || '+1 (555) 019-8234'
  });

  // Step 2: Shipping Address
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    address: currentUser?.addresses[0]?.address || '450 Sutter St',
    apartment: currentUser?.addresses[0]?.apartment || 'Suite 1400',
    city: currentUser?.addresses[0]?.city || 'San Francisco',
    state: currentUser?.addresses[0]?.state || 'CA',
    postalCode: currentUser?.addresses[0]?.postalCode || '94108',
    country: currentUser?.addresses[0]?.country || 'United States'
  });

  // Step 3: Delivery Method
  const deliveryOptions: DeliveryOption[] = [
    {
      id: 'standard',
      name: 'Complimentary Express Courier',
      price: cartSubtotal >= settings.freeShippingThreshold ? 0 : settings.standardShippingFee,
      estimatedWindow: '2-4 Business Days'
    },
    {
      id: 'express',
      name: 'Priority Atelier Overnight',
      price: settings.expressShippingFee,
      estimatedWindow: '1-2 Business Days'
    }
  ];
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption>(deliveryOptions[0]);

  // Step 4: Payment Method
  const [paymentType, setPaymentType] = useState<'card' | 'upi' | 'netbanking' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('884');
  const [cardHolder, setCardHolder] = useState('JULIAN VANE');
  const [upiId, setUpiId] = useState('julian@okaxis');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Step 5: Submitting
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#1C1A18]">
          No footwear items found in bag
        </h2>
        <p className="text-xs text-[#6B645C]">
          Please select a pair of handcrafted shoes before entering checkout.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-3 bg-[#1C1A18] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#33312E] cursor-pointer"
        >
          Return to Catalogue
        </button>
      </div>
    );
  }

  const shippingCost = selectedDelivery.price;
  const taxableAmount = Math.max(0, cartSubtotal - discountAmount);
  const tax = Number((taxableAmount * settings.taxRate).toFixed(2));
  const totalPayable = Number((taxableAmount + shippingCost + tax).toFixed(2));

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
        showToast('Please fill all contact fields', 'error');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
        showToast('Please complete required address fields', 'error');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    } else if (currentStep === 4) {
      setCurrentStep(5);
    }
  };

  const handleFinalSubmitOrder = () => {
    setIsSubmitting(true);

    let paymentMethodLabel = 'Credit Card (Visa ending in 4242)';
    let paymentStatus: 'Paid' | 'Pending' | 'Cash on Delivery' = 'Paid';

    if (paymentType === 'upi') {
      paymentMethodLabel = `UPI (${upiId})`;
      paymentStatus = 'Paid';
    } else if (paymentType === 'netbanking') {
      paymentMethodLabel = `Net Banking (${selectedBank})`;
      paymentStatus = 'Paid';
    } else if (paymentType === 'cod') {
      paymentMethodLabel = 'Cash on Delivery (COD)';
      paymentStatus = 'Cash on Delivery';
    }

    setTimeout(() => {
      const placed = placeOrder({
        customer: customerInfo,
        shippingAddress,
        deliveryMethod: selectedDelivery,
        paymentMethod: paymentMethodLabel,
        paymentStatus,
        notes: 'Handcrafted signature shoe box with luxury wooden shoe horn.'
      });

      setIsSubmitting(false);
      showToast(`Order ${placed.id} successfully placed!`, 'success');
      navigateTo('confirmation');
    }, 1200);
  };

  const stepLabels = ['Contact', 'Shipping', 'Delivery', 'Payment', 'Review'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Checkout Header & Security Notice */}
      <div className="mb-10 pb-6 border-b border-[#E8E2D8] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#9E7F53] font-semibold block mb-1">
            Secure Atelier Checkout
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#1C1A18]">
            Finalize Your Signature Order
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#2E5A36] bg-[#EAF5EC] px-3.5 py-1.5 border border-[#CDE5D2]">
          <Lock className="w-3.5 h-3.5" />
          <span className="font-medium">256-Bit SSL Encrypted & Authenticated</span>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <div className="mb-10 max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          {stepLabels.map((label, idx) => {
            const stepNum = idx + 1;
            const isCompleted = currentStep > stepNum;
            const isCurrent = currentStep === stepNum;
            return (
              <div key={label} className="flex-1 flex flex-col items-center relative">
                <button
                  onClick={() => {
                    if (isCompleted) setCurrentStep(stepNum);
                  }}
                  disabled={!isCompleted && !isCurrent}
                  className={`w-8 h-8 rounded-full font-mono text-xs font-bold flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-[#1C1A18] text-white cursor-pointer'
                      : isCurrent
                      ? 'bg-[#9E7F53] text-white shadow-md'
                      : 'bg-[#E8E2D8] text-[#8C827A] cursor-not-allowed'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
                </button>
                <span
                  className={`text-[11px] mt-1.5 font-medium uppercase tracking-wider ${
                    isCurrent ? 'text-[#1C1A18] font-bold' : 'text-[#8C827A]'
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Multi-Step Forms */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-[#E8E2D8] shadow-sm">
          
          {/* STEP 1: CONTACT INFORMATION */}
          {currentStep === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div className="pb-3 border-b border-[#F0EBE1]">
                <h2 className="font-serif text-xl font-bold text-[#1C1A18]">
                  Step 1: Contact Information
                </h2>
                <p className="text-xs text-[#6B645C] mt-0.5">
                  We'll dispatch order confirmation, tracking updates, and delivery notes here.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-3 text-xs text-[#1C1A18] focus:outline-none focus:border-[#1C1A18]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-3 text-xs text-[#1C1A18] focus:outline-none focus:border-[#1C1A18]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-3 text-xs text-[#1C1A18] focus:outline-none focus:border-[#1C1A18]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#1C1A18] hover:bg-[#33312E] text-white text-xs font-semibold uppercase tracking-[0.16em] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Shipping</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: SHIPPING ADDRESS */}
          {currentStep === 2 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div className="pb-3 border-b border-[#F0EBE1] flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#1C1A18]">
                    Step 2: Shipping Destination
                  </h2>
                  <p className="text-xs text-[#6B645C] mt-0.5">
                    Enter the residential or suite address for physical delivery.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-[#8C827A] hover:text-[#1C1A18] underline cursor-pointer"
                >
                  Edit Contact
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                    placeholder="e.g. 742 Evergreen Terrace or Shop No. 2, Karishma Society"
                    className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-3 text-xs text-[#1C1A18] focus:outline-none focus:border-[#1C1A18]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                    Apartment / Suite / Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.apartment || ''}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, apartment: e.target.value })}
                    placeholder="e.g. Building C, Floor 4, Near Landmark"
                    className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-3 text-xs text-[#1C1A18] focus:outline-none focus:border-[#1C1A18]"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-3 text-xs text-[#1C1A18] focus:outline-none focus:border-[#1C1A18]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                      State / Province *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-3 text-xs text-[#1C1A18] focus:outline-none focus:border-[#1C1A18]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                      Postal / ZIP Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-3 text-xs text-[#1C1A18] focus:outline-none focus:border-[#1C1A18]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                    Country *
                  </label>
                  <select
                    value={shippingAddress.country}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D5CABE] p-3 text-xs text-[#1C1A18] focus:outline-none focus:border-[#1C1A18]"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Italy">Italy</option>
                    <option value="India">India</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-[#6B645C] hover:text-[#1C1A18] flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#1C1A18] hover:bg-[#33312E] text-white text-xs font-semibold uppercase tracking-[0.16em] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Select Delivery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: DELIVERY METHOD */}
          {currentStep === 3 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div className="pb-3 border-b border-[#F0EBE1]">
                <h2 className="font-serif text-xl font-bold text-[#1C1A18]">
                  Step 3: Courier & Transit Service
                </h2>
                <p className="text-xs text-[#6B645C] mt-0.5">
                  Select your preferred transport speed. All parcels are fully insured in bespoke packaging.
                </p>
              </div>

              <div className="space-y-3">
                {deliveryOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedDelivery(opt)}
                    className={`p-4 border transition-all cursor-pointer flex items-center justify-between ${
                      selectedDelivery.id === opt.id
                        ? 'border-[#1C1A18] bg-[#FAF8F5] ring-1 ring-[#1C1A18]'
                        : 'border-[#E8E2D8] bg-white hover:border-[#D5CABE]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          selectedDelivery.id === opt.id ? 'border-[#1C1A18]' : 'border-[#D5CABE]'
                        }`}
                      >
                        {selectedDelivery.id === opt.id && <div className="w-2 h-2 rounded-full bg-[#1C1A18]" />}
                      </div>
                      <div>
                        <span className="font-semibold text-xs text-[#1C1A18] block">{opt.name}</span>
                        <span className="text-[11px] text-[#8C827A] flex items-center gap-1 mt-0.5">
                          <Truck className="w-3 h-3 text-[#9E7F53]" />
                          <span>Estimated Window: {opt.estimatedWindow}</span>
                        </span>
                      </div>
                    </div>

                    <div className="text-right font-mono tabular-nums text-xs font-bold text-[#1C1A18]">
                      {opt.price === 0 ? 'Complimentary' : formatPrice(opt.price)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs text-[#6B645C] hover:text-[#1C1A18] flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#1C1A18] hover:bg-[#33312E] text-white text-xs font-semibold uppercase tracking-[0.16em] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: PAYMENT OPTIONS */}
          {currentStep === 4 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div className="pb-3 border-b border-[#F0EBE1]">
                <h2 className="font-serif text-xl font-bold text-[#1C1A18]">
                  Step 4: Payment Gateway
                </h2>
                <p className="text-xs text-[#6B645C] mt-0.5">
                  Select payment method. Simulated test transactions with zero external card storage.
                </p>
              </div>

              {/* Payment Method Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentType('card')}
                  className={`p-3 border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentType === 'card'
                      ? 'border-[#1C1A18] bg-[#FAF8F5] font-bold text-[#1C1A18]'
                      : 'border-[#E8E2D8] text-[#6B645C] hover:bg-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#9E7F53]" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('upi')}
                  className={`p-3 border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentType === 'upi'
                      ? 'border-[#1C1A18] bg-[#FAF8F5] font-bold text-[#1C1A18]'
                      : 'border-[#E8E2D8] text-[#6B645C] hover:bg-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-[#9E7F53]" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('netbanking')}
                  className={`p-3 border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentType === 'netbanking'
                      ? 'border-[#1C1A18] bg-[#FAF8F5] font-bold text-[#1C1A18]'
                      : 'border-[#E8E2D8] text-[#6B645C] hover:bg-white'
                  }`}
                >
                  <Building className="w-4 h-4 text-[#9E7F53]" />
                  <span>Net Banking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('cod')}
                  className={`p-3 border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentType === 'cod'
                      ? 'border-[#1C1A18] bg-[#FAF8F5] font-bold text-[#1C1A18]'
                      : 'border-[#E8E2D8] text-[#6B645C] hover:bg-white'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-[#9E7F53]" />
                  <span>Cash on Deliv.</span>
                </button>
              </div>

              {/* Card Payment Form */}
              {paymentType === 'card' && (
                <div className="p-4 bg-[#FAF8F5] border border-[#E3DCCF] space-y-4 text-xs">
                  <div>
                    <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-white border border-[#D5CABE] p-2.5 font-mono text-xs text-[#1C1A18] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full bg-white border border-[#D5CABE] p-2.5 font-mono text-xs text-[#1C1A18] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                        CVC / CVV
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-white border border-[#D5CABE] p-2.5 font-mono text-xs text-[#1C1A18] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-[#1C1A18] block mb-1 uppercase tracking-wider">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full bg-white border border-[#D5CABE] p-2.5 text-xs text-[#1C1A18] focus:outline-none uppercase"
                    />
                  </div>
                </div>
              )}

              {/* UPI Form */}
              {paymentType === 'upi' && (
                <div className="p-4 bg-[#FAF8F5] border border-[#E3DCCF] space-y-3 text-xs">
                  <label className="font-semibold text-[#1C1A18] block uppercase tracking-wider">
                    Virtual Payment Address (VPA / UPI ID)
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@okhdfcbank"
                    className="w-full bg-white border border-[#D5CABE] p-2.5 font-mono text-xs text-[#1C1A18] focus:outline-none"
                  />
                  <p className="text-[11px] text-[#8C827A]">
                    A verification collect request will be signaled upon final confirmation.
                  </p>
                </div>
              )}

              {/* Net Banking Form */}
              {paymentType === 'netbanking' && (
                <div className="p-4 bg-[#FAF8F5] border border-[#E3DCCF] space-y-3 text-xs">
                  <label className="font-semibold text-[#1C1A18] block uppercase tracking-wider">
                    Select Your Financial Institution
                  </label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full bg-white border border-[#D5CABE] p-2.5 text-xs text-[#1C1A18] focus:outline-none"
                  >
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="State Bank of India">State Bank of India</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                    <option value="Barclays International">Barclays International</option>
                    <option value="HSBC Premier">HSBC Premier</option>
                  </select>
                </div>
              )}

              {/* COD Form */}
              {paymentType === 'cod' && (
                <div className="p-4 bg-[#FAF8F5] border border-[#E3DCCF] space-y-2 text-xs text-[#5C564E]">
                  <p className="font-semibold text-[#1C1A18]">
                    Cash on Delivery Terms:
                  </p>
                  <p>
                    Please ensure exact cash is available at the time of delivery. A phone verification OTP will be sent to <strong>{customerInfo.phone}</strong> prior to atelier dispatch.
                  </p>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="text-xs text-[#6B645C] hover:text-[#1C1A18] flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#1C1A18] hover:bg-[#33312E] text-white text-xs font-semibold uppercase tracking-[0.16em] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Review Final Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: FINAL ORDER REVIEW */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-[#F0EBE1]">
                <h2 className="font-serif text-xl font-bold text-[#1C1A18]">
                  Step 5: Order Review & Authorization
                </h2>
                <p className="text-xs text-[#6B645C] mt-0.5">
                  Inspect your delivery coordinates and order items before final placement.
                </p>
              </div>

              {/* Coordinates Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-[#FAF8F5] border border-[#E8E2D8] space-y-1">
                  <div className="flex items-center justify-between font-semibold text-[#1C1A18] mb-1">
                    <span className="uppercase tracking-wider">Recipient</span>
                    <button onClick={() => setCurrentStep(1)} className="text-[#9E7F53] hover:underline cursor-pointer">
                      Edit
                    </button>
                  </div>
                  <p className="font-medium text-[#1C1A18]">{customerInfo.name}</p>
                  <p className="text-[#6B645C]">{customerInfo.email}</p>
                  <p className="text-[#6B645C]">{customerInfo.phone}</p>
                </div>

                <div className="p-4 bg-[#FAF8F5] border border-[#E8E2D8] space-y-1">
                  <div className="flex items-center justify-between font-semibold text-[#1C1A18] mb-1">
                    <span className="uppercase tracking-wider">Destination</span>
                    <button onClick={() => setCurrentStep(2)} className="text-[#9E7F53] hover:underline cursor-pointer">
                      Edit
                    </button>
                  </div>
                  <p className="text-[#1C1A18]">{shippingAddress.address}</p>
                  {shippingAddress.apartment && <p className="text-[#6B645C]">{shippingAddress.apartment}</p>}
                  <p className="text-[#6B645C]">
                    {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
                  </p>
                  <p className="text-[#6B645C]">{shippingAddress.country}</p>
                </div>
              </div>

              {/* Line Items Snapshot */}
              <div className="space-y-3">
                <span className="font-semibold text-xs uppercase tracking-wider text-[#1C1A18]">
                  Selected Footwear ({cart.length})
                </span>
                <div className="divide-y divide-[#F0EBE1] border border-[#E8E2D8] bg-white">
                  {cart.map((item) => (
                    <div key={item.id} className="p-3 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 object-cover bg-[#F4EFE9]"
                        />
                        <div>
                          <p className="font-serif font-bold text-[#1C1A18]">{item.name}</p>
                          <p className="text-[#8C827A] text-[11px]">
                            EU {item.selectedSize} · {item.selectedColor.name} · Qty: {item.quantity}
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

              {/* Actions */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="text-xs text-[#6B645C] hover:text-[#1C1A18] flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Payment</span>
                </button>

                <button
                  onClick={handleFinalSubmitOrder}
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-[#1C1A18] hover:bg-[#33312E] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Transacting with Atelier...</span>
                  ) : (
                    <>
                      <span>Authorize & Place Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Right Column: Sticky Summary */}
        <div className="lg:col-span-5 bg-white p-6 border border-[#E8E2D8] space-y-6">
          <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-[#1C1A18] pb-3 border-b border-[#E8E2D8]">
            Order Total
          </h3>

          <div className="space-y-3 text-xs text-[#5C564E]">
            <div className="flex justify-between">
              <span>Bag Subtotal</span>
              <span className="font-mono tabular-nums text-[#1C1A18] font-bold">
                {formatPrice(cartSubtotal)}
              </span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-[#2E5A36]">
                <span>Privilege Code ({discountCode})</span>
                <span className="font-mono tabular-nums font-bold">
                  -{formatPrice(discountAmount)}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping ({selectedDelivery.name})</span>
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
              <span className="font-serif">Payable Amount</span>
              <span className="font-mono tabular-nums text-2xl text-[#1C1A18]">
                {formatPrice(totalPayable)}
              </span>
            </div>
          </div>

          <div className="p-4 bg-[#FAF8F5] border border-[#E8E2D8] text-xs text-[#6B645C] space-y-2">
            <div className="flex items-center gap-2 text-[#1C1A18] font-semibold uppercase tracking-wider text-[11px]">
              <ShieldCheck className="w-4 h-4 text-[#9E7F53]" />
              <span>Maison Guarantee</span>
            </div>
            <p>
              Your payment credentials are processed via banking-grade tokenization. Zero raw card details are stored on our servers.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
