import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  ImageSourcePropType,
  GestureResponderEvent,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { VerifiedIcon } from '@/components/icons';

type AvatarProps = {
  source?: ImageSourcePropType;
  width?: number;
  height?: number;
  style?: ViewStyle;
  className?: string;
  verified?: boolean;
  badge?: React.ReactNode;
  verifiedOffsetX?: number;
  verifiedOffsetY?: number;
  verifiedSize?: number;
  onPress?: (event: GestureResponderEvent) => void;
};

// ✅ Default avatar image - use existing path
const DEFAULT_AVATAR = require('@/assets/images/avatar_default.png');
// OR if you have it in customer folder:
// const DEFAULT_AVATAR = require('@/assets/customer/avatar_default.png');

const Avatar: React.FC<AvatarProps> = ({
  source,
  width = 44,
  height = 44,
  style,
  className,
  verified = false,
  badge,
  verifiedOffsetX = -2,
  verifiedOffsetY = -2,
  verifiedSize = 10,
  onPress,
}) => {
  const flattenedStyle = StyleSheet.flatten(style);
  const borderRadius = flattenedStyle?.borderRadius ?? 10;

  return (
    <TouchableOpacity
      className={className}
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      disabled={!onPress}
      style={[
        {
          width,
          height,
          borderWidth: 1,
          borderColor: '#2B7FFF1A',
          borderRadius: 10,
          backgroundColor: '#2B7FFF1A',
        },
        styles.container,
        style,
      ]}>
      <Image
        source={source ?? DEFAULT_AVATAR}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: borderRadius,
        }}
      />

      {(badge || verified) && (
        <View
          style={{
            position: 'absolute',
            right: -verifiedOffsetX,
            bottom: -verifiedOffsetY,
          }}>
          {badge ? badge : <VerifiedIcon size={verifiedSize} />}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
});
