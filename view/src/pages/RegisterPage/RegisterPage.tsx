import { Divider, Typography } from "@mui/material";
import RegisterForm from "../../components/auth/Register/RegisterForm/RegisterForm";

const RegisterPage = () => {
  return (<>
    <Typography variant="h4" component="h1" textAlign="center" paddingY={2}>
      Pagina de registro
    </Typography>
    <Divider />
    <RegisterForm />
  </>);
};

export default RegisterPage;