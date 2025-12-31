import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import { authApi } from "./api/authApi";
import { productApi } from "./api/productApi";
import { categoriesApi } from "./api/categoriesApi";
import { coupenApi } from "./api/coupenApi";
import { userApi } from "./api/userApi";
import { orderApi } from "./api/orderApi";
import { messageApi } from "./api/messageApi";

const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [coupenApi.reducerPath]: coupenApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [messageApi.reducerPath]: messageApi.reducer,
        auth: authSlice,
    },

    middleware: (def) => [
        ...def(),
        authApi.middleware,
        productApi.middleware,
        categoriesApi.middleware,
        coupenApi.middleware,
        userApi.middleware,
        orderApi.middleware,
        messageApi.middleware,

    ],

    devTools: import.meta.env.MODE !== "production",

});

export default reduxStore;
