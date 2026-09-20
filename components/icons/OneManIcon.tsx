import Svg, { Path, SvgProps, LinearGradient, Stop } from 'react-native-svg';

interface OneManIconProps extends SvgProps {
  width?: number;
  height?: number;
  color?: string;
  primaryColor?: string;
  secondaryColor?: string;
  useGradient?: boolean;
}

export const OneManIcon: React.FC<OneManIconProps> = ({
  width = 24,
  height = 24,
  color = '#000',
  primaryColor = '#77BB1E',
  secondaryColor = '#0085D9',
  useGradient = true,
  ...props
}) => {
  // If color is provided and useGradient is false, use solid color
  const strokeColor = !useGradient && color !== '#000' ? color : undefined;

  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
        stroke={strokeColor || `url(#personGradient1)`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.16021 14.56C4.74021 16.18 4.74021 18.82 7.16021 20.43C9.91021 22.27 14.4202 22.27 17.1702 20.43C19.5902 18.81 19.5902 16.17 17.1702 14.56C14.4302 12.73 9.92021 12.73 7.16021 14.56Z"
        stroke={strokeColor || `url(#personGradient2)`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {useGradient && !strokeColor && (
        <>
          <LinearGradient
            id="personGradient1"
            x1="8.0548"
            y1="10.7813"
            x2="16.199"
            y2="10.5992"
            gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor={primaryColor} />
            <Stop offset="1" stopColor={secondaryColor} />
          </LinearGradient>
          <LinearGradient
            id="personGradient2"
            x1="6.10516"
            y1="21.7238"
            x2="18.6056"
            y2="21.2822"
            gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor={primaryColor} />
            <Stop offset="1" stopColor={secondaryColor} />
          </LinearGradient>
        </>
      )}
    </Svg>
  );
};

export default OneManIcon;
