import NoPermission from "@pages/NoPermission";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, isAdmin } = useSelector((state) => state.auth);
  if (!user) return <Navigate to="/admin/login" replace />;
  if (user && !isAdmin) return <NoPermission />;
  return <>{children}</>;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProtectedRoute;
