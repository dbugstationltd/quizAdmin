import { TResponseRedux, TRole } from "../../../types";
import baseApi from "../../api/baseApi";

const rolePermissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRole: builder.query<TResponseRedux<TRole[]>, undefined>({
      query: () => ({
        url: "/adminTypes",
        method: "GET",
      }),
      providesTags: ["rolePermission"],
    }),

    getSingleRole: builder.query<TResponseRedux<TRole>, string>({
      query: (id) => ({
        url: `/adminTypes/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, id) => [{ type: "rolePermission", id }],
    }),

    addRole: builder.mutation({
      query: (data) => ({
        url: "/adminTypes",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["rolePermission"],
    }),

    updateRole: builder.mutation({
      query: ({ id, data }) => ({
        url: `/adminTypes/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "rolePermission", id }],
    }),

    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/adminTypes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["rolePermission"],
    }),
  }),
});

export const {
  useGetAllRoleQuery,
  useAddRoleMutation,
  useDeleteRoleMutation,
  useGetSingleRoleQuery,
  useUpdateRoleMutation,
} = rolePermissionApi;
