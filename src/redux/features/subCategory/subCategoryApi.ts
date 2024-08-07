import { TResponseRedux, TSubCategory } from "../../../types";
import baseApi from "../../api/baseApi";

const subCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSubCategory: builder.mutation({
      query: (data) => ({
        url: `/adminSubCategories`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["subCategory"],
    }),

    getAllSubCategory: builder.query<TResponseRedux<TSubCategory[]>, object>({
      query: (args) => {
        return {
          url: `/adminSubCategories`,
          method: "GET",
          params: args,
        };
      },
      providesTags: ["subCategory"],
    }),

    getSingleSubCategory: builder.query<TResponseRedux<TSubCategory>, string>({
      query: (id) => {
        return {
          url: `/adminSubCategories/${id}`,
          method: "GET",
        };
      },
      providesTags: (_, __, id) => [{ type: "subCategory", id }],
    }),

    updateSubCategory: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/adminSubCategories/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: (_, __, { id }) => [
        { type: "subCategory" },
        { type: "subCategory", id },
      ],
    }),

    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `/adminSubCategories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [
        { type: "subCategory" },
        { type: "subCategory", id },
      ],
    }),
  }),
});

export const {
  useAddSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetAllSubCategoryQuery,
  useGetSingleSubCategoryQuery,
  useUpdateSubCategoryMutation,
} = subCategoryApi;
