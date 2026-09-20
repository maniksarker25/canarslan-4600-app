import React from 'react';
import { StatusBar } from 'react-native';
import FormLayout from '@/components/ui/layouts/FormLayout';
import VerificationWrapper from '@/components/ui/inputs/VerificationWrapper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useVerifyResetOtpMutation, useForgotPasswordMutation } from '@/store/api/userApi';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

const ForgotPasswordOtp = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [verifyResetOtp] = useVerifyResetOtpMutation();
  const [forgotPassword] = useForgotPasswordMutation();

  const handleVerify = async (otp: string) => {
    try {
      const parsedOtp = parseInt(otp, 10);
      const response = await verifyResetOtp({
        email: email || '',
        resetCode: parsedOtp,
      }).unwrap();

      if (response.success) {
        Toast.show({
          type: 'success',
          text1: t('auth.codeVerified'),
          text2: response.message || t('auth.codeVerifiedMsg'),
        });
        router.push({
          pathname: '/forgot-password/resetPassword',
          params: { email },
        });
      } else {
        Toast.show({
          type: 'error',
          text1: t('auth.verificationFailed'),
          text2: response.message || t('auth.verificationFailedMsg'),
        });
      }
    } catch (err: any) {
      console.error('OTP Verification error:', err);
      Toast.show({
        type: 'error',
        text1: t('auth.verificationError'),
        text2: err?.data?.message || err?.message || t('auth.verificationErrorMsg'),
      });
    }
  };

  const handleResend = async () => {
    if (!email) return;
    try {
      const response = await forgotPassword({ email }).unwrap();
      if (response.success) {
        Toast.show({
          type: 'success',
          text1: t('auth.codeSent'),
          text2: response.message || t('auth.resendSuccessMsg'),
        });
      } else {
        Toast.show({
          type: 'error',
          text1: t('common.error'),
          text2: response.message || t('auth.resendFailed'),
        });
      }
    } catch (err: any) {
      console.error('Resend OTP error:', err);
      Toast.show({
        type: 'error',
        text1: t('auth.verificationError'),
        text2: err?.data?.message || err?.message || t('auth.verificationErrorMsg'),
      });
    }
  };

  return (
    <>
      <StatusBar translucent barStyle="dark-content" />
      <FormLayout>
        <VerificationWrapper
          title={t('auth.verifyOtp')}
          subtitle={t('auth.verifyOtpSubtitle')}
          email={email}
          otpLength={6}
          onVerify={handleVerify}
          resendOtp={handleResend}
        />
      </FormLayout>
    </>
  );
};

export default ForgotPasswordOtp;
