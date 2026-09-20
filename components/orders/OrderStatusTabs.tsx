import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { OrderStatus } from '@/components/order-details';
import { useTranslation } from 'react-i18next';

export type TabKey = 'all' | OrderStatus;

type TabOption = {
  key: TabKey;
  label: string;
};

const TAB_OPTIONS: TabOption[] = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'preparing', label: 'Preparing' },
  { key: 'delivered', label: 'Delivered' },
  { key: 'cancelled', label: 'Cancelled' },
];

type OrderStatusTabsProps = {
  activeTab: TabKey;
  onTabSelect: (tab: TabKey) => void;
  counts: Record<TabKey, number>;
};

export default function OrderStatusTabs({
  activeTab,
  onTabSelect,
  counts,
}: OrderStatusTabsProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.outerContainer}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {TAB_OPTIONS.map((tab) => {
          const isActive = tab.key === activeTab;
          const count = counts[tab.key] || 0;

          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabButton, isActive && styles.activeTabButton]}
              onPress={() => onTabSelect(tab.key)}
              activeOpacity={0.8}>
              <View style={styles.tabContentRow}>
                <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
                  {t(`orders.${tab.key}`)}
                </Text>
                
                {/* Count Badge Circle */}
                <View style={[styles.badgeCircle, isActive ? styles.activeBadgeBg : styles.inactiveBadgeBg]}>
                  <Text style={[styles.badgeText, isActive ? styles.activeBadgeText : styles.inactiveBadgeText]}>
                    {count}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 16,
  },
  tabButton: {
    paddingVertical: 6,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#C4202B',
  },
  tabContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tabLabel: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#9CA3AF',
  },
  activeTabLabel: {
    color: '#C4202B',
  },
  badgeCircle: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  activeBadgeBg: {
    backgroundColor: '#C4202B',
  },
  inactiveBadgeBg: {
    backgroundColor: '#E5E7EB',
  },
  badgeText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 10,
  },
  activeBadgeText: {
    color: '#FFFFFF',
  },
  inactiveBadgeText: {
    color: '#9CA3AF',
  },
});
