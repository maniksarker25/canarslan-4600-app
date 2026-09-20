import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import HeaderPrimary from '../ui/shared/HeaderPrimary';
import PaginationDots from './PaginationDots';
import Subtitle from '../ui/shared/Subtitle';

interface OnboardingCardProps {
  title: string;
  description: string;
  currentIndex: number;
  totalScreens: number;
  blurIntensity?: number;
}

export default function OnboardingCard({
  title,
  description,
  currentIndex,
  totalScreens,
  blurIntensity = 80,
}: OnboardingCardProps) {
  return (
    <View style={styles.shadowWrapper}>
      {/* THE MIDDLE CONTAINER 
         This handles the clipping (overflow: hidden) and the shape 
      */}
      <View style={styles.clippingContainer}>
        {/* The Blur Effect */}
        <BlurView intensity={blurIntensity} tint="light" style={StyleSheet.absoluteFill} />

        {/* THE INNER CONTENT
           Note: I switched bg-cardBg to use a semi-transparent opacity (0.7) 
           so the BlurView actually has something to blur!
        */}
        <View
          className="p-[30px]"
          style={{
            backgroundColor: Platform.OS === 'ios' ? '#F0E6D8' : '#F0E6D8',
          }}>
          <HeaderPrimary text={title} />
          <Subtitle className="mb-9 mt-4" text={description} />
          <PaginationDots totalScreens={totalScreens} currentIndex={currentIndex} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrapper: {
    // We apply shadow here. We DON'T use overflow: 'hidden' here.
    borderRadius: 50,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
      },
      android: {
        elevation: 7,
        // Android shadow sometimes clips if there's zero margin
        marginHorizontal: 4,
        marginBottom: 10,
      },
    }),
  },
  clippingContainer: {
    // This clips the background gradient and blurview to the custom radii
    overflow: 'hidden',
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 50,
    backgroundColor: 'transparent',
    // Modern 'Glass' Borders
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0)',
  },
});
