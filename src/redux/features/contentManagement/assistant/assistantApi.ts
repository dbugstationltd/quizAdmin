import { TAssistant, TResponseRedux } from "../../../../types";
import baseApi from "../../../api/baseApi";

const assistantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addassistant: builder.mutation({
      query: (data) => ({
        url: "/adminTalkToAssistants",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["assistant"],
    }),

    getassistant: builder.query<TResponseRedux<TAssistant[]>, undefined>({
      query: () => ({
        url: "/adminTalkToAssistants",
        method: "GET",
      }),
      providesTags: ["assistant"],
    }),

    getSingleassistant: builder.query<TResponseRedux<TAssistant>, number>({
      query: (id) => ({
        url: `/adminTalkToAssistants/${id}`,
        method: "GET",
      }),
    }),

    updateassistant: builder.mutation({
      query: ({ id, data }) => ({
        url: `/adminTalkToAssistants/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["assistant"],
    }),

    deleteassistant: builder.mutation({
      query: (id) => ({
        url: `/adminTalkToAssistants/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["assistant"],
    }),
  }),
});

export const {
  useGetassistantQuery,
  useAddassistantMutation,
  useDeleteassistantMutation,
  useGetSingleassistantQuery,
  useUpdateassistantMutation,
} = assistantApi;
