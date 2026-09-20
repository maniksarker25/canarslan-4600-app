import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeftIcon, CartIcon } from '@/components/icons';

type ProductsHeaderProps = {
  title?: string;
  onPressBack?: () => void;
  onPressCart?: () => void;
  cartCount?: number;
  backgroundColor?: string;
};

export default function ProductsHeader({
  title = 'All Products',
  onPressBack,
  onPressCart,
  cartCount = 0,
  backgroundColor = '#FFFFFF',
}: ProductsHeaderProps) {
  return (
    <View style={[styles.headerWrapper, { backgroundColor }]}>
      <View style={[styles.container, { backgroundColor }]}>
        <TouchableOpacity style={styles.iconButton} onPress={onPressBack} activeOpacity={0.7}>
          <ArrowLeftIcon size={20} color="#1F2937" />
        </TouchableOpacity>

        <Text style={styles.titleText}>{title}</Text>

        {onPressCart ? (
          <TouchableOpacity style={styles.iconButton} onPress={onPressCart} activeOpacity={0.7}>
            <CartIcon size={20} color="#1F2937" />
            {cartCount > 0 && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
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
  titleText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: '#1F2937',
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
  placeholder: {
    width: 40,
  },
});
