import React from 'react';
import { View, Text, ViewStyle, StyleProp } from 'react-native';

interface CircleIconBadgeProps {
  icon: React.ReactNode;
  label?: string;
  size?: number;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  labelColor?: string;
}

export default function CircleIconBadge({
  icon,
  label,
  size = 46,
  backgroundColor = '#FDE8E8',
  labelColor = '#374151',
  style,
}: CircleIconBadgeProps) {
  return (
    <View className="items-center justify-center min-w-[70px]">
      <View
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: backgroundColor,
          },
          style,
        ]}
        className="items-center justify-center shadow-xs">
        {icon}
      </View>
      {label ? (
        <Text
          style={{ color: labelColor }}
          className="mt-1.5 text-center font-nunitoSemi text-[11px] leading-3.5">
          {label}
        </Text>
      ) : null}
    </View>
  );
}
