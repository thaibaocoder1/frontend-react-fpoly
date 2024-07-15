import PropTypes from "prop-types";
import { AiOutlineDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory, BiLogOutCircle } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { FaProductHunt } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/react.svg";
import { useState } from "react";
import ModalLogout from "@components/Modal/ModalLogout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@app/slice/AuthSlice";
import { RiCoupon2Line } from "react-icons/ri";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const userLoggined = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const allNav = [
    {
      id: 1,
      title: "Dashboard",
      icon: <AiOutlineDashboard />,
      role: "admin",
      path: "/admin",
    },
    {
      id: 2,
      title: "Category",
      icon: <BiCategory />,
      role: "admin",
      path: "/admin/category",
    },
    {
      id: 3,
      title: "Coupon",
      icon: <RiCoupon2Line />,
      role: "admin",
      path: "/admin/coupon",
    },
    {
      id: 4,
      title: "Products",
      icon: <FaProductHunt />,
      role: "admin",
      path: "/admin/product",
    },
    {
      id: 5,
      title: "Orders",
      icon: <AiOutlineShoppingCart />,
      role: "admin",
      path: "/admin/orders",
    },
    {
      id: 6,
      title: "Accounts",
      icon: <FaUsers />,
      role: "admin",
      path: "/admin/accounts",
    },
    {
      id: 7,
      title: "Profile",
      icon: <ImProfile />,
      role: "admin",
      path: "/admin/profile",
    },
  ];
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    dispatch(logout(userLoggined._id));
    navigate("/admin/login");
  };

  return (
    <>
      <aside>
        <div
          onClick={() => setShowSidebar(false)}
          className={`fixed duration-200 ${
            !showSidebar ? "invisible" : "visible"
          } w-screen h-screen top-0 left-0 z-10`}
        ></div>
        <div
          className={`w-[260px] fixed bg-[#e6e7fb] z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${
            showSidebar ? "left-0" : "-left-[260px]"
          }`}
        >
          <div className="h-[70px] flex justify-center items-center">
            <Link to="/" className="w-[180px] h-[50px]">
              <img className="w-full h-full" src={logo} alt="" />
            </Link>
          </div>

          <div className="px-[16px]">
            <ul>
              {allNav.map((n, i) => (
                <li key={i}>
                  <Link
                    to={n.path}
                    className={`${
                      pathname === n.path
                        ? "bg-blue-600 shadow-indigo-500/50 text-white duration-500"
                        : "text-[#030811] font-bold duration-200 "
                    } px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1 `}
                  >
                    <span>{n.icon}</span>
                    <span>{n.title}</span>
                  </Link>
                </li>
              ))}

              <li onClick={() => setOpen(true)}>
                <button className="text-[#030811] font-bold duration-200 px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1">
                  <span>
                    <BiLogOutCircle />
                  </span>
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <ModalLogout
        open={open}
        handleClose={() => setOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};
Sidebar.propTypes = {
  showSidebar: PropTypes.bool,
  setShowSidebar: PropTypes.func,
};

export default Sidebar;
