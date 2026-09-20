// components/ui/inputs/DropdownInput.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextStyle,
  ViewStyle,
  Pressable,
} from 'react-native';
import InputLabel from '../shared/InputLabel';
import { ChevronDownIcon, ChevronUpIcon } from '@/components/icons';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownInputProps {
  label?: string;
  labelColor?: string;
  placeholder?: string;
  placeholderColor?: string;
  value?: string;
  options: DropdownOption[];
  error?: boolean;
  handler?: (name: string, value: string) => void;
  name?: string;
  style?: ViewStyle;
  inputStyle?: ViewStyle; // 👈 Changed from TextStyle to ViewStyle
  required?: boolean;
  leftIcon?: React.ReactNode;
  showLeftIcon?: boolean;
  disabled?: boolean;
}

const DropdownInput: React.FC<DropdownInputProps> = ({
  label,
  labelColor = '#374151',
  placeholder = 'Select an option',
  placeholderColor = '#11182780',
  value,
  options,
  error = false,
  handler,
  name,
  style,
  inputStyle,
  required = true,
  leftIcon,
  showLeftIcon = false,
  disabled = false,
}) => {
  const [focused, setFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (selectedValue: string) => {
    handler?.(name as string, selectedValue);
    setModalVisible(false);
    setFocused(false);
  };

  const handleOpen = () => {
    if (disabled) return;
    setModalVisible(true);
    setFocused(true);
  };

  const handleClose = () => {
    setModalVisible(false);
    setFocused(false);
  };

  const hasLeftIcon = showLeftIcon && leftIcon;

  return (
    <>
      <View
        style={{
          backgroundColor: 'transparent',
          position: 'relative',
          ...style,
        }}>
        {label && (
          <InputLabel
            style={{
              color: labelColor,
              marginBottom: 6,
            }}
            text={label}
          />
        )}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleOpen}
          disabled={disabled}
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F9FAFB',
              borderRadius: 10,
              borderWidth: 1.2,
              borderColor: error ? '#EF4444' : focused ? '#64748B55' : '#9CA3AF3D',
              paddingVertical: 12.5,
              paddingHorizontal: 16,
              paddingLeft: hasLeftIcon ? 50 : 16,
              minHeight: 48,
            },
            inputStyle, // 👈 Now this is properly typed as ViewStyle
          ]}>
          {/* Left Icon */}
          {hasLeftIcon && (
            <View
              style={{
                position: 'absolute',
                left: 14,
                top: '50%',
                transform: [{ translateY: -12 }],
                padding: 4,
              }}>
              {leftIcon}
            </View>
          )}

          {/* Selected Value or Placeholder */}
          <Text
            style={{
              flex: 1,
              color: selectedOption ? '#111827' : placeholderColor,
              fontFamily: 'Nunito-Regular',
              fontSize: 16,
            }}>
            {selectedOption ? selectedOption.label : placeholder}
          </Text>

          {/* Dropdown Icon */}
          <View style={{ marginLeft: 8 }}>
            {focused ? (
              <ChevronUpIcon size={20} color="#9CA3AF" />
            ) : (
              <ChevronDownIcon size={20} color="#9CA3AF" />
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Dropdown Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleClose}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleClose}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              width: '85%',
              maxHeight: '60%',
              padding: 8,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              showsVerticalScrollIndicator={true}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    paddingVertical: 14,
                    paddingHorizontal: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#F3F4F6',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  onPress={() => handleSelect(item.value)}>
                  <Text
                    style={{
                      color: item.value === value ? '#B91C1C' : '#111827',
                      fontFamily: item.value === value ? 'Nunito-SemiBold' : 'Nunito-Regular',
                      fontSize: 16,
                    }}>
                    {item.label}
                  </Text>
                  {item.value === value && (
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: '#B91C1C',
                        backgroundColor: '#FFFFFF',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: '#B91C1C',
                        }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              )}
              ListEmptyComponent={() => (
                <View style={{ padding: 20, alignItems: 'center' }}>
                  <Text style={{ color: '#9CA3AF', fontFamily: 'Nunito-Regular' }}>
                    No options available
                  </Text>
                </View>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default DropdownInput;
