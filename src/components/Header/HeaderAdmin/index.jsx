import { FaList } from "react-icons/fa";
import PropTypes from "prop-types";
import logo from "../../../assets/react.svg";
import { useSelector } from "react-redux";

const HeaderAdmin = ({ showSidebar, setShowSidebar }) => {
  const userInfo = useSelector((state) => state.auth.user);
  return (
    <div className="fixed top-0 left-0 w-full py-5 px-2 lg:px-7 z-40">
      <div
        className={`${
          showSidebar ? "ml-[260px]" : "ml-0"
        } rounded-md h-[65px] flex xl:justify-between gap-4 items-center bg-[#b1addf] px-5 transition-all duration-300`}
      >
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className={`w-[35px] flex h-[35px] rounded-sm bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 justify-center items-center cursor-pointer ${
            !showSidebar ? "text-black" : "text-white"
          }`}
        >
          <span>
            <FaList />
          </span>
        </div>

        <div className="block md:hidden">
          <input
            type="text"
            className="w-[400px] md-lg:w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Search..."
            name="search"
          />
        </div>

        <div className="flex justify-center items-center gap-8 relative ml-auto xl:ml-0 transition-all">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-3">
              <div className="flex justify-center items-center flex-col text-end">
                <h2 className="text-md font-bold">
                  Hello! {userInfo.username}
                </h2>
                <span className="text-[14px] w-full font-normal">
                  {userInfo.role}
                </span>
              </div>

              {userInfo ? (
                <img
                  className="w-[45px] h-[45px] rounded-full overflow-hidden"
                  src={logo}
                  alt={userInfo.username}
                />
              ) : (
                <img
                  className="w-[45px] h-[45px] rounded-full overflow-hidden"
                  src={logo}
                  alt="BSMART"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
HeaderAdmin.propTypes = {
  showSidebar: PropTypes.bool,
  setShowSidebar: PropTypes.func,
};

export default HeaderAdmin;
