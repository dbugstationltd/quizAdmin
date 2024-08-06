import { TResponseRedux, TUser } from "../../../types";
import baseApi from "../../api/baseApi";

const leaderboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeaderboard: builder.query<TResponseRedux<TUser[]>, object>({
      query: (arg) => ({
        url: "/adminLeaderboards/getLeaderboard",
        method: "GET",
        params: arg,
      }),
      providesTags: ['leaderboard']
    }),
  }),
});

export const { useGetLeaderboardQuery } = leaderboardApi;
