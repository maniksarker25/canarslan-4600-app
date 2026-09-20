import Svg, { Path, SvgProps } from 'react-native-svg';

export const BuildingIcon: React.FC<SvgProps & { size?: number; color?: string }> = ({
  size = 17,
  color = '#000',
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 17 17" fill="none" {...props}>
    <Path
      d="M4.25 15.5833V2.83329C4.25 2.45757 4.39926 2.09723 4.66493 1.83156C4.93061 1.56588 5.29094 1.41663 5.66667 1.41663H11.3333C11.7091 1.41663 12.0694 1.56588 12.3351 1.83156C12.6007 2.09723 12.75 2.45757 12.75 2.83329V15.5833H4.25Z"
      stroke={color}
      strokeWidth="1.41667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.24996 8.5H2.83329C2.45757 8.5 2.09723 8.64926 1.83156 8.91493C1.56588 9.18061 1.41663 9.54094 1.41663 9.91667V14.1667C1.41663 14.5424 1.56588 14.9027 1.83156 15.1684C2.09723 15.4341 2.45757 15.5833 2.83329 15.5833H4.24996"
      stroke={color}
      strokeWidth="1.41667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.75 6.375H14.1667C14.5424 6.375 14.9027 6.52426 15.1684 6.78993C15.4341 7.05561 15.5833 7.41594 15.5833 7.79167V14.1667C15.5833 14.5424 15.4341 14.9027 15.1684 15.1684C14.9027 15.4341 14.5424 15.5833 14.1667 15.5833H12.75"
      stroke={color}
      strokeWidth="1.41667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.08337 4.25H9.91671"
      stroke={color}
      strokeWidth="1.41667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.08337 7.08337H9.91671"
      stroke={color}
      strokeWidth="1.41667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.08337 9.91663H9.91671"
      stroke={color}
      strokeWidth="1.41667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.08337 12.75H9.91671"
      stroke={color}
      strokeWidth="1.41667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
