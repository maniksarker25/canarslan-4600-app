import React from 'react';
import { StatusBar, View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import HeaderPrimary from '@/components/ui/shared/HeaderPrimary';
import PrimaryButton from '@/components/ui/shared/button/PrimaryButton';
import FormLayout from '@/components/ui/layouts/FormLayout';
import PasswordInput from '@/components/ui/inputs/PasswordInput';
import ResetPasswordFields from '@/components/formFields/ResetPasswordFields';
import Subtitle from '@/components/ui/shared/Subtitle';
import { validateFields } from '@/utils/formValidate';
import Toast from 'react-native-toast-message';
import { useResetPasswordMutation } from '@/store/api/userApi';
import { useTranslation } from 'react-i18next';

const ResetPasswordScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { fields, setFields } = ResetPasswordFields();

  const getField = (name: string) => fields.find((f) => f.name === name);
  const updateField = (name: string, value: string | number | boolean) =>
    setFields((prev) =>
      prev.map((field) => (field.name === name ? { ...field, value, error: false } : field))
    );

  const handleReset = async () => {
    // Validate fields
    const isValid = validateFields(fields, setFields);
    if (!isValid) return;

    const password = (getField('password')?.value as string) || '';
    const confirmPassword = (getField('confirmPassword')?.value as string) || '';

    // Check if passwords match
    if (password !== confirmPassword) {
      setFields((prev) =>
        prev.map((field) => (field.name === 'confirmPassword' ? { ...field, error: true } : field))
      );

      Toast.show({
        type: 'error',
        text1: t('profile.passwordMismatch'),
        text2: t('auth.passwordMismatchMsg'),
      });
      return;
    }

    try {
      const response = await resetPassword({
        email: email || '',
        password,
        confirmPassword,
      }).unwrap();

      if (response.success) {
        Toast.show({
          type: 'success',
          text1: t('auth.passwordResetSuccessful'),
          text2: response.message || t('auth.passwordResetSuccessfulMsg'),
          visibilityTime: 3000,
          autoHide: true,
        });

        // Navigate to login after toast
        setTimeout(() => {
          router.replace('/(auth)');
        }, 1500);
      } else {
        Toast.show({
          type: 'error',
          text1: t('profile.updateFailed'),
          text2: response.message || t('auth.resendFailed'),
        });
      }
    } catch (error: any) {
      console.error('Reset password error:', error);
      Toast.show({
        type: 'error',
        text1: t('profile.updateFailed'),
        text2: error?.data?.message || error?.message || t('auth.verificationErrorMsg'),
      });
    }
  };

  return (
    <>
      <StatusBar translucent barStyle="dark-content" />

      <FormLayout>
        <View className="flex items-center justify-center">
          <HeaderPrimary text={t('auth.createNewPassword')} className="mb-4 w-full text-start" />
          <Subtitle
            text={t('auth.enterNewPasswordReset')}
            className="mb-8 w-full text-start"
          />
        </View>

        <View className="mb-4">
          <PasswordInput
            label={t('auth.newPasswordLabel')}
            placeHolder={t('profile.newPasswordPlaceholder')}
            inputStyle={{ backgroundColor: '#F9FAFB' }}
            labelColor="#374151"
            name="password"
            value={(getField('password')?.value as string) || ''}
            handler={(_, value) => updateField('password', value)}
            error={!!getField('password')?.error}
            keyboard="default"
            showLeftIcon={true}
          />
        </View>

        <View className="mb-4">
          <PasswordInput
            label={t('auth.confirmNewPasswordLabel')}
            placeHolder={t('profile.confirmPasswordPlaceholder')}
            name="confirmPassword"
            inputStyle={{ backgroundColor: '#F9FAFB' }}
            labelColor="#374151"
            value={(getField('confirmPassword')?.value as string) || ''}
            handler={(_, value) => updateField('confirmPassword', value)}
            error={!!getField('confirmPassword')?.error}
            keyboard="default"
            showLeftIcon={true}
          />
        </View>

        {/* Submit Button with Loading State */}
        <PrimaryButton
          title={isLoading ? t('auth.updating') : t('auth.updatePassword')}
          onPress={handleReset}
          isLoading={isLoading}
          disabled={isLoading}
        />
      </FormLayout>
    </>
  );
};

export default ResetPasswordScreen;
