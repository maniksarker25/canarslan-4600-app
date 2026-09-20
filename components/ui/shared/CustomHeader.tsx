import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';
import TextBodySmall from './TextBodySmall';
import Subtitle from './Subtitle';

type CustomHeaderProps = {
  title: string;
  subtitle?: string;
  backgroundColor?: string;
  backButton?: boolean;
  height?: number;
  paddingTop?: number;
  paddingBottom?: number;
  backIconSize?: number;
  backIconColor?: string;
  needPaddingX?: boolean;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  subtitle,
  backgroundColor = '#EEE6E1',
  backButton = true,
  height = 80,
  paddingTop = 0,
  paddingBottom = 0,
  backIconSize = 24,
  backIconColor = '#374151',
  needPaddingX = true,
}) => {
  const router = useRouter();

  return (
    <View
      className={`${needPaddingX ? 'px-containerSm md:px-container' : ''}`}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop,
        paddingBottom,
        backgroundColor,
        height,
        borderBottomWidth: 1,
        borderBottomColor: 'transparent',
      }}>
      {backButton && (
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginRight: 0 }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          {/* Gradient background */}
          <LinearGradient
            colors={['#F9FAFB', '#F9FAFB', '#F9FAFB', '#F9FAFB']}
            locations={[0.03, 0.7, 1, 1]} // approximate percentages (2.98% -> 0.03, 49.96% -> 0.5, etc.)
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 43,
              height: 43,
              borderWidth: 1,
              borderColor: '#FFFFFF00',
              borderRadius: 23,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons name="arrow-back" size={backIconSize} color={backIconColor} />
            {/* <Ionicons name="chevron-back" size={backIconSize} color="#fff" /> */}
          </LinearGradient>
        </TouchableOpacity>
      )}

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Subtitle
          text={title}
          style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 16, color: '#FFFFFF' }}
          numberOfLines={1}
        />
        {subtitle && <TextBodySmall text={subtitle} style={{ textAlign: 'left' }} />}
      </View>
    </View>
  );
};

export default CustomHeader;
