import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import BackButton from '@/components/ui/shared/BackButton';
import { useTranslation } from 'react-i18next';
import {
  BuildingIcon,
  StoreIcon,
  OneManIcon,
  MailBoxIcon,
  PhoneIcon,
  LocationIcon,
  PageIcon,
} from '@/components/icons';

const BusinessInformation = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { t } = useTranslation();

  const businessData = [
    {
      label: t('profile.companyName').toUpperCase(),
      value: user?.companyName,
      icon: <BuildingIcon size={18} color="#9CA3AF" />,
    },
    {
      label: t('profile.businessType').toUpperCase(),
      value: user?.businessType || user?.role,
      icon: <StoreIcon size={18} color="#9CA3AF" />,
    },
    {
      label: t('profile.contactPerson').toUpperCase(),
      value: user?.contactPerson || user?.fullName,
      icon: <OneManIcon useGradient={false} width={18} height={18} color="#9CA3AF" />,
    },
    {
      label: t('auth.emailAddress').toUpperCase(),
      value: user?.email,
      icon: <MailBoxIcon size={18} color="#9CA3AF" />,
    },
    {
      label: t('auth.phone').toUpperCase(),
      value: user?.phone ? String(user.phone) : '',
      icon: <PhoneIcon size={18} color="#9CA3AF" />,
    },
    {
      label: t('confirmOrder.address').toUpperCase(),
      value: user?.address,
      icon: <LocationIcon size={18} color="#9CA3AF" />,
    },
    {
      label: t('profile.vatTaxId').toUpperCase(),
      value: user?.vatTaxId,
      icon: <PageIcon size={18} color="#9CA3AF" />,
    },
  ];

  return (
    <>
      <StatusBar translucent barStyle="dark-content" />
      <LinearGradient
        colors={['#EEE6E1', '#EEE6E1', '#EEE6E1']}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}>
        <SafeAreaView edges={['top']} className="flex-1" style={{ backgroundColor: 'transparent' }}>
          {/* Header */}
          <View className="flex-row items-center justify-between px-4 py-3">
            <BackButton onPress={() => router.back()} />
            <Text className="font-nunitoBold text-[18px] text-[#1E293B]">{t('profile.businessInformation')}</Text>
            <View className="w-10" />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40, paddingTop: 12 }}>
            {/* White Card Container */}
            <View className="rounded-[18px] bg-white p-4 shadow-sm">
              {businessData.map((item, index) => (
                <React.Fragment key={item.label}>
                  <View className="flex-row items-start py-2">
                    <View className="mt-1 w-6 items-center justify-center">{item.icon}</View>
                    <View className="ml-3 flex-1">
                      <Text className="font-nunitoBold text-[11px] tracking-wider text-[#9CA3AF]">
                        {item.label}
                      </Text>
                      <Text className="mt-0.5 font-nunitoSemi text-[15px] text-[#1F2937]">
                        {item.value}
                      </Text>
                    </View>
                  </View>

                  {/* Divider line between items */}
                  {index < businessData.length - 1 && (
                    <View className="my-2.5 h-[1px] bg-[#F3F4F6]" />
                  )}
                </React.Fragment>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default BusinessInformation;
