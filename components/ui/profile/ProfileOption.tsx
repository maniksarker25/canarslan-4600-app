// /components/ui/profile/ProfileOption.tsx
import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IconBadge from '@/components/ui/icons/IconBadge';
import InputLabel from '@/components/ui/shared/InputLabel';

interface ProfileOptionProps {
  icon: React.ReactNode;
  text: string;
  onPress?: () => void;
  isDestructive?: boolean;
  showChevron?: boolean;
  rightElement?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  iconBadgeStyle?: StyleProp<ViewStyle>; // ✅ New prop for custom icon badge styles
  iconBadgeSize?: number; // ✅ New prop for custom icon badge size
  iconBadgeBorderColor?: string; // ✅ New prop for custom border color
  iconBadgeBackgroundColor?: string; // ✅ New prop for custom background color
}

const ProfileOption = ({
  icon,
  text,
  onPress,
  isDestructive = false,
  showChevron = true,
  rightElement,
  style,
  iconBadgeStyle,
  iconBadgeSize = 30,
  iconBadgeBorderColor,
  iconBadgeBackgroundColor,
}: ProfileOptionProps) => {
  // Determine default colors based on destructive state
  const defaultBgColor = isDestructive ? '#F5F5F5' : '#F5F5F5';
  const defaultBorderColor = isDestructive ? '#EF4444' : '#BDBDBD00';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="mb-[10px] flex-row items-center justify-between rounded-[10px] p-[12px]"
      style={[
        {
          backgroundColor: '#FFFFFF',
          borderWidth: 0,
          borderColor: 'none',
        },
        style,
      ]}>
      <View className="flex-row items-center gap-3">
        <IconBadge
          icon={icon}
          size={iconBadgeSize}
          style={[
            {
              backgroundColor: iconBadgeBackgroundColor || defaultBgColor,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: iconBadgeBorderColor || defaultBorderColor,
            },
            iconBadgeStyle,
          ]}
        />
        <InputLabel
          style={{
            marginBottom: 0,
            fontSize: 14,
            lineHeight: 18,
            color: isDestructive ? '#EF4444' : '#212121',
          }}
          text={text}
        />
      </View>
      {rightElement
        ? rightElement
        : showChevron &&
          !isDestructive && <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />}
    </TouchableOpacity>
  );
};

export default ProfileOption;
