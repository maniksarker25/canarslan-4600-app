import React from 'react';
import { Text, TextStyle } from 'react-native';

interface InputLabelProps {
  text: string;
  style?: TextStyle;
  className?: string;
  numberOfLines?: number;
}

const InputLabel: React.FC<InputLabelProps> = ({ text, style, className, numberOfLines }) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      className={`color-color-input-label mb-[6px] font-nunitoMeidum text-inputLabel leading-[1.1] ${className ?? ''}`}
      style={style}>
      {text ?? 'text here'}
    </Text>
  );
};

export default InputLabel;
