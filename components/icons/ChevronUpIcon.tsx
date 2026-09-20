import Svg, { Path, SvgProps } from 'react-native-svg';

export const ChevronUpIcon: React.FC<SvgProps & { size?: number; color?: string }> = ({
  size = 24,
  color = '#000',
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M18 15L12 9L6 15"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
