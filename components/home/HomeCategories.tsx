import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { useTranslation } from 'react-i18next';

export type CategoryItem = {
  id: string;
  name: string;
  image: ImageSourcePropType | { uri: string };
  backgroundColor?: string;
};

export const MOCK_CATEGORIES: CategoryItem[] = [
  {
    id: 'cat_1',
    name: 'Beef',
    image: require('@/assets/images/cat_beef.png'),
    backgroundColor: '#FFEBF0',
  },
  {
    id: 'cat_2',
    name: 'Chicken',
    image: require('@/assets/images/cat_chick.png'),
    backgroundColor: '#FEF9C3',
  },
  {
    id: 'cat_3',
    name: 'Lamb',
    image: require('@/assets/images/cat_lamb.png'),
    backgroundColor: '#F3E8FF',
  },
  {
    id: 'cat_4',
    name: 'Frozen',
    image: require('@/assets/images/cat_frozen.png'),
    backgroundColor: '#E0F2FE',
  },
  {
    id: 'cat_5',
    name: 'Processed\nMeat',
    image: require('@/assets/images/cat_processedMeat.png'),
    backgroundColor: '#FFEDD5',
  },
];

type HomeCategoriesProps = {
  categories?: CategoryItem[];
  onPressCategory?: (category: CategoryItem) => void;
  onPressSeeAll?: () => void;
};

export default function HomeCategories({
  categories = MOCK_CATEGORIES,
  onPressCategory,
  onPressSeeAll,
}: HomeCategoriesProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>{t('home.categories')}</Text>
        <TouchableOpacity onPress={onPressSeeAll} activeOpacity={0.7}>
          <Text style={styles.seeAllText}>{t('home.seeAllCategories')} →</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Scroll List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {categories.map((item) => {
          const imageSource = typeof item.image === 'string' ? { uri: item.image } : item.image;

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.categoryCard}
              onPress={() => onPressCategory?.(item)}
              activeOpacity={0.8}>
              {/* Category Icon Container */}
              <View
                style={[styles.iconBox, { backgroundColor: item.backgroundColor || '#FFF0F0' }]}>
                <Image source={imageSource} style={styles.categoryImage} resizeMode="cover" />
              </View>

              {/* Category Label */}
              <Text style={styles.categoryName} numberOfLines={2}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: '#1F2937',
  },
  seeAllText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 13,
    color: '#C4202B',
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryCard: {
    alignItems: 'center',
    width: 72,
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryName: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 12,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 15,
  },
});
