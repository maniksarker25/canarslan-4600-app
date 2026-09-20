import { View, ViewStyle, StyleProp, Text } from 'react-native';
import LabelPrimary from './LabelPrimary';
import { EmptyBoxIcon } from '@/components/icons';
type Props = {
  text?: string;
  style?: StyleProp<ViewStyle>;
  className?: string; // <-- added
};

export default function NotFoundCard({ text = 'No Result Found', style, className }: Props) {
  return (
    <View
      className={`flex items-center gap-2 rounded-[12px] border  bg-transparent px-[14px] py-[24px] ${className ?? ''}`} // <-- merged className
      style={[
        {
          borderWidth: 1,
          borderColor: '#FFFFFF33',
        },
        style,
      ]}>
      <EmptyBoxIcon width={64} height={41} color="#A5CC25" />
      <LabelPrimary text={text} style={{ color: '#FFFFFF', fontFamily: 'Nunito-SemiBoldItalic' }} />
    </View>
  );
}
