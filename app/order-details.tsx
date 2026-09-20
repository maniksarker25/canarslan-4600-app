import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import ConfirmationModal from '@/components/ui/modals/ConfirmationModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ProductsHeader } from '@/components/products';
import { OrderSummary } from '@/components/cart';
import { RepeatIcon } from '@/components/icons';
import {
  OrderInfoCard,
  OrderStatusTracker,
  OrderItemsList,
  OrderStatus,
} from '@/components/order-details';
import { useGetMyOrdersQuery, useUpdateOrderStatusMutation } from '@/store/api/orderApi';
import { useAddToCartMutation, useClearCartMutation } from '@/store/api/cartApi';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

export default function OrderDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { t } = useTranslation();

  const orderId = typeof params.orderId === 'string' ? params.orderId : '';

  const { data: dbOrders, isLoading } = useGetMyOrdersQuery();
  const [updateOrderStatus, { isLoading: isCancelling }] = useUpdateOrderStatusMutation();
  const [addToCart] = useAddToCartMutation();
  const [clearCart] = useClearCartMutation();

  const order = dbOrders?.data?.result?.find((o) => o._id === orderId);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/orders');
    }
  };

  const [isReorderModalVisible, setIsReorderModalVisible] = React.useState(false);

  const handleReorderPress = () => {
    setIsReorderModalVisible(true);
  };

  const handleConfirmReorder = async () => {
    if (!order?.items) return;
    try {
      await clearCart().unwrap();
      for (const it of order.items) {
        await addToCart({ product: it.product, quantity: it.quantity }).unwrap();
      }
      Toast.show({
        type: 'success',
        text1: t('orders.reorderSuccess'),
        text2: t('orders.reorderSuccessMsg'),
      });
      router.push('/cart');
    } catch (err: any) {
      console.error('Reorder failed:', err);
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: err?.data?.message || 'Could not reorder all items.',
      });
    }
  };

  const handleCancelOrder = async () => {
    if (!orderId) return;
    try {
      await updateOrderStatus({
        id: orderId,
        status: 'cancelled',
        note: 'Cancelled by customer',
      }).unwrap();
      Toast.show({
        type: 'success',
        text1: t('orders.orderCancelled'),
        text2: t('orders.orderCancelledMsg'),
      });
    } catch (err: any) {
      console.error('Cancel order failed:', err);
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: err?.data?.message || 'Could not cancel order.',
      });
    }
  };

  if (isLoading || !order) {
    return (
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
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

  const mapStatus = (status: string): OrderStatus => {
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

  const currentStatus = mapStatus(order.status);

  const orderItems = order.items.map((item: any) => ({
    id: item.product,
    name: item.name,
    price: item.price,
    unit: item.unit === 'per_kg' ? 'kg' : item.unit === 'per_lb' ? 'lb' : 'pc',
    quantity: item.quantity,
    image: item.image ? { uri: item.image } : require('@/assets/images/product_1.png'),
  }));

  const totalAmount = order.totalPrice;
  const isCancellable = order.status === 'received';

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEE6E1" />

      <View style={styles.contentWrapper}>
        <ConfirmationModal
          visible={isReorderModalVisible}
          onClose={() => setIsReorderModalVisible(false)}
          onConfirm={handleConfirmReorder}
          title={t('orders.reorderItems')}
          description={t('orders.reorderConfirm')}
          confirmText={t('orders.reorder')}
          iconName="cart-outline"
          iconBgColor="#E1F5FE"
          iconColor="#0284C7"
        />
        {/* Header Bar */}
        <ProductsHeader
          title={t('orders.orderDetails')}
          onPressBack={handleBack}
          backgroundColor="transparent"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <OrderInfoCard
            orderNumber={order.orderNumber}
            date={new Date(order.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
            address={order.shippingAddress.address}
            status={currentStatus}
          />

          {/* Tracker Card */}
          {currentStatus !== 'cancelled' ? (
            <OrderStatusTracker currentStatus={currentStatus} />
          ) : (
            <View style={styles.cancelledCard}>
              <Text style={styles.cancelledText}>{t('orders.orderCancelledBanner')}</Text>
            </View>
          )}

          {/* Items Card */}
          <OrderItemsList items={orderItems} />

          {/* Payment summary card */}
          <OrderSummary items={orderItems} total={totalAmount} />
        </ScrollView>

        {/* Bottom Actions */}
        <View style={styles.bottomBar}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity
              style={[styles.reorderButton, { flex: 1 }]}
              onPress={handleReorderPress}
              activeOpacity={0.8}>
              <RepeatIcon size={16} color="#C4202B" />
              <Text style={styles.reorderButtonText}>{t('orders.reorder')}</Text>
            </TouchableOpacity>

            {/* {isCancellable && (
              <TouchableOpacity
                style={[
                  styles.reorderButton,
                  {
                    flex: 1,
                    backgroundColor: '#FEE2E2',
                    borderColor: '#EF4444',
                  },
                ]}
                onPress={handleCancelOrder}
                disabled={isCancelling}
                activeOpacity={0.8}>
                {isCancelling ? (
                  <ActivityIndicator color="#EF4444" />
                ) : (
                  <Text style={[styles.reorderButtonText, { color: '#EF4444' }]}>Cancel Order</Text>
                )}
              </TouchableOpacity>
            )} */}
          </View>
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
  cancelledCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
  },
  cancelledText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#EF4444',
  },
  bottomBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  reorderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: 10,
    height: 48,
  },
  reorderButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    color: '#C4202B',
    marginLeft: 8,
  },
});
