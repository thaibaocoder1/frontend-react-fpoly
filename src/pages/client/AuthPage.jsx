import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthPage = () => {
  const userLoggined = useSelector((state) => state.auth.user);
  if (userLoggined && userLoggined._id) return <Navigate replace to={"/"} />;
  return <Outlet />;
};

export default AuthPage;
