import Header from "./layout/Header/Header";
// import Main from "./layout/Main/Main";
import Footer from "./layout/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage/LoginPage";
// import ProtectedRoute from "./routes/ProtectedRoute";
import HomePage from "./pages/auth/HomePage/HomePage";
import RegisterPage from "./pages/auth/RegisterPage/RegisterPage";
import PageNotFound from "./pages/auth/PageNotFound/PageNotFound";
import PlansPage from "./pages/auth/PlansPage/PlansPage";
import SuscribePlanPage from "./pages/auth/SuscribePlanPage/SuscribePlanPage";
import DashboardPage from "./pages/consultant/DashboardPage/DashboardPage";
import ServiceDetailPage from "./pages/consultant/ServiceDetailPage/ServiceDetailPage";
import MySchedulesPage from "./pages/consultant/MySchedulesPage/MySchedulesPage";
import ScheduleDetailPage from "./pages/consultant/ScheduleDetailPage/ScheduleDetailPage";
import SearchPage from "./pages/customer/SearchPage/SearchPage";
import SearchResultPage from "./pages/customer/SearchResultPage/SearchResultPage";
import MyCustomerSchedules from "./pages/customer/MyCustomerSchedules/MyCustomerSchedules";
import SchedulingPage from "./pages/share/SchedulingPage/SchedulingPage";
import ProfilePage from "./pages/share/ProfilePage/ProfilePage";

const App = () => {
  return (<>
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          {['/', '/home'].map((path) => (
            <Route key={path} path={path} element={<HomePage />} />
          ))}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/suscribe-plan" element={<SuscribePlanPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/service-detail" element={<ServiceDetailPage />} />
          <Route path="/my-schedules" element={<MySchedulesPage />} />
          <Route path="/schedule-detail" element={<ScheduleDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search-result" element={<SearchResultPage />} />
          <Route path="/customer-schedules" element={<MyCustomerSchedules />} />
          <Route path="/scheduling" element={<SchedulingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </>)
};

export default App;