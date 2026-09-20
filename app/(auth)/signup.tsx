import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import HeaderPrimary from '@/components/ui/shared/HeaderPrimary';
import InputField from '@/components/ui/inputs/Input';
import PasswordInput from '@/components/ui/inputs/PasswordInput';
import PrimaryButton from '@/components/ui/shared/button/PrimaryButton';
import SignUpFields from '@/components/formFields/SignUpFields';
import { useRouter } from 'expo-router';
import FormLayout from '@/components/ui/layouts/FormLayout';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { validateFields } from '@/utils/formValidate';
import Subtitle from '@/components/ui/shared/Subtitle';
import Toast from 'react-native-toast-message';
import { MailBoxIcon, OneManIconBottomLess, PhoneIcon } from '@/components/icons';
import { useSignUpMutation } from '@/store/api/userApi';
import { useTranslation } from 'react-i18next';
import { useGetPrivacyPolicyQuery, useGetTermsConditionsQuery } from '@/store/api/legalApi';

// Lightweight HTML renderer — mirrors the one used on the standalone
// Terms & Conditions screen, so formatting stays consistent between
// the signup modal and the full page.
const renderHtml = (htmlText: string) => {
  if (!htmlText) return null;

  const regex = /(<[^>]+>)/g;
  const parts = htmlText.split(regex);

  const elements: React.ReactNode[] = [];
  let isH1 = false;
  let isH2 = false;
  let isBullet = false;

  parts.forEach((part, index) => {
    if (part.startsWith('<')) {
      const tag = part.toLowerCase();
      if (tag === '<h1>') isH1 = true;
      else if (tag === '</h1>') isH1 = false;
      else if (tag === '<h2>') isH2 = true;
      else if (tag === '</h2>') isH2 = false;
      else if (tag === '<li>') isBullet = true;
      else if (tag === '</li>') isBullet = false;
    } else {
      const text = part
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim();

      if (!text) return;

      if (isH1) {
        elements.push(
          <Text
            key={index}
            style={{
              fontFamily: 'Nunito-Bold',
              fontSize: 18,
              color: '#1E293B',
              marginTop: 12,
              marginBottom: 6,
            }}>
            {text}
          </Text>
        );
      } else if (isH2) {
        elements.push(
          <Text
            key={index}
            style={{
              fontFamily: 'Nunito-Bold',
              fontSize: 15,
              color: '#334155',
              marginTop: 10,
              marginBottom: 4,
            }}>
            {text}
          </Text>
        );
      } else if (isBullet) {
        elements.push(
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              paddingLeft: 6,
              marginVertical: 3,
            }}>
            <Text style={{ marginRight: 6, color: '#94A3B8' }}>•</Text>
            <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 13, color: '#475569', flex: 1 }}>
              {text}
            </Text>
          </View>
        );
      } else {
        elements.push(
          <Text
            key={index}
            style={{
              fontFamily: 'Nunito-Regular',
              fontSize: 13,
              color: '#475569',
              lineHeight: 18,
              marginTop: 4,
            }}>
            {text}
          </Text>
        );
      }
    }
  });

  return <View style={{ gap: 4 }}>{elements}</View>;
};

export default function CustomerSignup() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const { fields, setFields } = SignUpFields();
  const [signUp, { isLoading }] = useSignUpMutation();

  // ── Legal modal state ───────────────────────────────────────────────────
  const [legalType, setLegalType] = useState<'terms' | 'privacy' | null>(null);
  const [legalModalVisible, setLegalModalVisible] = useState(false);

  // Pre-fetch both on mount so the modal shows content instantly rather
  // than spinning the first time the user taps either link.
  const {
    data: privacyData,
    error: privacyError,
    refetch: refetchPrivacy,
  } = useGetPrivacyPolicyQuery();
  const {
    data: termsData,
    error: termsError,
    refetch: refetchTerms,
  } = useGetTermsConditionsQuery();

  const handleOpenLegal = (type: 'terms' | 'privacy') => {
    setLegalType(type);
    setLegalModalVisible(true);
  };

  const getField = (name: string) => fields.find((f) => f.name === name);
  const updateField = (name: string, value: string | number | boolean) =>
    setFields((prev) =>
      prev.map((field) => (field.name === name ? { ...field, value, error: false } : field))
    );

  // When user presses "Sign Up"
  const handleSignupPress = async () => {
    const agreeField = getField('agree');

    if (!agreeField?.value) {
      Toast.show({
        type: 'error',
        text1: t('auth.agreementRequired'),
        text2: t('auth.pleaseAcceptTerms'),
      });
      updateField('agree', false);
      return;
    }

    const isValid = validateFields(fields, setFields);
    if (!isValid) return;

    const password = (getField('password')?.value as string) || '';
    const confirmPassword = (getField('confirmPassword')?.value as string) || '';

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

    const firstName = (getField('firstName')?.value as string) || '';
    const lastName = (getField('lastName')?.value as string) || '';
    const name = `${firstName} ${lastName}`.trim();
    const email = (getField('email')?.value as string) || '';
    const phone = (getField('phone')?.value as string) || '';

    const signupPayload = {
      name,
      email,
      phone,
      password,
      confirmPassword,
      role: 'customer',
      platform: Platform.OS,
      playerId: '',
    };

    try {
      const response = await signUp(signupPayload).unwrap();
      if (response.success) {
        Toast.show({
          type: 'success',
          text1: t('auth.codeSent'),
          text2: response.message || t('auth.verificationCodeSent'),
        });

        router.push({
          pathname: '/(auth)/signupOtp',
          params: { email: signupPayload.email },
        });
      } else {
        Toast.show({
          type: 'error',
          text1: t('common.error'),
          text2: response.message || t('auth.resendFailed'),
        });
      }
    } catch (err: any) {
      console.error('Signup error:', err);
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
        <View className="mb-6 items-center">
          <HeaderPrimary text={t('auth.createAccountTitle')} className="mb-4 w-full text-start" />
          <Subtitle text={t('auth.createAccountSubtitle')} className="w-full text-start" />
        </View>

        <View className="mb-4 flex-row items-center gap-3">
          {/* First Name */}
          <View className="flex-1">
            <InputField
              label={t('auth.firstName')}
              placeHolder={t('auth.firstName')}
              keyboard="default"
              name="firstName"
              inputStyle={{ backgroundColor: '#F9FAFB', paddingHorizontal: 16 }}
              labelColor="#374151"
              placeholderColor="#11182780"
              value={(getField('firstName')?.value as string) || ''}
              handler={(_, value) => updateField('firstName', value)}
              error={!!getField('firstName')?.error}
              leftIcon={
                <OneManIconBottomLess size={17} style={{ marginTop: -1 }} color="#9CA3AF" />
              }
              showLeftIcon={true}
            />
          </View>

          {/* Last Name */}
          <View className="flex-1">
            <InputField
              label={t('auth.lastName')}
              placeHolder={t('auth.lastName')}
              keyboard="default"
              name="lastName"
              inputStyle={{ backgroundColor: '#F9FAFB', paddingHorizontal: 16 }}
              labelColor="#374151"
              placeholderColor="#11182780"
              value={(getField('lastName')?.value as string) || ''}
              handler={(_, value) => updateField('lastName', value)}
              error={!!getField('lastName')?.error}
              leftIcon={
                <OneManIconBottomLess style={{ marginTop: -1 }} size={17} color="#9CA3AF" />
              }
              showLeftIcon={true}
            />
          </View>
        </View>

        {/* Email */}
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

        <View className="mb-4">
          <InputField
            label={t('auth.phone')}
            placeHolder={t('auth.phonePlaceholder')}
            name="phone"
            keyboard="phone-pad"
            inputStyle={{ backgroundColor: '#F9FAFB', paddingHorizontal: 16 }}
            labelColor="#374151"
            placeholderColor="#11182780"
            value={(getField('phone')?.value as string) || ''}
            handler={(_, value) => updateField('phone', value)}
            error={!!getField('phone')?.error}
            leftIcon={<PhoneIcon size={17} color="#9CA3AF" />}
            showLeftIcon={true}
          />
        </View>

        {/* Password */}
        <View className="mb-4">
          <PasswordInput
            label={t('auth.password')}
            placeHolder={t('profile.newPasswordPlaceholder')}
            name="password"
            inputStyle={{ backgroundColor: '#F9FAFB' }}
            labelColor="#374151"
            placeholderColor="#11182780"
            value={(getField('password')?.value as string) || ''}
            handler={(_, value) => updateField('password', value)}
            error={!!getField('password')?.error}
            keyboard="default"
            showLeftIcon={true}
          />
        </View>

        {/* Confirm Password */}
        <View className="mb-4">
          <PasswordInput
            label={t('auth.confirmPassword')}
            placeHolder={t('profile.confirmPasswordPlaceholder')}
            name="confirmPassword"
            inputStyle={{ backgroundColor: '#F9FAFB' }}
            labelColor="#374151"
            placeholderColor="#11182780"
            value={(getField('confirmPassword')?.value as string) || ''}
            handler={(_, value) => updateField('confirmPassword', value)}
            error={!!getField('confirmPassword')?.error}
            keyboard="default"
            showLeftIcon={true}
          />
        </View>

        {/* Terms */}
        <View className="mb-4 flex-row items-start gap-3">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => updateField('agree', !getField('agree')?.value)}
            style={{
              width: 18,
              height: 18,
              borderWidth: 1.5,
              borderColor: getField('agree')?.error ? '#EF4444' : '#E9C5C6',
              backgroundColor: getField('agree')?.value ? '#B91C1C' : '#FFFFFF',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
              marginTop: 2,
            }}>
            {getField('agree')?.value && <Feather name="check" size={12} color="#FFFFFF" />}
          </TouchableOpacity>

          <View className="flex-1">
            <Text className="font-nunitoMedium text-subtitle text-[#6B7280]">
              {t('auth.agreeTermsPrivacy')
                .split(
                  /(Terms of Service|Privacy Policy|Nutzungsbedingungen|Datenschutzbestimmungen)/
                )
                .map((part, index) => {
                  if (part === 'Terms of Service' || part === 'Nutzungsbedingungen') {
                    return (
                      <Text
                        key={index}
                        onPress={() => handleOpenLegal('terms')}
                        style={{ textDecorationLine: 'underline' }}
                        className="font-nunitoBold text-subtitle text-[#C4202B]">
                        {part}
                      </Text>
                    );
                  }
                  if (part === 'Privacy Policy' || part === 'Datenschutzbestimmungen') {
                    return (
                      <Text
                        key={index}
                        onPress={() => handleOpenLegal('privacy')}
                        style={{ textDecorationLine: 'underline' }}
                        className="font-nunitoBold text-subtitle text-[#C4202B]">
                        {part}
                      </Text>
                    );
                  }
                  return part;
                })}
            </Text>
          </View>
        </View>

        <PrimaryButton title={t('auth.signUp')} onPress={handleSignupPress} isLoading={isLoading} />

        <View className="mb-7 mt-4 items-center">
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text className="font-nunitoMedium text-subtitle leading-[1.1] text-[#6B7280]">
              {t('auth.alreadyAccount')}{' '}
              <Text className="font-nunitoMedium text-subtitle leading-[1.1] text-[#C4202B]">
                {t('auth.signInLink')}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </FormLayout>

      {/* Legal Content Modal */}
      <Modal
        visible={legalModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLegalModalVisible(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            padding: 20,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              height: '90%',
              padding: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            {/* Header */}
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <Text style={{ fontFamily: 'Nunito-Bold', fontSize: 18, color: '#1E293B' }}>
                {legalType === 'terms' ? t('auth.termsOfService') : t('auth.privacyPolicy')}
              </Text>
              <TouchableOpacity onPress={() => setLegalModalVisible(false)} style={{ padding: 4 }}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View> */}

            {/* Scrollable Content */}
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginBottom: 15 }}>
              {legalType === 'terms' ? (
                termsData?.data?.description ? (
                  renderHtml(termsData.data.description)
                ) : termsError ? (
                  <View style={{ paddingVertical: 20, alignItems: 'center' }}>
                    <Text
                      style={{
                        fontFamily: 'Nunito-Bold',
                        color: '#EF4444',
                        textAlign: 'center',
                        marginBottom: 10,
                      }}>
                      Failed to load content
                    </Text>
                    <TouchableOpacity onPress={() => refetchTerms()}>
                      <Text
                        style={{
                          fontFamily: 'Nunito-Bold',
                          color: '#C4202B',
                          fontSize: 13,
                        }}>
                        {t('common.retry')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ paddingVertical: 30, alignItems: 'center' }}>
                    <ActivityIndicator size="small" color="#C4202B" />
                  </View>
                )
              ) : privacyData?.data?.description ? (
                renderHtml(privacyData.data.description)
              ) : privacyError ? (
                <View style={{ paddingVertical: 20, alignItems: 'center' }}>
                  <Text
                    style={{
                      fontFamily: 'Nunito-Bold',
                      color: '#EF4444',
                      textAlign: 'center',
                      marginBottom: 10,
                    }}>
                    Failed to load content
                  </Text>
                  <TouchableOpacity onPress={() => refetchPrivacy()}>
                    <Text
                      style={{
                        fontFamily: 'Nunito-Bold',
                        color: '#C4202B',
                        fontSize: 13,
                      }}>
                      {t('common.retry')}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ paddingVertical: 30, alignItems: 'center' }}>
                  <ActivityIndicator size="small" color="#C4202B" />
                </View>
              )}
            </ScrollView>

            {/* Close Button */}
            <TouchableOpacity
              onPress={() => setLegalModalVisible(false)}
              activeOpacity={0.8}
              style={{
                backgroundColor: '#C4202B',
                borderRadius: 10,
                height: 44,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontFamily: 'Nunito-Bold', fontSize: 15, color: '#FFFFFF' }}>
                {t('common.close')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
