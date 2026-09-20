import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function EmptyBoxIcon({
  width = 40,
  height = 40,
  color = '#000',
  style,
  ...props
}: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 40 40" fill="none" style={style} {...props}>
      <Path
        d="M10 3.3335L5 10.0002V33.3335C5 34.2176 5.35119 35.0654 5.97631 35.6905C6.60143 36.3156 7.44928 36.6668 8.33333 36.6668H31.6667C32.5507 36.6668 33.3986 36.3156 34.0237 35.6905C34.6488 35.0654 35 34.2176 35 33.3335V10.0002L30 3.3335H10Z"
        stroke={color}
        strokeWidth="3.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 10H35"
        stroke={color}
        strokeWidth="3.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M26.6666 16.6665C26.6666 18.4346 25.9642 20.1303 24.714 21.3805C23.4637 22.6308 21.768 23.3332 19.9999 23.3332C18.2318 23.3332 16.5361 22.6308 15.2859 21.3805C14.0356 20.1303 13.3333 18.4346 13.3333 16.6665"
        stroke={color}
        strokeWidth="3.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
