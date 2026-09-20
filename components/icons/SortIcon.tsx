import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function SortIcon({ size = 14, color = '#000', style, ...props }: IconProps) {
  return (
    <Svg width={size} height={size} color={color} viewBox="0 0 14 14" fill="none" {...props}>
      <Path
        d="M12.2499 9.33325L9.91659 11.6666L7.58325 9.33325"
        stroke={color}
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.91675 11.6666V2.33325"
        stroke={color}
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.75 4.66659L4.08333 2.33325L6.41667 4.66659"
        stroke={color}
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.08325 2.33325V11.6666"
        stroke={color}
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
