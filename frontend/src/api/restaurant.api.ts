import type { CreateRestaurantRequest, Restaurant, UpdateRestaurantRequest } from "../types/restaurant";
import apiClient from "./axios";


export const getRestaurants = async (): Promise<Restaurant[]> => {
  const response = await apiClient.get("/restaurants");

  return response.data.data;
};

export const getRestaurantById = async (id: number): Promise<Restaurant> => {
  const response = await apiClient.get(`/restaurants/${id}`);

  return response.data.data;
};

export const createRestaurant = async (
  data: CreateRestaurantRequest,
): Promise<Restaurant> => {
  const response = await apiClient.post("/restaurants", data);

  return response.data.data;
};

export const updateRestaurant = async (
  id: number,
  data: UpdateRestaurantRequest,
): Promise<Restaurant> => {
  const response = await apiClient.patch(`/restaurants/${id}`, data);

  return response.data.data;
};

export const deleteRestaurant = async (id: number): Promise<void> => {
  await apiClient.delete(`/restaurants/${id}`);
};
