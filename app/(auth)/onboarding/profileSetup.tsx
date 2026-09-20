import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text } from 'react-native';
import HeaderPrimary from '@/components/ui/shared/HeaderPrimary';
import Subtitle from '@/components/ui/shared/Subtitle';
import InputField from '@/components/ui/inputs/Input';
import DropdownInput from '@/components/ui/inputs/DropdownInput';
import PrimaryButton from '@/components/ui/shared/button/PrimaryButton';
import FormLayout from '@/components/ui/layouts/FormLayout';
import ProfileSetupFields from '@/components/formFields/ProfileSetupFields';
import { useRouter } from 'expo-router';
import { validateFields } from '@/utils/formValidate';
import Toast from 'react-native-toast-message';
import ProfileImagePicker from '@/components/ui/inputs/ProfileImagePicker';
import { BuildingIcon, LocationIcon, PageIcon, StoreIcon } from '@/components/icons';
import GooglePlacesAddressInput, {
  SelectedAddress,
} from '@/components/ui/inputs/GooglePlacesAddressInput';
import { useUpdateProfileMutation, useGetProfileQuery } from '@/store/api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setUser } from '@/store/authSlice';
import { UserType } from '@/types/UserType';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CompleteProfileSetup() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const { fields, setFields } = ProfileSetupFields();

  const { data: profileRes } = useGetProfileQuery();

  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
  const [addressDetails, setAddressDetails] = useState<SelectedAddress | null>(null);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    if (profileRes?.success && profileRes?.data) {
      const profile = profileRes.data;
      const userObj: UserType = {
        id: (typeof profile.user === 'object' ? profile.user?._id : profile.user) || profile._id,
        fullName: profile.name,
        avatarUrl: profile.profile_image,
        phone: profile.phone,
        email: profile.email,
        address: profile.address || profile.businessAddress,
        role: profile.user && typeof profile.user === 'object' ? (profile.user as any).role || 'customer' : 'customer',
        companyName: profile.businessName,
        businessType: profile.businessType,
        vatTaxId: profile.taxId,
        isBlocked: false,
        isAdminVerified: profile.isAdminVerified,
      };
      AsyncStorage.setItem('user', JSON.stringify(userObj)).catch((e) => console.error(e));
      dispatch(setUser(userObj));
      if (profile.profile_image) {
        setProfileImageUri(profile.profile_image);
      }
    }
  }, [profileRes, dispatch]);

  const getField = (name: string) => fields.find((f) => f.name === name);
  const updateField = (name: string, value: string | number | boolean) =>
    setFields((prev) =>
      prev.map((field) => (field.name === name ? { ...field, value, error: false } : field))
    );

  const handleAddressSelect = (address: SelectedAddress) => {
    setAddressDetails(address);
    updateField('businessAddress', address.formattedAddress);
  };

  const handleContinue = async () => {
    const isValid = validateFields(fields, setFields);

    if (!isValid) {
      Toast.show({
        type: 'error',
        text1: 'Missing Information',
        text2: 'Please fill in all required fields.',
      });
      return;
    }

    const businessType = getField('businessType')?.value as string || '';
    const companyName = getField('companyName')?.value as string || '';
    const businessAddress = getField('businessAddress')?.value as string || '';
    const vatTaxId = getField('vatTaxId')?.value as string || '';

    const dataObj = {
      name: user?.fullName || user?.email?.split('@')[0] || 'Customer',
      address: businessAddress,
      businessType,
      businessName: companyName,
      businessAddress,
      taxId: vatTaxId,
      city: addressDetails?.city ?? '',
      state: addressDetails?.state ?? '',
      zipCode: addressDetails?.zipCode ?? '',
      country: addressDetails?.country ?? '',
      latitude: addressDetails?.latitude,
      longitude: addressDetails?.longitude,
    };

    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(dataObj));

      if (profileImageUri && !profileImageUri.startsWith('http')) {
        const cleanUri = profileImageUri.split('?')[0];
        const uriParts = cleanUri.split('.');
        const fileType = uriParts[uriParts.length - 1] || 'jpeg';
        formData.append('profile_image', {
          uri: profileImageUri,
          name: `profile.${fileType}`,
          type: `image/${fileType}`,
        } as any);
      }

      const response = await updateProfile(formData).unwrap();

      if (response.success) {
        const updatedUserObj: UserType = {
          id: (typeof response.data.user === 'object' ? (response.data.user as any)?._id : response.data.user) || response.data._id,
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

        // Save to AsyncStorage and Redux
        await AsyncStorage.setItem('user', JSON.stringify(updatedUserObj));
        dispatch(setUser(updatedUserObj));

        Toast.show({
          type: 'success',
          text1: 'Profile Setup Completed',
          text2: response.message || 'Your profile was successfully created.',
        });

        router.replace('/(tabs)/home');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Update Failed',
          text2: response.message || 'Could not complete profile setup.',
        });
      }
    } catch (err: any) {
      console.error('Profile setup error:', err);
      Toast.show({
        type: 'error',
        text1: 'Setup Error',
        text2: err?.data?.message || err?.message || 'An error occurred during profile setup.',
      });
    }
  };

  // Common input styles
  const inputStyles = {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
  };

  return (
    <>
      <StatusBar translucent barStyle="dark-content" />

      <FormLayout>
        <HeaderPrimary text="Complete Your Profile" className="mb-4 mt-7" />
        <Subtitle text="Tell us about your business" className="mb-8" />

        {/* Profile Image Picker */}
        <View className="mb-6">
          <ProfileImagePicker
            imageUri={profileImageUri}
            onImageSelected={setProfileImageUri}
            onError={(message) =>
              Toast.show({ type: 'error', text1: 'Photo Upload Failed', text2: message })
            }
            size={100}
            showLabel={false}
          />
        </View>

        {/* Business Type - Dropdown */}
        <View className="mb-4">
          <DropdownInput
            label="Business Type"
            placeholder="Select business type"
            name="businessType"
            labelColor="#374151"
            placeholderColor="#11182780"
            value={(getField('businessType')?.value as string) || ''}
            options={getField('businessType')?.options || []}
            handler={(_, value) => updateField('businessType', value)}
            error={!!getField('businessType')?.error}
            inputStyle={inputStyles}
            leftIcon={<StoreIcon size={18} color="#9CA3AF" style={{ marginTop: 11 }} />}
            showLeftIcon={true}
          />
        </View>

        {/* Company Name */}
        <View className="mb-4">
          <InputField
            label="Company Name"
            placeHolder="Bosphorus Restaurant LLC"
            keyboard="default"
            name="companyName"
            labelColor="#374151"
            placeholderColor="#11182780"
            value={(getField('companyName')?.value as string) || ''}
            handler={(_, value) => updateField('companyName', value)}
            error={!!getField('companyName')?.error}
            inputStyle={inputStyles}
            leftIcon={<BuildingIcon size={17} color="#9CA3AF" />}
            showLeftIcon={true}
          />
        </View>

        {/* Business Address */}
        <View className="mb-4">
          <GooglePlacesAddressInput
            label="Business Address"
            placeholder="42 Hudson St, New York, NY"
            value={(getField('businessAddress')?.value as string) || ''}
            error={!!getField('businessAddress')?.error}
            labelColor="#374151"
            placeholderColor="#11182780"
            leftIcon={<LocationIcon size={17} color="#9CA3AF" style={{ marginTop: -1 }} />}
            showLeftIcon={true}
            onAddressSelect={handleAddressSelect}
            onChangeText={(text) => {
              // User is typing manually — update the field but clear any
              // stale structured address data, since free-typed text hasn't
              // been resolved to a real place yet (no lat/lng/city/state).
              updateField('businessAddress', text);
              setAddressDetails(null);
            }}
          />
        </View>

        {/* VAT / Tax ID */}
        <View className="mb-6">
          <InputField
            label="VAT / Tax ID"
            placeHolder="US-1234567890"
            keyboard="default"
            name="vatTaxId"
            labelColor="#374151"
            placeholderColor="#11182780"
            value={(getField('vatTaxId')?.value as string) || ''}
            handler={(_, value) => updateField('vatTaxId', value)}
            error={!!getField('vatTaxId')?.error}
            inputStyle={inputStyles}
            leftIcon={<PageIcon size={17} color="#9CA3AF" />}
            showLeftIcon={true}
          />
        </View>

        <PrimaryButton title="Finish & Explore" onPress={handleContinue} isLoading={isLoading} />
      </FormLayout>
    </>
  );
}
