import React from 'react';
import { StatusBar } from 'react-native';
import FormLayout from '@/components/ui/layouts/FormLayout';
import VerificationWrapper from '@/components/ui/inputs/VerificationWrapper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useVerifyCodeMutation, useResendVerifyCodeMutation } from '@/store/api/userApi';
import { setToken } from '@/store/authSlice';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

const SignupOtp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { email } = useLocalSearchParams<{ email: string }>();
  const signupEmail = email || '';

  const [verifyCode] = useVerifyCodeMutation();
  const [resendVerifyCode] = useResendVerifyCodeMutation();

  const handleVerify = async (otp: string) => {
    try {
      const parsedOtp = parseInt(otp, 10);
      const response = await verifyCode({
        email: signupEmail,
        verifyCode: parsedOtp,
      }).unwrap();

      if (response.success) {
        const { accessToken, refreshToken } = response.data;

        // Save tokens
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);

        // Update token in Redux store
        dispatch(setToken(accessToken));

        Toast.show({
          type: 'success',
          text1: t('auth.signupVerificationSuccessful'),
          text2: response.message || t('auth.signupVerificationSuccessfulMsg'),
        });

        // Push to onboarding profile setup screen
        router.push('/(auth)/onboarding/profileSetup');
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

  const handleResend = async (resendEmail?: string) => {
    const targetEmail = resendEmail || signupEmail;
    if (!targetEmail) return;

    try {
      const response = await resendVerifyCode({ email: targetEmail }).unwrap();
      if (response.success) {
        Toast.show({
          type: 'success',
          text1: t('auth.codeSent'),
          text2: response.message || t('auth.verificationCodeSent'),
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
          email={signupEmail}
          otpLength={6}
          onVerify={handleVerify}
          resendOtp={handleResend}
        />
      </FormLayout>
    </>
  );
};

export default SignupOtp;
