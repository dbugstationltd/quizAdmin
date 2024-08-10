import { TResponseRedux, TUser } from "../../../types";
import baseApi from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (data) => ({
        url: "/adminUser",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    getUser: builder.query<TResponseRedux<TUser[]>, undefined>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    getSingleUser: builder.query<TResponseRedux<TUser>, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    updateUser: builder.mutation({
      query: ({ data, id }) => ({
        url: `/adminUser/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    changeUserStatus: builder.mutation({
      query: ({ data, id }) => ({
        url: `/adminUser/activeDeactive/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/adminUser/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useChangeUserStatusMutation
} = userApi;
