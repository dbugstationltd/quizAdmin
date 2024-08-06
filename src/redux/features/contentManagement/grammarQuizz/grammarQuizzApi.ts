import { TGrammarQuiz, TResponseRedux } from "../../../../types";
import baseApi from "../../../api/baseApi";

const grammarQuizzApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addGrammarQuizz: builder.mutation({
      query: (data) => ({
        url: "/adminGrammarQuizzes",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["grammarQuizz"],
    }),

    getGrammarQuizz: builder.query<TResponseRedux<TGrammarQuiz[]>, undefined>({
      query: () => ({
        url: "/adminGrammarQuizzes",
        method: "GET",
      }),
      providesTags: ["grammarQuizz"],
    }),

    getSingleGrammarQuizz: builder.query<TResponseRedux<TGrammarQuiz>,undefined>({
      query: (id) => ({
        url: `/adminGrammarQuizzes/${id}`,
        method: "GET",
      }),
      providesTags: ["grammarQuizz"],
    }),

    updateGrammarQuizz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/adminGrammarQuizzes/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["grammarQuizz"],
    }),

    deleteGrammarQuizz: builder.mutation({
      query: (id) => ({
        url: `/adminGrammarQuizzes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["grammarQuizz"],
    }),
  }),
});

export const {
  useGetGrammarQuizzQuery,
  useAddGrammarQuizzMutation,
  useDeleteGrammarQuizzMutation,
  useGetSingleGrammarQuizzQuery,
  useUpdateGrammarQuizzMutation,
} = grammarQuizzApi;
