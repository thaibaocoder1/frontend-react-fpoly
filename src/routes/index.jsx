import AdminLayout from "@layout/AdminLayout";
import ClientLayout from "@layout/ClientLayout";
import AccountAdd from "@modules/admin/Account/components/AccountAdd";
import AccountEdit from "@modules/admin/Account/components/AccountEdit";
import LoginForm from "@modules/admin/Auth/components/LoginForm/LoginForm";
import ProductAddEdit from "@modules/admin/Product/components/ProductAddEdit";
import Login from "@modules/client/Auth/components/Login";
import Register from "@modules/client/Auth/components/Register";
import Index from "@modules/client/Dashboard/pages/Index";
import Orders from "@modules/client/Dashboard/pages/Orders";
import NotFound from "@pages/NotFound";
import AccountAdmin from "@pages/admin/Account";
import CategoryAdmin from "@pages/admin/Category";
import CouponAdmin from "@pages/admin/Coupon";
import DashboardAdmin from "@pages/admin/Dashboard";
import ProductAdmin from "@pages/admin/Product";
import ProfileAdmin from "@pages/admin/Profile";
import ActiveAccount from "@pages/client/ActiveAccount";
import Cart from "@pages/client/Cart";
import ChangePassword from "@pages/client/ChangePassword";
import CheckoutPage from "@pages/client/Checkout";
import ConfirmRecover from "@pages/client/ConfirmRecover";
import Dashboard from "@pages/client/Dashboard";
import ForgotAccount from "@pages/client/ForgotAccount";
import Home from "@pages/client/Home";
import MyWishList from "@pages/client/MyWishList";
import OrderComplete from "@pages/client/OrderComplete";
import RecoverAccount from "@pages/client/RecoverAccount";
import ResetAccount from "@pages/client/ResetAccount";
import Shop from "@pages/client/Shop";
import ShopDetail from "@pages/client/ShopDetail";
import { useRoutes } from "react-router-dom";
import ProtectedRoute from "./protected";
import OrderDetail from "@modules/client/Dashboard/pages/OrderDetail";
import OrderAdmin from "@pages/admin/Order";
import OrderDetailAdmin from "@pages/admin/OrderDetail";
import AuthPage from "@pages/client/AuthPage";

const RoutesFeature = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <ClientLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "shops",
          children: [
            {
              index: true,
              element: <Shop />,
            },
            {
              path: "detail/:id",
              element: <ShopDetail />,
            },
          ],
        },
        {
          path: "checkout",
          element: <CheckoutPage />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
          children: [
            {
              index: true,
              element: <Index />,
            },
            {
              path: "orders",
              children: [
                {
                  index: true,
                  element: <Orders />,
                },
                {
                  path: ":id",
                  element: <OrderDetail />,
                },
              ],
            },
            {
              path: "wishlist",
              element: <MyWishList />,
            },
            {
              path: "change",
              element: <ChangePassword />,
            },
          ],
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "auth",
          element: <AuthPage />,
          children: [
            {
              path: "active/:id",
              element: <ActiveAccount />,
            },
            {
              path: "forgot",
              element: <ForgotAccount />,
            },
            {
              path: "reset/:id",
              element: <ResetAccount />,
            },
            {
              path: "recover",
              element: <RecoverAccount />,
            },
            {
              path: "confirm",
              element: <ConfirmRecover />,
            },
          ],
        },
        {
          path: "/order/complete",
          element: <OrderComplete />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <DashboardAdmin />,
        },
        {
          path: "category",
          element: <CategoryAdmin />,
        },
        {
          path: "coupon",
          element: <CouponAdmin />,
        },
        {
          path: "product",
          children: [
            {
              index: true,
              element: <ProductAdmin />,
            },
            {
              path: "add",
              element: <ProductAddEdit />,
            },
            {
              path: "edit/:id",
              element: <ProductAddEdit />,
            },
          ],
        },
        {
          path: "accounts",
          children: [
            {
              index: true,
              element: <AccountAdmin />,
            },
            {
              path: "add",
              element: <AccountAdd />,
            },
            {
              path: "edit/:id",
              element: <AccountEdit />,
            },
          ],
        },
        {
          path: "orders",
          children: [
            {
              index: true,
              element: <OrderAdmin />,
            },
            {
              path: ":id",
              element: <OrderDetailAdmin />,
            },
          ],
        },
        {
          path: "profile",
          element: <ProfileAdmin />,
        },
      ],
    },
    {
      path: "/admin/login",
      element: <LoginForm />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return element;
};

export default RoutesFeature;
