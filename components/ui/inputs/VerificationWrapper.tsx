import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PrimaryButton from '@/components/ui/shared/button/PrimaryButton';
import HeaderPrimary from '@/components/ui/shared/HeaderPrimary';
import Subtitle from '@/components/ui/shared/Subtitle';
import OtpInput from './OtpInput';
import { useTranslation } from 'react-i18next';

type VerificationWrapperProps = {
  title: string;
  subtitle: string;
  otpLength?: number;
  email?: string;
  onVerify: (otp: string) => Promise<void>;
  resendOtp?: (email?: string) => Promise<void>;
};

const VerificationWrapper: React.FC<VerificationWrapperProps> = ({
  title,
  subtitle,
  otpLength = 6,
  email,
  onVerify,
  resendOtp,
}) => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  // Timer effect
  useEffect(() => {
    if (timer === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = async () => {
    if (!resendOtp) return;
    await resendOtp(email);
    setTimer(30);
    setCanResend(false);
  };

  const handleVerifyClick = async () => {
    if (otp.length !== otpLength) return;
    setLoading(true);
    await onVerify(otp);
    setLoading(false);
  };

  return (
    <View>
      <HeaderPrimary text={title} className="mb-4 text-start" />
      <Subtitle text={subtitle} className="mb-8" />

      <OtpInput length={otpLength} onChange={setOtp} onComplete={setOtp} />

      {/* Resend */}
      <View className="mb-4 mt-4 flex-row items-center justify-between">
        <Text className="font-nunitoMedium text-subtitle leading-[1.1] color-color-text-secondary">
          {t('auth.didntReceiveCode')}
        </Text>
        <TouchableOpacity disabled={!canResend} onPress={handleResend}>
          <Text
            className="font-nunitoSemi text-subtitle leading-[1.1] color-color-brand-primary"
            style={{ opacity: canResend ? 1 : 0.5 }}>
            {canResend ? t('auth.resend') : `${t('auth.resendIn')} 00:${timer}`}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Verify button */}
      <PrimaryButton
        title={loading ? t('auth.verifying') : t('auth.verifyCode')}
        onPress={handleVerifyClick}
        disabled={otp.length !== otpLength || loading}
      />
    </View>
  );
};

export default VerificationWrapper;
