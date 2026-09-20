// /types/notification.ts

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string; // ISO date string
  isRead: boolean;
  senderName?: string;
  senderAvatar?: string;
}

export interface NotificationResponse {
  notifications: Notification[];
  unreadCount: number;
  totalCount: number;
}
