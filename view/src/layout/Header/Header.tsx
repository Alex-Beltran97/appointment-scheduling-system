import AuthNavBar from "../../components/Header/AuthNavBar/AuthNavBar";
import ConsultantNavBar from "../../components/Header/ConsultantNavBar/ConsultantNavBar";
import { useAuthStore } from "../../store/useAuthStore";

const Header = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (<header>
    {isAuthenticated
      ? <ConsultantNavBar />
      : <AuthNavBar />
    }
  </header>)
};

export default Header;