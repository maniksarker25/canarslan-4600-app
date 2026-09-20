import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function BestWholeSalePricesIcon({ size = 20, color = '#000', style, ...props }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={style} {...props}>
      <Path
        d="M10.4883 3.82167C10.1758 3.50909 9.75199 3.33343 9.31 3.33334H3.33333V9.31C3.33342 9.75199 3.50908 10.1758 3.82166 10.4883L9.655 16.3217C9.96754 16.6341 10.3914 16.8096 10.8333 16.8096C11.2753 16.8096 11.6991 16.6341 12.0117 16.3217L16.3217 12.0117C16.6341 11.6991 16.8096 11.2753 16.8096 10.8333C16.8096 10.3914 16.6341 9.96755 16.3217 9.655L10.4883 3.82167Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.5 7.5H7.50833V7.50833H7.5V7.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
