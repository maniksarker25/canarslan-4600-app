import Svg, { Path, SvgProps } from 'react-native-svg';

export const MailBoxIcon: React.FC<SvgProps & { size?: number; color?: string }> = ({
  size = 24,
  color = '#000',
  ...props
}) => (
  <Svg width={size} height={size} color={color} viewBox="0 0 18 18" fill="none" {...props}>
    <Path
      d="M15 3H3C2.17157 3 1.5 3.67157 1.5 4.5V13.5C1.5 14.3284 2.17157 15 3 15H15C15.8284 15 16.5 14.3284 16.5 13.5V4.5C16.5 3.67157 15.8284 3 15 3Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.5 5.25L9.7725 9.525C9.54095 9.67007 9.27324 9.74701 9 9.74701C8.72676 9.74701 8.45905 9.67007 8.2275 9.525L1.5 5.25"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
