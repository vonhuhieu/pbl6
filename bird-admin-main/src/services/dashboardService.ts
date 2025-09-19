
import axios from 'axios';

const API_BASE_URL = '/api/';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});


export const getOrderCount = () => {
  return apiClient.get('order/total-orders');
};

export const getFamilyCount = () => {
    return apiClient.get('family/total-families');
};

export const getSpecieCount = () => {
    return apiClient.get('bird-species/total-species');
};

export const getCountImages = () => {
  return apiClient.get('images/total-image-per-species');
};