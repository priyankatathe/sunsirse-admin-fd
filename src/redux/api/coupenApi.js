import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const coupenApi = createApi({
    reducerPath: "coupenApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}`, credentials: "include" }),
    tagTypes: ["admin"],
    endpoints: (builder) => {
        return {
            getCoupen: builder.query({
                query: () => {
                    return {
                        url: "/coupen/get/coupens",
                        method: "GET"
                    }
                },
                providesTags: ["admin"]
            }),
            addCoupen: builder.mutation({
                query: userData => {
                    return {
                        url: "/coupen/add/coupen",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["admin"]
            }),
            editCoupen: builder.mutation({
                query: ({ id, coupen_Code, offer }) => ({
                    url: `/coupen/update/coupen/${id}`,
                    method: "PATCH",
                    body: {
                        coupen_Code,
                        offer,
                    },
                }),
                invalidatesTags: ["Coupon"],
            }),

            DeleteCoupen: builder.mutation({
                query: id => {
                    return {
                        url: `/coupen/delete/coupen/${id}`,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["admin"]
            }),

        }
    }
})

export const {
    useAddCoupenMutation,
    useGetCoupenQuery,
    useDeleteCoupenMutation,
    useEditCoupenMutation
} = coupenApi
