import React from 'react';
import { Text, TextStyle, StyleProp, TextProps } from 'react-native';

type Props = TextProps & {
  text?: string | number;
  style?: StyleProp<TextStyle>;
  className?: string; // for NativeWind classes
  numberOfLines?: number;
};

const TextBodySmall = ({ text, style, numberOfLines, className, ...rest }: Props) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      className={`text-start font-nunitoItalic text-[12px] text-color-text-secondary ${className ?? ''}`}
      style={style}
      {...rest} // <-- now accepts numberOfLines, ellipsizeMode, etc.
    >
      {text ?? 'text here'}
    </Text>
  );
};

export default TextBodySmall;
