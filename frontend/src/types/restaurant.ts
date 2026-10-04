export interface Restaurant {
  id: number;
  name: string;
  address: string;
  contact: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRestaurantRequest {
  name: string;
  address: string;
  contact: string;
}

export interface UpdateRestaurantRequest {
  name?: string;
  address?: string;
  contact?: string;
}
