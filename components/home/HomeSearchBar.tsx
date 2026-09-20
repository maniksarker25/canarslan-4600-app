import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SearchIcon, FilterIcon } from '@/components/icons';

type HomeSearchBarProps = {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  onPressFilter?: () => void;
  onPressContainer?: () => void;
  editable?: boolean;
};

export default function HomeSearchBar({
  value,
  onChangeText,
  placeholder = 'Search for your address...',
  onPressFilter,
  onPressContainer,
  editable = true,
}: HomeSearchBarProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={onPressContainer ? 0.9 : 1}
        onPress={onPressContainer}
        disabled={!onPressContainer}
        style={styles.inputWrapper}>
        <SearchIcon size={18} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          returnKeyType="search"
          editable={editable && !onPressContainer}
          pointerEvents={onPressContainer ? 'none' : 'auto'}
        />
        <TouchableOpacity style={styles.filterButton} onPress={onPressFilter} activeOpacity={0.7}>
          <FilterIcon size={16} color="#6B7280" />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    height: 48,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: 'Nunito-Medium',
    fontSize: 14,
    color: '#1F2937',
  },
  filterButton: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
