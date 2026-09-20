import React from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Share,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '@/components/ui/shared/BackButton';
import { useGetTermsConditionsQuery } from '@/store/api/legalApi';
import { useTranslation } from 'react-i18next';

// Simple lightweight HTML parser to render formatting tags without third-party dependencies
const renderHtml = (htmlText: string) => {
  if (!htmlText) return null;

  const regex = /(<[^>]+>)/g;
  const parts = htmlText.split(regex);

  const elements: React.ReactNode[] = [];
  let isH1 = false;
  let isH2 = false;
  let isBullet = false;

  parts.forEach((part, index) => {
    if (part.startsWith('<')) {
      const tag = part.toLowerCase();
      if (tag === '<h1>') {
        isH1 = true;
      } else if (tag === '</h1>') {
        isH1 = false;
      } else if (tag === '<h2>') {
        isH2 = true;
      } else if (tag === '</h2>') {
        isH2 = false;
      } else if (tag === '<li>') {
        isBullet = true;
      } else if (tag === '</li>') {
        isBullet = false;
      }
    } else {
      const text = part
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim();

      if (!text) return;

      if (isH1) {
        elements.push(
          <Text key={index} style={[styles.h1, { marginTop: 12 }]}>
            {text}
          </Text>
        );
      } else if (isH2) {
        elements.push(
          <Text key={index} style={[styles.h2, { marginTop: 10 }]}>
            {text}
          </Text>
        );
      } else if (isBullet) {
        elements.push(
          <View key={index} style={styles.bulletRow}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>{text}</Text>
          </View>
        );
      } else {
        elements.push(
          <Text key={index} style={[styles.p, { marginTop: 6 }]}>
            {text}
          </Text>
        );
      }
    }
  });

  return <View style={{ gap: 4 }}>{elements}</View>;
};

const TermsAndConditionsScreen = () => {
  const { data: dbTerms, isLoading, isError, refetch } = useGetTermsConditionsQuery();
  const { t } = useTranslation();

  const handleShare = async () => {
    try {
      const plainText = dbTerms?.data?.description
        ? dbTerms.data.description.replace(/<[^>]+>/g, '')
        : 'Terms & Conditions details';

      await Share.share({
        title: 'Terms & Conditions',
        message: `Özen Et Terms & Conditions\n\n${plainText}\n\nFor more information, visit the Özen Et app.`,
      });
    } catch (error) {
      console.error('Error sharing terms:', error);
    }
  };

  const formattedDate = dbTerms?.data?.updatedAt
    ? new Date(dbTerms.data.updatedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <>
      <StatusBar translucent barStyle="dark-content" />
      <LinearGradient
        colors={['#EEE6E1', '#EEE6E1', '#EEE6E1']}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}>
        <SafeAreaView
          edges={['top', 'bottom']}
          className="flex-1"
          style={{ backgroundColor: 'transparent' }}>
          {/* Header */}
          <View className="flex-row items-center justify-between px-4 pb-3 pt-2">
            <BackButton />
            <Text className="font-nunitoBold text-[18px] text-[#1E293B]">{t('profile.termsConditions')}</Text>
            <TouchableOpacity onPress={handleShare} activeOpacity={0.7} className="p-1">
              <Ionicons name="share-outline" size={20} color="#C4202B" />
            </TouchableOpacity>
          </View>

          {/* Loading */}
          {isLoading && (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#C4202B" />
            </View>
          )}

          {/* Error */}
          {(isError || !dbTerms?.data) && !isLoading && (
            <View className="flex-1 items-center justify-center p-4">
              <Text className="mb-2 text-center font-nunito text-[#EF4444]">
                Failed to load terms and conditions
              </Text>
              <TouchableOpacity onPress={refetch} className="mt-4">
                <Text className="font-nunitoBold text-[#C4202B]">{t('common.retry')}</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Main Content */}
          {dbTerms?.data && !isLoading && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 40 }}>
              {/* Header Info */}
              <View className="mb-4 border-b border-[#D1D5DB] pb-3">
                <Text className="font-nunitoBold text-[18px] text-[#1E293B]">
                  Özen Et Terms of Service
                </Text>
                {formattedDate ? (
                  <Text className="mt-1 font-nunito text-[13px] text-[#6B7280]">
                    Last Updated: {formattedDate}
                  </Text>
                ) : null}
              </View>

              {/* Parsed and Rendered HTML Description */}
              <View className="bg-background p-5">{renderHtml(dbTerms.data.description)}</View>

              {/* Footer */}
              <View className="mt-6 items-center border-t border-[#D1D5DB] pt-4">
                <Text className="font-nunito text-[12px] text-[#9CA3AF]">
                  Özen Et Wholesale Platform © {new Date().getFullYear()}
                </Text>
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 6,
  },
  h2: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    color: '#334155',
    marginBottom: 4,
  },
  p: {
    fontFamily: 'Nunito-Medium',
    fontSize: 13.5,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 12,
    marginBottom: 6,
  },
  bulletDot: {
    fontSize: 14,
    color: '#C4202B',
    marginRight: 6,
    marginTop: 2,
  },
  bulletText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 13.5,
    color: '#475569',
    lineHeight: 20,
    flex: 1,
  },
});

export default TermsAndConditionsScreen;
