import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DoubleCheckIcon, OrderStatusIcon } from '@/components/icons';
import { OrderStatus } from './OrderInfoCard';

type StatusStep = {
  key: OrderStatus;
  title: string;
};

const STEPS: StatusStep[] = [
  { key: 'pending', title: 'Order Received' },
  { key: 'confirmed', title: 'Confirmed' },
  { key: 'preparing', title: 'Preparing' },
  { key: 'delivered', title: 'Delivered' },
];

type OrderStatusTrackerProps = {
  currentStatus: OrderStatus;
};

export default function OrderStatusTracker({ currentStatus }: OrderStatusTrackerProps) {
  // Determine completion index based on status key
  const getStatusIndex = (status: OrderStatus): number => {
    switch (status) {
      case 'pending':
        return 0;
      case 'confirmed':
        return 1;
      case 'preparing':
        return 2;
      case 'delivered':
        return 3;
      case 'cancelled':
        return -1; // Cancelled doesn't follow normal step path
      default:
        return 0;
    }
  };

  const currentIndex = getStatusIndex(currentStatus);

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Order Status</Text>

      <View style={styles.trackerContainer}>
        {STEPS.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const isLast = index === STEPS.length - 1;

          return (
            <View key={step.key} style={styles.stepRow}>
              {/* Left Column (Circles & Line Connectors) */}
              <View style={styles.leftCol}>
                {isCompleted ? (
                  <View style={styles.completedCircle}>
                    <DoubleCheckIcon size={14} color="#FFFFFF" />
                  </View>
                ) : (
                  <OrderStatusIcon size={28} />
                )}

                {!isLast && (
                  <View
                    style={[
                      styles.connectorLine,
                      index < currentIndex && styles.connectorLineCompleted,
                    ]}
                  />
                )}
              </View>

              {/* Right Column (Texts) */}
              <View style={styles.rightCol}>
                <Text style={[styles.stepTitle, isCompleted && styles.stepTitleCompleted]}>
                  {step.title}
                </Text>
                {isCurrent && <Text style={styles.currentStatusLabel}>Current status</Text>}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
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
  sectionTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 16,
  },
  trackerContainer: {
    paddingLeft: 4,
  },
  stepRow: {
    flexDirection: 'row',
  },
  leftCol: {
    alignItems: 'center',
    marginRight: 16,
  },
  completedCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  connectorLine: {
    width: 2,
    height: 32,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },
  connectorLineCompleted: {
    backgroundColor: '#059669',
  },
  rightCol: {
    flex: 1,
    paddingTop: 3,
    paddingBottom: 22,
  },
  stepTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#9CA3AF',
  },
  stepTitleCompleted: {
    color: '#059669',
  },
  currentStatusLabel: {
    fontFamily: 'Nunito-Medium',
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
});
