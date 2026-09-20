// app/(onboarding)/index.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '@/components/ui/shared/button/PrimaryButton';
import PaginationDots from '@/components/onboarding/PaginationDots';
import HeaderPrimary from '@/components/ui/shared/HeaderPrimary';
import Subtitle from '@/components/ui/shared/Subtitle';
import OnboardingIconBadge from '@/components/ui/icons/OnboardingIconBadge';
import { ONBOARDING_DATA } from '@/constants/onboarding';

const { width, height } = Dimensions.get('window');

export default function OnboardingCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    router.replace('/(auth)');
  };

  const handleComplete = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    router.replace('/(auth)');
  };

  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
    useNativeDriver: false,
  });

  const onMomentumScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const isLast = index === ONBOARDING_DATA.length - 1;

    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

    // Background animations with cross-fade
    const backgroundOpacity = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    });

    const backgroundScale = scrollX.interpolate({
      inputRange,
      outputRange: [1.1, 1, 1.1],
      extrapolate: 'clamp',
    });

    // Content animations
    const contentScale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });

    const contentTranslateY = scrollX.interpolate({
      inputRange,
      outputRange: [50, 0, 50],
      extrapolate: 'clamp',
    });

    const contentOpacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    const rotateY = scrollX.interpolate({
      inputRange,
      outputRange: ['-35deg', '0deg', '35deg'],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.slide}>
        {/* Background Image - Full Screen */}
        <Animated.Image
          source={item.backgroundImage}
          style={[
            styles.backgroundImage,
            {
              opacity: backgroundOpacity,
              transform: [{ scale: backgroundScale }],
            },
          ]}
          resizeMode="cover"
        />

        <View style={styles.overlay}>
          <SafeAreaView edges={['top']} style={styles.topContainer}>
            {/* Skip Button */}
            <View style={styles.skipContainer}>
              <TouchableOpacity onPress={handleSkip} activeOpacity={0.7}>
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>
            </View>

            {/* Tag */}
            <Text style={[styles.tagText, { color: index === 0 ? '#C4202B' : '#0F172A' }]}>
              {item.top}
            </Text>

            {/* Title */}
            <View style={styles.titleContainer}>
              <HeaderPrimary
                text={item.title_1}
                color={
                  item.title_1.includes('Meat') || item.title_1.includes('Order')
                    ? '#111827'
                    : '#B91C1C'
                }
                style={styles.titleText}
              />
              <HeaderPrimary
                text={item.title_2}
                color={
                  item.title_2.includes('Ordering') ||
                  // item.title_2.includes('Quality') ||
                  item.title_2.includes('Confidence')
                    ? '#B91C1C'
                    : '#111827'
                }
                style={styles.titleText}
              />
            </View>

            {/* Accent Line */}
            <View style={styles.accentLine} />

            {/* Description */}
            <Subtitle text={item.description} style={styles.descriptionText} />

            {/* Badges */}
            <View style={styles.badgesContainer}>
              {item.badges?.map((badge: any) => (
                <View key={badge.id} style={styles.badgeItem}>
                  <OnboardingIconBadge icon={badge.icon} size={48} backgroundColor="#B91C1C1F" />
                  <Text style={styles.badgeLabel}>{badge.label}</Text>
                </View>
              ))}
            </View>
          </SafeAreaView>

          <Animated.View
            style={[
              styles.animatedContent,
              {
                opacity: contentOpacity,
                transform: [
                  { scale: contentScale },
                  { translateY: contentTranslateY },
                  { rotateY: rotateY },
                ],
              },
            ]}>
            <SafeAreaView edges={['bottom']} style={styles.bottomContainer}>
              {/* Bottom Row: Pagination Dots + Button */}
              <View style={styles.bottomRow}>
                <PaginationDots
                  totalScreens={ONBOARDING_DATA.length}
                  currentIndex={index}
                  activeColor="#C4202B"
                  inactiveColor="#B91C1CA3"
                />

                <View style={styles.buttonWrapper}>
                  <PrimaryButton
                    title={isLast ? 'Get Started' : 'Continue'}
                    onPress={isLast ? handleComplete : handleNext}
                  />
                </View>
              </View>
            </SafeAreaView>
          </Animated.View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_DATA}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
        bounces={false}
        decelerationRate="fast"
        removeClippedSubviews={Platform.OS === 'android'}
        maxToRenderPerBatch={3}
        windowSize={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8DDD0',
  },
  slide: {
    width: width,
    flex: 1,
    backgroundColor: '#E8DDD0',
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  skipContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  skipText: {
    color: '#C4202B',
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#C4202B52',
  },
  tagText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 13,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#B91C1C',
    marginBottom: 4,
  },
  titleContainer: {
    marginTop: 2,
  },
  titleText: {
    fontSize: 32,
    lineHeight: 34,
    fontFamily: 'Nunito-Bold',
  },
  accentLine: {
    width: 64,
    height: 2,
    backgroundColor: '#C4202B',
    marginTop: 8,
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1E1E1E',
    marginBottom: 16,
  },
  badgesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 20,
  },
  badgeItem: {
    alignItems: 'center',
    gap: 6,
  },
  badgeLabel: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 10,
    color: '#1E1E1E',
    textAlign: 'center',
  },
  animatedContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  buttonWrapper: {
    flex: 0.6,
    marginLeft: 10,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
  },
  spacer: {
    flex: 1,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.6,
  },
});
