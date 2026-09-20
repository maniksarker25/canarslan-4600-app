//   import '../global.css';
//   import { SafeAreaProvider } from 'react-native-safe-area-context';

// 	import { Stack } from "expo-router";

// export default function Layout() {

// 	return (

//       <SafeAreaProvider>
//         <Stack />
//       </SafeAreaProvider>

// 	);
// }

import '../global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import * as NavigationBar from 'expo-navigation-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, KeyboardAvoidingView, Platform, View } from 'react-native';
import { useFonts } from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';
import { setAppLoading, setUser, setToken } from '@/store/authSlice';
import { useEffect } from 'react';
import { store, RootState } from '@/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { I18nextProvider } from 'react-i18next';
import i18n, { initI18n } from '@/i18n';

/* ---------------------------------------------------
   Prevent splash from auto hiding
---------------------------------------------------- */
SplashScreen.preventAutoHideAsync();

/* ---------------------------------------------------
   App Navigator
---------------------------------------------------- */
function AppNavigator() {
  const dispatch = useDispatch();
  // const isAppLoading = useSelector((state: RootState) => state.auth.isAppLoading);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        // Restore auth session
        const storedUser = await AsyncStorage.getItem('user');
        const token = await AsyncStorage.getItem('accessToken');
        if (storedUser) dispatch(setUser(JSON.parse(storedUser)));
        if (token) dispatch(setToken(token));

        // Init i18n (reads stored language or auto-detects device locale)
        await initI18n();
      } catch (error) {
        console.log('Error restoring session:', error);
      } finally {
        dispatch(setAppLoading(false));
        await SplashScreen.hideAsync();
      }
    };

    bootstrap();
  }, []);

  // if (isAppLoading) {
  //   return (
  //     <View className="flex-1 items-center justify-center">
  //       <ActivityIndicator size="large" color="#2C80EC" />
  //     </View>
  //   );
  // }

  // return <Stack screenOptions={{ headerShown: false }} />;
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}

export default function Layout() {
  const [fontsLoaded] = useFonts({
    // Nunito
    'Nunito-Regular': require('@/assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Italic': require('@/assets/fonts/Nunito-Italic.ttf'),
    'Nunito-Medium': require('@/assets/fonts/Nunito-Medium.ttf'),
    'Nunito-MediumItalic': require('@/assets/fonts/Nunito-MediumItalic.ttf'),
    'Nunito-SemiBold': require('@/assets/fonts/Nunito-SemiBold.ttf'),
    'Nunito-SemiBoldItalic': require('@/assets/fonts/Nunito-SemiBoldItalic.ttf'),
    'Nunito-Bold': require('@/assets/fonts/Nunito-Bold.ttf'),
    'Nunito-BoldItalic': require('@/assets/fonts/Nunito-BoldItalic.ttf'),
    'Nunito-ExtraBold': require('@/assets/fonts/Nunito-ExtraBold.ttf'),
    'Nunito-ExtraBoldItalic': require('@/assets/fonts/Nunito-ExtraBoldItalic.ttf'),

    // Syne
    'Syne-Regular': require('@/assets/fonts/Syne-Regular.ttf'),
    'Syne-Medium': require('@/assets/fonts/Syne-Medium.ttf'),
    'Syne-SemiBold': require('@/assets/fonts/Syne-SemiBold.ttf'),
    'Syne-Bold': require('@/assets/fonts/Syne-Bold.ttf'),
    'Syne-ExtraBold': require('@/assets/fonts/Syne-ExtraBold.ttf'),

    // Montserrat
    'Montserrat-Regular': require('@/assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Italic': require('@/assets/fonts/Montserrat-Italic.ttf'),
    'Montserrat-Medium': require('@/assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-MediumItalic': require('@/assets/fonts/Montserrat-MediumItalic.ttf'),
    'Montserrat-SemiBold': require('@/assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-SemiBoldItalic': require('@/assets/fonts/Montserrat-SemiBoldItalic.ttf'),
    'Montserrat-Bold': require('@/assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-BoldItalic': require('@/assets/fonts/Montserrat-BoldItalic.ttf'),
    'Montserrat-ExtraBold': require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
    'Montserrat-ExtraBoldItalic': require('@/assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#1E1E1E" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <SafeAreaProvider>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
              <AppNavigator />

              {/* ✅ Global Toast Provider */}
              <Toast />
            </KeyboardAvoidingView>
          </SafeAreaProvider>
        </I18nextProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
