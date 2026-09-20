import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ProductsHeader } from '@/components/products';
import { OrderSummary } from '@/components/cart';
import { LocationIcon, PageIcon, DoubleCheckIcon, OrderPlacedIcon } from '@/components/icons';
import GooglePlacesAddressInput, {
  SelectedAddress,
} from '@/components/ui/inputs/GooglePlacesAddressInput';
import { useAuth } from '@/hooks/useAuth';
import { useGetCartQuery } from '@/store/api/cartApi';
import { usePlaceOrderMutation } from '@/store/api/orderApi';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

type TrackerStepProps = {
  stepNumber: number;
  title: string;
  description: string;
  isCompleted?: boolean;
  isLast?: boolean;
};

function TrackerStep({
  stepNumber,
  title,
  description,
  isCompleted = false,
  isLast = false,
}: TrackerStepProps) {
  return (
    <View style={styles.stepRow}>
      <View style={styles.stepLeftCol}>
        <View
          style={[
            styles.stepCircle,
            isCompleted ? styles.stepCircleCompleted : styles.stepCirclePending,
          ]}>
          {isCompleted ? (
            <DoubleCheckIcon size={12} color="#FFFFFF" />
          ) : (
            <Text style={styles.stepNumberText}>{stepNumber}</Text>
          )}
        </View>
        {!isLast && <View style={styles.stepLineConnector} />}
      </View>

      <View style={styles.stepRightCol}>
        <Text style={[styles.stepTitle, isCompleted && styles.stepTitleCompleted]}>{title}</Text>
        <Text style={styles.stepDescription}>{description}</Text>
      </View>
    </View>
  );
}

export default function ConfirmOrderScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { t } = useTranslation();

  const { data: dbCart, isLoading: isCartLoading } = useGetCartQuery();
  const [placeOrder, { isLoading: isPlacing }] = usePlaceOrderMutation();

  const [note, setNote] = useState('');
  const [isPlaced, setIsPlaced] = useState(false);
  const [placedOrderNumber, setPlacedOrderNumber] = useState('');

  const [shippingName, setShippingName] = useState(user?.fullName || user?.name || '');
  const [shippingPhone, setShippingPhone] = useState(user?.phone ? String(user.phone) : '');
  const [shippingAddress, setShippingAddress] = useState(user?.address || '');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingState, setShippingState] = useState('');
  const [shippingPostalCode, setShippingPostalCode] = useState('');
  const [shippingCountry, setShippingCountry] = useState('USA');

  const handleBack = () => {
    if (isPlaced) {
      setIsPlaced(false);
    } else {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/cart');
      }
    }
  };

  const handlePlaceOrder = async () => {
    if (!shippingName.trim()) {
      Toast.show({
        type: 'error',
        text1: t('confirmOrder.requiredFieldWarning'),
        text2: t('confirmOrder.recipientNameWarning'),
      });
      return;
    }
    if (!shippingPhone.trim()) {
      Toast.show({
        type: 'error',
        text1: t('confirmOrder.requiredFieldWarning'),
        text2: t('confirmOrder.contactPhoneWarning'),
      });
      return;
    }
    if (!shippingAddress.trim()) {
      Toast.show({
        type: 'error',
        text1: t('confirmOrder.requiredFieldWarning'),
        text2: t('confirmOrder.streetAddressWarning'),
      });
      return;
    }
    if (!shippingCity.trim()) {
      Toast.show({
        type: 'error',
        text1: t('confirmOrder.requiredFieldWarning'),
        text2: t('confirmOrder.cityWarning'),
      });
      return;
    }
    if (!shippingState.trim()) {
      Toast.show({
        type: 'error',
        text1: t('confirmOrder.requiredFieldWarning'),
        text2: t('confirmOrder.stateWarning'),
      });
      return;
    }
    if (!shippingPostalCode.trim()) {
      Toast.show({
        type: 'error',
        text1: t('confirmOrder.requiredFieldWarning'),
        text2: t('confirmOrder.postalCodeWarning'),
      });
      return;
    }
    if (!shippingCountry.trim()) {
      Toast.show({
        type: 'error',
        text1: t('confirmOrder.requiredFieldWarning'),
        text2: t('confirmOrder.countryWarning'),
      });
      return;
    }

    try {
      const payload = {
        shippingAddress: {
          name: shippingName,
          phone: shippingPhone,
          address: shippingAddress,
          city: shippingCity,
          state: shippingState,
          postalCode: shippingPostalCode,
          country: shippingCountry,
        },
        note: note || undefined,
      };

      const response = await placeOrder(payload).unwrap();

      if (response.success) {
        setPlacedOrderNumber(response.data.orderNumber);
        setIsPlaced(true);
      }
    } catch (err: any) {
      console.error('Place order failed:', err);
      Toast.show({
        type: 'error',
        text1: t('confirmOrder.requiredFieldWarning'),
        text2: err?.data?.message || err?.message || 'Could not place order.',
      });
    }
  };

  const handleViewOrders = () => {
    router.push('/(tabs)/orders');
  };

  const handleBackToHome = () => {
    router.replace('/(tabs)/home');
  };

  const cartItems =
    dbCart?.data?.items?.map((item: any) => ({
      id: item.product._id,
      name: item.product.name,
      price: item.product.price,
      unit: item.product.unit === 'per_kg' ? 'kg' : item.product.unit === 'per_lb' ? 'lb' : 'pc',
      quantity: item.quantity,
      image: { uri: item.product.image },
    })) || [];

  const totalAmount = dbCart?.data?.subTotal || 0;

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEE6E1" />

      <View style={styles.contentWrapper}>
        {/* Header Bar - Beige transparent background */}
        <ProductsHeader
          title={t('confirmOrder.title')}
          onPressBack={handleBack}
          backgroundColor="transparent"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {isCartLoading ? (
            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
              <ActivityIndicator size="large" color="#C4202B" />
            </View>
          ) : !isPlaced ? (
            /* Checkout Information Panel */
            <>
              {/* Delivery Address Section */}
              <View style={[styles.sectionCard, { zIndex: 10 }]}>
                <View style={styles.sectionHeaderRow}>
                  <View style={[styles.iconContainer, styles.locationIconBg]}>
                    <LocationIcon size={18} color="#C4202B" />
                  </View>
                  <Text style={styles.sectionTitle}>{t('confirmOrder.deliveryAddressDetails')}</Text>
                </View>

                {/* Google Places Autocomplete */}
                <GooglePlacesAddressInput
                  label=""
                  showLabel={false}
                  placeholder={t('confirmOrder.searchAddressPlaceholder')}
                  value={shippingAddress}
                  onChangeText={(text) => {
                    setShippingAddress(text);
                  }}
                  onAddressSelect={(address) => {
                    setShippingAddress(address.formattedAddress);
                    if (address.city) setShippingCity(address.city);
                    if (address.state) setShippingState(address.state);
                    if (address.zipCode) setShippingPostalCode(address.zipCode);
                    if (address.country) setShippingCountry(address.country);
                  }}
                  leftIcon={<LocationIcon size={17} color="#9CA3AF" />}
                  showLeftIcon={true}
                />

                <View style={{ marginVertical: 12, height: 1, backgroundColor: '#E5E7EB' }} />

                {/* Shipping Details Fields */}
                <View style={styles.formRow}>
                  <View style={styles.formFieldHalf}>
                    <Text style={styles.fieldLabel}>{t('confirmOrder.recipientNameLabel')}</Text>
                    <TextInput
                      style={styles.formInput}
                      value={shippingName}
                      onChangeText={setShippingName}
                      placeholder={t('confirmOrder.namePlaceholder')}
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                  <View style={styles.formFieldHalf}>
                    <Text style={styles.fieldLabel}>{t('confirmOrder.contactPhoneLabel')}</Text>
                    <TextInput
                      style={styles.formInput}
                      value={shippingPhone}
                      onChangeText={setShippingPhone}
                      placeholder={t('confirmOrder.phonePlaceholder')}
                      placeholderTextColor="#9CA3AF"
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>

                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>{t('confirmOrder.streetAddressLabel')}</Text>
                  <TextInput
                    style={styles.formInput}
                    value={shippingAddress}
                    onChangeText={setShippingAddress}
                    placeholder={t('confirmOrder.addressPlaceholder')}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                <View style={styles.formRow}>
                  <View style={styles.formFieldHalf}>
                    <Text style={styles.fieldLabel}>{t('confirmOrder.cityLabel')}</Text>
                    <TextInput
                      style={styles.formInput}
                      value={shippingCity}
                      onChangeText={setShippingCity}
                      placeholder={t('confirmOrder.cityPlaceholder')}
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                  <View style={styles.formFieldHalf}>
                    <Text style={styles.fieldLabel}>{t('confirmOrder.stateLabel')}</Text>
                    <TextInput
                      style={styles.formInput}
                      value={shippingState}
                      onChangeText={setShippingState}
                      placeholder={t('confirmOrder.statePlaceholder')}
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                </View>

                <View style={styles.formRow}>
                  <View style={styles.formFieldHalf}>
                    <Text style={styles.fieldLabel}>{t('confirmOrder.postalCodeLabel')}</Text>
                    <TextInput
                      style={styles.formInput}
                      value={shippingPostalCode}
                      onChangeText={setShippingPostalCode}
                      placeholder={t('confirmOrder.postalCodePlaceholder')}
                      placeholderTextColor="#9CA3AF"
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.formFieldHalf}>
                    <Text style={styles.fieldLabel}>{t('confirmOrder.countryLabel')}</Text>
                    <TextInput
                      style={styles.formInput}
                      value={shippingCountry}
                      onChangeText={setShippingCountry}
                      placeholder={t('confirmOrder.countryPlaceholder')}
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                </View>
              </View>

              {/* Order Note Section */}
              <View style={styles.sectionCard}>
                <View style={styles.sectionHeaderRow}>
                  <View style={[styles.iconContainer, styles.noteIconBg]}>
                    <PageIcon size={18} color="#D97706" />
                  </View>
                  <Text style={styles.sectionTitle}>{t('confirmOrder.orderNoteLabel')}</Text>
                </View>

                <View style={styles.noteInputWrapper}>
                  <TextInput
                    style={styles.noteInput}
                    value={note}
                    onChangeText={setNote}
                    placeholder={t('confirmOrder.orderNotePlaceholder')}
                    placeholderTextColor="#9CA3AF"
                    multiline={true}
                    numberOfLines={3}
                    textAlignVertical="top"
                  />
                </View>
              </View>

              {/* Order Summary Section */}
              <OrderSummary items={cartItems} total={totalAmount} />
            </>
          ) : (
            /* Order Placed Success View */
            <View style={styles.successContainer}>
              {/* Success Badge */}
              <OrderPlacedIcon size={100} style={styles.successIcon} />

              {/* Success Description Text */}
              <Text style={styles.successTitle}>{t('confirmOrder.orderSuccess')}</Text>
              <Text style={styles.successDescription}>
                {t('confirmOrder.orderSuccessMsg')}
              </Text>

              {/* Order Number pill */}
              <View style={styles.orderNumberCard}>
                <Text style={styles.orderNumberLabel}>{t('confirmOrder.yourOrderNumber')}</Text>
                <Text style={styles.orderNumberValue}>
                  {placedOrderNumber || '#OE-2026-UNKNOWN'}
                </Text>
              </View>

              {/* Status Tracker */}
              <View style={styles.trackerCard}>
                <TrackerStep
                  stepNumber={1}
                  title={t('confirmOrder.stepReceived')}
                  description={t('confirmOrder.stepReceivedDesc')}
                  isCompleted={true}
                />
                <TrackerStep
                  stepNumber={2}
                  title={t('confirmOrder.stepAwaiting')}
                  description={t('confirmOrder.stepAwaitingDesc')}
                  isCompleted={false}
                />
                <TrackerStep
                  stepNumber={3}
                  title={t('confirmOrder.stepPreparation')}
                  description={t('confirmOrder.stepPreparationDesc')}
                  isCompleted={false}
                />
                <TrackerStep
                  stepNumber={4}
                  title={t('confirmOrder.stepDelivery')}
                  description={t('confirmOrder.stepDeliveryDesc')}
                  isCompleted={false}
                  isLast={true}
                />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Bottom Bar actions */}
        <View style={styles.bottomBar}>
          {!isPlaced ? (
            <TouchableOpacity
              style={[styles.bottomButton, isPlacing && { opacity: 0.7 }]}
              onPress={handlePlaceOrder}
              disabled={isPlacing || isCartLoading}
              activeOpacity={0.8}>
              {isPlacing ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.bottomButtonText}>{t('confirmOrder.placeOrder')}</Text>
              )}
            </TouchableOpacity>
          ) : (
            <View style={styles.successActionsContainer}>
              <TouchableOpacity
                style={styles.bottomButton}
                onPress={handleViewOrders}
                activeOpacity={0.8}>
                <Text style={styles.bottomButtonText}>{t('confirmOrder.viewMyOrders')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleBackToHome}
                activeOpacity={0.7}
                style={styles.backHomeLink}>
                <Text style={styles.backHomeText}>{t('confirmOrder.backToHome')}</Text>
              </TouchableOpacity>
            </View>
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
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationIconBg: {
    backgroundColor: '#FFF1F2',
  },
  noteIconBg: {
    backgroundColor: '#FEF3C7',
  },
  sectionTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 10,
  },
  addressBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  smallPinIcon: {
    marginRight: 6,
  },
  addressText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 13,
    color: '#4B5563',
    flex: 1,
  },
  noteInputWrapper: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  noteInput: {
    fontFamily: 'Nunito-Medium',
    fontSize: 13,
    color: '#1F2937',
    height: 60,
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

  /* Success View styles */
  successContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  successIcon: {
    marginVertical: 14,
  },
  successTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 22,
    color: '#1F2937',
    marginBottom: 6,
    textAlign: 'center',
  },
  successDescription: {
    fontFamily: 'Nunito-Medium',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
    marginBottom: 20,
  },
  orderNumberCard: {
    backgroundColor: '#FFF1F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 36,
    alignItems: 'center',
    marginBottom: 24,
  },
  orderNumberLabel: {
    fontFamily: 'Nunito-Medium',
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  orderNumberValue: {
    fontFamily: 'Nunito-Bold',
    fontSize: 22,
    color: '#C4202B',
  },
  trackerCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10,
  },
  stepRow: {
    flexDirection: 'row',
  },
  stepLeftCol: {
    alignItems: 'center',
    marginRight: 14,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  stepCircleCompleted: {
    backgroundColor: '#10B981',
  },
  stepCirclePending: {
    backgroundColor: '#E5E7EB',
  },
  stepCheckText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Nunito-Bold',
  },
  stepNumberText: {
    color: '#9CA3AF',
    fontSize: 11,
    fontFamily: 'Nunito-Bold',
  },
  stepLineConnector: {
    width: 2,
    height: 28,
    backgroundColor: '#E5E7EB',
    marginVertical: 2,
  },
  stepRightCol: {
    flex: 1,
    paddingBottom: 16,
  },
  stepTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  stepTitleCompleted: {
    color: '#10B981',
  },
  stepDescription: {
    fontFamily: 'Nunito-Medium',
    fontSize: 12,
    color: '#9CA3AF',
  },
  successActionsContainer: {
    width: '100%',
  },
  backHomeLink: {
    alignItems: 'center',
    marginTop: 14,
  },
  backHomeText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    color: '#4B5563',
  },
  formRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  formFieldHalf: {
    flex: 1,
  },
  formField: {
    marginBottom: 10,
  },
  fieldLabel: {
    fontFamily: 'Nunito-Bold',
    fontSize: 11,
    color: '#4B5563',
    marginBottom: 4,
  },
  formInput: {
    fontFamily: 'Nunito-Medium',
    fontSize: 13,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
});
