import { Typography } from "@mui/material";
import LoginForm from "../../components/auth/Login/LoginForm/LoginForm";

import styles from './LoginPage.module.css';

const LoginPage = () => {
  return (<main className={styles.login_container}>
    <Typography variant="h4" component="h1" gutterBottom>
      Inicio de Sesión
    </Typography>
    <LoginForm />
  </main>);
};

export default LoginPage;