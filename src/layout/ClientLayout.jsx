import FooterClient from "@components/Footer/FooterClient/FooterClient";
import HeaderClient from "@components/Header/HeaderClient";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <>
      <HeaderClient />
      <Outlet />
      <FooterClient />
    </>
  );
};

export default ClientLayout;
