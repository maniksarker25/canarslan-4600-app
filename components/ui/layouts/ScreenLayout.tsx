import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';

type ScreenLayoutProps = {
  children: React.ReactNode;
  scrollable?: boolean;
  paddingHorizontal?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  keyboardAvoiding?: boolean;
  edges?: Edge[];
};

const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  scrollable = false,
  paddingHorizontal = true,
  paddingTop = 0,
  paddingBottom = 120,
  keyboardAvoiding = false,
  edges = ['left', 'right'],
}) => {
  const Container = scrollable ? ScrollView : View;

  // This ensures that our background color fills the safe area entirely
  const safeAreaClass = 'flex-1 bg-customerBg';

  const content = (
    <Container
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      // contentContainerStyle is only active when it's a ScrollView
      contentContainerStyle={
        scrollable
          ? {
            paddingTop,
            paddingBottom,
            flexGrow: 1,
          }
          : undefined
      }
      // Apply horizontal padding via Tailwind classes
      className={`flex-1 ${paddingHorizontal ? 'px-containerSm md:px-container' : ''}`}
      style={[
        // Apply vertical padding via inline styles for precision
        !scrollable && {
          paddingTop,
          paddingBottom,
        },
      ]}>
      {children}
    </Container>
  );

  if (keyboardAvoiding) {
    return (
      <SafeAreaView edges={edges} className={safeAreaClass}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}>
          {content}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={edges} className={safeAreaClass}>
      {content}
    </SafeAreaView>
  );
};

export default ScreenLayout;
