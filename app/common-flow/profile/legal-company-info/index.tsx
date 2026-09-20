// /app/common-flow/profile/legal-company-info/index.tsx
import React from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import BackButton from '@/components/ui/shared/BackButton';
import { useGetLegalInfoQuery } from '@/store/api/legalApi';
import { useTranslation } from 'react-i18next';

const LegalCompanyInfoScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: dbLegalInfo, isLoading, isError, refetch } = useGetLegalInfoQuery();

  const backendData = dbLegalInfo?.data;
  const sections = backendData
    ? [
        { label: t('profile.companyName'), value: backendData.companyName },
        { label: t('profile.businessType'), value: backendData.businessType },
        { label: t('profile.registeredAddress'), value: backendData.registeredAddress },
        { label: t('profile.contactEmail'), value: backendData.contactEmail },
        { label: t('profile.contactPhone'), value: backendData.contactPhone },
        { label: t('profile.jurisdiction'), value: backendData.jurisdiction },
        {
          label: t('profile.officialWebsite'),
          value: backendData.officialWebsite,
          isLink: true,
        },
      ]
    : [];

  const handleLinkPress = async (url: string) => {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Unable to open the link');
    }
  };

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
          <View className="flex-row items-center justify-between px-4 pb-3 pt-2">
            <BackButton onPress={() => router.back()} />
            <Text className="font-nunitoBold text-[18px] text-[#1E293B]">{t('profile.legalCompanyInfo')}</Text>
            <View className="w-10" />
          </View>

          {/* Loading */}
          {isLoading && (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#C4202B" />
            </View>
          )}

          {/* Error */}
          {(isError || !backendData) && !isLoading && (
            <View className="flex-1 items-center justify-center p-4">
              <Text className="mb-2 text-center font-nunito text-[#EF4444]">
                Failed to load legal information
              </Text>
              <TouchableOpacity onPress={refetch} className="mt-4">
                <Text className="font-nunitoBold text-[#C4202B]">{t('common.retry')}</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Main Content */}
          {backendData && !isLoading && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 40 }}>
              {/* White Card Container */}
              <View className=" bg-background p-5 ">
                {sections.map((item, index) => (
                  <React.Fragment key={item.label}>
                    <View className="flex-row items-start py-2.5">
                      <View className="flex-1">
                        <Text className="font-nunitoBold text-[11px] uppercase tracking-wider text-[#9CA3AF]">
                          {item.label}
                        </Text>
                        {item.isLink ? (
                          <TouchableOpacity onPress={() => handleLinkPress(item.value)}>
                            <Text className="mt-1 font-nunitoSemi text-[15px] text-[#C4202B] underline">
                              {item.value}
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <Text className="mt-1 font-nunitoSemi text-[15px] text-[#1F2937]">
                            {item.value}
                          </Text>
                        )}
                      </View>
                    </View>

                    {/* Divider line between items */}
                    {index < sections.length - 1 && (
                      <View className="my-1.5 h-[1px] bg-[#F3F4F6]" />
                    )}
                  </React.Fragment>
                ))}
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default LegalCompanyInfoScreen;
