// /hooks/useNotifications.ts
import { useState, useEffect, useCallback } from 'react';
import { Notification, NotificationResponse } from '@/types/notification';
import { MOCK_NOTIFICATION_RESPONSE } from '@/mock/notifications';

export const useNotifications = () => {
  const [data, setData] = useState<NotificationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      setData(MOCK_NOTIFICATION_RESPONSE);
      setIsError(false);
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      console.error('Error loading notifications:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const refetch = useCallback(() => {
    return fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = useCallback((notificationId: string) => {
    setData((prevData) => {
      if (!prevData) return prevData;

      const updatedNotifications = prevData.notifications.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification
      );

      return {
        ...prevData,
        notifications: updatedNotifications,
        unreadCount: updatedNotifications.filter((n) => !n.isRead).length,
      };
    });
  }, []);

  const markAllAsRead = useCallback(() => {
    setData((prevData) => {
      if (!prevData) return prevData;

      const updatedNotifications = prevData.notifications.map((notification) => ({
        ...notification,
        isRead: true,
      }));

      return {
        ...prevData,
        notifications: updatedNotifications,
        unreadCount: 0,
      };
    });
  }, []);

  return {
    notifications: data?.notifications ?? [],
    unreadCount: data?.unreadCount ?? 0,
    totalCount: data?.totalCount ?? 0,
    isLoading,
    isError,
    error,
    refetch,
    markAsRead,
    markAllAsRead,
    // Helper to get icon based on notification type
    getNotificationIcon: (type: string) => {
      // You can return different icons based on type
      return undefined; // Will use default icon
    },
  };
};
