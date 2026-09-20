import { baseApi } from "./baseApi";

export interface LegalInfo {
  _id: string;
  businessType: string;
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  freeCancellationHour: number;
  jurisdiction: string;
  officialWebsite: string;
  platformFeePercentage: number;
  registeredAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface LegalInfoResponse {
  success: boolean;
  message: string;
  data: LegalInfo;
}

export interface PolicyData {
  _id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface PolicyResponse {
  success: boolean;
  message: string;
  data: PolicyData;
}

export interface FaqData {
  _id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

export interface FaqsResponse {
  success: boolean;
  message: string;
  data: FaqData[];
}

export const legalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLegalInfo: builder.query<LegalInfoResponse, void>({
      query: () => ({
        url: "legal-info/get",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getPrivacyPolicy: builder.query<PolicyResponse, void>({
      query: () => ({
        url: "manage/get-privacy-policy",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getTermsConditions: builder.query<PolicyResponse, void>({
      query: () => ({
        url: "manage/get-terms-conditions",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getFaqs: builder.query<FaqsResponse, void>({
      query: () => ({
        url: "manage/get-faq",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetLegalInfoQuery,
  useGetPrivacyPolicyQuery,
  useGetTermsConditionsQuery,
  useGetFaqsQuery,
} = legalApi;
