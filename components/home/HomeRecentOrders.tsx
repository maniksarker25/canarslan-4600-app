import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { ChevronRightIcon } from '@/components/icons';
import { useTranslation } from 'react-i18next';

export type OrderStatus = 'Delivered' | 'Preparing' | 'Confirmed' | 'Pending' | 'Cancelled';

export type RecentOrderItem = {
  id: string;
  orderNumber: string;
  date: string;
  itemCount: number;
  totalPrice: number;
  status: OrderStatus;
  image: ImageSourcePropType | { uri: string };
};

export const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; bg: string; text: string; icon: string }
> = {
  Delivered: {
    label: 'Delivered',
    bg: '#D1FAE5',
    text: '#059669',
    icon: '✓',
  },
  Preparing: {
    label: 'Preparing',
    bg: '#E0F2FE',
    text: '#0284C7',
    icon: '⏳',
  },
  Confirmed: {
    label: 'Confirmed',
    bg: '#F3E8FF',
    text: '#7E22CE',
    icon: '✓',
  },
  Pending: {
    label: 'Pending',
    bg: '#FEF3C7',
    text: '#D97706',
    icon: '•',
  },
  Cancelled: {
    label: 'Cancelled',
    bg: '#FEE2E2',
    text: '#DC2626',
    icon: '✕',
  },
};

export const MOCK_RECENT_ORDERS: RecentOrderItem[] = [
  {
    id: 'ord_1',
    orderNumber: '#OE-2025-001',
    date: 'Jul 1, 2025',
    itemCount: 2,
    totalPrice: 609.0,
    status: 'Delivered',
    image: require('@/assets/images/product_1.png'),
  },
  {
    id: 'ord_2',
    orderNumber: '#OE-2025-002',
    date: 'Jul 1, 2025',
    itemCount: 2,
    totalPrice: 609.0,
    status: 'Delivered',
    image: require('@/assets/images/product_2.png'),
  },
];

type HomeRecentOrdersProps = {
  orders?: RecentOrderItem[];
  onPressOrder?: (order: RecentOrderItem) => void;
  onPressSeeAll?: () => void;
};

export default function HomeRecentOrders({
  orders = [],
  onPressOrder,
  onPressSeeAll,
}: HomeRecentOrdersProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>{t('home.recentOrders')}</Text>
        <TouchableOpacity onPress={onPressSeeAll} activeOpacity={0.7}>
          <Text style={styles.seeAllText}>{t('home.seeAllOrders')} →</Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <View style={styles.ordersList}>
        {orders.length === 0 ? (
          <View style={{ paddingVertical: 20, alignItems: 'center' }}>
            <Text style={{ fontFamily: 'Nunito-Medium', fontSize: 13, color: '#9CA3AF' }}>
              {t('home.noRecentOrders')}
            </Text>
          </View>
        ) : (
          orders.map((item) => {
            const imageSource = typeof item.image === 'string' ? { uri: item.image } : item.image;
            const statusInfo = STATUS_CONFIG[item.status] || STATUS_CONFIG.Pending;

            return (
              <TouchableOpacity
                key={item.id}
                style={styles.orderCard}
                onPress={() => onPressOrder?.(item)}
                activeOpacity={0.8}>
                {/* Product Thumbnail */}
                <View style={styles.imageWrapper}>
                  <Image source={imageSource} style={styles.orderImage} resizeMode="cover" />
                </View>

                {/* Order Info Details */}
                <View style={styles.detailsWrapper}>
                  <Text style={styles.orderNumber}>{item.orderNumber}</Text>

                  <View style={styles.dateRow}>
                    <Text style={styles.clockIcon}>🕒</Text>
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>

                  <View style={styles.itemsPriceRow}>
                    <Text style={styles.itemCountText}>{item.itemCount} {t('common.items')}</Text>
                    <Text style={styles.bulletText}> • </Text>
                    <Text style={styles.totalPriceText}>${item.totalPrice.toFixed(2)}</Text>
                  </View>
                </View>

                {/* Right Side Status & Chevron */}
                <View style={styles.rightContainer}>
                  <View style={[styles.statusBadge, { backgroundColor: statusInfo.bg }]}>
                    <Text style={[styles.statusIcon, { color: statusInfo.text }]}>
                      {statusInfo.icon}
                    </Text>
                    <Text style={[styles.statusText, { color: statusInfo.text }]}>
                      {t(`orders.${item.status.toLowerCase()}` as any)}
                    </Text>
                  </View>

                  <ChevronRightIcon size={16} color="#9CA3AF" style={styles.chevronIcon} />
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: '#1F2937',
  },
  seeAllText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 13,
    color: '#C4202B',
  },
  ordersList: {
    paddingHorizontal: 16,
    gap: 10,
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  imageWrapper: {
    width: 68,
    height: 68,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  orderImage: {
    width: '100%',
    height: '100%',
  },
  detailsWrapper: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  orderNumber: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 2,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  clockIcon: {
    fontSize: 11,
    marginRight: 4,
    opacity: 0.6,
  },
  dateText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 12,
    color: '#9CA3AF',
  },
  itemsPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemCountText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 12,
    color: '#6B7280',
  },
  bulletText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 12,
    color: '#9CA3AF',
  },
  totalPriceText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#C4202B',
  },
  rightContainer: {
    height: 68,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusIcon: {
    fontFamily: 'Nunito-Bold',
    fontSize: 11,
  },
  statusText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 11,
  },
  chevronIcon: {
    marginBottom: 2,
  },
});
