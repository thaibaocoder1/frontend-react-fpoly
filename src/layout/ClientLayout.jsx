import FooterClient from "@components/Footer/FooterClient/FooterClient";
import HeaderClient from "@components/Header/HeaderClient";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <HeaderClient />
      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className={`fixed right-5 bottom-5 w-10 h-10 rounded-full bg-[#059473] text-white p-3 shadow-lg hover:bg-[#059473]/90 transition-all duration-300 cursor-pointer ${
          showButton ? "opacity-100" : "opacity-0"
        }`}
      >
        <FaArrowUp />
      </button>
      <Outlet />
      <FooterClient />
    </>
  );
};

export default ClientLayout;
