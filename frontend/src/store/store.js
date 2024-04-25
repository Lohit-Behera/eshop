import { configureStore } from "@reduxjs/toolkit";

import productSlice from "@/features/ProductSlice";
import UserSlice from "@/features/UserSlice";
import CartSlice from "@/features/CartSlice";

const store = configureStore({
    reducer: {
        user: UserSlice,
        product: productSlice,
        cart: CartSlice,
    },
});

export default store