import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "./components/admin-view/layout";
import { AuthLayout } from "./components/auth/layout";
import { CheckAuth } from "./components/common/check-auth";
import { ShoppingLayout } from "./components/shopping-view/layout";
import { Skeleton } from "./components/ui/skeleton";
import { AdminDashboard } from "./pages/admin-view/dashboard";
import { AdminFeatures } from "./pages/admin-view/features";
import { AdminOrders } from "./pages/admin-view/orders";
import { AdminProducts } from "./pages/admin-view/products";
import { AuthLogin } from "./pages/auth/login";
import { AuthRegister } from "./pages/auth/register";
import { NotFound } from "./pages/not-found";
import { ShoppingAccount } from "./pages/shopping-view/account";
import { ShoppingCheckout } from "./pages/shopping-view/checkout";
import { ShoppingHome } from "./pages/shopping-view/home";
import { ShoppingListing } from "./pages/shopping-view/listing";
import { UnauthPage } from "./pages/unauth-page";
import { checkAuth } from "./store/auth-slice";

const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  {
    if (isLoading)
      return (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      );
  }

  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white">
        <Routes>
          {/* auth */}
          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>
          {/* admin */}
          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="features" element={<AdminFeatures />} />
          </Route>
          {/* shopping */}
          <Route
            path="/shop"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingLayout />
              </CheckAuth>
            }
          >
            <Route path="home" element={<ShoppingHome />} />
            <Route path="list" element={<ShoppingListing />} />
            <Route path="account" element={<ShoppingAccount />} />
            <Route path="checkout" element={<ShoppingCheckout />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/unauth-page" element={<UnauthPage />} />
        </Routes>
      </div>
    </>
  );
};
export default App;
