import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StarIcon } from '@/components/icons';

type PopularSearchesProps = {
  items?: string[];
  onPressItem?: (item: string) => void;
};

const DEFAULT_POPULAR_SEARCHES = [
  'Ribeye Steak',
  'Ground Beef',
  'Chicken Wings',
  'Meatballs',
  'Cured Beef',
];

export default function PopularSearches({
  items = DEFAULT_POPULAR_SEARCHES,
  onPressItem,
}: PopularSearchesProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Popular Searches</Text>

      <View style={styles.chipsRow}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.chip}
            onPress={() => onPressItem?.(item)}
            activeOpacity={0.7}>
            <StarIcon size={14} color="#C4202B" style={styles.chipIcon} />
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
    backgroundColor: '#FFF1F2',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipIcon: {
    marginRight: 6,
  },
  chipText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 13,
    color: '#C4202B',
  },
});
