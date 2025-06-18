import { Divider, Typography } from "@mui/material";

import styles from './SearchPage.module.css';
import SearchForm from "../../../components/customer/Search/SearchForm/SearchForm";

const SearchPage = () => {
  return (<main className={styles.container}>
    <Typography variant="h4" component='h1' textAlign='center' gutterBottom>
      Tenemos más de 100 servicios esperando por ti. Busca el que te interese.
    </Typography>
    <Divider sx={{ marginBottom: '1rem' }} />
    <SearchForm />
  </main>);
};

export default SearchPage;