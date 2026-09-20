import Svg, { Path, SvgProps } from 'react-native-svg';

export const OrdersIcon: React.FC<
  SvgProps & { size?: number; color?: string; strokeWidth?: string }
> = ({ size = 22, color = '#000', strokeWidth = '1.41667', ...props }) => (
  <Svg width={size} height={size} color={color} viewBox="0 0 22 22" fill="none" {...props}>
    <Path
      d="M5.5 1.8335L2.75 5.50016V18.3335C2.75 18.8197 2.94315 19.286 3.28697 19.6299C3.63079 19.9737 4.0971 20.1668 4.58333 20.1668H17.4167C17.9029 20.1668 18.3692 19.9737 18.713 19.6299C19.0568 19.286 19.25 18.8197 19.25 18.3335V5.50016L16.5 1.8335H5.5Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.75 5.5H19.25"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.6667 9.1665C14.6667 10.139 14.2804 11.0716 13.5927 11.7592C12.9051 12.4469 11.9725 12.8332 11 12.8332C10.0275 12.8332 9.09492 12.4469 8.40729 11.7592C7.71965 11.0716 7.33334 10.139 7.33334 9.1665"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
