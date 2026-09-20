import React from 'react';
import { Text, TextStyle, TextProps } from 'react-native';

interface HeaderPrimaryProps extends TextProps {
  text: string;
  style?: TextStyle;
  className?: string; // <-- allows extra NativeWind classes
  color?: string;
}

const HeaderPrimary: React.FC<HeaderPrimaryProps> = ({
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
      className={`font-nunitoSemi text-heading ${className ?? ''}`} // merge classes
      style={{ color: color || '#111827', lineHeight: 28 * 1.2, ...style }}
      {...rest} // passes props like ellipsizeMode, adjusts, etc.
    >
      {text}
    </Text>
  );
};

export default HeaderPrimary;
