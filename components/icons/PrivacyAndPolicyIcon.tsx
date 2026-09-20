import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function PrivacyAndPolicyIcon({ size = 16, color = '#000', style, ...props }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={style} {...props}>
      <Path
        d="M11.0737 11.7731L10.3333 14.6667L12 14L13.6667 14.6667L13 11.7325M14 10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10C10 8.8954 10.8954 8 12 8C13.1046 8 14 8.8954 14 10Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.3333 6.66658C13.3333 4.15243 13.3333 2.89535 12.5522 2.1143C11.7712 1.33325 10.5141 1.33325 7.99995 1.33325H7.33335C4.81922 1.33325 3.56215 1.33325 2.7811 2.11429C2.00005 2.89533 2.00005 4.1524 2.00002 6.66654L2 9.33318C1.99998 11.8474 1.99997 13.1045 2.78101 13.8855C3.56207 14.6666 4.81915 14.6666 7.33335 14.6666H8.66662"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 4.66675H10.3333M5 8.00008H8"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
