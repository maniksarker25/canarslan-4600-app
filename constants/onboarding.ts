
// constants/onboarding.ts
import React from 'react';
import * as Icons from '@/components/icons';

// Helper function to create icon with consistent props
const createIcon = (IconComponent: React.ComponentType<any>, size: number = 22, color: string = "#B91C1C") => {
  return React.createElement(IconComponent, { size, color });
};

export const GRADIENT_CONFIG = {
  colors: [
    'rgba(232, 221, 208, 0)',
    'rgba(232, 221, 208, 0.32)',
    'rgba(232, 221, 208, 0.64)',
    'rgba(232, 221, 208, 0.76)',
    '#E8DDD0',
    '#E8DDD0',
  ] as const,
  locations: [0, 0.1331, 0.2455, 0.3743, 0.4867, 1] as const,
  start: { x: 0.5, y: 0 } as const,
  end: { x: 0.5, y: 1 } as const,
};

export const ONBOARDING_DATA = [
  {
    id: '1',
    top: 'WELCOME',
    title_1: 'Premium Meat',
    title_2: 'Ordering',
    description: 'The wholesale platform trusted by restaurants, hotels, and food businesses. Order fresh, quality meat - directly from source.',
    backgroundImage: require('@/assets/images/pre_onboarding_screen_1.png'),
    buttonText: 'Get Started',
    badges: [
      {
        id: 'b1',
        icon: createIcon(Icons.PremiumQualityIcon),
        label: 'Premium\nQuality',
      },
      {
        id: 'b2',
        icon: createIcon(Icons.ReliableSupplyIcon),
        label: 'Reliable\nSupply',
      },
      {
        id: 'b3',
        icon: createIcon(Icons.BestWholeSalePricesIcon),
        label: 'Best Wholesale\nPrices',
      },
    ],
  },
  {
    id: '2',
    top: 'CATALOG',
    title_1: '200+ Premium',
    title_2: 'Quality Products',
    description: 'Fresh beef, chicken, lamb, and artisan processed meats - find everything your business needs in one place, at wholesale prices.',
    backgroundImage: require('@/assets/images/pre_onboarding_screen_2.png'),
    buttonText: 'Next',
    badges: [
      {
        id: 'b1',
        icon: createIcon(Icons.BeefIcon),
        label: 'Beef',
      },
      {
        id: 'b2',
        icon: createIcon(Icons.ChickIcon),
        label: 'Chicken',
      },
      {
        id: 'b3',
        icon: createIcon(Icons.LambIcon),
        label: 'Lamb',
      },
      {
        id: 'b4',
        icon: createIcon(Icons.ProcessedMeatIcon),
        label: 'Processed\nMeat',
      },
    ],
  },
  {
    id: '3',
    top: 'SMART TRACKING',
    title_1: 'Order & Track',
    title_2: 'with Confidence',
    description: 'Real-time delivery tracking, custom wholesale pricing, and instant reorders - everything your business needs, in one seamless app.',
    backgroundImage: require('@/assets/images/pre_onboarding_screen_3.png'),
    buttonText: 'Continue',
    badges: [
      {
        id: 'b1',
        icon: createIcon(Icons.LocationIcon),
        label: 'Real-time\nTracking',
      },
      {
        id: 'b2',
        icon: createIcon(Icons.WholesalePricingIcon),
        label: 'Custom\nWholesale Pricing',
      },
      {
        id: 'b3',
        icon: createIcon(Icons.InstanReordersIcon),
        label: 'Instant\nReorders',
      },
    ],
  },
];

export const SCREEN_MAP = {
  '/(onboarding)/screen1': 0,
  '/(onboarding)/screen2': 1,
  '/(onboarding)/screen3': 2,
};