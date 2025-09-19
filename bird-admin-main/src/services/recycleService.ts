import axios from 'axios';

const API_BASE_URL = '/api/';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const getBirdDeleted = () => {
  return apiClient.get(`images/trash`);
};

export const restoreBirdDeleted = (id: string) => {
    return apiClient.patch(`images/restore/bird/${id}`);
  };