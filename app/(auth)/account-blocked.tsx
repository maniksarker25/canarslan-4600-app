import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

import BorderCard from '@/components/ui/shared/BorderCard';
import PrimaryButton from '@/components/ui/shared/button/PrimaryButton';
import IconBadge from '@/components/ui/icons/IconBadge';
import { OneManWithCircleBlockIcon } from '@/components/icons';

export default function AccountBlocked() {
  const router = useRouter();

  const handleBack = () => {
    router.replace('/');
  };

  return (
    <View className="flex-1 justify-center bg-background px-containerSm md:px-container">
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <BorderCard>
        {/* Icon */}
        <View className="mb-4 items-center">
          <IconBadge
            size={52}
            className="bg-color-status-error/10"
            // icon={<Text className="font-nunitoExtraBold text-xl text-color-status-error">!</Text>}
            icon={<OneManWithCircleBlockIcon size={24} color="#EF4444" />}
          />
        </View>

        {/* Text */}
        <View className="mb-6 gap-[10px]">
          <Text className="text-center font-nunitoBold text-title" style={{ color: '#FFFFFF' }}>
            Account Blocked
          </Text>

          <Text className="text-center font-nunitoMeidum text-[13px] color-color-text-secondary">
            Your account has been blocked by the administrator. You are no longer able to log in at
            this time.
          </Text>
        </View>

        {/* Button */}
        <PrimaryButton
          title="Go Back to Login"
          onPress={handleBack}
          className="w-full"
          style={{ borderRadius: 100 }}
        />
      </BorderCard>
    </View>
  );
}
