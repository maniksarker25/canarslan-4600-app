import React, { useState } from 'react';
import {
  KeyboardType,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import InputLabel from '@/components/ui/shared/InputLabel';
import { MailBoxIcon } from '../../icons/index';
interface InputFieldProps {
  keyboard: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  placeHolder?: string;
  label?: string;
  error?: boolean;
  handler?: (name: string, value: string) => void;
  value?: string;
  name?: string;
  required?: boolean;
  showLabel?: boolean;
  placeholderColor?: string;
  labelColor?: string;
  isPrice?: boolean;
  onBlur?: (value: string) => void;
  // New props for left icon
  leftIcon?: React.ReactNode;
  showLeftIcon?: boolean;
  onLeftIconPress?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  keyboard,
  style,
  inputStyle,
  placeHolder = 'Please enter',
  label = 'Enter your',
  error = false,
  handler,
  value = '',
  name,
  required = true,
  showLabel = true,
  labelColor = '#374151',
  isPrice = false,
  placeholderColor = '#9CA3AF',
  onBlur,
  leftIcon,
  showLeftIcon = false,
  onLeftIconPress,
}) => {
  const [focused, setFocused] = useState(false);

  // ✅ Only display formatted value
  const displayValue = isPrice && value ? `$ ${value}` : value;

  // ✅ Strip "$" and spaces when typing
  const handleChange = (text: string) => {
    if (isPrice) {
      const numeric = text.replace(/[^0-9.]/g, ''); // allow decimals
      handler?.(name as string, numeric);
    } else {
      handler?.(name as string, text);
    }
  };

  // Determine if we need padding for left icon
  const hasLeftIcon = showLeftIcon && leftIcon;

  return (
    <View style={{ backgroundColor: 'transparent', ...style }}>
      {showLabel && (
        <InputLabel
          text={label}
          style={{
            color: labelColor,
            marginBottom: 6,
          }}
        />
      )}

      <View style={{ position: 'relative' }}>
        <TextInput
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.(value);
          }}
          value={displayValue}
          style={{
            color: '#111827',
            lineHeight: 16 * 1.1,
            padding: 16,
            paddingVertical: 12.5,
            paddingLeft: hasLeftIcon ? 50 : 16, // 👈 Dynamic padding based on icon presence
            borderRadius: 10,
            borderWidth: 1.2,
            backgroundColor: '#F9FAFB',
            fontFamily: 'Nunito-Regular',
            borderColor: error ? '#EF4444' : focused ? '#64748B55' : '#9CA3AF3D',
            ...inputStyle,
          }}
          placeholder={placeHolder}
          placeholderTextColor={placeholderColor}
          keyboardType={keyboard as KeyboardType}
          onChangeText={handleChange}
        />

        {/* Left Icon - Conditional */}
        {hasLeftIcon && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: [{ translateY: -12 }],
              padding: 4,
            }}
            activeOpacity={onLeftIconPress ? 0.7 : 1}
            onPress={onLeftIconPress}
            disabled={!onLeftIconPress}>
            {React.isValidElement(leftIcon) ? React.cloneElement(leftIcon) : leftIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputField;
