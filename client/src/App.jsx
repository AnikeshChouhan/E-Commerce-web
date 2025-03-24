import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "./components/admin-view/layout";
import { AuthLayout } from "./components/auth/layout";
import { ShoppingLayout } from "./components/shopping-view/layout";
import { AdminDashboard } from "./pages/admin-view/dashboard";
import { AdminFeatures } from "./pages/admin-view/features";
import { AdminOrders } from "./pages/admin-view/orders";
import { AdminProducts } from "./pages/admin-view/products";
import { AuthLogin } from "./pages/auth/login";
import { AuthRegister } from "./pages/auth/register";
import { NotFound } from "./pages/not-found";

export const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);
  return (
    <>
      <div className="flex flex-column overflow-hidden bg-white">
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="features" element={<AdminFeatures />} />
          </Route>
          <Route path="/shop" element={<ShoppingLayout />}>
            <Route path="" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};
