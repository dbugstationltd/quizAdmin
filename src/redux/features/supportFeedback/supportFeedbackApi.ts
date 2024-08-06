import { TFeedback, TMessage, TResponseRedux, TTicket } from "../../../types";
import baseApi from "../../api/baseApi";

const supportFeedbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeedback: builder.query<TResponseRedux<TFeedback[]>, undefined>({
      query: () => ({
        url: "/userFeedbacks",
        method: "GET",
      }),
      providesTags: ["feedback"],
    }),

    getSupportTicket: builder.query<TResponseRedux<TTicket[]>, undefined>({
      query: () => ({
        url: "/supportTickets",
        method: "GET",
      }),
      providesTags: ["ticket"],
    }),

    getSingleSupportTicket: builder.query<TResponseRedux<TMessage>, number>({
      query: (id) => ({
        url: `/supportTickets/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, id) => [{ type: "message", id }],
    }),

    replayTicket: builder.mutation({
      query: (data) => ({
        url: "/supportTicketMessages",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_, __, data) => [{ type: "message", id: data.id }],
    }),
  }),
});

export const {
  useGetFeedbackQuery,
  useGetSupportTicketQuery,
  useReplayTicketMutation,
  useGetSingleSupportTicketQuery,
} = supportFeedbackApi;
