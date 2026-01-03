import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}`, credentials: "include" }),
    tagTypes: ["admin"],
    endpoints: (builder) => {
        return {
            getUsers: builder.query({
                query: () => {
                    return {
                        url: "/users/get/all/users",
                        method: "GET"
                    }
                },
                providesTags: ["admin"]
            }),

            logoutAdmin: builder.mutation({
                query: () => ({
                    url: "/auth/logout-admin",
                    method: "POST",
                }),
                invalidatesTags: ["auth"],
            }),

        }
    }
})

export const { useGetUsersQuery, useLogoutAdminMutation } = userApi
