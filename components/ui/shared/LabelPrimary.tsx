import React from 'react';
import { Text, TextStyle, TextProps } from 'react-native';

interface LabelPrimaryProps extends TextProps {
  text: string | number;
  style?: TextStyle;
  className?: string; // <-- allows extra NativeWind classes
  color?: string;
}

const LabelPrimary: React.FC<LabelPrimaryProps> = ({
  text,
  style,
  className,
  numberOfLines,
  color,
  ...rest
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      className={`font-nunitoBoldItalic text-subtitle ${className ?? ''}`} // merge classes
      style={{ color: color || '#111827', lineHeight: 14 * 1.2, ...style }}
      {...rest} // passes props like ellipsizeMode, adjusts, etc.
    >
      {text}
    </Text>
  );
};

export default LabelPrimary;
