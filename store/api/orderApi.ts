import { baseApi } from "./baseApi";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  product: string;
  category: string;
  name: string;
  image: string;
  price: number;
  unit: string;
  packSize: string;
  quantity: number;
  itemSubTotal: number;
}

export interface StatusHistory {
  status: string;
  changedBy: string;
  note: string;
  changedAt: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customer: {
    _id: string;
    email: string;
    name: string;
    phone: string;
    profile_image: string;
  };
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subTotal: number;
  deliveryFee: number;
  discount: number;
  tax: number;
  totalPrice: number;
  status: "received" | "confirmed" | "preparing" | "delivered" | "cancelled" | "rejected";
  note: string;
  statusHistory: StatusHistory[];
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  totalOrder: number;
  pendingOrders: number;
  totalPreparing: number;
  totalDelivered: number;
  totalCancelled: number;
  confirmedOrders?: number;
  totalConfirmed?: number;
  result: Order[];
}

export interface PlaceOrderRequest {
  shippingAddress: ShippingAddress;
  note?: string;
}

export interface UpdateOrderStatusRequest {
  id: string;
  status: string;
  note?: string;
}

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation<ApiResponse<Order>, PlaceOrderRequest>({
      query: (body) => ({
        url: "order/place-order",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart", "Order"],
    }),
    getMyOrders: builder.query<ApiResponse<OrdersResponse>, { page?: number; limit?: number } | void>({
      query: (params) => {
        const queryParams: Record<string, any> = {};
        if (params) {
          if (params.page !== undefined) queryParams.page = params.page;
          if (params.limit !== undefined) queryParams.limit = params.limit;
        }
        return {
          url: "order/my-orders",
          method: "GET",
          params: queryParams,
        };
      },
      providesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation<ApiResponse<Order>, UpdateOrderStatusRequest>({
      query: ({ id, status, note }) => ({
        url: `order/update-status/${id}`,
        method: "PATCH",
        body: { status, note },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
  overrideExisting: false,
});

export const {
  usePlaceOrderMutation,
  useGetMyOrdersQuery,
  useLazyGetMyOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
