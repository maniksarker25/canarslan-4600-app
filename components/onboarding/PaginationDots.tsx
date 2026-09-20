// components/onboarding/PaginationDots.tsx
import React from 'react';
import { View } from 'react-native';

interface PaginationDotsProps {
  totalScreens: number;
  currentIndex: number;
  activeColor?: string;
  inactiveColor?: string;
}

export default function PaginationDots({
  totalScreens,
  currentIndex,
  activeColor = '#C4202B',
  inactiveColor = '#B91C1CA3',
}: PaginationDotsProps) {
  return (
    <View className="flex-row justify-start gap-2">
      {Array.from({ length: totalScreens }).map((_, index) => (
        <View
          key={index}
          className={`h-3 ${currentIndex === index ? 'w-6 rounded-full' : 'w-3 rounded-full'}`}
          style={{
            backgroundColor: currentIndex === index ? activeColor : inactiveColor,
          }}
        />
      ))}
    </View>
  );
}
