import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { OilFilteringIcon, SortIcon } from '@/components/icons';
import { useTranslation } from 'react-i18next';

type FilterSortBarProps = {
  productCount?: number;
  onPressFilter?: () => void;
};

export default function FilterSortBar({
  productCount = 18,
  onPressFilter,
}: FilterSortBarProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      {/* Action Buttons Row */}
      <View style={styles.buttonsRow}>
        {/* Filter Button */}
        <TouchableOpacity style={styles.actionButton} onPress={onPressFilter} activeOpacity={0.7}>
          <OilFilteringIcon size={14} color="#374151" />
          <Text style={styles.buttonText}>{t('common.filter')}</Text>
        </TouchableOpacity>
      </View>

      {/* Product Count Text */}
      <Text style={styles.countText}>
        {t('products.count', { count: productCount })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  buttonText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 13,
    color: '#374151',
  },
  countText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 12,
    color: '#9CA3AF',
  },
});
