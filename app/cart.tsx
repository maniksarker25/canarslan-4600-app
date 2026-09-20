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
import { useRouter } from 'expo-router';
import { ProductsHeader } from '@/components/products';
import { CartItemCard, OrderSummary, CartItem } from '@/components/cart';
import { EmptyBoxIcon } from '@/components/icons';
import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
} from '@/store/api/cartApi';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

export default function CartScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: dbCart, isLoading, refetch } = useGetCartQuery();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();

  const [updatingItemId, setUpdatingItemId] = React.useState<string | null>(null);
  const [localQuantities, setLocalQuantities] = React.useState<Record<string, number>>({});
  const timers = React.useRef<Record<string, any>>({});

  // Sync with database quantities when not updating
  React.useEffect(() => {
    if (dbCart?.data?.items) {
      const quants: Record<string, number> = {};
      dbCart.data.items.forEach((item: any) => {
        quants[item.product._id] = item.quantity;
      });
      setLocalQuantities(quants);
    }
  }, [dbCart]);

  // Clean timers on unmount
  React.useEffect(() => {
    return () => {
      Object.values(timers.current).forEach((t) => clearTimeout(t));
    };
  }, []);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/home');
    }
  };

  const changeQuantityLocal = (id: string, delta: number) => {
    const currentQty =
      localQuantities[id] !== undefined
        ? localQuantities[id]
        : dbCart?.data?.items?.find((it: any) => it.product._id === id)?.quantity || 0;

    const newQty = currentQty + delta;
    if (newQty <= 0) return; // Can't be 0 (user must use remove button)

    // Update state instantly
    setLocalQuantities((prev) => ({
      ...prev,
      [id]: newQty,
    }));

    // Clear previous timer for this product
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
    }

    // Set new timer
    timers.current[id] = setTimeout(async () => {
      try {
        setUpdatingItemId(id);
        await updateCartItem({ productId: id, quantity: newQty }).unwrap();
      } catch (err: any) {
        console.error('Update quantity failed, reverting:', err);
        refetch(); // Revert back to server quantity on failure
      } finally {
        setUpdatingItemId(null);
      }
    }, 800); // 800ms debounce window
  };

  const handleIncrease = (id: string) => {
    changeQuantityLocal(id, 1);
  };

  const handleDecrease = (id: string) => {
    changeQuantityLocal(id, -1);
  };

  const [removeItemId, setRemoveItemId] = React.useState<string | null>(null);

  const handleRemove = (id: string) => {
    setRemoveItemId(id);
  };

  const handleConfirmRemove = async () => {
    if (!removeItemId) return;
    try {
      const res = await removeCartItem(removeItemId).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Removed Item',
        text2: res.message || 'Item successfully removed from cart.',
      });
    } catch (err: any) {
      console.error('Remove item failed:', err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: err?.data?.message || 'Could not remove item.',
      });
    } finally {
      setRemoveItemId(null);
    }
  };

  const handleProceed = () => {
    router.push('/confirm-order');
  };

  const handleBrowse = () => {
    router.push('/products');
  };

  // Calculations & Mappings
  const cartItems: CartItem[] =
    dbCart?.data?.items?.map((item: any) => ({
      id: item.product._id,
      name: item.product.name,
      price: item.product.price,
      unit: item.product.unit === 'per_kg' ? 'kg' : item.product.unit === 'per_lb' ? 'lb' : 'pc',
      quantity:
        localQuantities[item.product._id] !== undefined
          ? localQuantities[item.product._id]
          : item.quantity,
      image: { uri: item.product.image },
    })) || [];

  const subtotal = React.useMemo(() => {
    if (!dbCart?.data?.items) return 0;
    return dbCart.data.items.reduce((sum: number, item: any) => {
      const q =
        localQuantities[item.product._id] !== undefined
          ? localQuantities[item.product._id]
          : item.quantity;
      return sum + item.product.price * q;
    }, 0);
  }, [dbCart, localQuantities]);

  const isEmpty = cartItems.length === 0;

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEE6E1" />

      <View style={styles.contentWrapper}>
        <ConfirmationModal
          visible={removeItemId !== null}
          onClose={() => setRemoveItemId(null)}
          onConfirm={handleConfirmRemove}
          title={t('cart.removeItem')}
          description={t('cart.removeConfirm')}
          confirmText={t('common.remove')}
          iconName="trash-outline"
          iconBgColor="#FDE8E8"
          iconColor="#EF4444"
        />
        {/* Header Bar */}
        <ProductsHeader
          title={t('cart.title')}
          onPressBack={handleBack}
          cartCount={cartItems.length}
          backgroundColor="transparent"
        />

        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#C4202B" />
          </View>
        ) : isEmpty ? (
          /* Empty Cart State */
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconWrapper}>
              <EmptyBoxIcon width={48} height={48} color="#9CA3AF" />
            </View>
            <Text style={styles.emptyTitle}>{t('cart.emptyCart')}</Text>
            <Text style={styles.emptyDescription}>
              {t('cart.emptyCartSubtitle')}
            </Text>
          </View>
        ) : (
          /* Active Cart List */
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            {/* Cart Items */}
            {cartItems.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
                isUpdating={false}
              />
            ))}

            {/* Order Summary Card */}
            <OrderSummary items={cartItems} total={subtotal} />
          </ScrollView>
        )}

        {/* Bottom Fixed Action Button */}
        <View style={styles.bottomBar}>
          {isEmpty ? (
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={handleBrowse}
              activeOpacity={0.8}>
              <Text style={styles.bottomButtonText}>{t('cart.startShopping')} ›</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={handleProceed}
              activeOpacity={0.8}>
              <Text style={styles.bottomButtonText}>{t('cart.proceedToCheckout')} ›</Text>
            </TouchableOpacity>
          )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIconWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyDescription: {
    fontFamily: 'Nunito-Medium',
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 18,
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
