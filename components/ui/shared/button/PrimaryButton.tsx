import {
  TouchableOpacity,
  Text,
  View,
  ViewStyle,
  StyleProp,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  loaderColor?: string;
  gradientColors?: readonly [string, string, ...string[]];
};

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  className = '',
  textClassName = '',
  leftIcon,
  rightIcon,
  isLoading = false,
  loaderColor = '#C4202B66',
  style,
  gradientColors = ['#C4202B', '#C4202B'],
}: ButtonProps) {
  const isButtonDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isButtonDisabled}

      style={style}
      className={`overflow-hidden rounded-[6px] ${className} ${isButtonDisabled ? 'opacity-50' : ''}`}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0.14, y: 0 }}
        end={{ x: 0.85, y: 1 }}
        className="flex-row items-center justify-center px-4"
        style={{ minHeight: 50, paddingVertical: 0, paddingTop: 15 }}>
        {isLoading ? (
          <ActivityIndicator size="small" color={loaderColor} />
        ) : (
          <>
            {leftIcon && <View className="mr-2 items-center justify-center">{leftIcon}</View>}
            <Text
              className={`text-center font-nunitoSemi text-buttonText text-white ${textClassName}`}>
              {title}
            </Text>
            {rightIcon && <View className="ml-2 items-center justify-center">{rightIcon}</View>}
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}
