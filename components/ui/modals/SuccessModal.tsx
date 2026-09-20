import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../shared/button/PrimaryButton';
import SuccessCheckIcon from '../icons/SuccessCheckIcon';

type SuccessModalProps = {
  visible: boolean;
  onClose: () => void;
  message?: string;
  buttonText?: string;
  onButtonPress?: () => void;
};

const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  onClose,
  message = 'Action completed successfully!',
  buttonText = 'Go to Login',
  onButtonPress,
}) => {
  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <SafeAreaView edges={['bottom']} style={styles.safeArea}>
          <View style={styles.container}>
            <SuccessCheckIcon size={52} iconSize={20} />

            <Text className="mt-4 text-center text-[15px] color-color-text-secondary ">
              {message}
            </Text>

            <View style={{ width: '100%', marginTop: 28 }}>
              <PrimaryButton
                title={buttonText}
                onPress={() => {
                  onButtonPress?.();
                  onClose();
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'flex-end',
  },
  safeArea: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden', // 🔥 THIS IS IMPORTANT
  },
  container: {
    padding: 20,
    paddingTop: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
});
