/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Ruler, CheckCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();

  if (!isSizeGuideOpen) return null;

  const sizeChart = [
    { eu: 36, usW: 5.5, usM: 4.5, uk: 3.5, cm: 23.0 },
    { eu: 37, usW: 6.5, usM: 5.0, uk: 4.0, cm: 23.5 },
    { eu: 38, usW: 7.5, usM: 6.0, uk: 5.0, cm: 24.2 },
    { eu: 39, usW: 8.5, usM: 7.0, uk: 6.0, cm: 25.0 },
    { eu: 40, usW: 9.0, usM: 7.5, uk: 6.5, cm: 25.5 },
    { eu: 41, usW: 10.0, usM: 8.5, uk: 7.5, cm: 26.2 },
    { eu: 42, usW: 10.5, usM: 9.0, uk: 8.0, cm: 26.8 },
    { eu: 43, usW: 11.5, usM: 10.0, uk: 9.0, cm: 27.5 },
    { eu: 44, usW: 12.0, usM: 10.5, uk: 9.5, cm: 28.2 },
    { eu: 45, usW: 13.0, usM: 11.5, uk: 10.5, cm: 29.0 },
    { eu: 46, usW: 14.0, usM: 12.5, uk: 11.5, cm: 29.8 }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsSizeGuideOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative min-h-screen px-4 pt-10 pb-16 flex items-center justify-center">
        <div className="relative w-full max-w-2xl bg-[#FAF8F5] shadow-2xl border border-[#D5CABE] overflow-hidden">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E8E2D8] flex items-center justify-between bg-[#F4EFE9]">
            <div className="flex items-center gap-2.5">
              <Ruler className="w-5 h-5 text-[#9E7F53]" />
              <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-[#1C1A18]">
                Maison Du Sole Size Guide
              </h3>
            </div>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="p-1.5 text-[#4A4744] hover:text-[#1C1A18] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {/* Introductory fit notice */}
            <div className="p-4 bg-[#EFE9DF] border border-[#E3DCCF] text-xs text-[#4A4744] leading-relaxed">
              <strong className="text-[#1C1A18] block mb-1">Our Last & Silhouette Philosophy:</strong>
              Maison Du Sole models are lasted on anatomical European lasts with a sculpted heel cup and generous ball width. Most styles fit strictly true to size. If you normally wear a half size, we recommend sizing up to the next full European size.
            </div>

            {/* Conversion Table */}
            <div>
              <h4 className="font-serif text-sm font-semibold text-[#1C1A18] uppercase tracking-wider mb-3">
                Footwear Conversion Chart
              </h4>
              <div className="overflow-x-auto border border-[#E8E2D8] bg-white">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F4EFE9] border-b border-[#E8E2D8] text-[11px] font-semibold text-[#1C1A18] uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3">EU Size</th>
                      <th className="py-2.5 px-3">US Men</th>
                      <th className="py-2.5 px-3">US Women</th>
                      <th className="py-2.5 px-3">UK</th>
                      <th className="py-2.5 px-3">Length (CM)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0EBE1] font-mono tabular-nums">
                    {sizeChart.map((row) => (
                      <tr key={row.eu} className="hover:bg-[#FAF8F5] transition-colors">
                        <td className="py-2 px-3 font-semibold text-[#1C1A18]">{row.eu}</td>
                        <td className="py-2 px-3 text-[#4A4744]">{row.usM}</td>
                        <td className="py-2 px-3 text-[#4A4744]">{row.usW}</td>
                        <td className="py-2 px-3 text-[#4A4744]">{row.uk}</td>
                        <td className="py-2 px-3 text-[#9E7F53] font-medium">{row.cm} cm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Measurement Instructions */}
            <div className="space-y-3 pt-2">
              <h4 className="font-serif text-sm font-semibold text-[#1C1A18] uppercase tracking-wider">
                How to Measure Your Foot at Home
              </h4>
              <div className="space-y-2 text-xs text-[#5C564E] leading-relaxed">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#9E7F53] shrink-0 mt-0.5" />
                  <span>Place a sheet of clean paper on a flat floor against a solid wall.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#9E7F53] shrink-0 mt-0.5" />
                  <span>Stand with your heel resting gently against the wall wearing your typical socks.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#9E7F53] shrink-0 mt-0.5" />
                  <span>Mark the longest tip of your toes on the paper and measure the distance in centimeters.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#9E7F53] shrink-0 mt-0.5" />
                  <span>Compare against the table above. If in doubt, our concierge team is always on standby for personal sizing advice.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Footer note */}
          <div className="p-4 bg-[#F4EFE9] border-t border-[#E8E2D8] flex items-center justify-between text-xs text-[#8C827A]">
            <span>Still uncertain? Enjoy free exchanges on every order.</span>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="px-4 py-2 bg-[#1C1A18] text-white text-xs uppercase tracking-wider hover:bg-[#33312E] transition-colors cursor-pointer"
            >
              Understood
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
