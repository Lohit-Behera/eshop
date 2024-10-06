import { ThemeProvider } from "@/components/theme-provider";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import Layout from "./Layout";
import HomePage from "./Pages/HomePage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import CartPage from "./Pages/CartPage";
import ProfilePage from "./Pages/ProfilePage";
import CheckoutPage from "./Pages/CheckoutPage";
import AddressPage from "./Pages/AddressPage";
import OrderPage from "./Pages/OrderPage";
import AdminUserPage from "./Pages/AdminUserPage";
import AdminProductPage from "./Pages/AdminProductPage";
import ProductEditPage from "./Pages/ProductEditPage";
import AdminOrderPage from "./Pages/AdminOrderPage";
import AdminOrderUpdatePage from "./Pages/AdminOrderUpdatePage";
import ContactUsPage from "./Pages/ContactUsPage";
import VerificationPage from "./Pages/VerificationPage";
import AdminDashboardPage from "./Pages/AdminDashboardPage";
import PageNotFoundPage from "./Pages/PageNotFoundPage";
import AdminContactPage from "./Pages/AdminContactPage";
import AdminQueryPage from "./Pages/AdminQueryPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="*" element={<PageNotFoundPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/address" element={<AddressPage />} />
      <Route path="/order/:id" element={<OrderPage />} />
      <Route path="/admin/users" element={<AdminUserPage />} />
      <Route path="/admin/products" element={<AdminProductPage />} />
      <Route path="/admin/update/product/:id" element={<ProductEditPage />} />
      <Route path="/admin/orders" element={<AdminOrderPage />} />
      <Route
        path="/admin/update/order/:id"
        element={<AdminOrderUpdatePage />}
      />
      <Route path="/contact-us" element={<ContactUsPage />} />
      <Route path="/verification" element={<VerificationPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin/contact" element={<AdminContactPage />} />
      <Route path="/admin/query/:id" element={<AdminQueryPage />} />
    </Route>
  )
);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}></RouterProvider>
      <Toaster richColors />
    </ThemeProvider>
  );
}

export default App;
