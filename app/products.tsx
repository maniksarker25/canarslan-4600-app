import React from 'react';
import { StyleSheet, FlatList, View, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ProductCard, ProductItem } from '@/components/home';
import { ProductsHeader, FilterSortBar } from '@/components/products';
import { useGetAllProductsQuery } from '@/store/api/productApi';
import { useGetCartQuery } from '@/store/api/cartApi';
import { useTranslation } from 'react-i18next';

export default function AllProductsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { t } = useTranslation();

  const categoryId = params.categoryId as string | undefined;
  const categoryName = params.categoryName as string | undefined;

  const { data: dbProducts, isLoading } = useGetAllProductsQuery(
    categoryId ? { category: categoryId } : undefined
  );
  const { data: dbCart } = useGetCartQuery();

  const displayProducts: ProductItem[] = dbProducts?.data?.result?.map((prod) => ({
    id: prod._id,
    name: prod.name,
    price: prod.price,
    unit: prod.unit === 'per_kg' ? 'kg' : prod.unit === 'per_lb' ? 'lb' : 'pc',
    image: { uri: prod.image },
    stockStatus: prod.availability === 'in_stock'
      ? { label: 'In Stock', bg: '#DCFCE7', text: '#15803D' }
      : prod.availability === 'limited_stock'
        ? { label: 'Limited', bg: '#FEF3C7', text: '#92400E' }
        : { label: 'Out of Stock', bg: '#FEE2E2', text: '#DC2626' },
    badges: prod.isFeatured ? [{ label: 'HOT', bg: '#C4202B', text: '#FFFFFF' }] : [],
  })) || [];

  const headerTitle = categoryName ? `${categoryName}` : t('products.allProducts');

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/home');
    }
  };

  const handleCartPress = () => {
    router.push('/cart');
  };

  const handleProductPress = (product: ProductItem) => {
    router.push({
      pathname: '/product-details',
      params: { id: product.id },
    });
  };

  const handleAddToCart = (product: ProductItem) => {
    router.push({
      pathname: '/product-details',
      params: { id: product.id },
    });
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.contentWrapper}>
        {/* Header Bar */}
        <ProductsHeader
          title={headerTitle}
          onPressBack={handleBack}
          onPressCart={handleCartPress}
          cartCount={dbCart?.data?.totalItems || 0}
        />

        {/* Filter and Sort options bar */}
        <FilterSortBar
          productCount={displayProducts.length}
          onPressFilter={() => router.push('/search')}
        />

        {/* Responsive 2-Column Grid */}
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#C4202B" />
          </View>
        ) : (
          <FlatList
            data={displayProducts}
            renderItem={({ item }) => (
              <View style={styles.cardWrapper}>
                <ProductCard
                  product={item}
                  onPressCard={handleProductPress}
                  onPressAddToCart={handleAddToCart}
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.gridContent}
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 16 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: '#EEE6E1',
  },
  gridContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardWrapper: {
    width: '48.5%',
  },
});
