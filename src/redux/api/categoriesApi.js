import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const categoriesApi = createApi({
    reducerPath: "categoriesApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}`, credentials: "include" }),
    tagTypes: ["admin"],
    endpoints: (builder) => {
        return {
            getCategories: builder.query({
                query: () => {
                    return {
                        url: "/product/get-categories",
                        method: "GET"
                    }
                },
                providesTags: ["admin"]
            }),
            addCategories: builder.mutation({
                query: userData => {
                    return {
                        url: "/product/add-category",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["admin"]
            }),
            EditCategories: builder.mutation({
                query: ({ id, data }) => ({
                    url: `/product/edit-category/${id}`, // ✅ yahi use hoga
                    method: "PATCH",
                    body: data,
                }),
                invalidatesTags: ["admin"],
            }),


            deleteCategories: builder.mutation({
                query: id => {
                    return {
                        url: `/product/delete-category/${id}`,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["admin"]
            }),

        }
    }
})

export const {
    useAddCategoriesMutation,
    useGetCategoriesQuery,
    useDeleteCategoriesMutation,
    useEditCategoriesMutation
} = categoriesApi
