// /components/ui/modals/LogoutModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BorderCard from '@/components/ui/shared/BorderCard';
import OutlineButton from '@/components/ui/shared/button/OutlineButton';
import PrimaryButton from '@/components/ui/shared/button/PrimaryButton';
import LabelPrimary from '@/components/ui/shared/LabelPrimary';
import Subtitle from '@/components/ui/shared/Subtitle';
import IconBadge from '@/components/ui/icons/IconBadge';
import { useTranslation } from 'react-i18next';

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal = ({ visible, onClose, onConfirm }: LogoutModalProps) => {
  const { t } = useTranslation();
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
              {/* Warning Badge */}
              <View className="flex items-center">
                <IconBadge
                  size={52}
                  className="bg-[#FDE8E8]"
                  icon={<Ionicons name="log-out-outline" size={28} color="#C4202B" />}
                />
              </View>

              <View className="gap-[10px]">
                <LabelPrimary
                  text={`${t('profile.logout')} !`}
                  style={{
                    fontSize: 16,
                    textAlign: 'center',
                    fontFamily: 'Nunito-Bold',
                    color: '#1E293B',
                  }}
                />

                <Subtitle
                  text={t('profile.logoutConfirm')}
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
                  title={t('common.cancel')}
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
                  title={t('profile.logout')}
                  onPress={() => {
                    onConfirm();
                    onClose();
                  }}
                  style={{ flex: 1, borderRadius: 6 }}
                  gradientColors={['#C4202B', '#C4202B']}
                />
              </View>
            </BorderCard>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default LogoutModal;
