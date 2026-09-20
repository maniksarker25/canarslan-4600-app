import { baseApi } from "./baseApi";

export interface SupportTicketRequest {
  contactReason: string;
  message: string;
}

export interface SupportTicketResponse {
  success: boolean;
  message: string;
  data: {
    user: string;
    userModel: string;
    contactReason: string;
    message: string;
    status: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSupportTicket: builder.mutation<SupportTicketResponse, SupportTicketRequest>({
      query: (body) => ({
        url: "support/create",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateSupportTicketMutation } = supportApi;
