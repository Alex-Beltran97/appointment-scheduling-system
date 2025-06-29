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
import NotificationManager from "./components/shared/NotificationManager/NotificationManager";
import PublicOnlyRoute from "./routes/PublicOnlyRoute";
import PrivateRoute from "./routes/PrivateRoute";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import CreateServicePage from "./pages/consultant/CreateServicePage/CreateServicePage";

const App = () => {
  const { checkSession } = useAuthStore();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (<>
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          {/* Public Routes */}
          {['/', '/home'].map((path) => (
            <Route key={path} path={path} element={<HomePage />} />
          ))}
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/suscribe-plan" element={<SuscribePlanPage />} />
          {/* Auth Routes */}
          <Route path="/login" element={<PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>} />
          <Route path="/register" element={
            <PublicOnlyRoute>
              <RegisterPage />
            </PublicOnlyRoute>
          } />
          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute>
            <DashboardPage />
          </PrivateRoute>} />
          <Route path="/create-service" element={<PrivateRoute>
            <CreateServicePage />
          </PrivateRoute>} />
          <Route path="/create-service/:id" element={<PrivateRoute>
            <CreateServicePage />
          </PrivateRoute>} />
          <Route path="/service-detail/:id" element={<PrivateRoute>
            <ServiceDetailPage />
          </PrivateRoute>} />
          <Route path="/my-services" element={<PrivateRoute>
            <DashboardPage />
          </PrivateRoute>} />
          <Route path="/my-schedules" element={<PrivateRoute>
            <MySchedulesPage />
          </PrivateRoute>} />
          <Route path="/my-schedule-detail/:id" element={<PrivateRoute>
            <ScheduleDetailPage />
          </PrivateRoute>} />
          <Route path="/search" element={<PublicOnlyRoute>
            <SearchPage />
          </PublicOnlyRoute>} />
          <Route path="/search-result" element={<PublicOnlyRoute>
            <SearchResultPage />
          </PublicOnlyRoute>} />
          <Route path="/scheduling" element={<PublicOnlyRoute>
            <SchedulingPage />
          </PublicOnlyRoute>} />
          <Route path="/customer-schedules" element={<PrivateRoute>
            <MyCustomerSchedules />
          </PrivateRoute>} />
          <Route path="/consultant-scheduling" element={<PrivateRoute>
            <SchedulingPage />
          </PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute>
            <ProfilePage />
          </PrivateRoute>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
      <NotificationManager />
    </div>
  </>)
};

export default App;