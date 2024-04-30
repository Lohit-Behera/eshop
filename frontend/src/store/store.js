import { configureStore } from "@reduxjs/toolkit";

import productSlice from "@/features/ProductSlice";
import UserSlice from "@/features/UserSlice";
import CartSlice from "@/features/CartSlice";
import DeleteImages from "@/features/DeleteImages";
import AddressSlice from "@/features/AddressSlice";
import OrderSlice from "@/features/OrderSlice";
import AdminUsers from "@/features/AdminUsers";
import AdminProductSlice from "@/features/AdminProductSlice";
import AdminOrderSlice from "@/features/AdminOrderSlice";
import ContactUsSlice from "@/features/ContactUsSlice";

const store = configureStore({
    reducer: {
        user: UserSlice,
        product: productSlice,
        cart: CartSlice,
        address: AddressSlice,
        order: OrderSlice,
        adminUsers: AdminUsers,
        adminProduct: AdminProductSlice,
        adminOrder: AdminOrderSlice,
        contactUs: ContactUsSlice,
        deleteImages: DeleteImages
    },
});

export default store