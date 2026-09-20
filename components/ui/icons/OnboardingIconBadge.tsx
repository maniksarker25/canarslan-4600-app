import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';

type IconBadgeProps = {
  icon: React.ReactNode;
  size?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
};

export default function OnboardingIconBadge({
  icon,
  size = 32,
  className = '',
  style,
  backgroundColor = '#B91C1C1F',
}: IconBadgeProps) {
  return (
    <View
      style={[{ width: size, height: size, backgroundColor: backgroundColor }, style]}
      className={`items-center justify-center rounded-[100] ${className}`}>
      {icon}
    </View>
  );
}
