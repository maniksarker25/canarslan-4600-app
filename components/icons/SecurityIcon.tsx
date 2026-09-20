import Svg, { Path, SvgProps } from 'react-native-svg';

export const SecurityIcon: React.FC<SvgProps & { size?: number; color?: string }> = ({
  size = 18,
  color = '#000',
  ...props
}) => (
  <Svg width={size} height={size} color={color} viewBox="0 0 18 18" fill="none" {...props}>
    <Path
      d="M15 9.74985C15 13.4998 12.375 15.3748 9.255 16.4623C9.09162 16.5177 8.91415 16.5151 8.7525 16.4548C5.625 15.3748 3 13.4998 3 9.74985V4.49985C3 4.30094 3.07902 4.11017 3.21967 3.96952C3.36032 3.82887 3.55109 3.74985 3.75 3.74985C5.25 3.74985 7.125 2.84985 8.43 1.70985C8.58889 1.5741 8.79102 1.49951 9 1.49951C9.20898 1.49951 9.41111 1.5741 9.57 1.70985C10.8825 2.85735 12.75 3.74985 14.25 3.74985C14.4489 3.74985 14.6397 3.82887 14.7803 3.96952C14.921 4.11017 15 4.30094 15 4.49985V9.74985Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
