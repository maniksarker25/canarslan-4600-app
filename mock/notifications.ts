// /mock/notifications.ts
import { Notification, NotificationResponse } from '@/types/notification';

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Provider Accepted Your Task',
    message: 'John Doe has accepted your snow plowing task',
    timestamp: '2026-03-18T10:30:00Z',
    isRead: false,
    senderName: 'John Doe',
    senderAvatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    title: 'Task Completed',
    message: 'Your lawn mowing task has been completed',
    timestamp: '2026-03-17T15:45:00Z',
    isRead: false,
    senderName: 'Emma Smith',
    senderAvatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    title: 'Payment Received',
    message: 'You received $45.00 for snow shoveling',
    timestamp: '2026-03-17T09:20:00Z',
    isRead: true,
  },
  {
    id: '4',
    title: 'New 5-Star Review',
    message: 'Michael left you a 5-star review',
    timestamp: '2026-03-16T14:15:00Z',
    isRead: true,
    senderName: 'Michael Brown',
    senderAvatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: '5',
    title: 'Welcome to SnowOut!',
    message: 'Thanks for joining our community',
    timestamp: '2026-03-15T08:00:00Z',
    isRead: true,
  },
];

export const MOCK_NOTIFICATION_RESPONSE: NotificationResponse = {
  notifications: MOCK_NOTIFICATIONS,
  unreadCount: MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length,
  totalCount: MOCK_NOTIFICATIONS.length,
};
