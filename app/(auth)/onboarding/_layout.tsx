import { Stack } from 'expo-router';

export default function authLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: { backgroundColor: '#EEE6E1' },
      }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="profileSetup" options={{ headerShown: false }} />

      {/* <Stack.Screen
        name="successModal"
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      /> */}
    </Stack>
  );
}
