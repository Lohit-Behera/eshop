import { configureStore } from "@reduxjs/toolkit";

import productSlice from "@/features/ProductSlice";
import UserSlice from "@/features/UserSlice";

const store = configureStore({
    reducer: {
        user: UserSlice,
        product: productSlice,
    },
});

export default store