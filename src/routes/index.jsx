import ClientLayout from "@layout/ClientLayout";
import Login from "@modules/client/Auth/components/Login";
import Register from "@modules/client/Auth/components/Register";
import { Container } from "@mui/material";
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
        },
        {
          path: "/register",
          element: (
            <Container sx={{ marginTop: 4 }}>
              <Register />
            </Container>
          ),
        },
        {
          path: "/login",
          element: (
            <Container sx={{ marginTop: 4 }}>
              <Login />
            </Container>
          ),
        },
      ],
    },
  ]);

  return element;
};

export default RoutesFeature;
