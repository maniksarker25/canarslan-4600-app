import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LocationIcon, BellIcon, CartIcon, ChevronRightIcon, IIcon } from '@/components/icons';
import { ImageSourcePropType } from 'react-native';
import Avatar from '@/components/ui/shared/Avatar';
import { useTranslation } from 'react-i18next';

type HomeHeaderProps = {
  address?: string;
  notificationCount?: number;
  cartCount?: number;
  onPressAddress?: () => void;
  onPressNotification?: () => void;
  onPressCart?: () => void;
  onPressProfile?: () => void;
  avatarUrl?: string | ImageSourcePropType;
  isVerified?: boolean;
};

export default function HomeHeader({
  address = '123 Main Street',
  notificationCount = 0,
  cartCount = 0,
  onPressAddress,
  onPressNotification,
  onPressCart,
  onPressProfile,
  avatarUrl,
  isVerified = false,
}: HomeHeaderProps) {
  const { t } = useTranslation();
  const imageSource = avatarUrl
    ? typeof avatarUrl === 'string' && avatarUrl
      ? { uri: avatarUrl }
      : (avatarUrl as ImageSourcePropType)
    : undefined;
  return (
    <View style={styles.container}>
      {/* Delivering To Section */}
      <TouchableOpacity
        style={styles.locationContainer}
        onPress={onPressAddress}
        activeOpacity={0.7}>
        <View style={styles.pinIconWrapper}>
          <LocationIcon size={18} color="#C4202B" />
        </View>
        <View style={styles.addressTextWrapper}>
          <Text style={styles.deliveringToText}>{t('home.deliverTo')}</Text>
          <View style={styles.streetRow}>
            <Text style={styles.streetText} numberOfLines={1}>
              {address}
            </Text>
            <ChevronRightIcon size={14} color="#6B7280" style={styles.chevronIcon} />
          </View>
        </View>
      </TouchableOpacity>

      {/* Right Action Items */}
      <View style={styles.actionsContainer}>
        {/* Notification Bell Button */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onPressNotification}
          activeOpacity={0.7}>
          <BellIcon size={20} color="#1F2937" />
          {notificationCount > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Cart Button */}
        <TouchableOpacity style={styles.iconButton} onPress={onPressCart} activeOpacity={0.7}>
          <CartIcon size={20} color="#1F2937" />
          {cartCount > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressProfile} activeOpacity={0.7}>
          <Avatar
            source={imageSource}
            width={34}
            height={34}
            verified={isVerified}
            verifiedSize={10}
            verifiedOffsetX={-4}
            verifiedOffsetY={-4}
            style={{ borderRadius: 17, borderWidth: 0 }}
            badge={!isVerified && <IIcon size={10} color="#DC2626" />}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  pinIconWrapper: {
    marginRight: 8,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  addressTextWrapper: {
    justifyContent: 'center',
    flex: 1,
  },
  deliveringToText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 12,
    color: '#C4202B',
    lineHeight: 16,
  },
  streetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  streetText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    color: '#374151',
    lineHeight: 20,
    flexShrink: 1,
  },
  chevronIcon: {
    marginLeft: 3,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  badgeContainer: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#C4202B',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 9,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
