import Svg, { Mask, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function OrderStatusIcon({ size = 28, color = '#000', style, ...props }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none" style={style} {...props}>
      <Mask id="path-1-inside-1_223_2379" fill="white">
        <Path d="M0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14Z" />
      </Mask>
      <Path
        d="M0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14Z"
        fill="#E5E7EB"
      />
      <Path
        d="M0 14M28 14M28 14M0 14M14 0M28 14M14 28M0 14M14 28V25C7.92487 25 3 20.0751 3 14H0H-3C-3 23.3888 4.61116 31 14 31V28ZM28 14H25C25 20.0751 20.0751 25 14 25V28V31C23.3888 31 31 23.3888 31 14H28ZM14 0V3C20.0751 3 25 7.92487 25 14H28H31C31 4.61116 23.3888 -3 14 -3V0ZM14 0V-3C4.61116 -3 -3 4.61116 -3 14H0H3C3 7.92487 7.92487 3 14 3V0Z"
        fill="#DADADA"
      />
      <Path
        d="M10 14C10 11.7909 11.7909 10 14 10C16.2091 10 18 11.7909 18 14C18 16.2091 16.2091 18 14 18C11.7909 18 10 16.2091 10 14Z"
        fill="white"
      />
    </Svg>
  );
}
