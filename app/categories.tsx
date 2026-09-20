import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import BackButton from '@/components/ui/shared/BackButton';
import { CategoryItem } from '@/components/home/HomeCategories';
import { useGetAllCategoriesQuery } from '@/store/api/categoryApi';
import { useTranslation } from 'react-i18next';

const BACKGROUND_COLORS = ['#FFEBF0', '#FEF9C3', '#F3E8FF', '#E0F2FE', '#FFEDD5'];

export default function AllCategoriesScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: dbCategories, isLoading } = useGetAllCategoriesQuery();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/home');
    }
  };

  const handleCategoryPress = (category: CategoryItem) => {
    router.push({
      pathname: '/products',
      params: { categoryId: category.id, categoryName: category.name.replace('\n', ' ') },
    });
  };

  const categoriesList: CategoryItem[] = dbCategories?.data?.result?.map((cat, index) => ({
    id: cat._id,
    name: cat.name,
    image: { uri: cat.image },
    backgroundColor: BACKGROUND_COLORS[index % BACKGROUND_COLORS.length],
  })) || [];

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEE6E1" />

      {/* Header Row */}
      <View style={styles.headerRow}>
        <BackButton onPress={handleBack} />
        <Text style={styles.headerTitle}>{t('products.categories')}</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Grid of Categories */}
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#C4202B" />
        </View>
      ) : (
        <FlatList
          data={categoriesList}
          keyExtractor={(item) => item.id}
          numColumns={4}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.gridContent}
          renderItem={({ item }) => {
            const imageSource = typeof item.image === 'string' ? { uri: item.image } : item.image;
            return (
              <TouchableOpacity
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(item)}
                activeOpacity={0.8}>
                <View style={[styles.imageBox, { backgroundColor: item.backgroundColor || '#F3F4F6' }]}>
                  <Image source={imageSource} style={styles.categoryImage} resizeMode="contain" />
                </View>
                <Text style={styles.categoryLabel} numberOfLines={2}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEE6E1',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: '#1F2937',
  },
  headerSpacer: {
    width: 40,
  },
  gridContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  columnWrapper: {
    justifyContent: 'flex-start',
    gap: 16,
    marginBottom: 20,
  },
  categoryCard: {
    width: '21.5%',
    alignItems: 'center',
  },
  imageBox: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 1,
  },
  categoryImage: {
    width: '65%',
    height: '65%',
  },
  categoryLabel: {
    fontFamily: 'Nunito-Bold',
    fontSize: 12,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 15,
  },
});
