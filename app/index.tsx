// app/index.tsx
import { View, Text, ActivityIndicator, Image, ImageBackground, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setUser } from '@/store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';

export default function Index() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isReady, setIsReady] = useState(false);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  // Animation values
  // eslint-disable-next-line react-hooks/refs
  const fadeAnim = useRef(new Animated.Value(1)).current; // Start fully visible
  // eslint-disable-next-line react-hooks/refs
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          dispatch(setUser(JSON.parse(storedUser)));
        }
        setIsReady(true);

        // Wait 3 seconds then start fade out
        setTimeout(() => {
          setShouldFadeOut(true);

          // Animate fade out and scale
          Animated.parallel([
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1.1,
              duration: 800,
              useNativeDriver: true,
            }),
          ]).start(() => {
            // Navigate after animation completes
            try {
              if (storedUser) {
                router.replace('/(tabs)/home');
              } else {
                router.replace('/(auth)/onboarding');
              }
            } catch (navError) {
              console.log('Navigation error:', navError);
              setTimeout(() => {
                if (storedUser) {
                  router.replace('/(tabs)/home');
                } else {
                  router.replace('/(auth)/onboarding');
                }
              }, 500);
            }
          });
        }, 3000);
      } catch (error) {
        console.log('Error initializing app:', error);
        setIsReady(true);
        setTimeout(() => {
          router.replace('/(auth)/onboarding');
        }, 3000);
      }
    };

    initializeApp();
  }, []);

  return (
    <Animated.View
      // eslint-disable-next-line react-hooks/refs
      style={{
        flex: 1,
        backgroundColor: '#EEE6E1',
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
      }}>
      <StatusBar style="light" />

      {/* Background Image - 70% of screen height */}
      {/* <View style={{ height: '70%', width: '100%' }}>
        <ImageBackground
          source={require('@/assets/images/splash_logo.png')}
          style={{ flex: 1, width: '100%' }}
          resizeMode="cover"
        />
      </View> */}

      {/* Gradient Overlay for smooth transition */}
      <LinearGradient
        // Colors transition from transparent at top -> subtle dark shade -> deeper background tone at bottom
        colors={['rgba(238, 230, 225, 0)', 'rgba(238, 230, 225, 0.4)', 'rgba(238, 230, 225, 0.95)']}
        locations={[0, 0.6, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      {/* Content - Logo at Bottom */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        className="flex-1 justify-center pb-20">
        {/* Logo */}
        <View className="items-center px-6">
          <Image
            source={require('@/assets/images/splash_logo.png')}
            className="mb-4 h-[300] w-[300]"
            resizeMode="contain"
          />
        </View>

        {/* Loading Indicator */}
        <View className="mt-6 items-center">
          <ActivityIndicator size="large" color="#1E1E1E" />
          <Text className="font-Nunito-Regular mt-2 text-center text-[#1E1E1EA3]">Loading...</Text>
        </View>

        {/* Version */}
        {/* <Text className="font-Nunito-Regular mt-4 text-center text-sm text-white/30">
          Version 1.0.0
        </Text> */}
      </View>
    </Animated.View>
  );
}
