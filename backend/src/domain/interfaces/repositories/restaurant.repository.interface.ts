import { Restaurant } from "../../entities/restaurant.entity";

export interface CreateRestaurantData {
  name: string;
  address: string;
  contact: string;
}

export interface UpdateRestaurantData {
  name?: string;
  address?: string;
  contact?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginatedRestaurants {
  restaurants: Restaurant[];
  totalItems: number;
}

export interface IRestaurantRepository {
  create(data: CreateRestaurantData): Promise<Restaurant>;

  findAll(options: PaginationOptions): Promise<PaginatedRestaurants>;

  findById(id: number): Promise<Restaurant | null>;

  update(id: number, data: UpdateRestaurantData): Promise<Restaurant | null>;

  delete(id: number): Promise<boolean>;
}
