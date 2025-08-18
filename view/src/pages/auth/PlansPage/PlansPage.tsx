import { Box, Card, Divider, Typography } from "@mui/material";

import styles from './PlansPage.module.css';
import PlansComponent from "../../../components/auth/Plans/PlansComponent";
import type { Plan } from "../../../types/auth/Plans";

const Plans: Plan[] = [
  {
    name: "Mensual",
    benefits: [
      { label: "GB de espacio virtual", value: "5GB" },
      { label: "Usuarios activos", value: "Hasta 3" },
      { label: "Clientes gestionables", value: "Hasta 50" },
      { label: "Gestion de citas", value: "Limitada" },
      { label: "Boton de WhatsApp", value: "No" },
      { label: "Precio", value: "$100.000" },
    ]
  },
  {
    name: "Anual",
    benefits: [
      { label: "GB de espacio virtual", value: "10GB" },
      { label: "Usuarios activos", value: "Hasta 10" },
      { label: "Clientes gestionables", value: "Ilimitados" },
      { label: "Gestion de citas", value: "Ilimitada" },
      { label: "Boton de WhatsApp", value: "Si" },
      { label: "Precio", value: "$1.000.000" },
    ]
  }
];

const PlansPage = () => {
  return (<main className={styles.plans__container}>
    <Typography variant="h5" component="h1" gutterBottom>
      Planes disponibles
    </Typography>
    <Divider />
    <Box className={styles.plan__container}>
      {Plans.map((Plan: Plan) => (
        <Card key={Plan.name} className={styles.benefit__container}>
          <PlansComponent  {...Plan} />
        </Card>
      ))}
    </Box>
  </main>);
};

export default PlansPage;