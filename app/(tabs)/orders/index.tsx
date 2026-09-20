import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { OrderListItem, OrderStatusTabs, OrderItemData, TabKey } from '@/components/orders';
import { useLazyGetMyOrdersQuery } from '@/store/api/orderApi';
import { useTranslation } from 'react-i18next';

export default function MyOrdersScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabKey>('all');

  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [trigger, { data: currentData, isLoading, isFetching }] = useLazyGetMyOrdersQuery();

  // Load page 1 on initial mount
  useEffect(() => {
    trigger({ page: 1, limit: 10 });
  }, []);

  // Update/append orders list when new page data is received
  useEffect(() => {
    if (currentData?.success && currentData.data) {
      const { result, meta } = currentData.data;
      if (meta.page === 1) {
        setOrders(result);
      } else {
        setOrders((prev) => {
          const existingIds = new Set(prev.map((o) => o._id));
          const newOrders = result.filter((o) => !existingIds.has(o._id));
          return [...prev, ...newOrders];
        });
      }
    }
  }, [currentData]);

  const mapStatus = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'received':
        return 'pending';
      case 'confirmed':
        return 'confirmed';
      case 'preparing':
        return 'preparing';
      case 'delivered':
        return 'delivered';
      case 'cancelled':
      case 'rejected':
        return 'cancelled';
      default:
        return 'pending';
    }
  };

  const ordersList: OrderItemData[] = orders.map((ord) => ({
    id: ord._id,
    orderNumber: ord.orderNumber,
    date: new Date(ord.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    itemCount: ord.items.reduce((acc: number, it: any) => acc + it.quantity, 0),
    totalPrice: ord.totalPrice,
    status: mapStatus(ord.status) as any,
    image: ord.items[0]?.image
      ? { uri: ord.items[0].image }
      : require('@/assets/images/product_1.png'),
  }));

  // Map counts directly from backend meta counts where available
  const backendData = currentData?.data;
  const counts: Record<TabKey, number> = {
    all: backendData?.totalOrder ?? 0,
    pending: backendData?.pendingOrders ?? 0,
    confirmed:
      backendData?.confirmedOrders ??
      backendData?.totalConfirmed ??
      Math.max(
        0,
        (backendData?.totalOrder ?? 0) -
          ((backendData?.pendingOrders ?? 0) +
            (backendData?.totalPreparing ?? 0) +
            (backendData?.totalDelivered ?? 0) +
            (backendData?.totalCancelled ?? 0))
      ),
    preparing: backendData?.totalPreparing ?? 0,
    delivered: backendData?.totalDelivered ?? 0,
    cancelled: backendData?.totalCancelled ?? 0,
  };

  const handleOrderPress = (order: OrderItemData) => {
    router.push({
      pathname: '/order-details',
      params: { orderId: order.id },
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setPage(1);
    try {
      await trigger({ page: 1, limit: 10 }, false).unwrap();
    } catch (err) {
      console.error('Refresh error:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleLoadMore = () => {
    const totalOrder = backendData?.totalOrder ?? 0;
    if (isFetching || orders.length >= totalOrder) return;

    const nextPage = page + 1;
    setPage(nextPage);
    trigger({ page: nextPage, limit: 10 });
  };

  // Filter list of orders based on selected tab segment
  const filteredOrders =
    activeTab === 'all' ? ordersList : ordersList.filter((order) => order.status === activeTab);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header Panel */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{t('orders.title')}</Text>
        <Text style={styles.headerSubtitle}>{t('orders.totalCount', { count: backendData?.totalOrder ?? 0 })}</Text>
      </View>

      {/* Horizontal Tab Filters */}
      <OrderStatusTabs activeTab={activeTab} onTabSelect={setActiveTab} counts={counts} />

      {/* Beige Cards List Container */}
      <View style={styles.listWrapper}>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#C4202B" />
          </View>
        ) : (
          <FlatList
            data={filteredOrders}
            renderItem={({ item }) => <OrderListItem order={item} onPress={handleOrderPress} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetching && page > 1 ? (
                <View style={{ paddingVertical: 12, alignItems: 'center' }}>
                  <ActivityIndicator size="small" color="#C4202B" />
                </View>
              ) : null
            }
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
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 26,
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: 'Nunito-Medium',
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  listWrapper: {
    flex: 1,
    backgroundColor: '#EEE6E1',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
});
