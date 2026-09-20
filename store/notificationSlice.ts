import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '@/types/notification';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'Order Confirmed',
    message: 'Your order #OE-2025-003 has been confirmed and moved into preparation.',
    timestamp: 'Jul 4, 2025',
    isRead: false,
  },
  {
    id: '2',
    title: 'Order Being Prepared',
    message: 'Your order #OE-2025-002 has started preparation. Estimated delivery:',
    timestamp: 'Jul 4, 2025',
    isRead: false,
  },
  {
    id: '3',
    title: 'New Product: Cured Beef (Pastırma)',
    message: "We've added our traditional Kayseri-style Cured Beef (Pastırma) to our store.",
    timestamp: 'Jul 4, 2025',
    isRead: false,
  },
  {
    id: '4',
    title: 'Order Confirmed',
    message: 'Your order #OE-2025-003 has been confirmed and moved into preparation.',
    timestamp: 'Jul 4, 2025',
    isRead: true,
  },
  {
    id: '5',
    title: 'Order Delivered',
    message: 'Your order #OE-2025-003 has been confirmed and moved into preparation.',
    timestamp: 'Jul 4, 2025',
    isRead: true,
  },
];

const initialState: NotificationState = {
  notifications: initialNotifications,
  unreadCount: initialNotifications.filter((n) => !n.isRead).length,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    markAsRead(state, action: PayloadAction<string>) {
      const item = state.notifications.find((n) => n.id === action.payload);
      if (item && !item.isRead) {
        item.isRead = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead(state) {
      state.notifications.forEach((n) => {
        n.isRead = true;
      });
      state.unreadCount = 0;
    },
    addNotification(state, action: PayloadAction<Notification>) {
      state.notifications.unshift(action.payload);
      if (!action.payload.isRead) {
        state.unreadCount += 1;
      }
    },
  },
});

export const { markAsRead, markAllAsRead, addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
