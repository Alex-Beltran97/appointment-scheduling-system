import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './EmployeeAccordion.module.css';
import type { IEmployee } from '../ConsultantsTab';
import { useProfileStore } from '../../../../store/useProfileStore';
import { useCallback, useEffect, useState, type SetStateAction } from 'react';
import type { Profile } from '../../../../types/auth/Register';
import moment, {type Moment} from 'moment';
import { UserType } from '../../../../utils';
import { useLogin } from '../../../auth/Register/RegisterForm/hooks/useRegister';
import { useEmployeeStore } from '../../../../store/useEmployee';
import type { Employee } from '../../../../types/Shared/Service';

interface IProps {
  employee: IEmployee
}

const EmployeeAccordion = ({employee}: IProps) => {
  const [profileInfo, setprofileInfo] = useState<Profile>();

  const {getProfileByUserIds} = useProfileStore();

  const handleGetEmployeeInfo = useCallback(async () => {
    try {
      const {0: result} = await getProfileByUserIds({
        employeeCode: employee?.userEmployeeCode,
        docNum: employee?.userDocNum
      });
      setprofileInfo(result as unknown as SetStateAction<Profile | undefined>);
    } catch (error) {
      console.log('Error while fetching employee data: ', error);
    }
  }, [employee?.userDocNum, employee?.userEmployeeCode, getProfileByUserIds]);

  useEffect(() => {
    handleGetEmployeeInfo();
  }, [handleGetEmployeeInfo]);

  const { handleSubmit } = useLogin(UserType.independent);

  const {getEmployeeByDocNum} = useEmployeeStore();

  const handleSignUpEmployee = async (docNum: number) => {
    try {
      const [result] = await getEmployeeByDocNum(docNum) as unknown as [Employee];

      handleSubmit({
        userRole: '2',
        name: result?.name,
        lastName: result?.lastName,
        secondLastName: result?.secondLastName,
        birthDate: new Date(result.birthDate) as unknown as Moment,
        dialCountry: "+57",
        phone: result?.phone,
        countryCode: "COL",
        departmentCode: "BOG",
        cityCode: "0001",
        email: result?.email,
        docNum: result?.docNum,
        docType: result?.docType.id as unknown as string,
        nitCode: sessionStorage.getItem('nit-code'),
        username: result?.employeeCode,
        password: "User1234*",
        confirmPassword: "User1234*"
      } as Profile);
    } catch (error) {
      console.log('Error while creating employee user', error);
    };
  };

  return (<>
    <Accordion>
      <AccordionSummary
        id="employee-accordion-header"
        aria-controls="employee-accordion-content"
        expandIcon={<ExpandMoreIcon />}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography component="span">{employee.userName}</Typography>
          <Chip label={profileInfo ? "Activo" : "Inactivo"} color={profileInfo ? "primary" : "error"} />
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{paddingX: "1rem"}}>
        {profileInfo ? 
          <Box>
            <h4>Información personal:</h4>
            <ul className={styles.list__element}>
              <li>Codigo de empleado: {employee.userEmployeeCode}</li>
              <li>Tipo de documento: {profileInfo?.docType}</li>
              <li>Numero de documento: {employee.userDocNum}</li>
              <li>Fecha de nacimiento: {moment(profileInfo?.birthDate).format('LL')}</li>
              <li>Ciudad: {profileInfo?.cityCode}</li>
              <li>Correo Electronico: {profileInfo?.email}</li>
              <li>Numero telefonico: {profileInfo?.phone}</li>
            </ul>
          </Box>        
        : <Box>
          <Button
            variant='contained'
            onClick={() => handleSignUpEmployee(+employee.userDocNum)}
          >Dar de alta</Button>
        </Box>}        
      </AccordionDetails>
    </Accordion>
  </>);
};

export default EmployeeAccordion;