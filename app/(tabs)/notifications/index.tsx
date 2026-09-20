import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import NotificationCard from '@/components/ui/NotificationCard';
import {
  useGetNotificationsQuery,
  useSeeNotificationsMutation,
  useDeleteNotificationMutation,
} from '@/store/api/notificationApi';
import { useTranslation } from 'react-i18next';

const NotificationsScreen = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [notificationsList, setNotificationsList] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const {
    data: dbNotifications,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetNotificationsQuery({
    page,
    limit: 10,
  });

  const [seeNotifications] = useSeeNotificationsMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  // Sync / append notifications
  useEffect(() => {
    if (dbNotifications?.data?.result) {
      if (page === 1) {
        setNotificationsList(dbNotifications.data.result);
      } else {
        // Append unique items to list
        setNotificationsList((prev) => {
          const newItems = dbNotifications.data.result.filter(
            (item: any) => !prev.some((p) => p._id === item._id)
          );
          return [...prev, ...newItems];
        });
      }
    }
  }, [dbNotifications, page]);

  const notifications = notificationsList.map((n) => ({
    id: n._id,
    title: n.title,
    message: n.message,
    isRead: n.isRead,
    timestamp: new Date(n.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  }));

  const unreadCount = dbNotifications?.data?.meta?.unreadCount || 0;

  const handleNotificationPress = async () => {
    try {
      await seeNotifications().unwrap();
      refetch();
    } catch (err) {
      console.error('Failed to mark read on press:', err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await seeNotifications().unwrap();
      refetch();
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteNotification(id).unwrap();
      // Remove locally instantly for clean UX
      setNotificationsList((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error('Failed to delete notification:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setPage(1);
    await refetch();
    setIsRefreshing(false);
  };

  const handleLoadMore = () => {
    const totalPages = dbNotifications?.data?.meta?.totalPage || 1;
    if (page < totalPages && !isFetching) {
      setPage((p) => p + 1);
    }
  };

  return (
    <>
      <StatusBar translucent barStyle="dark-content" />
      <LinearGradient
        colors={['#EEE6E1', '#EEE6E1', '#EEE6E1']}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}>
        <SafeAreaView edges={['top']} className="flex-1" style={{ backgroundColor: 'transparent' }}>
          {/* Header */}
          <View className="px-4 pb-2 pt-3">
            <View className="flex-row flex-wrap items-center justify-between gap-x-2">
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{ flex: 1, marginRight: 12 }}
                className="font-nunitoBold text-[22px] text-[#1E293B]">
                {t('notifications.title')}
              </Text>
              {unreadCount > 0 && (
                <TouchableOpacity onPress={handleMarkAllRead} activeOpacity={0.7}>
                  <Text className="font-nunitoBold text-[13px] text-[#C4202B]">
                    {t('notifications.markAllRead')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <Text className="mt-1 font-nunito text-[14px] text-[#6B7280]">
              {t('notifications.unreadCount', { count: unreadCount })}
            </Text>
          </View>

          {/* List */}
          {isLoading && page === 1 ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#C4202B" />
            </View>
          ) : isError && page === 1 ? (
            <View className="flex-1 items-center justify-center p-4">
              <Text className="mb-2 text-center font-nunito text-[#EF4444]">
                Failed to load notifications
              </Text>
              <TouchableOpacity onPress={handleRefresh} className="mt-4">
                <Text className="font-nunitoBold text-[#C4202B]">{t('common.retry')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={notifications}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <NotificationCard
                  notification={item}
                  onPress={handleNotificationPress}
                  onDelete={handleDeleteNotification}
                  isDeleting={deletingId === item.id}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 40 }}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.3}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={handleRefresh}
                  colors={['#C4202B']}
                  tintColor="#C4202B"
                />
              }
              ListFooterComponent={
                isFetching && page > 1 ? (
                  <View style={{ paddingVertical: 12 }}>
                    <ActivityIndicator size="small" color="#C4202B" />
                  </View>
                ) : null
              }
              ListEmptyComponent={
                <View className="items-center justify-center py-20">
                  <Text className="font-nunito text-[15px] text-[#6B7280]">
                    {t('notifications.noNotifications')}
                  </Text>
                </View>
              }
            />
          )}
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default NotificationsScreen;
