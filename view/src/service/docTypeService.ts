import type { DocType } from '../types';
import api from './api';

export const docTypes = () : Promise<DocType> => {
  return api.get('/doc-type').then(response => {
    const {response: result} = response.data;
    return result.map((docType: DocType) => ({id: docType.id, docType: docType.docType}));
  });
};