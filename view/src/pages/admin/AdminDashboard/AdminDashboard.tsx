import { Typography, Divider, Tabs, Tab, Box } from "@mui/material";

import styles from './AdminDashboard.module.css';
import { useState } from "react";
import SchedulesTab from "../../../components/admin/SchedulesTab/SchedulesTab";
import ServicesTab from "../../../components/admin/ServicesTab/ServicesTab";
// import ConsultantsTab from "../../../components/admin/ConsultantsTab/ConsultantsTab";

const AdminDashboard = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log('event', event);
    setValue(newValue);
  };

  return (<main className={styles.container}>
    <Typography variant="h4" component="h1" textAlign="center">Dashboard</Typography>
    <Divider className={styles.div} />
    <section className={styles.metrics}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Agendas" />
        <Tab label="Servicios" />
        {/* <Tab label="Consultores" /> */}
      </Tabs>
      <Box sx={{padding: "1rem"}}>
        {value === 0 && <SchedulesTab />}
        {value === 1 && <ServicesTab />}
        {/* {value === 2 && <ConsultantsTab />} */}
      </Box>
    </section>
  </main>);
};

export default AdminDashboard;