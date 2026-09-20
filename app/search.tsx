import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { HomeSearchBar, ProductCard, ProductItem } from '@/components/home';
import {
  SearchHeader,
  RecentSearches,
  PopularSearches,
  BrowseCategories,
  BrowseCategoryItem,
} from '@/components/search';
import { useGetAllProductsQuery } from '@/store/api/productApi';
import { useGetAllCategoriesQuery } from '@/store/api/categoryApi';
import { useTranslation } from 'react-i18next';

const BACKGROUND_COLORS = ['#FFEBF0', '#FEF9C3', '#F3E8FF', '#E0F2FE', '#FFEDD5'];

export default function SearchScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);
    return () => clearTimeout(handler);
  }, [query]);

  const { data: dbProducts, isLoading } = useGetAllProductsQuery(
    debouncedQuery ? { searchTerm: debouncedQuery } : undefined,
    { skip: !debouncedQuery }
  );

  const { data: dbCategories } = useGetAllCategoriesQuery();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/home');
    }
  };

  const handleSelectSearchQuery = (selectedQuery: string) => {
    setQuery(selectedQuery);
  };

  const handleSelectCategory = (category: BrowseCategoryItem) => {
    router.push({
      pathname: '/products',
      params: { categoryId: category.id, categoryName: category.name },
    });
  };

  const handleProductPress = (product: ProductItem) => {
    router.push({ pathname: '/product-details', params: { id: product.id } });
  };

  const handleAddToCart = (product: ProductItem) => {
    router.push({ pathname: '/product-details', params: { id: product.id } });
  };

  // Mappings
  const displayProducts: ProductItem[] =
    dbProducts?.data?.result?.map((prod) => ({
      id: prod._id,
      name: prod.name,
      price: prod.price,
      unit: prod.unit === 'per_kg' ? 'kg' : prod.unit === 'per_lb' ? 'lb' : 'pc',
      image: { uri: prod.image },
      stockStatus:
        prod.availability === 'in_stock'
          ? { label: 'In Stock', bg: '#DCFCE7', text: '#15803D' }
          : prod.availability === 'limited_stock'
            ? { label: 'Limited', bg: '#FEF3C7', text: '#92400E' }
            : { label: 'Out of Stock', bg: '#FEE2E2', text: '#DC2626' },
      badges: prod.isFeatured ? [{ label: 'HOT', bg: '#C4202B', text: '#FFFFFF' }] : [],
    })) || [];

  const categoriesMapped: BrowseCategoryItem[] =
    dbCategories?.data?.result?.map((cat, index) => ({
      id: cat._id,
      name: cat.name,
      productCount: cat.totalProduct || 0,
      image: { uri: cat.image },
      backgroundColor: BACKGROUND_COLORS[index % BACKGROUND_COLORS.length],
    })) || [];

  const isSearching = query.trim() !== '';

  return (
    <View style={styles.rootContainer}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Top Header */}
        <SearchHeader title={t('search.title')} onPressBack={handleBack} />

        {/* Search Bar Input */}
        <View style={styles.searchBarWrapper}>
          <HomeSearchBar
            value={query}
            onChangeText={setQuery}
            placeholder={t('search.placeholder')}
            onPressFilter={() => console.log('Filter trigger')}
          />
        </View>

        {isSearching ? (
          /* Search Results */
          isLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#C4202B" />
            </View>
          ) : displayProducts.length === 0 ? (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsTitle}>{t('search.noResults')}</Text>
              <Text style={styles.noResultsSubtitle}>
                {t('search.noResultsSubtitle')}
              </Text>
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
            />
          )
        ) : (
          /* Default Browse State */
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            {/* Recent Searches */}
            {/* <RecentSearches onPressItem={handleSelectSearchQuery} /> */}

            {/* Popular Searches */}
            {/* <PopularSearches onPressItem={handleSelectSearchQuery} /> */}

            {/* Browse by Category */}
            <BrowseCategories
              categories={categoriesMapped}
              onPressCategory={handleSelectCategory}
            />
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#EEE6E1',
  },
  safeArea: {
    flex: 1,
  },
  searchBarWrapper: {
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 24,
  },
  noResultsTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  noResultsSubtitle: {
    fontFamily: 'Nunito-Medium',
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  gridContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 32,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardWrapper: {
    width: '48.5%',
  },
});
