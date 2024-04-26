import { configureStore } from "@reduxjs/toolkit";

import productSlice from "@/features/ProductSlice";
import UserSlice from "@/features/UserSlice";
import CartSlice from "@/features/CartSlice";
import DeleteImages from "@/features/DeleteImages";
import AddressSlice from "@/features/AddressSlice";

const store = configureStore({
    reducer: {
        user: UserSlice,
        product: productSlice,
        cart: CartSlice,
        address: AddressSlice,
        deleteImages: DeleteImages
    },
});

export default store