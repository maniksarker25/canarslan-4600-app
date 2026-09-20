import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

type IconContainerProps = {
  size?: number;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;

  icon?: React.ReactNode;

  iconTranslateX?: number;
  iconTranslateY?: number;

  className?: string;
  style?: StyleProp<ViewStyle>;
};

const IconContainer: React.FC<IconContainerProps> = ({
  size = 76,
  borderRadius = 14,
  borderWidth = 1,
  borderColor = '#cccccc33',
  backgroundColor = '#2B7FFF1A',

  icon,

  iconTranslateX = 0,
  iconTranslateY = 0,

  className = '',
  style,
}) => {
  return (
    <View
      className={`items-center justify-center ${className}`}
      style={[
        {
          width: size,
          height: size,
          borderRadius,
          borderWidth,
          borderColor,
          backgroundColor,
        },
        style,
      ]}>
      <View
        style={{
          transform: [{ translateX: iconTranslateX }, { translateY: iconTranslateY }],
        }}>
        {icon}
      </View>
    </View>
  );
};

export default IconContainer;

// ✅ Usage Example (your current icon)
// import IconContainer from "@/components/ui/IconContainer";
// import { OneManIconThroughFocus } from "@/components/icons/OneManIconThroughFocus";

{
  /* <IconContainer
  size={76}
  icon={
    <OneManIconThroughFocus
      size={48}
      color="#2B7FFF"
    />
  }
/> */
}
// ✅ Example with Feather icon
// import { Feather } from "@expo/vector-icons";

// <IconContainer
//   size={60}
//   borderRadius={12}
//   backgroundColor="#E8F1FF"
//   icon={<Feather name="user" size={30} color="#2B7FFF" />}
// />
// ✅ Example adjusting icon position

// Sometimes SVG icons look slightly off-center.

// <IconContainer
//   size={76}
//   iconTranslateY={2}
//   icon={
//     <OneManIconThroughFocus
//       size={48}
//       color="#2B7FFF"
//     />
//   }
// />
