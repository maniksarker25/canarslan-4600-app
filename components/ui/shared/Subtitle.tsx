import React from 'react';
import { Text, TextStyle, StyleProp, TextProps } from 'react-native';

type Props = TextProps & {
  text?: string;
  style?: StyleProp<TextStyle>;
  className?: string; // allows NativeWind classes
};

const Subtitle = ({ text, style, className, ...rest }: Props) => {
  return (
    <Text
      className={` font-nunito text-subtitle leading-[1.2]  text-color-text-secondary ${className ?? ''}`}
      style={style}
      {...rest} // <-- allows numberOfLines, ellipsizeMode, etc.
    >
      {text ?? 'text here'}
    </Text>
  );
};

export default Subtitle;
