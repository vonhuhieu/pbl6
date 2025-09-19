
import axios from 'axios';

const API_BASE_URL = '/api/';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const getBirdImages = (speciesId: string) => {
  return apiClient.get(`images/bird/${speciesId}`);
};

export const importImages = () => {
  return apiClient.post('images/import');
};

export const insertImages = (speciesId: string, urls: string[]) => {
  return apiClient.post(`images/bird/${speciesId}`, { urls });
};
export const deleteImage = (birdId: string) => {
  return apiClient.delete(`images/bird/${birdId}`);
};

export const deleteMultiImage = (ids: string[]) => {
  return apiClient.patch('images/bird/delete-all', {
    ids
  });
};



export const updateBirdImage = (birdId: string, url: string) => {
  return apiClient.patch(`images/bird/${birdId}`, { url });
};

export const getBirdSpecies = (familyId: string) => {
  return apiClient.get(`bird-species/${familyId}`);
};

export const getBirdFamily = (orderId: string) => {
  return apiClient.get(`family/${orderId}`);
};

export const getBirdOrder = () => {
  return apiClient.get('order');
};
