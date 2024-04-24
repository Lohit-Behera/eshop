import { configureStore } from "@reduxjs/toolkit";

import productSlice from "@/features/ProductSlice";

const store = configureStore({
    reducer: {
        product: productSlice
    },
});

export default store