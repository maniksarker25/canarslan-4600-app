import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseApi, getBaseUrl } from "./baseApi";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface SignUpRequest {
  password?: string;
  confirmPassword?: string;
  name: string;
  email: string;
  phone: string;
  playerId?: string;
  platform?: string;
  role: string;
}

export interface VerifyCodeRequest {
  email: string;
  verifyCode: number;
}

export interface ResendVerifyCodeRequest {
  email: string;
}

export interface LoginRequest {
  email: string;
  password?: string;
  playerId?: string;
  platform?: string;
}

export interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
  role: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyResetOtpRequest {
  email: string;
  resetCode: number;
}

export interface ResetPasswordRequest {
  email: string;
  password?: string;
  confirmPassword?: string;
}

export interface ResetPasswordResponseData {
  accessToken: string;
  refreshToken: string;
}

export interface ProfileData {
  _id: string;
  user: string | { _id: string; isBlocked: boolean; isActive: boolean };
  address: string;
  businessAddress: string;
  businessName: string;
  businessType: string;
  createdAt: string;
  dateOfBirth: string | null;
  email: string;
  isAdminVerified: boolean;
  name: string;
  phone: string;
  profile_image: string;
  taxId: string;
  updatedAt: string;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<ApiResponse<any>, SignUpRequest>({
      query: (body) => ({
        url: "user/sign-up",
        method: "POST",
        body,
      }),
    }),
    verifyCode: builder.mutation<ApiResponse<LoginResponseData>, VerifyCodeRequest>({
      query: (body) => ({
        url: "user/verify-code",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User", id: "PROFILE" }],
    }),
    resendVerifyCode: builder.mutation<ApiResponse<null>, ResendVerifyCodeRequest>({
      query: (body) => ({
        url: "user/resend-verify-code",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<ApiResponse<LoginResponseData>, LoginRequest>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User", id: "PROFILE" }],
    }),
    forgotPassword: builder.mutation<ApiResponse<null>, ForgotPasswordRequest>({
      query: (body) => ({
        url: "auth/forget-password",
        method: "POST",
        body,
      }),
    }),
    verifyResetOtp: builder.mutation<ApiResponse<null>, VerifyResetOtpRequest>({
      query: (body) => ({
        url: "auth/verify-reset-otp",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation<ApiResponse<ResetPasswordResponseData>, ResetPasswordRequest>({
      query: (body) => ({
        url: "auth/reset-password",
        method: "POST",
        body,
      }),
    }),
    getProfile: builder.query<ApiResponse<ProfileData>, void>({
      query: () => ({
        url: "user/get-my-profile",
        method: "GET",
      }),
      providesTags: [{ type: "User", id: "PROFILE" }],
    }),
    updateProfile: builder.mutation<ApiResponse<ProfileData>, FormData>({
      // Custom queryFn instead of `query` — bypasses fetchBaseQuery/global
      // fetch entirely for this call, using XMLHttpRequest instead. This
      // sidesteps a known issue where a global `fetch` polyfill (e.g.
      // expo/fetch) doesn't support RN's {uri,name,type} FormData part
      // convention and throws "Unsupported FormDataPart implementation".
      queryFn: async (formData, api) => {
        const state = api.getState() as any;
        let token = state?.auth?.token;
        if (!token) {
          token = await AsyncStorage.getItem("accessToken");
        }

        const base = getBaseUrl();
        const url = `${base}${base.endsWith("/") ? "" : "/"}user/update-profile`;

        try {
          const result = await new Promise<any>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("PATCH", url);
            if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`);
            xhr.onload = () => {
              let parsed: any;
              try {
                parsed = JSON.parse(xhr.responseText);
              } catch {
                parsed = xhr.responseText;
              }
              if (xhr.status >= 200 && xhr.status < 300) {
                resolve(parsed);
              } else {
                reject({ status: xhr.status, data: parsed });
              }
            };
            xhr.onerror = () => {
              reject({ status: "FETCH_ERROR", error: "Network request failed" });
            };
            xhr.send(formData);
          });

          return { data: result };
        } catch (error: any) {
          return {
            error: {
              status: error.status ?? "FETCH_ERROR",
              data: error.data ?? error.error ?? "Upload failed",
            },
          };
        }
      },
      invalidatesTags: [{ type: "User", id: "PROFILE" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useSignUpMutation,
  useVerifyCodeMutation,
  useResendVerifyCodeMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyResetOtpMutation,
  useResetPasswordMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
} = userApi;
