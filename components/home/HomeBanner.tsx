import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const BANNERS = [
  require('@/assets/images/home_banner_1.png'),
  require('@/assets/images/home_banner_2.png'),
  require('@/assets/images/home_banner_3.png'),
];

type HomeBannerProps = {
  onPressBanner?: (index: number) => void;
  intervalDuration?: number; // Duration each banner stays visible in ms
  fadeDuration?: number; // Duration of fade animation in ms
};

export default function HomeBanner({
  onPressBanner,
  intervalDuration = 4000,
  fadeDuration = 900,
}: HomeBannerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Dedicated Animated.Value for each banner so all 3 images remain mounted
  const opacityAnims = useRef(
    BANNERS.map((_, index) => new Animated.Value(index === 0 ? 1 : 0))
  ).current;

  const activeIndexRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const current = activeIndexRef.current;
      const next = (current + 1) % BANNERS.length;

      // Update state for dot indicators & ref for interval tracking
      setActiveIndex(next);
      activeIndexRef.current = next;

      // Simultaneously fade out current image and fade in next image natively
      Animated.parallel([
        Animated.timing(opacityAnims[current], {
          toValue: 0,
          duration: fadeDuration,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnims[next], {
          toValue: 1,
          duration: fadeDuration,
          useNativeDriver: true,
        }),
      ]).start();
    }, intervalDuration);

    return () => clearInterval(timer);
  }, [fadeDuration, intervalDuration, opacityAnims]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onPressBanner?.(activeIndex)}
        style={styles.bannerWrapper}>
        {/* Render all 3 banners mounted in absolute position to prevent texture decoding lag */}
        {BANNERS.map((source, index) => (
          <Animated.Image
            key={index}
            source={source}
            style={[styles.bannerImage, StyleSheet.absoluteFill, { opacity: opacityAnims[index] }]}
            resizeMode="cover"
          />
        ))}

        {/* Pagination Dots Indicator */}
        <View style={styles.dotsContainer}>
          {BANNERS.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, activeIndex === index ? styles.activeDot : styles.inactiveDot]}
            />
          ))}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  bannerWrapper: {
    width: '100%',
    aspectRatio: 684 / 400, // Exact aspect ratio of banner images (684x400)
    borderRadius: 16,
    overflow: 'hidden',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.08,
    // shadowRadius: 6,
    // elevation: 3,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 18,
    backgroundColor: '#FFFFFF',
  },
  inactiveDot: {
    width: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
  },
});
