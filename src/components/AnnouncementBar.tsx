/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useStore } from '../context/StoreContext';
import { CURRENCIES } from '../data/storeConfig';

export const AnnouncementBar: React.FC = () => {
  const { settings, setCurrency } = useStore();

  if (!settings.showAnnouncement) return null;

  return (
    <div className="bg-[#1C1A18] text-[#FAF8F5] text-[11px] uppercase tracking-[0.16em] py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Contact Info */}
        <div className="hidden lg:flex items-center gap-4 text-[#C5A880]">
          <span>Tel: {settings.businessPhone}</span>
          <span aria-hidden="true">·</span>
          <span>Atelier: Kothrud</span>
        </div>

        {/* Center: Brand Message */}
        <div className="flex-1 text-center font-medium truncate">
          <span>{settings.announcementText}</span>
        </div>

        {/* Right: Currency Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <label htmlFor="currency-select" className="sr-only">Currency</label>
          <select
            id="currency-select"
            value={settings.currency}
            onChange={(e) => setCurrency(e.target.value as any)}
            className="bg-transparent text-[#FAF8F5] text-[11px] font-medium tracking-wider cursor-pointer border-none focus:outline-none focus:ring-0 py-0 pr-2 hover:text-[#C5A880] transition-colors"
          >
            {CURRENCIES.map((curr) => (
              <option key={curr.code} value={curr.code} className="bg-[#1C1A18] text-[#FAF8F5]">
                {curr.code} ({curr.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
