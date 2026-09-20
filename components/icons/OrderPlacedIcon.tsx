import Svg, { Defs, Mask, Path, RadialGradient, Stop, SvgProps } from 'react-native-svg';

export const OrderPlacedIcon: React.FC<SvgProps & { size?: number }> = ({
  size = 100,
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 100 100" fill="none" {...props}>
    <Mask id="path-1-inside-1_189_2785" fill="white">
      <Path d="M0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50Z" />
    </Mask>
    <Path
      d="M0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50Z"
      fill="url(#paint0_radial_189_2785)"
    />
    <Path
      d="M0 50M100 50M100 50M0 50M50 0M100 50M50 100M0 50M50 100V97C24.0426 97 3 75.9574 3 50H0H-3C-3 79.2711 20.7289 103 50 103V100ZM100 50H97C97 75.9574 75.9574 97 50 97V100V103C79.2711 103 103 79.2711 103 50H100ZM50 0V3C75.9574 3 97 24.0426 97 50H100H103C103 20.7289 79.2711 -3 50 -3V0ZM50 0V-3C20.7289 -3 -3 20.7289 -3 50H0H3C3 24.0426 24.0426 3 50 3V0Z"
      fill="#86EFAC"
      mask="url(#path-1-inside-1_189_2785)"
    />
    <Path
      d="M50 75C63.8071 75 75 63.8071 75 50C75 36.1929 63.8071 25 50 25C36.1929 25 25 36.1929 25 50C25 63.8071 36.1929 75 50 75Z"
      stroke="#16A34A"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M42.5 50L47.5 55L57.5 45"
      stroke="#16A34A"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <RadialGradient
        id="paint0_radial_189_2785"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(50 50) rotate(-90) scale(74.8924 67.1593)">
        <Stop stopColor="#DCFCE7" />
        <Stop offset="1" stopColor="#BBF7D0" />
      </RadialGradient>
    </Defs>
  </Svg>
);
