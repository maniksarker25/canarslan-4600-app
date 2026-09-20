import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function ClockIcon({ size = 12, color = '#6B7280', style, ...props }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none" style={style} {...props}>
      <Path
        d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M6 3V6L8 7" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
