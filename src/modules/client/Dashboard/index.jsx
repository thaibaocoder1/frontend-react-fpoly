import ModalLogout from "@components/Modal/ModalLogout";
import { unwrapResult } from "@reduxjs/toolkit";
import toastObj from "@utils/Toast";
import PropTypes from "prop-types";
import { FaBorderAll, FaHeart } from "react-icons/fa";
import { IoIosHome, IoMdLogOut } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../../app/slice/AuthSlice";
import { useState } from "react";
import { clearCart } from "@app/slice/CartSlice";

const DashboardFeature = ({ filterShow }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const action = logout(userInfo._id);
      const resultAction = await dispatch(action);
      dispatch(clearCart());
      unwrapResult(resultAction);
      navigate("/login");
    } catch (error) {
      toastObj.error(error);
    }
  };
  return (
    <>
      <div className="py-5 flex md-lg:w-[90%] mx-auto relative">
        <div
          className={`rounded-md z-50 md-lg:absolute ${
            filterShow ? "-left-4" : "-left-[360px]"
          } w-[270px] ml-4 bg-white`}
        >
          <ul className="py-2 text-slate-600 px-4">
            <li className="flex justify-start items-center gap-2 py-2">
              <span className="text-xl">
                <IoIosHome />
              </span>
              <NavLink to="/dashboard" className="block">
                Dashboard
              </NavLink>
            </li>
            <li className="flex justify-start items-center gap-2 py-2">
              <span className="text-xl">
                <FaBorderAll />
              </span>
              <NavLink to="/dashboard/orders" className="block">
                My Orders
              </NavLink>
            </li>
            <li className="flex justify-start items-center gap-2 py-2">
              <span className="text-xl">
                <FaHeart />
              </span>
              <NavLink to="/dashboard/wishlist" className="block">
                Wishlist
              </NavLink>
            </li>
            <li className="flex justify-start items-center gap-2 py-2">
              <span className="text-xl">
                <RiLockPasswordLine />
              </span>
              <NavLink to="/dashboard/change" className="block">
                Change Password
              </NavLink>
            </li>
            <li className="flex justify-start items-center gap-2 py-2 cursor-pointer">
              <span className="text-xl">
                <IoMdLogOut />
              </span>
              <div onClick={() => setOpen(true)} className="block">
                Logout
              </div>
            </li>
          </ul>
        </div>

        <div className="w-[calc(100%-270px)] md-lg:w-full">
          <div className="mx-4 md-lg:mx-0">
            <Outlet />
          </div>
        </div>
      </div>
      <ModalLogout
        handleClose={() => setOpen(false)}
        onConfirm={() => handleLogout()}
        open={open}
      />
    </>
  );
};
DashboardFeature.propTypes = {
  filterShow: PropTypes.bool.isRequired,
};

export default DashboardFeature;
