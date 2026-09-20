import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function DoubleCheckIcon({ size = 11, color = '#6B7280', style, ...props }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 11 11" fill="none" style={style} {...props}>
      <Path
        d="M8.25001 2.75L3.20834 7.79167L0.916672 5.5"
        stroke={color}
        strokeWidth="0.916667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.0833 4.58325L6.64583 8.02075L5.95833 7.33325"
        stroke={color}
        strokeWidth="0.916667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
