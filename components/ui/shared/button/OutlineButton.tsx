import React from 'react';
import { TouchableOpacity, Text, View, ViewStyle, StyleProp } from 'react-native';

type OutlineButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;

  bgColor?: string;
  borderColor?: string;
  textColor?: string;
};

export default function OutlineButton({
  title,
  onPress,
  disabled = false,
  className = '',
  textClassName = '',
  leftIcon,
  rightIcon,
  style,
  borderColor = '#B91C1C',
  textColor = '#B91C1C',
  bgColor = '#FCCFCF',
}: OutlineButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`h-[50px] flex-row items-center justify-center  ${disabled ? 'opacity-50' : ''
        } ${className}`}
      style={[
        {
          borderWidth: 1,
          borderColor: borderColor,
          borderRadius: 10,
          backgroundColor: bgColor,
        },
        style,
      ]}>
      {leftIcon && (
        <View className="" style={{ marginRight: 10 }}>
          {leftIcon}
        </View>
      )}

      <Text style={{ color: textColor }} className={`font-nunitoSemi text-[14px] ${textClassName}`}>
        {title}
      </Text>

      {rightIcon && (
        <View className="" style={{ marginLeft: 10 }}>
          {rightIcon}
        </View>
      )}
    </TouchableOpacity>
  );
}
