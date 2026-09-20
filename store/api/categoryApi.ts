import { baseApi } from "./baseApi";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Category {
  _id: string;
  name: string;
  image: string;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  totalProduct: number;
}

export interface CategoriesResponse {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  result: Category[];
}

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<ApiResponse<CategoriesResponse>, void>({
      query: () => ({
        url: "category/all-categories",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllCategoriesQuery } = categoryApi;
