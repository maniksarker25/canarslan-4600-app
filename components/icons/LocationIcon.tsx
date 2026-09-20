import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function LocationIcon({ size = 17, color = '#000', style, ...props }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 17 17" fill="none" style={style} {...props}>
      <Path
        d="M8.92575 15.4409C10.2432 14.3033 14.1667 10.62 14.1667 7.08329C14.1667 5.5804 13.5697 4.13906 12.507 3.07635C11.4443 2.01365 10.0029 1.41663 8.50004 1.41663C6.99715 1.41663 5.55581 2.01365 4.4931 3.07635C3.4304 4.13906 2.83337 5.5804 2.83337 7.08329C2.83337 10.62 6.75683 14.3033 8.07433 15.4409C8.19707 15.5332 8.34648 15.5831 8.50004 15.5831C8.65361 15.5831 8.80301 15.5332 8.92575 15.4409Z"
        stroke={color}
        strokeWidth="1.41667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.5 9.20837C9.6736 9.20837 10.625 8.25698 10.625 7.08337C10.625 5.90977 9.6736 4.95837 8.5 4.95837C7.32639 4.95837 6.375 5.90977 6.375 7.08337C6.375 8.25698 7.32639 9.20837 8.5 9.20837Z"
        stroke={color}
        strokeWidth="1.41667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
