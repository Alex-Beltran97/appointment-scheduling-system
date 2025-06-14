import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  return (<>
    return true ? <Outlet /> : <Navigate to="/login" replace />;
  </>);
};

export default ProtectedRoute;