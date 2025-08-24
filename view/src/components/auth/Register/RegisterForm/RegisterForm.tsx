import BusinessIcon from '@mui/icons-material/Business';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { Box, Card, Typography } from '@mui/material';

import { useEffect, useState } from "react";

import styles from './RegisterForm.module.css';
import CompanyValidator from './CompanyValidator/CompanyValidator';
import RegisterFormComponent from './RegisterFormComponent/RegisterFormComponent';
import { UserType } from '../../../../utils';

const RegisterForm = () => {
  const [chooseSelected, setChooseSelected] = useState<boolean>(false);
  const [userType, setUserType] = useState<UserType>(UserType.company);

  const handleUserType = (type: UserType) => {
    setChooseSelected((userType: boolean) => !userType);
    setUserType(type);
  };

  useEffect(() => {
    return () => {
      setChooseSelected(false);
      setUserType(UserType.company);
    };
  }, []);  

  return (<>
    {!chooseSelected ?
      <Box className={styles.type__picker}>
        <Typography className={styles.picker__title} variant='h5' component="h2" textAlign='center'>
          Selecione el tipo de usuario con el que desea realizar el registro
        </Typography>
        <Card className={styles.picker__company} elevation={8} onClick={() => handleUserType(UserType.company)}>
          <BusinessIcon sx={{fontSize: "16rem"}} />
          <Typography variant='h6' component='h4' textAlign="center">Soy Empresa</Typography>
        </Card>
        <Card className={styles.picker__independent} elevation={8} onClick={() => handleUserType(UserType.independent)}>
          <EmojiPeopleIcon sx={{fontSize: "16rem"}} />
          <Typography variant='h6' component='h4' textAlign="center">Soy Independiente</Typography>
        </Card>
      </Box>
      :
      <Box className={styles.form__container}>
        {userType === UserType.company && <CompanyValidator />}
        {userType === UserType.independent && <RegisterFormComponent userType={UserType.independent} />}
      </Box>
    }
  </>);
};

export default RegisterForm;