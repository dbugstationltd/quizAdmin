import { TNotification, TResponseRedux } from "../../../types";
import baseApi from "../../api/baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotification: builder.query<
      TResponseRedux<TNotification[]>,
      undefined
    >({
      query: () => ({
        url: "/notifications",
        method: "GET",
      }),
      providesTags: ["notification"],
    }),

    addNotification: builder.mutation({
      query: (data) => ({
        url: "/notifications/sendNotification",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const { useGetAllNotificationQuery, useAddNotificationMutation } = notificationApi;
