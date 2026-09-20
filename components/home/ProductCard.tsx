import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { useTranslation } from 'react-i18next';

export type ProductItem = {
  id: string;
  name: string;
  price: number;
  unit?: string;
  image: ImageSourcePropType | { uri: string };
  badges?: { label: string; bg: string; text: string }[];
  stockStatus?: { label: string; bg: string; text: string };
};

type ProductCardProps = {
  product: ProductItem;
  onPressCard?: (product: ProductItem) => void;
  onPressAddToCart?: (product: ProductItem) => void;
};

export default function ProductCard({
  product,
  onPressCard,
  onPressAddToCart,
}: ProductCardProps) {
  const { t } = useTranslation();
  const imageSource =
    typeof product.image === 'string' ? { uri: product.image } : product.image;

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => onPressCard?.(product)}
      activeOpacity={0.9}>
      {/* Image Container with Badges */}
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.productImage} resizeMode="cover" />

        {/* Top Badges */}
        {product.badges && product.badges.length > 0 && (
          <View style={styles.badgesOverlay}>
            {product.badges.map((badge, idx) => (
              <View key={idx} style={[styles.badgePill, { backgroundColor: badge.bg }]}>
                <Text style={[styles.badgeText, { color: badge.text }]}>{badge.label}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Content Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.productName} numberOfLines={1}>
          {product.name}
        </Text>

        {/* Price & Stock Status Row */}
        <View style={styles.priceRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>${product.price.toFixed(2)}</Text>
            <Text style={styles.unitText}>/{product.unit || 'kg'}</Text>
          </View>

          {product.stockStatus && (
            <View style={[styles.stockBadge, { backgroundColor: product.stockStatus.bg }]}>
              <Text style={[styles.stockText, { color: product.stockStatus.text }]}>
                {product.stockStatus.label}
              </Text>
            </View>
          )}
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => onPressAddToCart?.(product)}
          activeOpacity={0.8}>
          <Text style={styles.addToCartText}>+ {t('common.addToCart')}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    height: 115,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#F3F4F6',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  badgesOverlay: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  badgePill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 9,
    letterSpacing: 0.3,
  },
  detailsContainer: {
    marginTop: 10,
  },
  productName: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    color: '#1F2937',
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#C4202B',
  },
  unitText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 1,
  },
  stockBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  stockText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 10,
  },
  addToCartButton: {
    backgroundColor: '#C4202B',
    borderRadius: 10,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 13,
    color: '#FFFFFF',
  },
});
