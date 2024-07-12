import AdminLayout from "@layout/AdminLayout";
import ClientLayout from "@layout/ClientLayout";
import AccountAdd from "@modules/admin/Account/components/AccountAdd";
import AccountEdit from "@modules/admin/Account/components/AccountEdit";
import LoginForm from "@modules/admin/Auth/components/LoginForm/LoginForm";
import ProductAddEdit from "@modules/admin/Product/components/ProductAddEdit";
import Login from "@modules/client/Auth/components/Login";
import Register from "@modules/client/Auth/components/Register";
import Index from "@modules/client/Dashboard/pages/Index";
import { Container } from "@mui/material";
import AccountAdmin from "@pages/admin/Account";
import CategoryAdmin from "@pages/admin/Category";
import DashboardAdmin from "@pages/admin/Dashboard";
import ProductAdmin from "@pages/admin/Product";
import ProfileAdmin from "@pages/admin/Profile";
import Cart from "@pages/client/Cart";
import Dashboard from "@pages/client/Dashboard";
import Home from "@pages/client/Home";
import Shop from "@pages/client/Shop";
import ShopDetail from "@pages/client/ShopDetail";
import { useRoutes } from "react-router-dom";
import ProtectedRoute from "./protected";
import CheckoutPage from "@pages/client/Checkout";

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
          path: "cart",
          element: <Cart />,
        },
        {
          path: "checkout",
          element: <CheckoutPage />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
          children: [
            {
              index: true,
              element: <Index />,
            },
          ],
        },
        {
          path: "/register",
          element: (
            <Container sx={{ marginTop: 1 }}>
              <Register />
            </Container>
          ),
        },
        {
          path: "/login",
          element: (
            <Container sx={{ marginTop: 1 }}>
              <Login />
            </Container>
          ),
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
          path: "profile",
          element: <ProfileAdmin />,
        },
      ],
    },
    {
      path: "/admin/login",
      element: <LoginForm />,
    },
  ]);

  return element;
};

export default RoutesFeature;
