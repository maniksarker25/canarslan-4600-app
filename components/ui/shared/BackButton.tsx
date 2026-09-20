// components/ui/shared/BackButton.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type BackButtonProps = {
  size?: number;
  color?: string;
  onPress?: () => void;
  iconName?: 'arrow-back' | 'chevron-back' | 'close';
  containerSize?: number;
  borderRadius?: number;
  borderColor?: string;
  backgroundColor?: string;
  hitSlop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
};

const BackButton: React.FC<BackButtonProps> = ({
  size = 24,
  color = '#374151',
  onPress,
  iconName = 'arrow-back',
  containerSize = 43,
  borderRadius = 23,
  borderColor = '#FFFFFF00',
  backgroundColor = '#F9FAFB',
  hitSlop = { top: 10, bottom: 10, left: 10, right: 10 },
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} hitSlop={hitSlop} activeOpacity={0.7}>
      <LinearGradient
        colors={[backgroundColor, backgroundColor, backgroundColor, backgroundColor]}
        locations={[0.03, 0.7, 1, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: containerSize,
          height: containerSize,
          borderWidth: 1,
          borderColor: borderColor,
          borderRadius: borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Ionicons name={iconName} size={size} color={color} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default BackButton;
