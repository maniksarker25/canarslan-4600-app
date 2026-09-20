// components/ui/modals/ProfileImagePickerModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BorderCard from '@/components/ui/shared/BorderCard';
import PrimaryButton from '@/components/ui/shared/button/PrimaryButton';
import OutlineButton from '@/components/ui/shared/button/OutlineButton';
import LabelPrimary from '@/components/ui/shared/LabelPrimary';
import IconBadge from '@/components/ui/icons/IconBadge';

interface ProfileImagePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onChooseFromGallery: () => void;
  onRemovePhoto?: () => void;
  hasImage?: boolean;
}

export default function ProfileImagePickerModal({
  visible,
  onClose,
  onTakePhoto,
  onChooseFromGallery,
  onRemovePhoto,
  hasImage = false,
}: ProfileImagePickerModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-center bg-black/50 px-4">
          <TouchableWithoutFeedback>
            <BorderCard
              style={{
                borderRadius: 12,
                padding: 20,
                gap: 16,
                backgroundColor: '#F9FAFB',
              }}>
              {/* Icon */}
              <View className="flex items-center">
                <IconBadge
                  style={
                    {
                      // borderWidth: 1.5,
                      // borderColor: '#B91C1C',
                    }
                  }
                  size={52}
                  className="bg-[#F1DBD9]"
                  icon={<Ionicons name="camera-outline" size={28} color="#B91C1C" />}
                />
              </View>

              <View className="gap-[10px]">
                <LabelPrimary
                  text="Upload Profile Photo"
                  style={{
                    fontSize: 16,
                    textAlign: 'center',
                    fontFamily: 'Nunito-Bold',
                    color: '#374151',
                  }}
                />

                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'Nunito-Medium',
                    textAlign: 'center',
                    color: '#11182780',
                    lineHeight: 16,
                  }}>
                  Choose how you&apos;d like to update your profile photo
                </Text>
              </View>

              {/* Action Buttons */}
              <View className="gap-3">
                <PrimaryButton
                  title="Take Photo"
                  onPress={onTakePhoto}
                  style={{ borderRadius: 12 }}
                />

                <OutlineButton
                  title="Choose from Gallery"
                  onPress={onChooseFromGallery}
                  style={{
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#C4202B',
                  }}
                  textColor="#C4202B"
                />

                {hasImage && onRemovePhoto && (
                  <OutlineButton
                    title="🗑️ Remove Photo"
                    onPress={onRemovePhoto}
                    style={{
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: '#EF4444',
                    }}
                    textColor="#EF4444"
                    bgColor="#EF44441A"
                  />
                )}

                <OutlineButton
                  title="Cancel"
                  onPress={onClose}
                  style={{
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#EF4444',
                    backgroundColor: 'transparent',
                  }}
                  textColor="#EF4444"
                />
              </View>
            </BorderCard>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
