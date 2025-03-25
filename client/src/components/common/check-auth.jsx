import { Navigate, useLocation } from "react-router-dom";

export const CheckAuth = ({ isAuthenticated, user = {}, children }) => {
  const location = useLocation();
  // auth login or register
  // if false is true
  //done
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    console.log(
      ` auth : ${isAuthenticated} ,role : ${user.role} , current location not should be login or register ,  not logged`
    );
    return <Navigate to="/auth/login" />;
  }
  // agar  true is  true + check admin or user
  // half done
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    console.log(` 2. auth : ${isAuthenticated}  loction is login or register`);

    // not done if and else  both
    if (user?.role === "admin") {
      console.log(`2.1 role : ${user.role} thats'why --->/admin/dashboard`);
      return <Navigate to="/admin/dashboard" />;
    } else {
      console.log(`2.2 role : ${user.role}  thats'why----->/shop/home`);
      return <Navigate to="/shop/home" />;
    }
  }
  //done
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    console.log(
      `3. auth: ${isAuthenticated} , role : ${user.role}  current location include --> admin thatswahy ---->/unauth-page"`
    );
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    console.log(
      ` 4. auth : ${isAuthenticated}  , role : ${user.role}  , location include --> shop thatswhy ---> /admin/dashboard `
    );
    return <Navigate to="/admin/dashboard" />;
  }
  return <>{children}</>;
};
