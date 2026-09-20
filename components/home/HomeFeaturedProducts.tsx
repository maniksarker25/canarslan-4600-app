import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProductCard, { ProductItem } from './ProductCard';
import { useTranslation } from 'react-i18next';

export const MOCK_FEATURED_PRODUCTS: ProductItem[] = [
  {
    id: 'prod_1',
    name: 'Ribeye Steak',
    price: 42.0,
    unit: 'kg',
    image: require('@/assets/images/product_1.png'),
    badges: [
      { label: 'NEW', bg: '#C4202B', text: '#FFFFFF' },
      { label: 'LOW STOCK', bg: '#FEF3C7', text: '#92400E' },
    ],
    stockStatus: { label: 'Limited', bg: '#FEF3C7', text: '#92400E' },
  },
  {
    id: 'prod_2',
    name: 'Beef Tenderloin',
    price: 38.5,
    unit: 'kg',
    image: require('@/assets/images/product_2.png'),
    badges: [{ label: 'NEW', bg: '#C4202B', text: '#FFFFFF' }],
    stockStatus: { label: 'In Stock', bg: '#DCFCE7', text: '#15803D' },
  },
];

type HomeFeaturedProductsProps = {
  products?: ProductItem[];
  onPressProduct?: (product: ProductItem) => void;
  onPressAddToCart?: (product: ProductItem) => void;
  onPressSeeAll?: () => void;
};

export default function HomeFeaturedProducts({
  products = MOCK_FEATURED_PRODUCTS,
  onPressProduct,
  onPressAddToCart,
  onPressSeeAll,
}: HomeFeaturedProductsProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>{t('home.featuredProducts')}</Text>
        <TouchableOpacity onPress={onPressSeeAll} activeOpacity={0.7}>
          <Text style={styles.seeAllText}>{t('home.seeAllProducts')} →</Text>
        </TouchableOpacity>
      </View>

      {/* Products Row Grid */}
      <View style={styles.productsGrid}>
        {products.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            onPressCard={onPressProduct}
            onPressAddToCart={onPressAddToCart}
          />
        ))}
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
  productsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
});
