import { View, ViewStyle, StyleProp } from 'react-native';
type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string; // <-- added
};

export default function BorderCard({ children, style, className }: Props) {
  return (
    <View
      className={`rounded-[12px] bg-[#FFFFFF11] p-[26px] ${className ?? ''}`} // <-- merged className
      style={[
        {
          borderWidth: 1,
          borderColor: '#A5CC2524',
          // borderColor: '#FFFFFF33',
        },
        style,
      ]}>
      {children}
    </View>
  );
}
