import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Determine base URL dynamically depending on emulator vs local server
export const getBaseUrl = () => {
  let url = "http://10.10.28.196:9010/api/v1"
  return url;
};

console.log('Resolved Base URL:', getBaseUrl()); 

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  prepareHeaders: async (headers, { getState }) => {
    // Attempt to get token from Redux state
    const state = getState() as any;
    let token = state?.auth?.token;

    // Fallback: If not in Redux, try AsyncStorage directly
    if (!token) {
      token = await AsyncStorage.getItem("accessToken");
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
//  console.log('[API Response ←]', JSON.stringify(result));
  // If unauthorized (401), try to refresh token
  if (result.error && result.error.status === 401) {
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    if (refreshToken) {
      try {
        const refreshResult = await baseQuery(
          {
            url: "auth/refresh-token",
            method: "POST",
            body: { refreshToken },
          },
          api,
          extraOptions
        ) as any;

        
        if (refreshResult?.data?.success && refreshResult?.data?.data?.accessToken) {
          const newAccessToken = refreshResult.data.data.accessToken;
          const newRefreshToken = refreshResult.data.data.refreshToken || refreshToken;

          // Save new tokens to AsyncStorage
          await AsyncStorage.setItem("accessToken", newAccessToken);
          await AsyncStorage.setItem("refreshToken", newRefreshToken);

          // Retry the original query with the new token
          result = await baseQuery(args, api, extraOptions);
        } else {
          // If refresh token fails, log out
          await AsyncStorage.removeItem("user");
          await AsyncStorage.removeItem("accessToken");
          await AsyncStorage.removeItem("refreshToken");
        }
      } catch (err) {
        console.error("Token refresh failed:", err);
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Cart", "Order"],
  endpoints: () => ({}),
});
