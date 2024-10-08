import { configureStore } from "@reduxjs/toolkit";

import productSlice from "@/features/ProductSlice";
import UserSlice from "@/features/UserSlice";
import CartSlice from "@/features/CartSlice";
import AddressSlice from "@/features/AddressSlice";
import OrderSlice from "@/features/OrderSlice";
import AdminUsers from "@/features/AdminUsers";
import AdminProductSlice from "@/features/AdminProductSlice";
import AdminOrderSlice from "@/features/AdminOrderSlice";
import ContactUsSlice from "@/features/ContactUsSlice";
import ModeSlice from "@/features/ModeSlice";
import AdminDashboardSlice from "@/features/AdminDashboardSlice";

const store = configureStore({
    reducer: {
        mode: ModeSlice,
        user: UserSlice,
        product: productSlice,
        cart: CartSlice,
        address: AddressSlice,
        order: OrderSlice,
        adminDashboard: AdminDashboardSlice,
        adminUsers: AdminUsers,
        adminProduct: AdminProductSlice,
        adminOrder: AdminOrderSlice,
        contactUs: ContactUsSlice,
    },
});

export default store