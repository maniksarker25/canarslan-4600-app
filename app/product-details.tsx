import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ProductsHeader } from '@/components/products';
import { ProductItem } from '@/components/home';
import { ProductSpecs, QuantitySelector, SimilarProducts } from '@/components/product-details';
import { useGetProductDetailsQuery, useGetAllProductsQuery } from '@/store/api/productApi';
import { useAddToCartMutation, useGetCartQuery } from '@/store/api/cartApi';
import Toast from 'react-native-toast-message';

export default function ProductDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const productId = typeof params.id === 'string' ? params.id : '';

  const { data: dbProduct, isLoading } = useGetProductDetailsQuery(productId, {
    skip: !productId,
  });
  const { data: dbCart } = useGetCartQuery();
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();

  const [activeTab, setActiveTab] = useState<'info' | 'desc'>('info');
  const [quantity, setQuantity] = useState(1);

  // Extract category id from loaded product
  const categoryId = dbProduct?.data?.category?._id;

  // Fetch similar products in the same category (max 5), skip until product loaded
  const { data: dbSimilar, isFetching: isFetchingSimilar } = useGetAllProductsQuery(
    { category: categoryId, limit: 6 },
    { skip: !categoryId }
  );

  // Exclude the current product from similar list
  const similarProductsMapped =
    dbSimilar?.data?.result
      ?.filter((p: any) => p._id !== productId)
      .slice(0, 5)
      .map((p: any) => ({
        id: p._id,
        name: p.name,
        price: p.price,
        unit: p.unit,
        category: p.category?.name || '',
        categoryId: p.category?._id || '',
        image: { uri: p.image },
      })) || [];

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/home');
    }
  };

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToCart = async () => {
    if (!productId) return;
    try {
      const response = await addToCart({ product: productId, quantity }).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Added to Cart',
        text2: response.message || 'Product successfully added.',
      });
      router.push('/cart');
    } catch (err: any) {
      console.error('Add to cart failed:', err);
      Toast.show({
        type: 'error',
        text1: 'Cart Error',
        text2: err?.data?.message || err?.message || 'Could not add product to cart.',
      });
    }
  };

  if (isLoading || !dbProduct?.data) {
    return (
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#EEE6E1" />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#EEE6E1',
          }}>
          <ActivityIndicator size="large" color="#C4202B" />
        </View>
      </SafeAreaView>
    );
  }

  const product = dbProduct.data;

  // Resolve fields
  const displayUnit = product.unit === 'per_kg' ? 'kg' : product.unit === 'per_lb' ? 'lb' : 'pc';
  const displayAvailability =
    product.availability === 'in_stock'
      ? { label: 'In Stock', bg: '#DCFCE7', text: '#15803D' }
      : product.availability === 'limited_stock'
        ? { label: 'Limited', bg: '#FEF3C7', text: '#92400E' }
        : { label: 'Out of Stock', bg: '#FEE2E2', text: '#DC2626' };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEE6E1" />

      <View style={styles.contentWrapper}>
        {/* Header Bar */}
        <ProductsHeader
          title={product.name}
          onPressBack={handleBack}
          onPressCart={() => router.push('/cart')}
          cartCount={dbCart?.data?.totalItems || 0}
          backgroundColor="transparent"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Main Product Card Panel */}
          <View style={styles.mainCard}>
            <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="cover" />

            <View style={styles.titleRow}>
              <View style={styles.titleCol}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.categorySubText}>{product.category?.name || 'Meat'}</Text>
              </View>
              {displayAvailability && (
                <View style={[styles.stockBadge, { backgroundColor: displayAvailability.bg }]}>
                  <Text style={[styles.stockText, { color: displayAvailability.text }]}>
                    • {displayAvailability.label}
                  </Text>
                </View>
              )}
            </View>

            {/* Price Box */}
            <View style={styles.priceBox}>
              <View>
                <Text style={styles.priceLabel}>Customer Price</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.priceText}>${product.price.toFixed(2)}</Text>
                  <Text style={styles.unitText}>/{displayUnit}</Text>
                </View>
              </View>
              <View style={styles.packSizeWrapper}>
                <Text style={styles.priceLabel}>Pack Size</Text>
                <Text style={styles.packSizeText}>{product.packSize}</Text>
              </View>
            </View>
          </View>

          {/* Info vs Description Tabs Selector */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'info' && styles.activeTabButton]}
              onPress={() => setActiveTab('info')}
              activeOpacity={0.8}>
              <Text style={[styles.tabText, activeTab === 'info' && styles.activeTabText]}>
                Product Info
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'desc' && styles.activeTabButton]}
              onPress={() => setActiveTab('desc')}
              activeOpacity={0.8}>
              <Text style={[styles.tabText, activeTab === 'desc' && styles.activeTabText]}>
                Description
              </Text>
            </TouchableOpacity>
          </View>

          {/* Dynamic Tab Content */}
          {activeTab === 'info' ? (
            <ProductSpecs
              category={product.category?.name || 'Meat'}
              unit={displayUnit}
              packSize={product.packSize}
              availability={displayAvailability?.label || 'In Stock'}
            />
          ) : (
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionText}>{product.description}</Text>
            </View>
          )}

          {/* Quantity Selector section */}
          <QuantitySelector
            quantity={quantity}
            unit={displayUnit}
            price={product.price}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />

          {/* Similar Products section */}
          <SimilarProducts
            products={similarProductsMapped}
            isLoading={isFetchingSimilar}
            onPressProduct={(selected) => {
              router.push({ pathname: '/product-details', params: { id: selected.id } });
            }}
            onPressViewAll={() => {
              router.push({
                pathname: '/products',
                params: {
                  categoryId: categoryId,
                  categoryName: product.category?.name || '',
                },
              });
            }}
          />
        </ScrollView>

        {/* Bottom Fixed Action Button */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={[styles.bottomButton, isAdding && { opacity: 0.7 }]}
            onPress={handleAddToCart}
            disabled={isAdding}
            activeOpacity={0.8}>
            {isAdding ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.bottomButtonText}>Add to Cart</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEE6E1',
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: '#EEE6E1',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  titleCol: {
    flex: 1,
  },
  productName: {
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    color: '#1F2937',
    marginBottom: 2,
  },
  categorySubText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 13,
    color: '#9CA3AF',
  },
  stockBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stockText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 11,
  },
  priceBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF1F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  priceLabel: {
    fontFamily: 'Nunito-Medium',
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 3,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    color: '#C4202B',
  },
  unitText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 1,
  },
  packSizeWrapper: {
    alignItems: 'flex-end',
  },
  packSizeText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    color: '#1F2937',
    marginTop: 2,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    padding: 3,
    height: 44,
    marginBottom: 8,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  tabText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 13,
    color: '#6B7280',
  },
  activeTabText: {
    fontFamily: 'Nunito-Bold',
    color: '#C4202B',
  },
  descriptionBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  descriptionText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  bottomBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  bottomButton: {
    backgroundColor: '#C4202B',
    borderRadius: 10,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    color: '#FFFFFF',
  },
});
