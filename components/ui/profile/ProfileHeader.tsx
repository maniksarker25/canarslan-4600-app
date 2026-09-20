// /components/ui/profile/ProfileHeader.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageSourcePropType } from 'react-native';
import ImageView from 'react-native-image-viewing';
import Avatar from '../shared/Avatar';
import { MailBoxIcon, PhoneIcon, LocationIcon, IIcon } from '@/components/icons';
import { useTranslation } from 'react-i18next';

interface ProfileHeaderProps {
  avatarUrl?: string | ImageSourcePropType;
  fullName?: string;
  role?: string;
  email?: string;
  phone?: string;
  address?: string;
  isVerified?: boolean;
  statusText?: string;
  title?: string;
  onEditPress?: () => void;
}

const ProfileHeader = ({
  avatarUrl,
  fullName = 'James Arther',
  role = 'Restaurant',
  email = 'james@bosphorus-restaurant.com',
  phone = '+1 (212) 555-1234',
  address = '42 Hudson St, Manhattan, New York, 10013',
  isVerified = false,
  statusText,
  title = 'My Profile',
  onEditPress,
}: ProfileHeaderProps) => {
  const [viewerVisible, setViewerVisible] = useState(false);
  const { t } = useTranslation();

  const imageSource: ImageSourcePropType | undefined =
    typeof avatarUrl === 'string' && avatarUrl
      ? { uri: avatarUrl }
      : typeof avatarUrl === 'number'
        ? avatarUrl
        : typeof avatarUrl === 'object' && avatarUrl
          ? (avatarUrl as ImageSourcePropType)
          : undefined;

  const handleImagePress = () => {
    if (typeof avatarUrl === 'string' && avatarUrl) {
      setViewerVisible(true);
    }
  };

  // Determine status text based on verified flag if statusText is not explicitly passed
  const activeStatusText = statusText || (isVerified ? t('profile.accountApproved') : t('profile.pendingApproval'));

  return (
    <View className="mb-4">
      {/* Top Header Row: Title & Edit Button */}
      <View className="mb-4 flex-row items-center justify-between pt-2">
        <Text className="font-nunitoBold text-[24px] text-[#1E293B]">{title}</Text>
        <TouchableOpacity
          onPress={onEditPress}
          activeOpacity={0.7}
          className="rounded-[8px] bg-[#FDE8E8] px-4 py-1.5">
          <Text className="font-nunitoBold text-[13px] text-[#D32F2F]">{t('profile.edit')}</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Info Main Card */}
      <View className="rounded-[18px] bg-white p-4 shadow-sm">
        {/* Profile Basic Info Row */}
        <View className="flex-row items-center">
          <TouchableOpacity onPress={handleImagePress} activeOpacity={0.8}>
            <Avatar
              source={imageSource}
              width={64}
              height={64}
              verified={isVerified}
              verifiedSize={14}
              verifiedOffsetX={-8}
              verifiedOffsetY={-8}
              style={{
                borderRadius: 32,
                borderWidth: 0,
                backgroundColor: '#F3F4F6',
              }}
              badge={!isVerified && <IIcon size={16} color="#DC2626" />}
            />
          </TouchableOpacity>

          <View className="ml-3.5 flex-1 justify-center">
            <Text numberOfLines={1} className="font-nunitoBold text-[18px] text-[#1F2937]">
              {fullName}
            </Text>
            {role ? (
              <Text numberOfLines={1} className="mt-0.5 font-nunito text-[14px] text-[#6B7280]">
                {role}
              </Text>
            ) : null}

            {/* Status Badge */}
            <View className="mt-1 flex-row items-center">
              <View
                className={`h-2 w-2 rounded-full ${isVerified ? 'bg-[#16A34A]' : 'bg-[#DC2626]'}`}
              />
              <Text
                className={`ml-1.5 font-nunitoSemi text-[12px] ${isVerified ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                {activeStatusText}
              </Text>
            </View>
          </View>
        </View>

        {/* Divider Line */}
        <View className="my-3.5 h-[1px] bg-[#E5E7EB]" />

        {/* Contact Information Section */}
        <View>
          <Text className="mb-3 font-nunitoBold text-[15px] text-[#1E293B]">
            {t('profile.contactInformation')}
          </Text>

          {/* Email Row */}
          <View className="flex-row items-center py-1.5">
            <View className="w-6 items-center justify-center">
              <MailBoxIcon size={18} color="#6B7280" />
            </View>
            <Text numberOfLines={1} className="ml-2.5 font-nunito text-[14px] text-[#4B5563]">
              {email}
            </Text>
          </View>

          {/* Sub-divider */}
          <View className="my-2 h-[1px] bg-[#F3F4F6]" />

          {/* Phone Row */}
          <View className="flex-row items-center py-1.5">
            <View className="w-6 items-center justify-center">
              <PhoneIcon size={18} color="#6B7280" />
            </View>
            <Text numberOfLines={1} className="ml-2.5 font-nunito text-[14px] text-[#4B5563]">
              {phone}
            </Text>
          </View>

          {/* Sub-divider */}
          <View className="my-2 h-[1px] bg-[#F3F4F6]" />

          {/* Address Row */}
          <View className="flex-row items-center py-1.5">
            <View className="w-6 items-center justify-center">
              <LocationIcon size={18} color="#6B7280" />
            </View>
            <Text
              numberOfLines={2}
              className="ml-2.5 flex-1 font-nunito text-[14px] text-[#4B5563]">
              {address}
            </Text>
          </View>
        </View>
      </View>

      {/* Image Viewer Modal */}
      {typeof avatarUrl === 'string' && avatarUrl ? (
        <ImageView
          images={[{ uri: avatarUrl }]}
          imageIndex={0}
          visible={viewerVisible}
          onRequestClose={() => setViewerVisible(false)}
          swipeToCloseEnabled={true}
          doubleTapToZoomEnabled={true}
          presentationStyle="overFullScreen"
          animationType="fade"
        />
      ) : null}
    </View>
  );
};

export default ProfileHeader;
