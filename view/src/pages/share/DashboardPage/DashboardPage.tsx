import { useAuthStore } from "../../../store/useAuthStore";
import AdminDashboard from "../../admin/AdminDashboard/AdminDashboard";
import UserDashboardPage from "../../consultant/DashboardPage/DashboardPage";

const DashboardPage = () => {
  const role = useAuthStore(auth => auth?.role);

  return role === 'Administrador' ? <AdminDashboard /> : <UserDashboardPage />;
};

export default DashboardPage;