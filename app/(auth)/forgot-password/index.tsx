import React from 'react';
import { StatusBar, View } from 'react-native';
import HeaderPrimary from '@/components/ui/shared/HeaderPrimary';
import InputField from '@/components/ui/inputs/Input';
import PrimaryButton from '@/components/ui/shared/button/PrimaryButton';
import ForgotPasswordFields from '@/components/formFields/ForgotPasswordFields';
import FormLayout from '@/components/ui/layouts/FormLayout';
import { useRouter } from 'expo-router';
import Subtitle from '@/components/ui/shared/Subtitle';
import { MailBoxIcon } from '@/components/icons';
import { useForgotPasswordMutation } from '@/store/api/userApi';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

const ForgotPasswordScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const { fields, setFields } = ForgotPasswordFields();

  const getField = (name: string) => fields.find((f) => f.name === name);
  const updateField = (name: string, value: string) =>
    setFields((prev) => prev.map((f) => (f.name === name ? { ...f, value, error: false } : f)));

  const handleSendCode = async () => {
    const payload = fields.reduce((acc: Record<string, any>, field) => {
      acc[field.name] = field.value;
      return acc;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, {});

    const email = payload.email;
    if (!email) {
      Toast.show({
        type: 'error',
        text1: t('auth.emailRequired'),
        text2: t('auth.emailRequiredMsg'),
      });
      return;
    }

    try {
      const response = await forgotPassword({ email }).unwrap();
      if (response.success) {
        Toast.show({
          type: 'success',
          text1: t('auth.codeSent'),
          text2: response.message || t('auth.verificationCodeSent'),
        });
        router.push({
          pathname: '/forgot-password/forgotPasswordOtp',
          params: { email },
        });
      } else {
        Toast.show({
          type: 'error',
          text1: t('common.error'),
          text2: response.message || t('auth.resendFailed'),
        });
      }
    } catch (err: any) {
      console.error('Forgot password error:', err);
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: err?.data?.message || err?.message || t('support.failedSent'),
      });
    }
  };

  return (
    <>
      <StatusBar translucent barStyle="dark-content" />

      <FormLayout>
        <View className="flex">
          <View className=" flex items-center">
            <HeaderPrimary text={t('auth.forgotPasswordTitle')} className="mb-4 w-full text-start" />
            <Subtitle
              text={t('auth.enterEmailReset')}
              className="mb-8 w-full text-start"
            />
          </View>

          <View className="mb-4">
            <InputField
              label={t('auth.emailAddress')}
              placeHolder={t('auth.emailPlaceholder')}
              keyboard="email-address"
              name="email"
              inputStyle={{ backgroundColor: '#F9FAFB', paddingHorizontal: 16 }}
              labelColor="#374151"
              placeholderColor="#11182780"
              value={(getField('email')?.value as string) || ''}
              handler={(_, value) => updateField('email', value)}
              error={!!getField('email')?.error}
              leftIcon={<MailBoxIcon size={18} color="#9CA3AF" />}
              showLeftIcon={true}
            />
          </View>

          <PrimaryButton title={t('auth.sendCode')} onPress={handleSendCode} isLoading={isLoading} />
        </View>
      </FormLayout>
    </>
  );
};

export default ForgotPasswordScreen;
