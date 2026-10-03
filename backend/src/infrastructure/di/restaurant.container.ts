import { RestaurantRepository } from "../database/repositories/restaurant.repository";

import { CreateRestaurantUseCase } from "../../application/use-cases/restaurant/create-restaurant.use-case";

import { ICreateRestaurantUseCase } from "../../application/interfaces/use-cases/create-restaurant.use-case.interface";

export const createRestaurantDependencies = (): {
  createRestaurantUseCase: ICreateRestaurantUseCase;
} => {
  const restaurantRepository = new RestaurantRepository();

  const createRestaurantUseCase = new CreateRestaurantUseCase(
    restaurantRepository,
  );

  return {
    createRestaurantUseCase,
  };
};
