import { TResponseRedux, TWebSettings } from "../../../types";
import baseApi from "../../api/baseApi";

const webSettingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWebSettings: builder.query<TResponseRedux<TWebSettings>, undefined>({
      query: () => ({
        url: "/settings",
        method: "GET",
      }),
      providesTags: ["webSettings"],
    }),

    updateWebSettings: builder.mutation({
      query: (data) => ({
        url: `/settings/1`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["webSettings"],
    }),
  }),
});

export const { useGetWebSettingsQuery, useUpdateWebSettingsMutation } =
  webSettingsApi;
