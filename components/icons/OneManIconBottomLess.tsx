import Svg, { Path, SvgProps } from 'react-native-svg';

export const OneManIconBottomLess: React.FC<
  SvgProps & { size?: number; color?: string; strokeWidth?: string }
> = ({ size = 24, color = '#000', strokeWidth = '1.41667', ...props }) => (
  <Svg width={size} height={size} color={color} viewBox="0 0 17 17" fill="none" {...props}>
    <Path
      d="M13.4583 14.875V13.4583C13.4583 12.7069 13.1598 11.9862 12.6285 11.4549C12.0971 10.9235 11.3764 10.625 10.625 10.625H6.375C5.62355 10.625 4.90288 10.9235 4.37153 11.4549C3.84018 11.9862 3.54166 12.7069 3.54166 13.4583V14.875"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.5 7.79167C10.0648 7.79167 11.3333 6.52314 11.3333 4.95833C11.3333 3.39353 10.0648 2.125 8.5 2.125C6.93519 2.125 5.66666 3.39353 5.66666 4.95833C5.66666 6.52314 6.93519 7.79167 8.5 7.79167Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
