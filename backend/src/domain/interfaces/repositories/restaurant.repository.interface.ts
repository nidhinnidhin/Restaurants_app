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

export interface IRestaurantRepository {
  create(data: CreateRestaurantData): Promise<Restaurant>;

  findAll(): Promise<Restaurant[]>;

  findById(id: number): Promise<Restaurant | null>;

  update(
    id: number,
    data: UpdateRestaurantData,
  ): Promise<Restaurant | null>;

  delete(id: number): Promise<boolean>;
}