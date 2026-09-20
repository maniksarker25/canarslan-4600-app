import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type SpecRowProps = {
  label: string;
  value: string;
  isLast?: boolean;
};

function SpecRow({ label, value, isLast = false }: SpecRowProps) {
  return (
    <View style={[styles.row, !isLast && styles.borderBottom]}>
      <Text style={styles.labelText}>{label}</Text>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  );
}

type ProductSpecsProps = {
  category: string;
  unit: string;
  packSize: string;
  availability: string;
};

export default function ProductSpecs({
  category,
  unit,
  packSize,
  availability,
}: ProductSpecsProps) {
  return (
    <View style={styles.container}>
      <SpecRow label="Category" value={category} />
      <SpecRow label="Unit" value={unit} />
      <SpecRow label="Pack Size" value={packSize} />
      <SpecRow label="Availability" value={availability} isLast={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  labelText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  valueText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#1F2937',
  },
});
