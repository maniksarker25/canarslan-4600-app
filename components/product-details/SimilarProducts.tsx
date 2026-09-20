import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ImageSourcePropType,
} from 'react-native';
import { ChevronRightIcon } from '@/components/icons';

export type SimilarProductItem = {
  id: string;
  name: string;
  price: number;
  unit?: string;
  category?: string;
  categoryId?: string;
  image: ImageSourcePropType | { uri: string };
};

type SimilarProductsProps = {
  products?: SimilarProductItem[];
  isLoading?: boolean;
  onPressProduct?: (product: SimilarProductItem) => void;
  onPressViewAll?: () => void;
};

// Skeleton card for loading state
const SkeletonCard = () => (
  <View style={styles.card}>
    <View style={[styles.imageWrapper, { backgroundColor: '#E5E7EB' }]} />
    <View style={{ flex: 1, marginLeft: 12, gap: 8 }}>
      <View style={{ width: '65%', height: 13, backgroundColor: '#E5E7EB', borderRadius: 4 }} />
      <View style={{ width: '40%', height: 11, backgroundColor: '#E5E7EB', borderRadius: 4 }} />
    </View>
    <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: '#E5E7EB' }} />
  </View>
);

export default function SimilarProducts({
  products = [],
  isLoading = false,
  onPressProduct,
  onPressViewAll,
}: SimilarProductsProps) {
  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.headerRow}>
        <Text style={styles.titleText}>Similar Products</Text>
        {!isLoading && products.length > 0 && onPressViewAll && (
          <TouchableOpacity onPress={onPressViewAll} activeOpacity={0.7} style={styles.viewAllBtn}>
            <Text style={styles.viewAllText}>View All</Text>
            <ChevronRightIcon size={13} color="#C4202B" />
          </TouchableOpacity>
        )}
      </View>

      {/* Content */}
      <View style={styles.listContainer}>
        {isLoading ? (
          // Loading skeletons
          [1, 2, 3].map((i) => <SkeletonCard key={i} />)
        ) : products.length === 0 ? (
          // Empty state
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No similar products found</Text>
          </View>
        ) : (
          // Products list
          products.map((item) => {
            const imageSource =
              typeof item.image === 'object' && 'uri' in (item.image as any)
                ? (item.image as { uri: string })
                : item.image as ImageSourcePropType;
            const displayUnit = item.unit === 'per_kg' ? 'kg' : item.unit === 'per_lb' ? 'lb' : item.unit || 'pc';

            return (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => onPressProduct?.(item)}
                activeOpacity={0.8}>
                {/* Product Thumbnail */}
                <View style={styles.imageWrapper}>
                  <Image source={imageSource} style={styles.productImage} resizeMode="cover" />
                </View>

                {/* Title & Price */}
                <View style={styles.textWrapper}>
                  <Text style={styles.productName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
                    <Text style={styles.unitText}>/ {displayUnit}</Text>
                  </View>
                  {item.category ? (
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryBadgeText}>{item.category}</Text>
                    </View>
                  ) : null}
                </View>

                {/* Chevron */}
                <ChevronRightIcon size={16} color="#9CA3AF" />
              </TouchableOpacity>
            );
          })
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#1F2937',
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewAllText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 13,
    color: '#C4202B',
  },
  listContainer: {
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  imageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  textWrapper: {
    flex: 1,
    marginLeft: 12,
    gap: 3,
  },
  productName: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#1F2937',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  priceText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#C4202B',
  },
  unitText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 11,
    color: '#6B7280',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF1F2',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 2,
  },
  categoryBadgeText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 10,
    color: '#C4202B',
  },
  emptyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 13,
    color: '#9CA3AF',
  },
});
