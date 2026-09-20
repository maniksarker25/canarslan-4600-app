import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LocationIcon } from '@/components/icons';

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';

export const STATUS_CONFIG: Record<OrderStatus, { label: string; bg: string; text: string }> = {
  pending: { label: 'Pending', bg: '#FEF3C7', text: '#D97706' },
  confirmed: { label: '✓ Confirmed', bg: '#DBEAFE', text: '#2563EB' },
  preparing: { label: 'Preparing', bg: '#F3E8FF', text: '#7C3AED' },
  delivered: { label: '✓ Delivered', bg: '#DCFCE7', text: '#16A34A' },
  cancelled: { label: 'Cancelled', bg: '#FEE2E2', text: '#EF4444' },
};

type OrderInfoCardProps = {
  orderNumber: string;
  date: string;
  address: string;
  status: OrderStatus;
};

export default function OrderInfoCard({ orderNumber, date, address, status }: OrderInfoCardProps) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.orderNumberText}>{orderNumber}</Text>
        <View style={[styles.statusBadge, { backgroundColor: config.bg }]}>
          <Text style={[styles.statusBadgeText, { color: config.text }]}>{config.label}</Text>
        </View>
      </View>

      <Text style={styles.dateText}>{date}</Text>

      <View style={styles.addressBox}>
        <LocationIcon size={12} color="#9CA3AF" style={styles.pinIcon} />
        <Text style={styles.addressText} numberOfLines={1}>
          {address}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderNumberText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#1F2937',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 12,
  },
  dateText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    marginBottom: 12,
  },
  addressBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  pinIcon: {
    marginRight: 6,
  },
  addressText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 13,
    color: '#4B5563',
    flex: 1,
  },
});
