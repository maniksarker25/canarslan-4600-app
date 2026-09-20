import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { useAuth } from '@/hooks/useAuth';
import { setUser } from '@/store/authSlice';
import InputField from '@/components/ui/inputs/Input';
import ProfileImagePicker from '@/components/ui/inputs/ProfileImagePicker';
import PrimaryButton from '@/components/ui/shared/button/PrimaryButton';
import { OneManIcon, PhoneIcon, LocationIcon } from '@/components/icons';
import Toast from 'react-native-toast-message';
import BackButton from '@/components/ui/shared/BackButton';
import { useUpdateProfileMutation } from '@/store/api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from '@/types/UserType';
import FormLayout from '@/components/ui/layouts/FormLayout';
import GooglePlacesAddressInput, {
  SelectedAddress,
} from '@/components/ui/inputs/GooglePlacesAddressInput';
import { useTranslation } from 'react-i18next';

const MyProfileScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { t } = useTranslation();

  // Helper to split fullName into firstName and lastName
  const nameParts = (user?.fullName).split(' ');
  const initialFirstName = nameParts[0];
  const initialLastName = nameParts.slice(1).join(' ');

  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [phone, setPhone] = useState(user?.phone ? String(user.phone) : '+1 (212) 555-0000');
  const [address, setAddress] = useState(
    user?.address || '42 Hudson St, Manhattan, New York, 10013'
  );
  const [addressDetails, setAddressDetails] = useState<SelectedAddress | null>(null);
  const [profileImageUri, setProfileImageUri] = useState<string | null>(user?.avatarUrl || null);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const handleAddressSelect = (selected: SelectedAddress) => {
    setAddress(selected.formattedAddress);
    setAddressDetails(selected);
  };

  const handleAddressTextChange = (text: string) => {
    setAddress(text);
    // Free-typed text hasn't been resolved to a real place yet — clear any
    // stale structured data from a previous selection so we don't send
    // mismatched city/state/coordinates alongside a different address string.
    setAddressDetails(null);
  };

  const handleSaveChanges = async () => {
    const updatedFullName = `${firstName} ${lastName}`.trim();

    const dataObj: Record<string, any> = {
      name: updatedFullName,
      phone: phone,
      address: address,
      businessType: user?.businessType || '',
      businessName: user?.companyName || '',
      businessAddress: user?.address || '',
      taxId: user?.vatTaxId || '',
    };

    // Include structured address fields only when available (i.e. the user
    // actually picked a suggestion rather than typing freehand)
    if (addressDetails) {
      dataObj.city = addressDetails.city ?? '';
      dataObj.state = addressDetails.state ?? '';
      dataObj.zipCode = addressDetails.zipCode ?? '';
      dataObj.country = addressDetails.country ?? '';
      dataObj.latitude = addressDetails.latitude;
      dataObj.longitude = addressDetails.longitude;
    }

    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(dataObj));

      const isLocalImage = profileImageUri && !profileImageUri.startsWith('http');

      if (isLocalImage) {
        const cleanUri = profileImageUri!.split('?')[0];
        const uriParts = cleanUri.split('.');
        const fileExtension = (uriParts[uriParts.length - 1] || 'jpg').toLowerCase();

        const safeExtension = /^(jpg|jpeg|png|heic|webp)$/.test(fileExtension)
          ? fileExtension
          : 'jpg';

        const mimeType = safeExtension === 'jpg' ? 'jpeg' : safeExtension;

        const filePart: { uri: string; name: string; type: string } = {
          uri: profileImageUri!,
          name: `profile_${Date.now()}.${safeExtension}`,
          type: `image/${mimeType}`,
        };

        formData.append('profile_image', filePart as unknown as Blob);
      }

      const response = await updateProfile(formData).unwrap();

      if (response.success) {
        const updatedUserObj: UserType = {
          id:
            (typeof response.data.user === 'object'
              ? (response.data.user as any)?._id
              : response.data.user) || response.data._id,
          fullName: response.data.name,
          avatarUrl: response.data.profile_image,
          phone: response.data.phone,
          email: response.data.email,
          address: response.data.address || response.data.businessAddress,
          role: user?.role || 'customer',
          companyName: response.data.businessName,
          businessType: response.data.businessType,
          vatTaxId: response.data.taxId,
          isBlocked: false,
          isAdminVerified: response.data.isAdminVerified,
        };

        await AsyncStorage.setItem('user', JSON.stringify(updatedUserObj));
        dispatch(setUser(updatedUserObj));

        Toast.show({
          type: 'success',
          text1: t('profile.profileUpdated'),
          text2: response.message || t('profile.profileUpdatedMsg'),
        });

        router.back();
      } else {
        Toast.show({
          type: 'error',
          text1: t('profile.updateFailed'),
          text2: response.message || 'Could not update profile.',
        });
      }
    } catch (err: any) {
      console.error('Profile update error:', JSON.stringify(err, null, 2));
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2:
          err?.data?.message ||
          err?.error ||
          err?.message ||
          'An error occurred while saving changes.',
      });
    }
  };

  const inputStyles = {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  };

  return (
    <FormLayout
      header={
        <View className="flex-row items-center justify-between px-4 py-3">
          <BackButton onPress={() => router.back()} />
          <Text className="font-nunitoBold text-[18px] text-[#1E293B]">{t('profile.editProfile')}</Text>
          {/* Spacer for header centering balance */}
          <View className="w-10" />
        </View>
      }
      contentContainerStyle={{
        // paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 10,
        justifyContent: 'flex-start',
      }}>
      {/* Profile Image Picker Area */}
      <View className="my-6 items-center">
        <ProfileImagePicker
          imageUri={profileImageUri}
          onImageSelected={setProfileImageUri}
          onError={(message) =>
            Toast.show({ type: 'error', text1: t('profile.updateFailed'), text2: message })
          }
          size={110}
          showLabel={false}
        />
        <Text className="mt-3 font-nunitoBold text-[15px] text-[#C4202B]">
          {t('profile.browsePhoto')}
        </Text>
      </View>

      {/* Form Fields Container */}
      <View className="mb-6 space-y-4">
        {/* Contact Person Section */}
        <View className="mb-4">
          <Text className="mb-2 font-nunitoBold text-[15px] text-[#374151]">{t('profile.contactPerson')}</Text>
          <View className="flex-row gap-3">
            <View className="flex-1">
              <InputField
                keyboard="default"
                name="firstName"
                showLabel={false}
                placeHolder={t('profile.firstNamePlaceholder')}
                value={firstName}
                handler={(_, val) => setFirstName(val)}
                inputStyle={inputStyles}
                leftIcon={<OneManIcon useGradient={false} width={17} height={17} color="#9CA3AF" />}
                showLeftIcon={true}
              />
            </View>
            <View className="flex-1">
              <InputField
                keyboard="default"
                name="lastName"
                showLabel={false}
                placeHolder={t('profile.lastNamePlaceholder')}
                value={lastName}
                handler={(_, val) => setLastName(val)}
                inputStyle={inputStyles}
                leftIcon={<OneManIcon useGradient={false} width={17} height={17} color="#9CA3AF" />}
                showLeftIcon={true}
              />
            </View>
          </View>
        </View>

        {/* Phone Number Section */}
        <View className="mb-4">
          <Text className="mb-2 font-nunitoBold text-[15px] text-[#374151]">{t('profile.phoneNumber')}</Text>
          <InputField
            keyboard="phone-pad"
            name="phone"
            showLabel={false}
            placeHolder="+1 (212) 555-0000"
            value={phone}
            handler={(_, val) => setPhone(val)}
            inputStyle={inputStyles}
            leftIcon={<PhoneIcon size={17} color="#9CA3AF" />}
            showLeftIcon={true}
          />
        </View>

        {/* Address Section — now backed by Google Places autocomplete */}
        <View className="mb-6">
          <Text className="mb-2 font-nunitoBold text-[15px] text-[#374151]">{t('confirmOrder.address')}</Text>
          <GooglePlacesAddressInput
            showLabel={false}
            placeholder="Enter your address"
            value={address}
            error={false}
            inputStyle={inputStyles}
            leftIcon={<LocationIcon size={17} color="#9CA3AF" />}
            showLeftIcon={true}
            onAddressSelect={handleAddressSelect}
            onChangeText={handleAddressTextChange}
          />
        </View>
      </View>

      {/* Save Changes Button */}
      <View className="mt-4">
        <PrimaryButton
          title={t('profile.saveChanges')}
          onPress={handleSaveChanges}
          isLoading={isUpdating}
          className="rounded-[10px]"
          gradientColors={['#C4202B', '#C4202B']}
        />
      </View>
    </FormLayout>
  );
};

export default MyProfileScreen;
