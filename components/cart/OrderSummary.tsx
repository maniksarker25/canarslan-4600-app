import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CartItem } from './CartItemCard';
import { useTranslation } from 'react-i18next';

type OrderSummaryProps = {
  items: CartItem[];
  total: number;
};

export default function OrderSummary({ items, total }: OrderSummaryProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{t('cart.orderSummary')}</Text>

      <View style={styles.itemsList}>
        {items.map((item) => {
          const itemTotal = item.price * item.quantity;
          return (
            <View key={item.id} style={styles.itemRow}>
              <Text style={styles.itemLabel}>
                {item.name} × {item.quantity}
              </Text>
              <Text style={styles.itemValue}>${itemTotal.toFixed(2)}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>{t('cart.total')}</Text>
        <Text style={styles.totalPriceText}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  titleText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 12,
  },
  itemsList: {
    gap: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLabel: {
    fontFamily: 'Nunito-Medium',
    fontSize: 13,
    color: '#6B7280',
  },
  itemValue: {
    fontFamily: 'Nunito-Bold',
    fontSize: 13,
    color: '#1F2937',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 14,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    color: '#1F2937',
  },
  totalPriceText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: '#C4202B',
  },
});
