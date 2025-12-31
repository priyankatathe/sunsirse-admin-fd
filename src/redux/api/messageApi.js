import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const messageApi = createApi({
    reducerPath: "messageApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}`, credentials: "include" }),
    tagTypes: ["admin"],
    endpoints: (builder) => {
        return {
            getMessages: builder.query({
                query: () => {
                    return {
                        url: "/messages/get/messages",
                        method: "GET"
                    }
                },
                providesTags: ["admin"]
            }),


        }
    }
})

export const {useGetMessagesQuery } = messageApi
