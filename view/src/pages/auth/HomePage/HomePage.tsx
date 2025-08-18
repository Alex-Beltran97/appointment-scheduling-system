import { Box, Typography } from "@mui/material";

import styles from './HomePage.module.css';

const HomePage = () => {
  return (<main className={styles.container}>
    <Box>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Sobre nosotros
      </Typography>
      <Typography variant="body1" gutterBottom>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam delectus in praesentium perferendis, officia amet tempora quae quaerat nemo sit eligendi sint odio aut earum exercitationem quidem ipsa doloribus adipisci dolore totam? Quam doloribus, dolore laborum vel repudiandae eligendi quos tenetur et ab eius itaque culpa provident voluptatem voluptas neque officiis? Quo dicta, officiis repellat natus rem sint, inventore unde aspernatur labore deserunt consectetur nostrum veniam nisi hic sapiente aut, illum eius reprehenderit eum ipsam. Et, nemo architecto sed officiis delectus laboriosam facere quod nihil voluptatibus reiciendis earum voluptate corrupti natus rerum nisi quam vel mollitia soluta blanditiis obcaecati ex eligendi quae! Nihil harum suscipit cumque provident nesciunt nobis? Ipsa accusamus minus dicta, officiis nam atque vitae? Ab, quis quo!
      </Typography>
    </Box>
    <img loading="lazy" src="/img/home.svg" alt="people" />
  </main>);
};

export default HomePage;