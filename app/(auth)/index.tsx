import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Text,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLoginMutation, useLazyGetProfileQuery } from '@/store/api/userApi';
import { setUser, setToken } from '@/store/authSlice';
import { UserType } from '@/types/UserType';
import { useTranslation } from 'react-i18next';

import PrimaryButton from '@/components/ui/shared/button/PrimaryButton';
import HeaderPrimary from '@/components/ui/shared/HeaderPrimary';
import LoginFields from '@/components/formFields/LoginFields';
import PasswordInput from '@/components/ui/inputs/PasswordInput';
import FormLayout from '@/components/ui/layouts/FormLayout';
import { validateFields } from '@/utils/formValidate';
import InputField from '@/components/ui/inputs/Input';
import Subtitle from '@/components/ui/shared/Subtitle';
import InputCheckbox from '@/components/ui/inputs/InputCheckbox';
import Toast from 'react-native-toast-message';
import { MailBoxIcon } from '@/components/icons';

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [getProfile, { isLoading: isProfileLoading }] = useLazyGetProfileQuery();

  const isSaving = isLoginLoading || isProfileLoading;

  // login fields
  const { fields, setFields } = LoginFields(); // make sure LoginFields() returns an array of field objects

  const getField = (name: string) => fields.find((field) => field.name === name);

  const updateField = (name: string, value: string | boolean) => {
    setFields((prev) =>
      prev.map((field) => (field.name === name ? { ...field, value, error: false } : field))
    );
  };

  /* ---------------- Handlers ---------------- */

  const handleLoginPress = async () => {
    const isValid = validateFields(fields, setFields);
    if (!isValid) return;

    const email = (getField('email')?.value as string) || '';
    const password = (getField('password')?.value as string) || '';

    try {
      const response = await login({
        email,
        password,
        playerId: '',
        platform: Platform.OS,
      }).unwrap();

      if (response.success) {
        const { accessToken, refreshToken, role } = response.data;

        // Save tokens
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);

        // Update Redux state token immediately
        dispatch(setToken(accessToken));

        // Fetch full profile info
        const profileRes = await getProfile().unwrap();

        if (profileRes.success) {
          const profile = profileRes.data as any;
          const isUserBlocked = profile.isBlocked || profile.user?.isBlocked || false;

          if (isUserBlocked) {
            router.replace('/(auth)/account-blocked');
            return;
          }

          const userObj: UserType = {
            id: (typeof profile.user === 'object' ? profile.user?._id : profile.user) || profile._id,
            fullName: profile.name,
            avatarUrl: profile.profile_image,
            phone: profile.phone,
            email: profile.email,
            address: profile.address || profile.businessAddress,
            role: role,
            companyName: profile.businessName,
            businessType: profile.businessType,
            vatTaxId: profile.taxId,
            isBlocked: isUserBlocked,
          };

          // Store profile in AsyncStorage and Redux
          await AsyncStorage.setItem('user', JSON.stringify(userObj));
          dispatch(setUser(userObj));

          Toast.show({
            type: 'success',
            text1: 'Login Successful',
            text2: `Welcome back, ${userObj.fullName}!`,
            visibilityTime: 2000,
            autoHide: true,
          });

          router.push('/(tabs)/home');
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: response.message || 'Invalid credentials.',
        });
      }
    } catch (err: any) {
      console.error('Login error:', err);
      Toast.show({
        type: 'error',
        text1: 'Login Error',
        text2: err?.data?.message || err?.message || 'An error occurred during login.',
      });
    }
  };
  return (
    <>
      <StatusBar translucent barStyle="dark-content" />
      <FormLayout
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
        }}>
        <View style={{ width: '100%' }}>
          {/* Logo */}
          <View className="items-center px-6">
            <Image
              source={require('@/assets/images/splash_logo.png')}
              className="mb-4 h-[200] w-[200]"
              resizeMode="contain"
            />
          </View>
          {/* ---------------- Title ---------------- */}
          <HeaderPrimary text={t('auth.signIn')} className="mb-4" />
          <Subtitle text={t('auth.signInSubtitle')} className="mb-8" />
          {/* ---------------- Email ---------------- */}

          <View className="mb-4">
            <InputField
              inputStyle={{ backgroundColor: '#F9FAFB', paddingHorizontal: 16 }}
              label={t('auth.emailAddress')}
              placeHolder={t('auth.emailPlaceholder')}
              keyboard="email-address"
              name="email"
              labelColor="#374151"
              placeholderColor="#11182780"
              required={true}
              showLabel={true}
              value={(getField('email')?.value as string) || ''}
              handler={(_, value) => updateField('email', value)}
              error={!!getField('email')?.error}
              leftIcon={<MailBoxIcon color="#9CA3AF" size={18} />} // 👈 Add mail icon
              showLeftIcon={true} // 👈 Show the icon
            />
          </View>

          {/* ---------------- Password ---------------- */}
          <View className="mb-4">
            <PasswordInput
              label={t('auth.password')}
              labelColor="#374151"
              placeHolder={t('auth.passwordPlaceholder')}
              placeholderColor="#11182780"
              name="password"
              value={(getField('password')?.value as string) || ''}
              handler={(_, value) => updateField('password', value)}
              error={!!getField('password')?.error}
              keyboard="default"
            />
          </View>

          <View className="mb-4 flex-row items-center justify-between gap-2">
            <InputCheckbox
              label={<Text>{t('auth.rememberMe')}</Text>}
              labelColor="#374151"
              name="remember"
              value={!!getField('remember')?.value}
              error={!!getField('remember')?.error}
              handler={(_, value) => updateField('remember', value)}
            />

            <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
              <Text className="font-nunitoSemi text-subtitle text-color-link ">
                {t('auth.forgotPassword')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* ---------------- Login Button ---------------- */}
          <PrimaryButton
            title={t('auth.login')}
            onPress={handleLoginPress}
            isLoading={isSaving}
            className="mb-4 mt-3 w-full "
          />

          {/* ---------------- Links ---------------- */}

          <View className="mb-4 flex-row justify-center  ">
            <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
              <Text className="  font-nunito text-subtitle  " style={{ color: '#6B7280' }}>
                {t('auth.noAccount')}{' '}
                <Text className="font-nunitoMedium  text-subtitle color-color-brand-primary ">
                  {t('auth.createAccount')}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* ---------------- Divider + Social ---------------- */}
          {/* <SocialAuthDivider
          providers={[
            {
              id: 'google',
              icon: require('@/assets/onboarding/google_icon.png'),
              onPress: () => console.log('Google Login'),
            },
            {
              id: 'apple',
              icon: require('@/assets/onboarding/apple_icon.png'),
              onPress: () => console.log('Apple Login'),
            },
          ]}
        /> */}
        </View>
      </FormLayout>
    </>
  );
}
