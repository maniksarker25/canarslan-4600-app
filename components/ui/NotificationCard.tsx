// /components/ui/NotificationCard.tsx
import { StyleProp, Text, TouchableOpacity, View, ViewStyle, ActivityIndicator } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Notification } from '@/types/notification';

interface Props {
  notification: Notification;
  style?: StyleProp<ViewStyle>;
  className?: string;
  onPress?: (notification: Notification) => void;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

const NotificationCard = ({ notification, style, className = '', onPress, onDelete, isDeleting = false }: Props) => {
  const { title, message, timestamp, isRead } = notification;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress?.(notification)}
      className={`relative mb-3 rounded-[16px] p-4 shadow-sm ${
        !isRead ? 'bg-[#F0F8FF]' : 'bg-white'
      } ${className}`}
      style={style}>
      {/* Red Dot Badge for Unread */}
      {!isRead && (
        <View className="absolute right-3.5 top-3.5 h-2.5 w-2.5 rounded-full bg-[#C4202B]" />
      )}

      {/* Card Content */}
      <View className="flex-row items-center justify-between">
        <View className="flex-1 pr-3">
          <Text className="font-nunitoBold text-[16px] text-[#1F2937]">{title}</Text>
          {message ? (
            <Text className="mt-1 font-nunito text-[13.5px] leading-5 text-[#6B7280]">
              {message}
            </Text>
          ) : null}
          <Text className="mt-2.5 font-nunitoBold text-[12px] text-[#6B7280]">{timestamp}</Text>
        </View>

        {isDeleting ? (
          <ActivityIndicator size="small" color="#DC2626" style={{ padding: 1.5 }} />
        ) : (
          onDelete && (
            <TouchableOpacity
              onPress={() => onDelete(notification.id)}
              className="p-1.5 rounded-full bg-[#FEF2F2]"
              activeOpacity={0.6}
            >
              <Ionicons name="trash-outline" size={16} color="#DC2626" />
            </TouchableOpacity>
          )
        )}
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;
