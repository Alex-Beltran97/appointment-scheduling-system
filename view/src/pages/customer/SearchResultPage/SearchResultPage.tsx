import { Divider, List, Typography } from "@mui/material";

import styles from './SearchResultPage.module.css';
import ResultComponent from "../../../components/customer/SearchResults/ResultComponent/ResultComponent";
import { useCallback, useEffect, useState, type SetStateAction } from "react";
import { useNotificationStore } from "../../../store/useNotificationStore";
import { useSearchStore } from "../../../store/useSearchStore";
import { useSearchParams } from "react-router-dom";
import type { Service } from "../../../types/Shared/Service";

type SearchResult = {
  message?: string;
  response?: Service[];
};

const SearchResultPage = () => {

  const {showNotification} = useNotificationStore();
  const {setSearchQuery} = useSearchStore();
  const [searchParams] = useSearchParams();

  const [resultMessage, setResultMessage] = useState('');
  const [services, setServices] = useState<Service[]>([]);

  const handleGetSearchResults = useCallback(async () => {
    try {
      const query = searchParams.get('q');
      if (!query) {
        showNotification('No se ha proporcionado una consulta de búsqueda', 'warning');
        return;
      }
      const result = await (setSearchQuery(query) as unknown) as SearchResult;
      setResultMessage(result?.message || `Resultados para: ${query}`);
      setServices(result?.response as SetStateAction<Service[]>);
    } catch (error) {
      console.error('Error fetching search results:', error);
      showNotification('Error al obtener los resultados de la búsqueda', 'error');
    }
  }, [searchParams, showNotification, setSearchQuery]);

  useEffect(() => {
    handleGetSearchResults();
  }, [handleGetSearchResults]);

  return (<main className={styles.container}>
    <Typography variant="h4" component="h1" gutterBottom>
      {resultMessage || 'Resultados de la búsqueda'}
    </Typography>
    <Divider sx={{ marginBottom: 2 }} />
    <List>
      {services && services.length > 0 && (
        services.map((service) => (
          <ResultComponent key={service.id} service={service} />
        ))
      )}
    </List>
  </main>);
};

export default SearchResultPage;