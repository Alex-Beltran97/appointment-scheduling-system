import { Divider, Stack, Typography } from "@mui/material";

import styles from './HomePage.module.css';

const HomePage = () => {
  return (<main className={styles.container}>
    <Stack gap={1}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        ¿Que es Date Fixer?
      </Typography>
      <Typography variant="body1" gutterBottom>
        Date Fixer es una plataforma web diseñada para facilitar el agendamiento de citas en línea entre empresas, consultores y clientes. Nuestro sistema centraliza toda la gestión de servicios especializados —como Derecho Empresarial, Negocios Internacionales, Softlanding y Sostenibilidad Empresarial— ofreciendo una experiencia ágil, segura y accesible desde cualquier dispositivo.
      </Typography>
      <Divider />
      <Typography variant="body1" gutterBottom>
        Con Date Fixer podrás:
      </Typography>
      <ul>
        <li>Agendar, reprogramar o cancelar citas en tiempo real.</li>
        <li>Visualizar disponibilidad de consultores y servicios de manera inmediata.</li>
        <li>Recibir notificaciones automáticas y recordatorios para evitar olvidos.</li>
        <li>Acceder a dashboards interactivos con métricas clave que optimizan la toma de decisiones.</li>
      </ul>
      <Divider />
      <Typography variant="body1" gutterBottom>
        Nuestra misión es ahorrar tiempo, reducir errores y mejorar la experiencia de los usuarios, brindando una herramienta moderna, intuitiva y adaptable a las necesidades de profesionales, empresas y organizaciones
      </Typography>
    </Stack>
    <img loading="lazy" src="/img/home.svg" alt="people" />
  </main>);
};

export default HomePage;