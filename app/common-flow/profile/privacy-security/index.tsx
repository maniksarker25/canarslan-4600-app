import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import PasswordInput from '@/components/ui/inputs/PasswordInput';
import PrimaryButton from '@/components/ui/shared/button/PrimaryButton';
import { LockIcon } from '@/components/icons';
import Toast from 'react-native-toast-message';
import BackButton from '@/components/ui/shared/BackButton';
import { useTranslation } from 'react-i18next';

const PrivacyAndSecurityScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [errors, setErrors] = useState<{
    currentPassword?: boolean;
    newPassword?: boolean;
    confirmPassword?: boolean;
  }>({});

  const handleSaveChanges = () => {
    const newErrors: {
      currentPassword?: boolean;
      newPassword?: boolean;
      confirmPassword?: boolean;
    } = {};

    if (!currentPassword) {
      newErrors.currentPassword = true;
      Toast.show({
        type: 'error',
        text1: t('confirmOrder.requiredFieldWarning'),
        text2: t('profile.requiredCurrentPassword'),
      });
      setErrors(newErrors);
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      newErrors.newPassword = true;
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('profile.invalidNewPassword'),
      });
      setErrors(newErrors);
      return;
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = true;
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('profile.passwordMismatch'),
      });
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      Toast.show({
        type: 'success',
        text1: t('profile.passwordChanged'),
        text2: t('profile.passwordChangedMsg'),
      });
      router.back();
    }, 500);
  };

  const inputStyles = {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
          <View className="flex-row items-center justify-between px-4 py-3">
            <BackButton onPress={() => router.back()} />

            <Text className="font-nunitoBold text-[18px] text-[#1E293B]">{t('profile.privacySecurity')}</Text>

            <View className="w-10" />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: 40,
              paddingTop: 10,
              flexGrow: 1,
              justifyContent: 'space-between',
            }}>
            <View>
              {/* Title & Subtitle */}
              <View className="mb-6 mt-2">
                <Text className="font-nunitoBold text-[22px] text-[#1E293B]">
                  {t('profile.privacyTitle')}
                </Text>
                <Text className="mt-1 font-nunito text-[14px] text-[#6B7280]">
                  {t('profile.privacySubtitle')}
                </Text>
              </View>

              {/* Form Fields */}
              <View className="space-y-4">
                {/* Current Password */}
                <View className="mb-4">
                  <PasswordInput
                    label={t('profile.currentPassword')}
                    labelColor="#374151"
                    placeHolder={t('profile.currentPasswordPlaceholder')}
                    placeholderColor="#9CA3AF"
                    name="currentPassword"
                    value={currentPassword}
                    handler={(_, val) => {
                      setCurrentPassword(val);
                      if (errors.currentPassword)
                        setErrors((prev) => ({ ...prev, currentPassword: false }));
                    }}
                    error={errors.currentPassword}
                    inputStyle={inputStyles}
                    lockIcon={<LockIcon size={18} color="#9CA3AF" />}
                    showLeftIcon={true}
                  />
                </View>

                {/* New Password */}
                <View className="mb-4">
                  <PasswordInput
                    label={t('profile.newPassword')}
                    labelColor="#374151"
                    placeHolder={t('profile.newPasswordPlaceholder')}
                    placeholderColor="#9CA3AF"
                    name="newPassword"
                    value={newPassword}
                    handler={(_, val) => {
                      setNewPassword(val);
                      if (errors.newPassword)
                        setErrors((prev) => ({ ...prev, newPassword: false }));
                    }}
                    error={errors.newPassword}
                    inputStyle={inputStyles}
                    lockIcon={<LockIcon size={18} color="#9CA3AF" />}
                    showLeftIcon={true}
                  />
                </View>

                {/* Confirm Password */}
                <View className="mb-6">
                  <PasswordInput
                    label={t('profile.confirmPassword')}
                    labelColor="#374151"
                    placeHolder={t('profile.confirmPasswordPlaceholder')}
                    placeholderColor="#9CA3AF"
                    name="confirmPassword"
                    value={confirmPassword}
                    handler={(_, val) => {
                      setConfirmPassword(val);
                      if (errors.confirmPassword)
                        setErrors((prev) => ({ ...prev, confirmPassword: false }));
                    }}
                    error={errors.confirmPassword}
                    inputStyle={inputStyles}
                    lockIcon={<LockIcon size={18} color="#9CA3AF" />}
                    showLeftIcon={true}
                  />
                </View>
              </View>
            </View>

            {/* Save Changes Button */}
            <View className="mt-8 pb-4">
              <PrimaryButton
                title={t('profile.saveChanges')}
                onPress={handleSaveChanges}
                isLoading={isSaving}
                className="rounded-[10px]"
                gradientColors={['#C4202B', '#C4202B']}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default PrivacyAndSecurityScreen;
