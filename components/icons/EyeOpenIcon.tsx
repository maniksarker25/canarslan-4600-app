import Svg, { Path, SvgProps } from 'react-native-svg';

export const EyeOpenIcon: React.FC<SvgProps & { size?: number; color?: string }> = ({
  size = 24,
  color = '#000',
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M3 11C3 11 6 5 11.25 5C16.5 5 19.5 11 19.5 11C19.5 11 16.5 17 11.25 17C6 17 3 11 3 11Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.25 13.25C12.4926 13.25 13.5 12.2426 13.5 11C13.5 9.75736 12.4926 8.75 11.25 8.75C10.0074 8.75 9 9.75736 9 11C9 12.2426 10.0074 13.25 11.25 13.25Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
