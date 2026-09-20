import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';

export type OrderItemDetail = {
  id: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  image: ImageSourcePropType | { uri: string };
};

type OrderItemsListProps = {
  items: OrderItemDetail[];
};

export default function OrderItemsList({ items }: OrderItemsListProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Order Items ({items.length})</Text>

      <View style={styles.listContainer}>
        {items.map((item, index) => {
          const imageSource =
            typeof item.image === 'string' ? { uri: item.image } : item.image;
          const subtotal = item.price * item.quantity;
          const isLast = index === items.length - 1;

          return (
            <View key={item.id} style={[styles.itemRow, !isLast && styles.borderBottom]}>
              {/* Product Image */}
              <View style={styles.imageWrapper}>
                <Image source={imageSource} style={styles.productImage} resizeMode="cover" />
              </View>

              {/* Title & Qty text */}
              <View style={styles.textWrapper}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.qtyDescText}>
                  {item.quantity} {item.unit} × ${item.price.toFixed(2)}
                </Text>
              </View>

              {/* Item Total Price */}
              <Text style={styles.itemTotalText}>${subtotal.toFixed(2)}</Text>
            </View>
          );
        })}
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
  sectionTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 14,
  },
  listContainer: {
    gap: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 12,
  },
  imageWrapper: {
    width: 48,
    height: 48,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  textWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 2,
  },
  qtyDescText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 12,
    color: '#9CA3AF',
  },
  itemTotalText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#1F2937',
  },
});
