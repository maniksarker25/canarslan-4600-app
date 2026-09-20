import { baseApi } from "./baseApi";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Product {
  _id: string;
  name: string;
  category: {
    _id: string;
    name: string;
    image: string;
    description: string;
    isActive: boolean;
    isDeleted: boolean;
  };
  image: string;
  availability: "in_stock" | "out_of_stock" | "limited_stock";
  price: number;
  description: string;
  unit: "piece" | "per_kg" | "per_lb";
  packSize: string;
  isFeatured: boolean;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  result: Product[];
}

export interface ProductsQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  category?: string;
  isFeatured?: boolean;
  availability?: string;
  sort?: string;
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<ApiResponse<ProductsResponse>, ProductsQueryParams | void>({
      query: (params) => {
        const queryParams: Record<string, any> = {};
        if (params) {
          if (params.page !== undefined) queryParams.page = params.page;
          if (params.limit !== undefined) queryParams.limit = params.limit;
          if (params.searchTerm) queryParams.searchTerm = params.searchTerm;
          if (params.category) queryParams.category = params.category;
          if (params.isFeatured !== undefined) queryParams.isFeatured = params.isFeatured;
          if (params.availability) queryParams.availability = params.availability;
          if (params.sort) queryParams.sort = params.sort;
        }
        return {
          url: "product/active-products",
          method: "GET",
          params: queryParams,
        };
      },
    }),
    getProductDetails: builder.query<ApiResponse<Product>, string>({
      query: (id) => ({
        url: `product/${id}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllProductsQuery, useGetProductDetailsQuery } = productApi;
