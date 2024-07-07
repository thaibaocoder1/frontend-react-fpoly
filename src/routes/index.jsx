import AdminLayout from "@layout/AdminLayout";
import ClientLayout from "@layout/ClientLayout";
import ProductAddEdit from "@modules/admin/Product/components/ProductAddEdit";
import Login from "@modules/client/Auth/components/Login";
import Register from "@modules/client/Auth/components/Register";
import Index from "@modules/client/Dashboard/pages/Index";
import { Container } from "@mui/material";
import CategoryAdmin from "@pages/admin/Category";
import DashboardAdmin from "@pages/admin/Dashboard";
import ProductAdmin from "@pages/admin/Product";
import Cart from "@pages/client/Cart";
import Dashboard from "@pages/client/Dashboard";
import Home from "@pages/client/Home";
import Shop from "@pages/client/Shop";
import ShopDetail from "@pages/client/ShopDetail";
import { useRoutes } from "react-router-dom";

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
      element: <AdminLayout />,
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
      ],
    },
  ]);

  return element;
};

export default RoutesFeature;
