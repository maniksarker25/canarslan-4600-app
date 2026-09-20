import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, RefreshControl, Text, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  HomeHeader,
  HomeSearchBar,
  HomeBanner,
  HomeCategories,
  HomeFeaturedProducts,
  HomeRecentOrders,
  CategoryItem,
  ProductItem,
  RecentOrderItem,
} from '@/components/home';

import { useAuth } from '@/hooks/useAuth';
import { useGetAllCategoriesQuery } from '@/store/api/categoryApi';
import { useGetAllProductsQuery } from '@/store/api/productApi';
import { useGetMyOrdersQuery } from '@/store/api/orderApi';
import { useGetCartQuery } from '@/store/api/cartApi';
import { useGetNotificationsQuery } from '@/store/api/notificationApi';
import { useTranslation } from 'react-i18next';

const BACKGROUND_COLORS = ['#FFEBF0', '#FEF9C3', '#F3E8FF', '#E0F2FE', '#FFEDD5'];

// --- Skeleton Shimmer Block ---
// Warm-themed skeleton colors matching #EEE6E1 background
const SKEL_BG = '#D5CBC4'; // warm taupe shimmer
const SKEL_CARD = '#F5F0EC'; // warm card surface
const SKEL_CARD_BORDER = '#E8DDD8'; // subtle warm border

const SkeletonBox = ({
  width,
  height,
  borderRadius = 6,
  style,
}: {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: any;
}) => (
  <View
    style={[
      {
        width: width as any,
        height,
        borderRadius,
        backgroundColor: SKEL_BG,
      },
      style,
    ]}
  />
);

// --- Full Page Skeleton (warm-themed to match #EEE6E1) ---
const HomeSkeleton = () => (
  <View style={{ flex: 1, backgroundColor: '#EEE6E1' }}>
    {/* ── Header ── */}
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 14,
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
        <SkeletonBox width={38} height={38} borderRadius={19} />
        <View style={{ gap: 7 }}>
          <SkeletonBox width={72} height={9} borderRadius={5} />
          <SkeletonBox width={120} height={13} borderRadius={5} />
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <SkeletonBox width={38} height={38} borderRadius={19} />
        <SkeletonBox width={38} height={38} borderRadius={19} />
        <SkeletonBox width={36} height={36} borderRadius={18} />
      </View>
    </View>

    {/* ── Search Bar ── */}
    <View style={{ paddingHorizontal: 16, marginBottom: 14 }}>
      <SkeletonBox width="100%" height={48} borderRadius={14} />
    </View>

    {/* ── Banner ── */}
    <View style={{ paddingHorizontal: 16, marginBottom: 22 }}>
      <SkeletonBox width="100%" height={148} borderRadius={20} />
    </View>

    {/* ── Categories ── */}
    <View style={{ paddingHorizontal: 16, marginBottom: 22 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14,
        }}>
        <SkeletonBox width={95} height={15} />
        <SkeletonBox width={48} height={12} />
      </View>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        {[1, 2, 3, 4].map((i) => (
          <View key={i} style={{ alignItems: 'center', gap: 9, flex: 1 }}>
            <SkeletonBox width={58} height={58} borderRadius={29} />
            <SkeletonBox width={42} height={9} borderRadius={5} />
          </View>
        ))}
      </View>
    </View>

    {/* ── Featured Products ── */}
    <View style={{ paddingHorizontal: 16, marginBottom: 22 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14,
        }}>
        <SkeletonBox width={130} height={15} />
        <SkeletonBox width={48} height={12} />
      </View>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        {[1, 2].map((i) => (
          <View
            key={i}
            style={{
              flex: 1,
              backgroundColor: SKEL_CARD,
              borderRadius: 18,
              padding: 12,
              gap: 9,
              borderWidth: 1,
              borderColor: SKEL_CARD_BORDER,
            }}>
            <SkeletonBox width="100%" height={110} borderRadius={12} />
            <SkeletonBox width="78%" height={13} />
            <SkeletonBox width="45%" height={10} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 2,
              }}>
              <SkeletonBox width="50%" height={15} />
              <SkeletonBox width={30} height={30} borderRadius={15} />
            </View>
          </View>
        ))}
      </View>
    </View>

    {/* ── Recent Orders ── */}
    <View style={{ paddingHorizontal: 16 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14,
        }}>
        <SkeletonBox width={108} height={15} />
        <SkeletonBox width={48} height={12} />
      </View>
      <View style={{ gap: 10 }}>
        {[1, 2].map((i) => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: SKEL_CARD,
              borderRadius: 18,
              padding: 14,
              gap: 12,
              borderWidth: 1,
              borderColor: SKEL_CARD_BORDER,
            }}>
            <SkeletonBox width={64} height={64} borderRadius={12} />
            <View style={{ flex: 1, gap: 9 }}>
              <SkeletonBox width="62%" height={13} />
              <SkeletonBox width="42%" height={10} />
              <SkeletonBox width="52%" height={10} />
            </View>
            <View style={{ alignItems: 'flex-end', gap: 8 }}>
              <SkeletonBox width={70} height={26} borderRadius={13} />
              <SkeletonBox width={16} height={16} borderRadius={8} />
            </View>
          </View>
        ))}
      </View>
    </View>
  </View>
);

// --- Status mapper: backend -> OrderStatus key ---
const mapOrderStatus = (raw: string): RecentOrderItem['status'] => {
  switch (raw?.toLowerCase()) {
    case 'confirmed':
      return 'Confirmed';
    case 'preparing':
      return 'Preparing';
    case 'delivered':
      return 'Delivered';
    case 'cancelled':
    case 'rejected':
      return 'Cancelled';
    case 'received':
    default:
      return 'Pending';
  }
};

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();
  const { data: dbNotifications } = useGetNotificationsQuery();

  const {
    data: dbCategories,
    refetch: refetchCategories,
    isFetching: isFetchingCategories,
  } = useGetAllCategoriesQuery();
  const {
    data: dbFeaturedProducts,
    refetch: refetchFeaturedProducts,
    isFetching: isFetchingProducts,
  } = useGetAllProductsQuery({ isFeatured: true, limit: 10 });
  const {
    data: dbRecentOrders,
    refetch: refetchRecentOrders,
    isFetching: isFetchingOrders,
  } = useGetMyOrdersQuery({ limit: 5 });
  const { data: dbCart, refetch: refetchCart, isFetching: isFetchingCart } = useGetCartQuery();

  const isRefreshing =
    isFetchingCategories || isFetchingProducts || isFetchingOrders || isFetchingCart;
  // Show skeleton only on the very first load (no cached data yet)
  const isInitialLoading =
    (isFetchingCategories && !dbCategories) ||
    (isFetchingProducts && !dbFeaturedProducts) ||
    (isFetchingOrders && !dbRecentOrders);

  const handleRefresh = () => {
    refetchCategories();
    refetchFeaturedProducts();
    refetchRecentOrders();
    refetchCart();
  };

  const handleCategoryPress = (category: CategoryItem) => {
    router.push({
      pathname: '/products',
      params: { categoryId: category.id, categoryName: category.name.replace('\n', ' ') },
    });
  };

  const handleProductPress = (product: ProductItem) => {
    router.push({ pathname: '/product-details', params: { id: product.id } });
  };

  const handleOrderPress = (order: RecentOrderItem) => {
    router.push({ pathname: '/order-details', params: { id: order.id } });
  };

  // ---- Data mappings ----
  const categoriesMapped: CategoryItem[] =
    dbCategories?.data?.result?.map((cat: any, idx: number) => ({
      id: cat._id,
      name: cat.name,
      image: { uri: cat.image },
      bgColor: BACKGROUND_COLORS[idx % BACKGROUND_COLORS.length],
    })) || [];

  const featuredProductsMapped: ProductItem[] =
    dbFeaturedProducts?.data?.result?.map((prod: any) => ({
      id: prod._id,
      name: prod.name,
      price: prod.price,
      unit: prod.unit === 'per_kg' ? 'kg' : prod.unit === 'per_lb' ? 'lb' : 'pc',
      image: { uri: prod.image },
      stock: prod.stock,
      isFeatured: prod.isFeatured,
      category: prod.category?.name || '',
    })) || [];

  const recentOrdersMapped: RecentOrderItem[] =
    dbRecentOrders?.data?.result?.map((ord: any) => ({
      id: ord._id,
      orderNumber: ord.orderNumber,
      date: new Date(ord.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      itemCount: ord.items?.length || 0,
      totalPrice: ord.totalPrice,
      status: mapOrderStatus(ord.status),
      image: ord.items?.[0]?.image
        ? { uri: ord.items[0].image }
        : require('@/assets/images/product_1.png'),
    })) || [];

  const cartCount =
    dbCart?.data?.items?.reduce((acc: number, it: any) => acc + it.quantity, 0) || 0;
  const notificationCount = dbNotifications?.data?.meta?.unreadCount || 0;

  // Show full-page skeleton on initial load
  if (isInitialLoading) {
    return (
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <HomeSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        bounces={true}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={['#C4202B']}
            tintColor="#C4202B"
          />
        }>
        {/* Top Header */}
        <HomeHeader
          address={user?.companyName || user?.address || '123 Main Street'}
          notificationCount={notificationCount}
          cartCount={cartCount}
          onPressAddress={() => console.log('Address pressed')}
          onPressNotification={() => router.push('/(tabs)/notifications')}
          onPressCart={() => router.push('/cart')}
          onPressProfile={() => router.push('/(tabs)/profile')}
          avatarUrl={user?.avatarUrl || (user ? undefined : require('@/assets/images/dp.jpg'))}
          isVerified={!!user?.isAdminVerified}
        />

        {/* Search Bar */}
        <HomeSearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t('home.searchPlaceholder')}
          onPressContainer={() => router.push('/search')}
          onPressFilter={() => router.push('/search')}
        />

        {/* Banner */}
        <HomeBanner onPressBanner={(index) => console.log('Banner pressed:', index)} />

        {/* Categories */}
        <HomeCategories
          categories={categoriesMapped}
          onPressCategory={handleCategoryPress}
          onPressSeeAll={() => router.push('/categories')}
        />

        {/* Featured Products */}
        <HomeFeaturedProducts
          products={featuredProductsMapped}
          onPressProduct={handleProductPress}
          onPressAddToCart={(product) =>
            router.push({ pathname: '/product-details', params: { id: product.id } })
          }
          onPressSeeAll={() => router.push('/products')}
        />

        {/* Recent Orders — live data from API, no mock fallback */}
        <HomeRecentOrders
          orders={recentOrdersMapped}
          onPressOrder={handleOrderPress}
          onPressSeeAll={() => router.push('/(tabs)/orders')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEE6E1',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 32,
  },
});
