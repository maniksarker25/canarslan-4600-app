import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { ChevronRightIcon } from '@/components/icons';
import { useTranslation } from 'react-i18next';

export type BrowseCategoryItem = {
  id: string;
  name: string;
  productCount: number;
  image: ImageSourcePropType | { uri: string };
  backgroundColor: string;
};

export const MOCK_BROWSE_CATEGORIES: BrowseCategoryItem[] = [
  {
    id: 'cat_1',
    name: 'Beef',
    productCount: 5,
    image: require('@/assets/images/cat_beef.png'),
    backgroundColor: '#FFEBF0',
  },
  {
    id: 'cat_2',
    name: 'Chicken',
    productCount: 5,
    image: require('@/assets/images/cat_chick.png'),
    backgroundColor: '#FEF9C3',
  },
  {
    id: 'cat_3',
    name: 'Lamb',
    productCount: 5,
    image: require('@/assets/images/cat_lamb.png'),
    backgroundColor: '#F3E8FF',
  },
  {
    id: 'cat_4',
    name: 'Frozen',
    productCount: 5,
    image: require('@/assets/images/cat_frozen.png'),
    backgroundColor: '#E0F2FE',
  },
  {
    id: 'cat_5',
    name: 'Processed Meats',
    productCount: 5,
    image: require('@/assets/images/cat_processedMeat.png'),
    backgroundColor: '#FEF9C3',
  },
];

type BrowseCategoriesProps = {
  categories?: BrowseCategoryItem[];
  onPressCategory?: (category: BrowseCategoryItem) => void;
};

export default function BrowseCategories({
  categories = MOCK_BROWSE_CATEGORIES,
  onPressCategory,
}: BrowseCategoriesProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t('search.browseByCategory')}</Text>

      <View style={styles.gridContainer}>
        {categories.map((item) => {
          const imageSource =
            typeof item.image === 'string' ? { uri: item.image } : item.image;

          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.categoryCard, { backgroundColor: item.backgroundColor }]}
              onPress={() => onPressCategory?.(item)}
              activeOpacity={0.8}>
              {/* Category Image */}
              <Image source={imageSource} style={styles.categoryImage} resizeMode="contain" />

              {/* Category Title & Count */}
              <View style={styles.textContainer}>
                <Text style={styles.categoryName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.productCountText}>
                  {t('products.count', { count: item.productCount })}
                </Text>
              </View>

              {/* Chevron Right Icon */}
              <ChevronRightIcon size={14} color="#9CA3AF" style={styles.chevronIcon} />
            </TouchableOpacity>
          );
        })}
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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  categoryImage: {
    width: 42,
    height: 42,
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
  },
  categoryName: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 1,
  },
  productCountText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 11,
    color: '#6B7280',
  },
  chevronIcon: {
    marginLeft: 4,
  },
});
