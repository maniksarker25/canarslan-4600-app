import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import BackButton from '@/components/ui/shared/BackButton';
import PrimaryButton from '@/components/ui/shared/button/PrimaryButton';
import FAQItem from '@/components/ui/profile/FAQItem';
import { MailBoxIcon } from '@/components/icons';
import { useGetFaqsQuery } from '@/store/api/legalApi';
import { useCreateSupportTicketMutation } from '@/store/api/supportApi';
import { ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';

const HelpSupportScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: dbFaqs, isLoading: isFaqsLoading } = useGetFaqsQuery();
  const [createSupportTicket] = useCreateSupportTicketMutation();
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!subject.trim()) {
      Toast.show({
        type: 'error',
        text1: t('support.validationError'),
        text2: t('support.subjectRequired'),
      });
      return;
    }

    if (!description.trim()) {
      Toast.show({
        type: 'error',
        text1: t('support.validationError'),
        text2: t('support.descRequired'),
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await createSupportTicket({
        contactReason: subject,
        message: description,
      }).unwrap();

      Toast.show({
        type: 'success',
        text1: t('support.successTitle'),
        text2: t('support.messageSentMsg'),
      });

      setSubject('');
      setDescription('');
      Keyboard.dismiss();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('support.failedSent'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <StatusBar translucent barStyle="dark-content" />
      <LinearGradient
        colors={['#EEE6E1', '#EEE6E1', '#EEE6E1']}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}>
        <SafeAreaView edges={['top']} className="flex-1" style={{ backgroundColor: 'transparent' }}>
          {/* Header */}
          <View className="flex-row items-center justify-between px-4 py-3">
            <BackButton onPress={() => router.back()} />
            <Text className="font-nunitoBold text-[18px] text-[#1E293B]">{t('profile.helpSupport')}</Text>
            <View className="w-10" />
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="flex-1">
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 40,
                paddingTop: 8,
              }}
              keyboardShouldPersistTaps="handled">
              {/* Form Section */}
              <View className="mb-6">
                <Text className="mb-3 font-nunitoBold text-[16px] text-[#1E293B]">
                  {t('support.emailUsOnline')}
                </Text>

                {/* White Form Card */}
                <View className="rounded-[18px] bg-white p-4 shadow-sm">
                  {/* Card Header Row */}
                  <View className="flex-row items-center">
                    <View className="h-9 w-9 items-center justify-center rounded-[10px] bg-[#FDE8E8]">
                      <MailBoxIcon size={18} color="#D32F2F" />
                    </View>
                    <Text className="ml-3 font-nunitoBold text-[15px] text-[#374151]">
                      {t('support.emailUs')} <Text className="text-[#16A34A]">{t('support.online')}</Text>
                    </Text>
                  </View>

                  {/* Subject Input */}
                  <TextInput
                    className="mb-3 mt-3.5 rounded-[10px] border border-[#E5E7EB] bg-white p-3 font-nunito text-[14px] text-[#1F2937]"
                    placeholder={t('support.subjectPlaceholder')}
                    placeholderTextColor="#9CA3AF"
                    value={subject}
                    onChangeText={setSubject}
                  />

                  {/* Description Input */}
                  <TextInput
                    className="mb-4 rounded-[10px] border border-[#E5E7EB] bg-white p-3 font-nunito text-[14px] text-[#1F2937]"
                    style={{ minHeight: 100, textAlignVertical: 'top' }}
                    placeholder={t('support.describeDetail')}
                    placeholderTextColor="#9CA3AF"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={4}
                  />

                  {/* Send Message Button */}
                  <PrimaryButton
                    title={isSubmitting ? t('support.sending') : t('support.send')}
                    onPress={handleSubmit}
                    isLoading={isSubmitting}
                    className="rounded-[10px]"
                    gradientColors={['#C4202B', '#C4202B']}
                  />
                </View>
              </View>

              {/* Frequently Asked Questions Section (At the Bottom) */}
              <View className="mb-4">
                <Text className="mb-3 font-nunitoBold text-[13px] tracking-wider text-[#4B5563]">
                  {t('support.faqs')}
                </Text>

                {/* White FAQ Card Container */}
                <View className="rounded-[18px] bg-white p-3 shadow-sm">
                  {isFaqsLoading ? (
                    <ActivityIndicator size="small" color="#C4202B" style={{ marginVertical: 10 }} />
                  ) : !dbFaqs?.data || dbFaqs.data.length === 0 ? (
                    <Text className="text-center text-slate-400 font-nunito text-xs py-4">No FAQs found</Text>
                  ) : (
                    dbFaqs.data.map((faq, index) => (
                      <FAQItem
                        key={faq._id}
                        question={faq.question}
                        answer={faq.answer}
                        isLast={index === dbFaqs.data.length - 1}
                      />
                    ))
                  )}
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default HelpSupportScreen;
