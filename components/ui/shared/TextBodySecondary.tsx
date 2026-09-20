import React from 'react';
import { Text, TextStyle, StyleProp, TextProps } from 'react-native';

type Props = TextProps & {
  text?: string;
  style?: StyleProp<TextStyle>;
  className?: string; // allows NativeWind classes
};

const TextBodySecondary = ({ text, style, className, ...rest }: Props) => {
  return (
    <Text
      className={`font-nunitoSemi text-[15px] text-[#9CA3AF] ${className ?? ''}`}
      style={style}
      {...rest} // <-- allows numberOfLines, ellipsizeMode, etc.
    >
      {text ?? 'text here'}
    </Text>
  );
};

export default TextBodySecondary;
