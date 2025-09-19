
import axios from 'axios';

const API_BASE_URL = '/api/';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});



export const insertFamily = ( orderId: string, name: string) => {
  return apiClient.post(`family/${orderId}`, { name });
};
export const deleteFamily = (familyId: string) => {
  return apiClient.delete(`family/${familyId}`);
};

export const updateFamily = (familyId: string, orderId: string, name: string) => {
  return apiClient.patch(`family/${familyId}/orderid/${orderId}`, { name });
};

export const getFamily = (orderId: string) => {
  return apiClient.get(`family/list/${orderId}`);
};
 