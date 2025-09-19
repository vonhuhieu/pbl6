
import axios from 'axios';

const API_BASE_URL = '/api/';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});



export const insertSpecie = ( 
  familyId: string, 
  name: string, 
  lifespan: string, 
  size: string, 
  imageUrl: string, 
  description: string,
  color: string,
  weight: string,
  population: string,
  offspring: string,
  region: string,
) => {
  return apiClient.post(`bird-species/${familyId}`, 
    { 
      name,
      lifespan,
      size,
      imageUrl,
      description,
      color,
      weight,
      population,
      offspring,
      region
    }
  );
};
export const deleteSpecie = (familyId: string) => {
  return apiClient.delete(`bird-species/${familyId}`);
};

export const updateSpecie = (
  specieId: string, 
  name: string, 
  lifespan: string, 
  size: string, 
  imageUrl: string, 
  description: string,
  color: string,
  weight: string,
  population: string,
  offspring: string,
  region: string,
) => {
  return apiClient.patch(`bird-species/${specieId}`, 
    { 
      name,
      lifespan,
      size,
      imageUrl,
      description,
      color,
      weight,
      population,
      offspring,
      region
    });
};

export const getSpecie = (familyId: string) => {
  return apiClient.get(`bird-species/${familyId}`);
};

export const getSpecieDetails = (specieId: string) => {
  return apiClient.get(`bird-species/detail/${specieId}`);
}
 