import { TResponseRedux, TWebSettings } from "../../../types";
import baseApi from "../../api/baseApi";

const webSettingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWebSettings: builder.query<TResponseRedux<TWebSettings>, undefined>({
      query: () => ({
        url: "/web-settings",
        method: "GET",
      }),
      providesTags: ["webSettings"],
    }),
  }),
});

export const { useGetWebSettingsQuery } = webSettingsApi;
