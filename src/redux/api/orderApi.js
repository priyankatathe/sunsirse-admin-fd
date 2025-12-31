import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}`, credentials: "include" }),
    tagTypes: ["admin"],
    endpoints: (builder) => {
        return {
            getOrder: builder.query({
                query: () => {
                    return {
                        url: "/orders/get/all/orders",
                        method: "GET"
                    }
                },
                providesTags: ["admin"]
            }),
            getTransaction: builder.query({
                query: () => {
                    return {
                        url: "/orders/get/all/orders",
                        method: "GET"
                    }
                },
                providesTags: ["admin"]
            }),
            EDITOrderStatus: builder.mutation({
                query: (id) => ({
                    url: `/orders/make/cod/completed/${id}`,
                    method: "PATCH",
                }),
                invalidatesTags: ["admin"]
            }),

        }
    }
})

export const {
    useGetOrderQuery,
    useEDITOrderStatusMutation,
    useGetTransactionQuery
} = orderApi
