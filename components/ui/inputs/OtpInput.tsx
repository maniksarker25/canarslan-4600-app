import React, { useRef, useState } from 'react';
import { View, TextInput, TextInputProps } from 'react-native';

type OtpInputProps = {
  length?: number;
  numericOnly?: boolean;
  onChange?: (otp: string) => void;
  onComplete?: (otp: string) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  inputProps?: TextInputProps;
};

const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  numericOnly = true,
  onChange,
  onComplete,
  autoFocus = true,
  disabled = false,
  inputProps,
}) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputs = useRef<(TextInput | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const emitChange = (newCode: string[]) => {
    const otp = newCode.join('');
    onChange?.(otp);
    if (otp.length === length && !newCode.includes('')) {
      onComplete?.(otp);
    }
  };

  /** Fills the code starting at `startIndex`. Used for normal typing overflow,
   *  SMS autofill, and manual paste — all of which can deliver more than one
   *  character to a single box at once. */
  const fillFrom = (text: string, startIndex: number) => {
    const digitsOnly = numericOnly ? text.replace(/\D/g, '') : text;
    if (!digitsOnly) return;

    const chars = digitsOnly.split('');
    const newCode = [...code];

    let cursor = startIndex;
    chars.forEach((char) => {
      if (cursor < length) {
        newCode[cursor] = char;
        cursor += 1;
      }
    });

    setCode(newCode);
    emitChange(newCode);

    const nextEmptyIndex = newCode.findIndex((val) => val === '');
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : length - 1;
    inputs.current[focusIndex]?.focus();
  };

  const handleChange = (text: string, index: number) => {
    // Autofill, paste, or an Android keyboard sending "old+new" chars at once
    if (text.length > 1) {
      fillFrom(text, index);
      return;
    }

    if (numericOnly && text !== '' && !/^\d$/.test(text)) return;

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    emitChange(newCode);

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (code[index] === '' && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
      emitChange(newCode);
      inputs.current[index - 1]?.focus();
    } else if (code[index] !== '') {
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
      emitChange(newCode);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      handleBackspace(index);
    }
  };

  return (
    <View className="flex flex-row justify-center gap-[6px]">
      {code.map((value, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputs.current[index] = ref;
          }}
          value={value}
          editable={!disabled}
          autoFocus={autoFocus && index === 0}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(null)}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType={numericOnly ? 'number-pad' : 'default'}
          returnKeyType="done"
          // NOT 1 — capped at `length` so a full autofilled/pasted code
          // reaches onChangeText intact; we split it ourselves in fillFrom.
          maxLength={length}
          textContentType="oneTimeCode"
          autoComplete={numericOnly ? 'sms-otp' : 'off'}
          selectTextOnFocus
          className={`
            h-[50px] min-w-[48px] max-w-[72px] flex-1 rounded-[10px] border
            border-[#E5E7EB] bg-[#F9FAFB] text-center text-xl font-semibold
            ${focusedIndex === index ? 'border-[#64748B55]' : 'border-[#9CA3AF3D]'}
          `}
          style={{
            color: '#111827',
          }}
          {...inputProps}
        />
      ))}
    </View>
  );
};

export default OtpInput;
