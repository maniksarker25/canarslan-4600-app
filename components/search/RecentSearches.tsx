import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ClockIcon } from '@/components/icons';

type RecentSearchesProps = {
  items?: string[];
  onPressItem?: (item: string) => void;
};

const DEFAULT_RECENT_SEARCHES = [
  'Beef Tenderloin',
  'Lamb Leg',
  'Chicken Breast',
  'Beef Sausage',
];

export default function RecentSearches({
  items = DEFAULT_RECENT_SEARCHES,
  onPressItem,
}: RecentSearchesProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Recent Searches</Text>

      <View style={styles.chipsRow}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.chip}
            onPress={() => onPressItem?.(item)}
            activeOpacity={0.7}>
            <ClockIcon size={14} color="#9CA3AF" style={styles.chipIcon} />
            <Text style={styles.chipText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 12,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  chipIcon: {
    marginRight: 6,
  },
  chipText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 13,
    color: '#374151',
  },
});
