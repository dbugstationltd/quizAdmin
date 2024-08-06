import { TAssistantCategory, TResponseRedux } from "../../../../types";
import baseApi from "../../../api/baseApi";

const assistantCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAssistantCategory: builder.mutation({
      query: (data) => ({
        url: "/adminAssistantCategories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["assistantCategory"],
    }),

    getAssistantCategory: builder.query<
      TResponseRedux<TAssistantCategory[]>,
      undefined
    >({
      query: () => ({
        url: "/adminAssistantCategories",
        method: "GET",
      }),
      providesTags: ["assistantCategory"],
    }),

    getSingleAssistantCategory: builder.query<
      TResponseRedux<TAssistantCategory>,
      number
    >({
      query: (id) => ({
        url: `/adminAssistantCategories/${id}`,
        method: "GET",
      }),
    }),

    updateAssistantCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/adminAssistantCategories/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["assistantCategory"],
    }),

    deleteAssistantCategory: builder.mutation({
      query: (id) => ({
        url: `/adminAssistantCategories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["assistantCategory"],
    }),
  }),
});

export const {
  useGetAssistantCategoryQuery,
  useAddAssistantCategoryMutation,
  useDeleteAssistantCategoryMutation,
  useGetSingleAssistantCategoryQuery,
  useUpdateAssistantCategoryMutation,
} = assistantCategoryApi;
