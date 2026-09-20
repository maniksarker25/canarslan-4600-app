import { baseApi } from "./baseApi";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface CartProduct {
  _id: string;
  name: string;
  category: string;
  image: string;
  availability: string;
  price: number;
  unit: string;
  packSize: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
  itemSubTotal: number;
}

export interface CartResponse {
  _id: string;
  customer: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
  totalItems: number;
  subTotal: number;
  totalPrice: number;
}

export interface AddToCartRequest {
  product: string;
  quantity: number;
}

export interface UpdateQuantityRequest {
  productId: string;
  quantity: number;
}

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<ApiResponse<CartResponse>, void>({
      query: () => ({
        url: "cart/my-cart",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation<ApiResponse<CartResponse>, AddToCartRequest>({
      query: (body) => ({
        url: "cart/add-item",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItem: builder.mutation<ApiResponse<CartResponse>, UpdateQuantityRequest>({
      query: ({ productId, quantity }) => ({
        url: `cart/update-item-quantity/${productId}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    removeCartItem: builder.mutation<ApiResponse<CartResponse>, string>({
      query: (productId) => ({
        url: `cart/remove-item/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation<ApiResponse<CartResponse>, void>({
      query: () => ({
        url: "cart/clear-cart",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} = cartApi;
