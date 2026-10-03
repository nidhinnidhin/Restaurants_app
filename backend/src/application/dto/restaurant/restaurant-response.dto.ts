import { Restaurant } from "../../../domain/entities/restaurant.entity";

export interface RestaurantResponseDto {
  id: number;
  name: string;
  address: string;
  contact: string;
  createdAt: Date;
  updatedAt: Date;
}

export const toRestaurantResponseDto = (
  restaurant: Restaurant,
): RestaurantResponseDto => {
  return {
    id: restaurant.id,
    name: restaurant.name,
    address: restaurant.address,
    contact: restaurant.contact,
    createdAt: restaurant.createdAt,
    updatedAt: restaurant.updatedAt,
  };
};