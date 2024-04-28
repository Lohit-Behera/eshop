import { ThemeProvider } from "@/components/theme-provider";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/address" element={<AddressPage />} />
      <Route path="/order/:id" element={<OrderPage />} />
      <Route path="/admin/user" element={<AdminUserPage />} />
      <Route path="/admin/product" element={<AdminProductPage />} />
    </Route>
  )
);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
