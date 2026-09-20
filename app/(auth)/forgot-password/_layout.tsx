// app/forgot-password/_layout.tsx
import { Stack } from 'expo-router';

export default function ForgotPasswordLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="resetPassword" />
      <Stack.Screen name="forgotPasswordOtp" />
    </Stack>
  );
}
