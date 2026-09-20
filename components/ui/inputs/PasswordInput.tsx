// import React, { useState } from 'react';
// import {
//   KeyboardType,
//   TextInput,
//   TouchableOpacity,
//   View,
//   TextStyle,
//   ViewStyle,
//   Image,
// } from 'react-native';
// import InputLabel from '../shared/InputLabel';
// import { EyeOpenIcon, EyeCloseIcon, LockIcon } from '../../icons/index';

// const PasswordInput = ({
//   keyboard = 'default',
//   style,
//   inputStyle,
//   placeHolder = 'Please enter',
//   label = 'Enter your',
//   labelColor = '#374151',
//   error = false,
//   handler,
//   value = '',
//   name,
//   required = true,
//   placeholderColor = '#11182780',
//   onBlur,
//   lockIcon, // 👈 New prop for custom lock icon
// }: {
//   keyboard?: string;
//   style?: ViewStyle;
//   inputStyle?: TextStyle;
//   placeHolder?: string;
//   label?: string;
//   labelColor?: string;
//   error?: boolean;
//   handler?: (name: string, value: string) => void;
//   value?: string;
//   name?: string;
//   required?: boolean;
//   placeholderColor?: string;
//   onBlur?: (value: string) => void;
//   lockIcon?: React.ReactNode; // 👈 Optional custom lock icon
// }) => {
//   const [focused, setFocused] = useState(false);
//   const [show, setShow] = useState(true);

//   // Default lock icon (you can replace this with your own SVG or image)
//   const DefaultLockIcon = () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//       <path
//         d="M12 2C9.79086 2 8 3.79086 8 6V8H16V6C16 3.79086 14.2091 2 12 2Z"
//         stroke="#70747d"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <rect
//         x="4"
//         y="8"
//         width="16"
//         height="14"
//         rx="2"
//         stroke="#70747d"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <path
//         d="M12 12V16"
//         stroke="#70747d"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <circle cx="12" cy="18" r="1" fill="#70747d" />
//     </svg>
//   );

//   return (
//     <View
//       style={{
//         backgroundColor: 'transparent',
//         position: 'relative',
//         ...style,
//       }}>
//       {label && (
//         <InputLabel
//           style={{
//             color: labelColor,
//             marginBottom: 6,
//           }}
//           text={label}
//         />
//       )}

//       <View style={{ position: 'relative' }}>
//         <TextInput
//           onFocus={() => setFocused(true)}
//           onBlur={() => {
//             setFocused(false);
//             onBlur?.(value);
//           }}
//           secureTextEntry={show}
//           value={value}
//           style={{
//             color: '#111827',
//             fontFamily: 'Nunito-Regular',
//             lineHeight: 16 * 1.1,
//             padding: 16,
//             paddingVertical: 12.5,
//             paddingLeft: 50, // 👈 Increased left padding for lock icon
//             paddingRight: 50,
//             borderRadius: 10,
//             borderWidth: 1.2,
//             backgroundColor: '#F9FAFB',
//             borderColor: error ? '#EF4444' : focused ? '#64748B55' : '#9CA3AF3D',
//             ...inputStyle,
//           }}
//           placeholder={placeHolder}
//           placeholderTextColor={placeholderColor}
//           keyboardType={keyboard as KeyboardType}
//           onChangeText={(text) => handler?.(name as string, text)}
//         />

//         {/* 👈 Lock Icon - Left Side */}
//         <View
//           style={{
//             position: 'absolute',
//             left: 14,
//             top: '50%',
//             transform: [{ translateY: -14 }],
//             padding: 4,
//             pointerEvents: 'none', // 👈 Prevents blocking text input
//           }}>
//           {lockIcon || <LockIcon size={18} color="#9CA3AF" />}
//         </View>

//         {/* 👈 Eye Icon - Right Side */}
//         <TouchableOpacity
//           style={{
//             position: 'absolute',
//             right: 14,
//             top: '50%',
//             transform: [{ translateY: -10 }],
//             padding: 4,
//           }}
//           activeOpacity={0.7}
//           onPress={() => setShow(!show)}>
//           {show ? (
//             <EyeCloseIcon size={20} color="#9CA3AF" />
//           ) : (
//             <EyeOpenIcon size={20} color="#9CA3AF" />
//           )}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default PasswordInput;

import React, { useState } from 'react';
import {
  KeyboardType,
  TextInput,
  TouchableOpacity,
  View,
  TextStyle,
  ViewStyle,
} from 'react-native';
import InputLabel from '../shared/InputLabel';
import { EyeOpenIcon, EyeCloseIcon, LockIcon } from '../../icons/index';

const PasswordInput = ({
  keyboard = 'default',
  style,
  inputStyle,
  placeHolder = 'Please enter',
  label = 'Enter your',
  labelColor = '#374151',
  error = false,
  handler,
  value = '',
  name,
  required = true,
  placeholderColor = '#11182780',
  onBlur,
  lockIcon,
  showLeftIcon = true, // 👈 New prop with default true
}: {
  keyboard?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  placeHolder?: string;
  label?: string;
  labelColor?: string;
  error?: boolean;
  handler?: (name: string, value: string) => void;
  value?: string;
  name?: string;
  required?: boolean;
  placeholderColor?: string;
  onBlur?: (value: string) => void;
  lockIcon?: React.ReactNode;
  showLeftIcon?: boolean; // 👈 New prop
}) => {
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(true);

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        position: 'relative',
        ...style,
      }}>
      {label && (
        <InputLabel
          style={{
            color: labelColor,
            marginBottom: 6,
          }}
          text={label}
        />
      )}

      <View style={{ position: 'relative' }}>
        <TextInput
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.(value);
          }}
          secureTextEntry={show}
          value={value}
          style={{
            color: '#111827',
            fontFamily: 'Nunito-Regular',
            lineHeight: 16 * 1.1,
            padding: 16,
            paddingVertical: 12.5,
            paddingLeft: showLeftIcon ? 50 : 16, // 👈 Dynamic padding based on showLeftIcon
            paddingRight: 50,
            borderRadius: 10,
            borderWidth: 1.2,
            backgroundColor: '#F9FAFB',
            borderColor: error ? '#EF4444' : focused ? '#64748B55' : '#9CA3AF3D',
            ...inputStyle,
          }}
          placeholder={placeHolder}
          placeholderTextColor={placeholderColor}
          keyboardType={keyboard as KeyboardType}
          onChangeText={(text) => handler?.(name as string, text)}
        />

        {/* 👈 Lock Icon - Left Side (Conditional) */}
        {showLeftIcon && (
          <View
            style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: [{ translateY: -14 }],
              padding: 4,
              pointerEvents: 'none',
            }}>
            {lockIcon || <LockIcon size={18} color="#9CA3AF" />}
          </View>
        )}

        {/* 👈 Eye Icon - Right Side */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 14,
            top: '50%',
            transform: [{ translateY: -10 }],
            padding: 4,
          }}
          activeOpacity={0.7}
          onPress={() => setShow(!show)}>
          {show ? (
            <EyeCloseIcon size={20} color="#9CA3AF" />
          ) : (
            <EyeOpenIcon size={20} color="#9CA3AF" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordInput;
