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

    getAllSubCategory: builder.query({
      query: () => {
        return {
          url: `/adminSubCategories`,
          method: "GET",
        };
      },
      providesTags: ["category"],
    }),

    getSingleSubCategory: builder.query({
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
      invalidatesTags: (_, __, id) => [{ type: "subCategory", id }],
    }),

    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `/adminSubCategories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: "subCategory", id }],
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
