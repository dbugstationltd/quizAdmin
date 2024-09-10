import { TMetaData, TResponseRedux } from "../../../types";
import baseApi from "../../api/baseApi";

const homeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMetaData: builder.query<TResponseRedux<TMetaData>, undefined>({
      query: () => ({
        url: "/adminDashboard",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMetaDataQuery } = homeApi;
