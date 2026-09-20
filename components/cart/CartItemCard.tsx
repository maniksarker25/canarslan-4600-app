import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType, ActivityIndicator } from 'react-native';
import { TrashIcon } from '@/components/icons';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  image: ImageSourcePropType | { uri: string };
};

type CartItemCardProps = {
  item: CartItem;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
  isUpdating?: boolean;
};

export default function CartItemCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  isUpdating = false,
}: CartItemCardProps) {
  const imageSource = typeof item.image === 'string' ? { uri: item.image } : item.image;
  const itemTotal = item.price * item.quantity;

  return (
    <View style={styles.cardContainer}>
      {/* Thumbnail Image */}
      <View style={styles.imageWrapper}>
        <Image source={imageSource} style={styles.productImage} resizeMode="cover" />
      </View>

      {/* Details (Center) */}
      <View style={styles.detailsContainer}>
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.unitPriceText}>
          ${item.price.toFixed(2)} / {item.unit}
        </Text>

        {/* Quantity Controls inside Card */}
        <View style={[styles.quantityWrapper, isUpdating && { justifyContent: 'center' }]}>
          {isUpdating ? (
            <ActivityIndicator size="small" color="#C4202B" />
          ) : (
            <>
              <TouchableOpacity
                style={[styles.qtyButton, styles.minusButton]}
                onPress={() => onDecrease(item.id)}
                disabled={item.quantity <= 1}
                activeOpacity={0.7}>
                <Text style={[styles.qtyButtonText, item.quantity <= 1 && styles.disabledText]}>−</Text>
              </TouchableOpacity>

              <Text style={styles.qtyText}>{item.quantity}</Text>

              <TouchableOpacity
                style={[styles.qtyButton, styles.plusButton]}
                onPress={() => onIncrease(item.id)}
                activeOpacity={0.7}>
                <Text style={styles.plusButtonText}>+</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {/* Right Container (Trash & Price) */}
      <View style={styles.rightContainer}>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => onRemove(item.id)}
          activeOpacity={0.7}>
          <TrashIcon size={16} color="#EF4444" />
        </TouchableOpacity>

        <Text style={styles.itemTotalText}>${itemTotal.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
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
    marginBottom: 10,
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
  detailsContainer: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    color: '#1F2937',
    marginBottom: 2,
  },
  unitPriceText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 6,
  },
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    height: 32,
    paddingHorizontal: 2,
    width: 100,
    justifyContent: 'space-between',
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  minusButton: {
    backgroundColor: '#FFFFFF',
  },
  plusButton: {
    backgroundColor: '#C4202B',
  },
  qtyButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#4B5563',
  },
  plusButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  qtyText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 13,
    color: '#1F2937',
  },
  disabledText: {
    opacity: 0.3,
  },
  rightContainer: {
    height: 68,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTotalText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    color: '#C4202B',
  },
});
