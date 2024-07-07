import PropTypes from "prop-types";
import { AiOutlineDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory, BiLogOutCircle } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { FaProductHunt } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/react.svg";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { pathname } = useLocation();
  const allNav = [
    {
      id: 1,
      title: "Dashboard",
      icon: <AiOutlineDashboard />,
      role: "admin",
      path: "/admin",
    },
    {
      id: 3,
      title: "Category",
      icon: <BiCategory />,
      role: "admin",
      path: "/admin/category",
    },
    {
      id: 5,
      title: "Products",
      icon: <FaProductHunt />,
      role: "admin",
      path: "/admin/product",
    },
    {
      id: 2,
      title: "Orders",
      icon: <AiOutlineShoppingCart />,
      role: "admin",
      path: "/admin/orders",
    },
    {
      id: 4,
      title: "Sellers",
      icon: <FaUsers />,
      role: "admin",
      path: "/admin/sellers",
    },
    {
      id: 6,
      title: "Profile",
      icon: <ImProfile />,
      role: "admin",
      path: "/admin/deactive-sellers",
    },
  ];

  return (
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

            <li>
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
  );
};
Sidebar.propTypes = {
  showSidebar: PropTypes.bool,
  setShowSidebar: PropTypes.func,
};

export default Sidebar;
