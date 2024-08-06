import baseApi from "../../../api/baseApi";

const levelQuestionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addQuestion: builder.mutation({
      query: ({ id, data }) => ({
        url: `/adminsLevelQuestions/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "level", id }],
    }),

    updateQuestion: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/adminsLevelQuestions/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: (_, __, { levelId }) => [
        { type: "level", id: Number(levelId) },
      ],
    }),

    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/adminsLevelQuestions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "level", id }],
    }),
  }),
});

export const {
  useAddQuestionMutation,
  useDeleteQuestionMutation,
  useUpdateQuestionMutation,
} = levelQuestionApi;
