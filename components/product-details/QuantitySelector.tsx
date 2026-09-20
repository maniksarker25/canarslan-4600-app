import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type QuantitySelectorProps = {
  quantity: number;
  unit?: string;
  price: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function QuantitySelector({
  quantity,
  unit = 'kg',
  price,
  onIncrease,
  onDecrease,
}: QuantitySelectorProps) {
  const total = price * quantity;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Select Quantity</Text>

      <View style={styles.row}>
        {/* Selector Box */}
        <View style={styles.selectorBox}>
          <TouchableOpacity
            style={[styles.adjustButton, styles.minusButton]}
            onPress={onDecrease}
            activeOpacity={0.7}
            disabled={quantity <= 1}>
            <Text style={[styles.adjustButtonText, quantity <= 1 && styles.disabledText]}>−</Text>
          </TouchableOpacity>

          <View style={styles.qtyLabelContainer}>
            <Text style={styles.qtyText}>{quantity}</Text>
            <Text style={styles.unitText}>{unit}</Text>
          </View>

          <TouchableOpacity
            style={[styles.adjustButton, styles.plusButton]}
            onPress={onIncrease}
            activeOpacity={0.7}>
            <Text style={styles.plusButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Total Price display */}
        <View style={styles.totalWrapper}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPriceText}>${total.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  titleText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    color: '#1F2937',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    height: 44,
    paddingHorizontal: 4,
    width: 160,
    justifyContent: 'space-between',
  },
  adjustButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adjustButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: '#4B5563',
  },
  disabledText: {
    opacity: 0.3,
  },
  minusButton: {
    backgroundColor: '#FFFFFF',
  },
  plusButton: {
    backgroundColor: '#C4202B',
  },
  plusButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  qtyLabelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    color: '#1F2937',
    lineHeight: 18,
  },
  unitText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 11,
    color: '#9CA3AF',
    lineHeight: 12,
  },
  totalWrapper: {
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontFamily: 'Nunito-Medium',
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 1,
  },
  totalPriceText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: '#C4202B',
  },
});
