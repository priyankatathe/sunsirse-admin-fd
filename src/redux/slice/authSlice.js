import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        admin: JSON.parse(localStorage.getItem("admin")) || null,
    },
    reducers: {
        adminLogout: (state) => {
            state.admin = null;
            localStorage.removeItem("admin");
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.loginAdmin.matchFulfilled,
                (state, { payload }) => {
                    state.admin = payload;
                    localStorage.setItem("admin", JSON.stringify(payload));
                }
            )
            .addMatcher(
                authApi.endpoints.LogoutAdmin.matchRejected,
                (state) => {
                    state.admin = null;
                    localStorage.removeItem("admin");
                }
            );
    }
});

export const { adminLogout } = authSlice.actions;
export default authSlice.reducer;
