import HeaderClient from "@components/Header/HeaderClient";
import ClientLayout from "@layout/ClientLayout";
import Register from "@modules/client/Auth/components/Register";
import { Container } from "@mui/material";
import Home from "@pages/client/Home";
import { useRoutes } from "react-router-dom";

const RoutesFeature = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <ClientLayout />,
      children: [
        {
          index: true,
          element: (
            <>
              <HeaderClient />
              <Home />
            </>
          ),
        },
        {
          path: "/register",
          element: (
            <Container sx={{ marginTop: 4 }}>
              <Register />
            </Container>
          ),
        },
      ],
    },
  ]);

  return element;
};

export default RoutesFeature;
