import { baseApi } from "./baseApi";

export interface NotificationData {
  _id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  isSeen: boolean;
  createdAt: string;
  updatedAt: string;
  data?: {
    entity: string;
    action: string;
    entityId: string;
    meta?: any;
  };
}

export interface NotificationResponse {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
      unreadCount: number;
    };
    result: NotificationData[];
  };
}

export interface SimpleResponse {
  success: boolean;
  message: string;
  data: any;
}

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<NotificationResponse, { page?: number; limit?: number } | void>({
      query: (params) => ({
        url: "notification/get-notifications",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["User"],
    }),
    seeNotifications: builder.mutation<SimpleResponse, void>({
      query: () => ({
        url: "notification/see-notifications",
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    deleteNotification: builder.mutation<SimpleResponse, string>({
      query: (id) => ({
        url: `notification/delete-notification/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetNotificationsQuery,
  useSeeNotificationsMutation,
  useDeleteNotificationMutation,
} = notificationApi;
