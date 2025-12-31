import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const productApi = createApi({
    reducerPath: "productApi",
     baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}`, credentials: "include" }),
    tagTypes: ["admin"],
    endpoints: (builder) => {
        return {
            getProducts: builder.query({
                query: () => {
                    return {
                        url: "/product/get-products",
                        method: "GET"
                    }
                },
                providesTags: ["admin"]
            }),
            addProduct: builder.mutation({
                query: (formData) => ({
                    url: "/product/add-product",
                    method: "POST",
                    body: formData,
                }),
                invalidatesTags: ["admin"]
            }),

            EditProduct: builder.mutation({
                query: ({ id, formData }) => ({
                    url: `/product/update-product/${id}`,
                    method: "PATCH",
                    body: formData,
                }),
                invalidatesTags: ["admin"],
            }),

            DeleteProduct: builder.mutation({
                query: id => {
                    return {
                        url: `/product/delete-product/${id}`,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["admin"]
            }),

        }
    }
})

export const {

    useAddProductMutation,
    useGetProductsQuery,
    useDeleteProductMutation,
    useEditProductMutation
} = productApi
