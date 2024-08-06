import { TResponseRedux } from "../../../../types";
import baseApi from "../../../api/baseApi";

const storyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addStory: builder.mutation({
      query: (data) => ({
        url: "/adminStories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["story"],
    }),

    getStory: builder.query<
      TResponseRedux<{ id: number; title: string; file: string }[]>,
      undefined
    >({
      query: () => ({
        url: "/adminStories",
        method: "GET",
      }),
      providesTags: ["story"],
    }),

    updateStory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/adminStories/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["story"],
    }),

    deleteStory: builder.mutation({
      query: (id) => ({
        url: `/adminStories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["story"],
    }),
  }),
});

export const {
  useGetStoryQuery,
  useAddStoryMutation,
  useDeleteStoryMutation,
  useUpdateStoryMutation,
} = storyApi;
