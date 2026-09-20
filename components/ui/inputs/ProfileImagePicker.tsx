// components/ui/inputs/ProfileImagePicker.tsx
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, View, Text } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { CameraIcon, OneManIconBottomLess } from '@/components/icons';
import ProfileImagePickerModal from '@/components/ui/modals/ProfileImagePickerModal';
import Toast from 'react-native-toast-message';

export interface ProfileImagePickerProps {
  imageUri?: string | null;
  onImageSelected: (uri: string) => void;
  onError?: (message: string) => void;
  size?: number;
  disabled?: boolean;
  showLabel?: boolean;
  label?: string;
}

export default function ProfileImagePicker({
  imageUri,
  onImageSelected,
  onError,
  size = 100,
  disabled = false,
  showLabel = true,
  label = '',
}: ProfileImagePickerProps) {
  const [isPicking, setIsPicking] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const requestPermission = async (source: 'camera' | 'library') => {
    const permissionResult =
      source === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      const message =
        source === 'camera'
          ? 'Camera access is required to take a photo.'
          : 'Photo library access is required to choose a photo.';
      onError?.(message);
      Toast.show({
        type: 'error',
        text1: 'Permission Denied',
        text2: message,
      });
      return false;
    }
    return true;
  };

  const pickFrom = async (source: 'camera' | 'library') => {
    const hasPermission = await requestPermission(source);
    if (!hasPermission) return;

    setModalVisible(false);
    setIsPicking(true);

    try {
      const result =
        source === 'camera'
          ? await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.8,
            })
          : await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.8,
            });

      if (!result.canceled && result.assets?.[0]?.uri) {
        onImageSelected(result.assets[0].uri);
        Toast.show({
          type: 'success',
          text1: 'Photo Updated',
          text2: 'Your profile photo has been updated successfully.',
        });
      }
    } catch (err) {
      onError?.('Something went wrong while picking the image.');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to pick image. Please try again.',
      });
    } finally {
      setIsPicking(false);
    }
  };

  const handleTakePhoto = () => {
    pickFrom('camera');
  };

  const handleChooseFromGallery = () => {
    pickFrom('library');
  };

  const handleRemovePhoto = () => {
    setModalVisible(false);
    onImageSelected('');
    Toast.show({
      type: 'success',
      text1: 'Photo Removed',
      text2: 'Your profile photo has been removed.',
    });
  };

  const handlePress = () => {
    if (disabled || isPicking) return;
    setModalVisible(true);
  };

  // Camera button size (36x36 as requested)
  const cameraButtonSize = 28;
  const cameraIconSize = Math.round(cameraButtonSize * 0.45); // ~20px for icon

  return (
    <>
      <View className="items-center">
        {showLabel && (
          <Text className="font-Nunito-SemiBold mb-2 text-center text-sm text-gray-400">
            {label}
          </Text>
        )}

        <Pressable onPress={handlePress} disabled={disabled || isPicking} className="relative">
          <View
            style={{
              width: size,
              height: size,
              borderRadius: size * 0.5,
              borderWidth: 4,
              borderColor: '#E2E5E9',
              backgroundColor: '#F1DBD9',
            }}
            className="relative flex items-center justify-center overflow-hidden">
            {isPicking ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={{ width: '100%', height: '100%' }}
                contentFit="cover"
              />
            ) : (
              <OneManIconBottomLess width={64} height={64} color="#B91C1C" strokeWidth="0.8" />
            )}
          </View>

          {/* Camera Button - Now outside the image container */}
          <View
            style={{
              position: 'absolute',
              bottom: 4,
              right: 4,
              width: cameraButtonSize,
              height: cameraButtonSize,
              borderRadius: cameraButtonSize * 0.5, // Full radius (circle)
              backgroundColor: '#B91C1C',
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              borderWidth: 2,
              borderColor: '#E2E5E9',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
            <CameraIcon
              width={cameraIconSize}
              height={cameraIconSize}
              color="#FFFFFF"
              strokeWidth={1.5}
            />
          </View>
        </Pressable>
      </View>

      {/* Modal */}
      <ProfileImagePickerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onTakePhoto={handleTakePhoto}
        onChooseFromGallery={handleChooseFromGallery}
        onRemovePhoto={handleRemovePhoto}
        hasImage={!!imageUri}
      />
    </>
  );
}
