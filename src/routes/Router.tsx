import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AdminLogin from "../pages/AdminLogin";
import ProductPage from "../pages/ProductPage";
import CartPage  from "../pages/CartPage";
import WelcomePage from "../pages/WelcomePage";
import FavoritesPage from "../pages/FavoritesPage";
import AdminDashboard from "../pages/AdminDashboard";
export default function AppRouter() {
  return (
    <Routes>
                <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/" element={<WelcomePage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login-user" element={<Login />} />
      <Route path="/login-admin" element={<AdminLogin />} />
       <Route path="/cart" element={<CartPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />

    </Routes>
  );
}
