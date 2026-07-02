import React from 'react';

interface AdBannerProps {
  placement: 'top-banner' | 'sidebar' | 'in-article' | 'after-article' | 'footer' | 'feed';
  className?: string;
}

// Google AdSense Ready Ad Component
// Replace placeholder values with actual AdSense client ID and slot IDs:
// client: 'ca-pub-XXXXXXXXXXXXXXXXX'
// slots: { 'top-banner': 'XXXXXXXXXX', 'sidebar': 'XXXXXXXXXX', ... }

const AD_SIZES: Record<string, { w: string; h: string; label: string }> = {
  'top-banner': { w: 'w-full', h: 'h-24', label: 'Advertisement — 728×90' },
  'sidebar': { w: 'w-full', h: 'h-64', label: 'Advertisement — 300×250' },
  'in-article': { w: 'w-full', h: 'h-28', label: 'Advertisement — 728×90' },
  'after-article': { w: 'w-full', h: 'h-28', label: 'Advertisement — 728×90' },
  'footer': { w: 'w-full', h: 'h-20', label: 'Advertisement — 970×90' },
  'feed': { w: 'w-full', h: 'h-48', label: 'Advertisement — 300×250' },
};

export const AdBanner: React.FC<AdBannerProps> = ({ placement, className = '' }) => {
  const size = AD_SIZES[placement];

  // Uncomment to use real AdSense:
  // return (
  //   <ins
  //     className="adsbygoogle"
  //     style={{ display: 'block' }}
  //     data-ad-client={AD_CONFIG.client}
  //     data-ad-slot={AD_CONFIG.slots[placement]}
  //     data-ad-format="auto"
  //     data-full-width-responsive="true"
  //   />
  // );

  return (
    <div className={`${size.w} ${size.h} ${className} flex items-center justify-center bg-gray-100 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg`}>
      <div className="text-center">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{size.label}</p>
        <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">Google AdSense Ready</p>
      </div>
    </div>
  );
};
