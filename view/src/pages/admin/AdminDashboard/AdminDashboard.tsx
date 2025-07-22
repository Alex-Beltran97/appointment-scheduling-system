import { Typography, Divider, Tabs, Tab, Box } from "@mui/material";

import styles from './AdminDashboard.module.css';
import { useState } from "react";

const AdminDashboard = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (<main className={styles.container}>
    <Typography variant="h4" component="h1" textAlign="center">Dashboard</Typography>
    <Divider className={styles.div} />
    <section className={styles.metrics}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Queso 1" />
        <Tab label="Queso 2" />
        <Tab label="Queso 3" />
      </Tabs>
      <Box sx={{padding: "1rem"}}>
        {value === 0 && <h2>Queso 1</h2>}
        {value === 1 && <h2>Queso 2</h2>}
        {value === 2 && <h2>Queso 3</h2>}
      </Box>
    </section>
  </main>);
};

export default AdminDashboard;