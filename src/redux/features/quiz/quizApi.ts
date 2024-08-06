import baseApi from "../../api/baseApi";

const quizApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addQuiz: builder.mutation({
      query: ({ data }) => ({
        url: `/adminQuizes`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "subCategory", id }],
    }),

    getAllQuiz: builder.query({
      query: () => {
        return {
          url: `/adminQuizes`,
          method: "GET",
        };
      },
      providesTags: ["quiz"],
    }),

    getSingleQuiz: builder.query({
      query: (id) => {
        return {
          url: `/adminQuizes/${id}`,
          method: "GET",
        };
      },
      providesTags: (_, __, id) => [{ type: "quiz", id }],
    }),

    updateQuiz: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/adminQuizes/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: (_, __, { id, SCId }) => [
        { type: "quiz", id },
        { type: "subCategory", id: SCId },
      ],
    }),

    deleteQuiz: builder.mutation({
      query: ({ id }) => ({
        url: `/adminQuizes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { SCId }) => [{ type: "subCategory", id: SCId }],
    }),
  }),
});

export const {
  useAddQuizMutation,
  useDeleteQuizMutation,
  useGetAllQuizQuery,
  useGetSingleQuizQuery,
  useUpdateQuizMutation,
} = quizApi;
