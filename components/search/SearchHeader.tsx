import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeftIcon } from '@/components/icons';

type SearchHeaderProps = {
  title?: string;
  onPressBack?: () => void;
};

export default function SearchHeader({ title = 'Search', onPressBack }: SearchHeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onPressBack} activeOpacity={0.7}>
        <ArrowLeftIcon size={20} color="#1F2937" />
      </TouchableOpacity>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.placeholder} />
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
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  titleText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: '#1F2937',
  },
  placeholder: {
    width: 40,
  },
});
