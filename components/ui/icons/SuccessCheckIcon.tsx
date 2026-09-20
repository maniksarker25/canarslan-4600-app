import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';

type SuccessCheckIconProps = {
  size?: number;
  iconSize?: number;
};

const SuccessCheckIcon: React.FC<SuccessCheckIconProps> = ({ size = 80, iconSize = 26 }) => {
  return (
    <View
      className="relative items-center justify-center rounded-xl border border-[#cccccc33] bg-sky-50"
      style={{ height: size, width: size }}>
      <View className="absolute rounded-full bg-sky-50" style={{ inset: size * 0.06 }} />
      <View
        className="absolute items-center justify-center rounded-full bg-color-brand-primary"
        style={{ inset: size * 0.12 }}>
        <Feather name="check" size={iconSize} color="white" />
      </View>
    </View>
  );
};

export default SuccessCheckIcon;
