import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; // or import from react-native-vector-icons/Feather

type Props = {
  label: string | React.ReactNode;
  labelColor?: string;
  value: boolean;
  name: string;
  error?: boolean;
  flexLabel?: boolean;
  handler: (name: string, value: boolean) => void;
};

const InputCheckbox = ({
  label,
  labelColor = '#374151',
  value,
  name,
  error = false,
  flexLabel = false,
  handler,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => handler(name, !value)}
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
      }}>
      <View
        style={{
          width: 14,
          height: 14,
          borderWidth: 1,
          borderColor: '#E9C5C6',
          backgroundColor: value ? '#B91C1C' : '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          marginTop: 3, // aligns checkbox with text line
        }}>
        {value && <Feather name="check" size={10} style={{ marginTop: 1 }} color="#FFFFFF" />}
      </View>

      <Text
        className="font-nunitoMeidum"
        style={{
          flex: flexLabel ? 1 : undefined,
          fontSize: 14,
          color: labelColor,
        }}>
        {typeof label === 'string' ? label : label}
      </Text>
    </TouchableOpacity>
  );
};

export default InputCheckbox;
