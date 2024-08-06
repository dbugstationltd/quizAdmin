import { TCategory, TResponseRedux } from "../../../types";
import baseApi from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (data) => ({
        url: `/adminCategories`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    getAllCategory: builder.query<TResponseRedux<TCategory[]>, undefined>({
      query: () => {
        return {
          url: `/adminCategories`,
          method: "GET",
        };
      },
      providesTags: ["category"],
    }),

    getSingleCategory: builder.query<TResponseRedux<TCategory>, number>({
      query: (id) => {
        return {
          url: `/adminCategories/${id}`,
          method: "GET",
        };
      },
      providesTags: (_, __, id) => [{ type: "category", id }],
    }),

    updateCategory: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/adminCategories/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/adminCategories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} = categoryApi;
