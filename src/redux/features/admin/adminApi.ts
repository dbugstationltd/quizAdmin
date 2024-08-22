import { TAdmin, TResponseRedux } from "../../../types";
import baseApi from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmin: builder.query<TResponseRedux<TAdmin[]>, undefined>({
      query: () => ({
        url: "/admins",
        method: "GET",
      }),
      providesTags: ["admin"],
    }),

    getSingleAdmin: builder.query<TResponseRedux<TAdmin>, string>({
      query: (id) => ({
        url: `/admins/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, id) => [{ type: "admin", id }],
    }),

    addAdmin: builder.mutation({
      query: (data) => ({
        url: "/admins/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["admin"],
    }),

    updateAdmin: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admins/updateAdminInfo/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => ["admin", { type: "admin", id }],
    }),

    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admins/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => ["admin", { type: "admin", id }],
    }),
  }),
});

export const {
  useGetAllAdminQuery,
  useAddAdminMutation,
  useDeleteAdminMutation,
  useGetSingleAdminQuery,
  useUpdateAdminMutation,
} = adminApi;
