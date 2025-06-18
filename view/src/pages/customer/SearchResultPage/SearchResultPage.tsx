import { Divider, List, Typography } from "@mui/material";

import styles from './SearchResultPage.module.css';
import ResultComponent from "../../../components/customer/SearchResults/ResultComponent/ResultComponent";

const SearchResultPage = () => {
  return (<main className={styles.container}>
    <Typography variant="h4" component="h1" gutterBottom>
      Estos son los resultados para el servicio “Servicio de ejemplo #1 ”
    </Typography>
    <Divider sx={{ marginBottom: 2 }} />
    <List>
      <ResultComponent />
      <ResultComponent />
      <ResultComponent />
    </List>
  </main>);
};

export default SearchResultPage;