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

export interface RestaurantPagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface RestaurantListResponse {
  restaurants: Restaurant[];
  pagination: RestaurantPagination;
}