import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { ChevronRightIcon, ClockIcon } from '@/components/icons';
import { OrderStatus, STATUS_CONFIG } from '@/components/order-details';

export type OrderItemData = {
  id: string;
  orderNumber: string;
  date: string;
  itemCount: number;
  totalPrice: number;
  status: OrderStatus;
  image: ImageSourcePropType | { uri: string };
};

type OrderListItemProps = {
  order: OrderItemData;
  onPress: (order: OrderItemData) => void;
};

export default function OrderListItem({ order, onPress }: OrderListItemProps) {
  const config = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
  const imageSource = typeof order.image === 'string' ? { uri: order.image } : order.image;

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(order)} activeOpacity={0.8}>
      {/* Product Image */}
      <View style={styles.imageWrapper}>
        <Image source={imageSource} style={styles.productImage} resizeMode="cover" />
      </View>

      {/* Info Details (Center) */}
      <View style={styles.detailsWrapper}>
        <Text style={styles.orderNumber}>{order.orderNumber}</Text>
        
        {/* Date Row */}
        <View style={styles.dateRow}>
          <ClockIcon size={12} color="#9CA3AF" style={styles.clockIcon} />
          <Text style={styles.dateText}>{order.date}</Text>
        </View>

        {/* Item count & price subtext */}
        <Text style={styles.subText}>
          {order.itemCount} items • <Text style={styles.priceBold}>${order.totalPrice.toFixed(2)}</Text>
        </Text>
      </View>

      {/* Right Column (Status & Chevron) */}
      <View style={styles.rightCol}>
        <View style={[styles.statusBadge, { backgroundColor: config.bg }]}>
          <Text style={[styles.statusText, { color: config.text }]}>{config.label}</Text>
        </View>
        
        <ChevronRightIcon size={16} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
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
  productImage: {
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
    marginBottom: 4,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  clockIcon: {
    marginRight: 4,
  },
  dateText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 12,
    color: '#9CA3AF',
  },
  subText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 13,
    color: '#6B7280',
  },
  priceBold: {
    fontFamily: 'Nunito-Bold',
    color: '#C4202B',
  },
  rightCol: {
    height: 68,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 11,
  },
});
