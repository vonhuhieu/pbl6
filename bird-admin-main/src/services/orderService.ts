
import axios from 'axios';

const API_BASE_URL = '/api/';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});



export const insertOrder = ( name: string, imageUrl: string) => {
  return apiClient.post(`order`, { name, imageUrl });
};
export const deleteOrder = (orderId: string) => {
  return apiClient.delete(`order/${orderId}`);
};

export const updateOrder = (orderId: string, name: string, image_url: string) => {
  return apiClient.patch(`order/${orderId}`, { name, image_url });
};

export const getOrder = () => {
  return apiClient.get('order');
};
