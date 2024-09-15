import { TResponseRedux, TSubDomain } from "../../../types";
import baseApi from "../../api/baseApi";

const subDomainApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubDomain: builder.query<TResponseRedux<TSubDomain[]>, undefined>({
      query: () => ({
        url: "/adminApps",
        method: "GET",
      }),
      providesTags: ["subDomain"],
    }),

    getSingleSubDomain: builder.query({
      query: (id) => ({
        url: `/adminApps/${id}`,
        method: "GET",
      }),
      providesTags: ["subDomain"],
    }),

    addSubDomain: builder.mutation({
      query: (data) => ({
        url: "/adminApps",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["subDomain"],
    }),

    updateSubDomain: builder.mutation({
      query: ({ id, data }) => ({
        url: `/adminApps/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["subDomain"],
    }),

    deleteSubDomain: builder.mutation({
      query: (id) => ({
        url: `/adminApps/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subDomain"],
    }),
  }),
});

export const {
  useGetAllSubDomainQuery,
  useGetSingleSubDomainQuery,
  useAddSubDomainMutation,
  useUpdateSubDomainMutation,
  useDeleteSubDomainMutation
} = subDomainApi;
