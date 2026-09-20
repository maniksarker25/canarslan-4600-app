import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';

type IconBadgeProps = {
  icon: React.ReactNode;
  size?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export default function IconBadge({ icon, size = 80, className = '', style }: IconBadgeProps) {
  return (
    <View
      style={[{ width: size, height: size }, style]}
      className={`items-center justify-center rounded-[12px] ${className}`}>
      {icon}
    </View>
  );
}
