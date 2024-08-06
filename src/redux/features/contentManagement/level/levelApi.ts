import { TLevel, TResponseRedux } from "../../../../types";
import baseApi from "../../../api/baseApi";

const levelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addLevel: builder.mutation({
      query: (data) => ({
        url: "/adminsLevels",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["level"],
    }),

    getLevel: builder.query<TResponseRedux<TLevel[]>, undefined>({
      query: () => ({
        url: "/adminsLevels",
        method: "GET",
      }),
      providesTags: ["level"],
    }),

    getSingleLevel: builder.query<TResponseRedux<TLevel>, string>({
      query: (id) => ({
        url: `/adminsLevels/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, id) => [{ type: "level", id }],
    }),

    updateLevel: builder.mutation({
      query: ({ id, data }) => ({
        url: `/adminsLevels/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "level", id }],
    }),

    deleteLevel: builder.mutation({
      query: (id) => ({
        url: `/adminsLevels/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [
        { type: "level", id },
        { type: "level" },
      ],
    }),
  }),
});

export const {
  useGetLevelQuery,
  useAddLevelMutation,
  useGetSingleLevelQuery,
  useUpdateLevelMutation,
  useDeleteLevelMutation,
} = levelApi;
