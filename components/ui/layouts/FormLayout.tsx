// // /components/ui/layouts/FormLayout.tsx
// import React from 'react';
// import { KeyboardAvoidingView, Platform, ViewStyle, StyleProp, StatusBar } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { LinearGradient } from 'expo-linear-gradient';

// interface FormLayoutProps {
//   children: React.ReactNode;
//   contentContainerStyle?: StyleProp<ViewStyle>;
//   gradientColors?: readonly [string, string, ...string[]];
//   gradientLocations?: readonly [number, number, ...number[]];
//   useGradient?: boolean;
// }

// const FormLayout: React.FC<FormLayoutProps> = ({
//   children,
//   contentContainerStyle,
//   gradientColors = ['#EEE6E1', '#EEE6E1', '#EEE6E1'] as const,
//   gradientLocations = [0, 0.5, 1] as const,
//   useGradient = true,
// }) => {
//   // If gradient is disabled, use the old background
//   if (!useGradient) {
//     return (
//       <SafeAreaView style={{ flex: 1 }} className="bg-background">
//         <KeyboardAvoidingView
//           style={{ flex: 1 }}
//           behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//           <KeyboardAwareScrollView
//             className="px-containerSm md:px-container"
//             enableOnAndroid={true}
//             keyboardShouldPersistTaps="handled"
//             contentContainerStyle={[
//               {
//                 flexGrow: 1,
//                 justifyContent: 'center',
//               },
//               contentContainerStyle,
//             ]}>
//             {children}
//           </KeyboardAwareScrollView>
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     );
//   }

//   // With gradient
//   return (
//     <LinearGradient
//       colors={gradientColors}
//       locations={gradientLocations}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 0, y: 1 }}
//       style={{ flex: 1 }}>
//       <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />
//       <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
//         <KeyboardAvoidingView
//           style={{ flex: 1 }}
//           behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//           <KeyboardAwareScrollView
//             className="px-containerSm md:px-container"
//             enableOnAndroid={true}
//             keyboardShouldPersistTaps="handled"
//             contentContainerStyle={[
//               {
//                 flexGrow: 1,
//                 justifyContent: 'center',
//                 paddingVertical: 20,
//               },
//               contentContainerStyle,
//             ]}
//             showsVerticalScrollIndicator={false}>
//             {children}
//           </KeyboardAwareScrollView>
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// };

// export default FormLayout;

// /components/ui/layouts/FormLayout.tsx
import React from 'react';
import { KeyboardAvoidingView, Platform, ViewStyle, StyleProp, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

interface FormLayoutProps {
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  gradientColors?: readonly [string, string, ...string[]];
  gradientLocations?: readonly [number, number, ...number[]];
  useGradient?: boolean;
  // Fixed content rendered above the scrollable form area (e.g. a header
  // row with a back button + title) — does NOT scroll with the content,
  // matching typical edit-screen UX. Omit for screens that don't need one.
  header?: React.ReactNode;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  children,
  contentContainerStyle,
  gradientColors = ['#EEE6E1', '#EEE6E1', '#EEE6E1'] as const,
  gradientLocations = [0, 0.5, 1] as const,
  useGradient = true,
  header,
}) => {
  // If gradient is disabled, use the old background
  if (!useGradient) {
    return (
      <SafeAreaView style={{ flex: 1 }} className="bg-background">
        {header}
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <KeyboardAwareScrollView
            className="px-containerSm md:px-container"
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[
              {
                flexGrow: 1,
                justifyContent: 'center',
              },
              contentContainerStyle,
            ]}>
            {children}
          </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // With gradient
  return (
    <LinearGradient
      colors={gradientColors}
      locations={gradientLocations}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}>
      <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        {header}
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <KeyboardAwareScrollView
            className="px-containerSm md:px-container"
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[
              {
                flexGrow: 1,
                justifyContent: 'center',
                paddingVertical: 20,
              },
              contentContainerStyle,
            ]}
            showsVerticalScrollIndicator={false}>
            {children}
          </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default FormLayout;
