import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}`, credentials: "include" }),
    tagTypes: ["admin"],
    endpoints: (builder) => {
        return {
            // getUsers: builder.query({
            //     query: () => {
            //         return {
            //             url: "/apiEndPoint",
            //             method: "GET"
            //         }
            //     },
            //     providesTags: ["admin"]
            // }),
            loginAdmin: builder.mutation({
                query: adminData => {
                    return {
                        url: "/auth/login-admin",
                        method: "POST",
                        body: adminData
                    }
                },
                invalidatesTags: ["admin"]
            }),
            LogoutAdmin: builder.mutation({
                query: adminData => {
                    return {
                        url: "/apiEndPoint",
                        method: "POST",
                        body: adminData
                    }
                },
                invalidatesTags: ["admin"]
            }),

        }
    }
})

export const {
    useLoginAdminMutation,
    useLogoutAdminMutation
 } = authApi
