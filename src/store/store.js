import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { marvelSlice } from "./marvel";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        marvel: marvelSlice.reducer,
    }
})