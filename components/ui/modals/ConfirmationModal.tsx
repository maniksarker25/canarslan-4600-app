import React from 'react';
import { Modal, View, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BorderCard from '@/components/ui/shared/BorderCard';
import OutlineButton from '@/components/ui/shared/button/OutlineButton';
import PrimaryButton from '@/components/ui/shared/button/PrimaryButton';
import LabelPrimary from '@/components/ui/shared/LabelPrimary';
import Subtitle from '@/components/ui/shared/Subtitle';
import IconBadge from '@/components/ui/icons/IconBadge';

import { useTranslation } from 'react-i18next';

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  confirmColor?: string; // Hex color or styling
  iconName: any; // Ionicons icon name
  iconColor?: string;
  iconBgColor?: string;
}

const ConfirmationModal = ({
  visible,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
  confirmColor = "#C4202B",
  iconName,
  iconColor = "#C4202B",
  iconBgColor = "#FDE8E8",
}: ConfirmationModalProps) => {
  const { t } = useTranslation();
  const activeCancelText = cancelText || t('common.cancel');
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-center bg-black/50 px-4">
          <TouchableWithoutFeedback>
            <BorderCard
              style={{
                borderRadius: 16,
                padding: 20,
                gap: 16,
                backgroundColor: '#FFFFFF',
                borderColor: '#E5E7EB',
              }}>
              {/* Icon Badge */}
              <View className="flex items-center">
                <IconBadge
                  size={52}
                  style={{ backgroundColor: iconBgColor }}
                  icon={<Ionicons name={iconName} size={28} color={iconColor} />}
                />
              </View>

              <View className="gap-[10px]">
                <LabelPrimary
                  text={title}
                  style={{
                    fontSize: 16,
                    textAlign: 'center',
                    fontFamily: 'Nunito-Bold',
                    color: '#1E293B',
                  }}
                />

                <Subtitle
                  text={description}
                  style={{
                    fontSize: 13,
                    fontFamily: 'Nunito-Medium',
                    textAlign: 'center',
                    color: '#6B7280',
                    lineHeight: 14 * 1.2,
                  }}
                />
              </View>

              {/* Action Buttons */}
              <View className="flex-row gap-[10px]">
                <OutlineButton
                  title={activeCancelText}
                  textColor="#374151"
                  bgColor="#FFFFFF"
                  borderColor="#E5E7EB"
                  onPress={onClose}
                  style={{
                    flex: 1,
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                  }}
                />
                <PrimaryButton
                  title={confirmText}
                  onPress={() => {
                    onConfirm();
                    onClose();
                  }}
                  style={{ flex: 1, borderRadius: 6 }}
                  gradientColors={[confirmColor, confirmColor]}
                />
              </View>
            </BorderCard>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ConfirmationModal;
