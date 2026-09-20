// /app/(common)/profile/index.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage, LANGUAGE_OPTIONS } from '@/hooks/useLanguage';
import { logout, setUser } from '@/store/authSlice';
import ProfileOption from '@/components/ui/profile/ProfileOption';
import ProfileHeader from '@/components/ui/profile/ProfileHeader';
import LogoutModal from '@/components/ui/modals/LogoutModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetProfileQuery } from '@/store/api/userApi';
import { UserType } from '@/types/UserType';
import {
  OneManIcon,
  LocationIcon,
  GearIcon,
  TermsAndConditionIcon,
  PrivacyAndPolicyIcon,
  LegalAndCompanyInfoIcon,
  BuildingIcon,
  BellIcon,
  SecurityIcon,
} from '@/components/icons';
import LabelPrimary from '@/components/ui/shared/LabelPrimary';
import OutlineButton from '@/components/ui/shared/button/OutlineButton';
import { LogoutIcon } from '@/components/icons/LogoutIcon';

const ProfileScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { t } = useTranslation();
  const { language, changeLanguage, options: langOptions } = useLanguage();

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [langModalVisible, setLangModalVisible] = useState(false);

  const { data: profileRes, isFetching, refetch } = useGetProfileQuery();

  useEffect(() => {
    if (profileRes?.success && profileRes?.data) {
      const profileData = profileRes.data;
      const userObj: UserType = {
        id:
          (typeof profileData.user === 'object' ? profileData.user?._id : profileData.user) ||
          profileData._id,
        fullName: profileData.name,
        avatarUrl: profileData.profile_image,
        phone: profileData.phone,
        email: profileData.email,
        address: profileData.address || profileData.businessAddress,
        role:
          profileData.user && typeof profileData.user === 'object'
            ? (profileData.user as any).role || 'customer'
            : 'customer',
        companyName: profileData.businessName,
        businessType: profileData.businessType,
        vatTaxId: profileData.taxId,
        isBlocked: false,
        isAdminVerified: profileData.isAdminVerified,
      };
      AsyncStorage.setItem('user', JSON.stringify(userObj)).catch((e) => console.error(e));
      dispatch(setUser(userObj));
    }
  }, [profileRes, dispatch]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
    } catch (err) {
      console.error('Error clearing storage on logout:', err);
    }
    dispatch(logout());
    router.replace('/(auth)');
  };

  const handleSelectLanguage = async (code: 'en' | 'de') => {
    await changeLanguage(code);
    setLangModalVisible(false);
  };

  const currentLangOption = langOptions.find((o) => o.code === language) ?? langOptions[0];

  return (
    <>
      <LinearGradient
        colors={['#EEE6E1', '#EEE6E1', '#EEE6E1']}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}>
        <SafeAreaView edges={['top']} className="flex-1" style={{ backgroundColor: 'transparent' }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 16 }}
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={refetch}
                colors={['#C4202B']}
                tintColor="#C4202B"
              />
            }>
            {/* Profile Header */}
            <ProfileHeader
              title={t('profile.title')}
              onEditPress={() => router.push('/common-flow/profile/my-profile')}
              avatarUrl={user?.avatarUrl || (user ? undefined : require('@/assets/images/dp.jpg'))}
              fullName={user?.fullName}
              role={user?.role}
              isVerified={!!user?.isAdminVerified}
              email={user?.email}
              phone={user?.phone && String(user.phone)}
              address={user?.address}
              statusText={
                user?.isAdminVerified ? t('profile.accountApproved') : t('profile.pendingApproval')
              }
            />

            {/* Profile Options */}
            <View>
              <ProfileOption
                icon={<BuildingIcon width={16} height={16} color="#757575" />}
                text={t('profile.businessInformation')}
                onPress={() => router.push('/common-flow/profile/business-information')}
              />

              <ProfileOption
                icon={<BellIcon size={16} color="#757575" />}
                text={t('profile.notifications')}
                onPress={() => router.push('/common-flow/notifications')}
              />

              <ProfileOption
                icon={<SecurityIcon size={16} color="#757575" />}
                text={t('profile.privacySecurity')}
                onPress={() => router.push('/common-flow/profile/privacy-security')}
              />

              {/* Language Row — custom with current language badge */}
              <TouchableOpacity
                onPress={() => setLangModalVisible(true)}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: 12,
                  paddingVertical: 13,
                  paddingHorizontal: 14,
                  marginBottom: 8,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1,
                }}>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    backgroundColor: '#F5F5F5',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}>
                  <Text style={{ fontSize: 15 }}>🌐</Text>
                </View>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: 'Nunito-SemiBold',
                    fontSize: 14,
                    color: '#1F2937',
                  }}>
                  {t('profile.language')}
                </Text>
                {/* Current language badge */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#F3F4F6',
                    borderRadius: 20,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    marginRight: 6,
                  }}>
                  <Text style={{ fontSize: 13, marginRight: 4 }}>{currentLangOption.flag}</Text>
                  <Text
                    style={{
                      fontFamily: 'Nunito-SemiBold',
                      fontSize: 12,
                      color: '#4B5563',
                    }}>
                    {currentLangOption.nativeLabel}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
              </TouchableOpacity>

              <LabelPrimary
                text={t('profile.more')}
                style={{
                  marginTop: 6,
                  marginBottom: 10,
                  fontFamily: 'Nunito-SemiBoldItalic',
                }}
              />

              <ProfileOption
                icon={<TermsAndConditionIcon size={16} color="#757575" />}
                text={t('profile.termsConditions')}
                onPress={() => router.push('/common-flow/profile/terms-and-conditions')}
              />

              <ProfileOption
                icon={<LegalAndCompanyInfoIcon size={16} color="#757575" />}
                text={t('profile.legalCompanyInfo')}
                onPress={() => router.push('/common-flow/profile/legal-company-info')}
              />

              <ProfileOption
                icon={<PrivacyAndPolicyIcon size={16} color="#757575" />}
                text={t('profile.privacyPolicy')}
                onPress={() => router.push('/common-flow/profile/privacy-policy')}
              />

              <ProfileOption
                icon={<Ionicons name="help-circle-outline" size={16} color="#757575" />}
                text={t('profile.helpSupport')}
                onPress={() => router.push('/common-flow/profile/help-support')}
              />

              <View className="mt-4">
                <OutlineButton
                  leftIcon={<LogoutIcon size={16} color="#D32F2F" />}
                  title={t('profile.logout')}
                  bgColor="#FDE8E8"
                  borderColor="#F87171"
                  textColor="#D32F2F"
                  onPress={() => setLogoutModalVisible(true)}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>

      {/* Logout Modal */}
      <LogoutModal
        visible={logoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onConfirm={handleLogout}
      />

      {/* ── Language Selection Modal ── */}
      <Modal
        visible={langModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setLangModalVisible(false)}>
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' }}
          onPress={() => setLangModalVisible(false)}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View
              style={{
                backgroundColor: 'white',
                borderTopLeftRadius: 28,
                borderTopRightRadius: 28,
                paddingTop: 12,
                paddingBottom: 40,
                paddingHorizontal: 20,
              }}>
              {/* Handle bar */}
              <View
                style={{
                  width: 40,
                  height: 4,
                  backgroundColor: '#E5E7EB',
                  borderRadius: 2,
                  alignSelf: 'center',
                  marginBottom: 20,
                }}
              />

              <Text
                style={{
                  fontFamily: 'Nunito-Bold',
                  fontSize: 18,
                  color: '#1F2937',
                  marginBottom: 6,
                }}>
                {t('profile.selectLanguage')}
              </Text>
              <Text
                style={{
                  fontFamily: 'Nunito-Regular',
                  fontSize: 13,
                  color: '#6B7280',
                  marginBottom: 20,
                }}>
                {t('profile.choosePreferred')}
              </Text>

              {langOptions.map((opt) => {
                const isSelected = opt.code === language;
                return (
                  <TouchableOpacity
                    key={opt.code}
                    onPress={() => handleSelectLanguage(opt.code)}
                    activeOpacity={0.7}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 14,
                      paddingHorizontal: 16,
                      borderRadius: 14,
                      marginBottom: 10,
                      backgroundColor: isSelected ? '#FEF2F2' : '#F9FAFB',
                      borderWidth: 1.5,
                      borderColor: isSelected ? '#C4202B' : '#F3F4F6',
                    }}>
                    <Text style={{ fontSize: 26, marginRight: 14 }}>{opt.flag}</Text>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontFamily: 'Nunito-Bold',
                          fontSize: 15,
                          color: isSelected ? '#C4202B' : '#1F2937',
                        }}>
                        {opt.nativeLabel}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Nunito-Regular',
                          fontSize: 12,
                          color: '#9CA3AF',
                          marginTop: 1,
                        }}>
                        {opt.label}
                      </Text>
                    </View>
                    {isSelected && (
                      <View
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 11,
                          backgroundColor: '#C4202B',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Ionicons name="checkmark" size={14} color="white" />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

export default ProfileScreen;
