import Header from "./layout/Header/Header";
// import Main from "./layout/Main/Main";
import Footer from "./layout/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
// import ProtectedRoute from "./routes/ProtectedRoute";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

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
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </>)
};

export default App;