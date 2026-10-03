import { RestaurantRepository } from "../database/repositories/restaurant.repository";

import { CreateRestaurantUseCase } from "../../application/use-cases/restaurant/create-restaurant.use-case";

import { GetRestaurantsUseCase } from "../../application/use-cases/restaurant/get-restaurants.use-case";

import { ICreateRestaurantUseCase } from "../../application/interfaces/use-cases/create-restaurant.use-case.interface";

import { IGetRestaurantsUseCase } from "../../application/interfaces/use-cases/get-restaurants.use-case.interface";

export interface RestaurantDependencies {
  createRestaurantUseCase: ICreateRestaurantUseCase;
  getRestaurantsUseCase: IGetRestaurantsUseCase;
}

export const createRestaurantDependencies = (): RestaurantDependencies => {
  const restaurantRepository = new RestaurantRepository();

  const createRestaurantUseCase = new CreateRestaurantUseCase(
    restaurantRepository,
  );

  const getRestaurantsUseCase = new GetRestaurantsUseCase(restaurantRepository);

  return {
    createRestaurantUseCase,
    getRestaurantsUseCase,
  };
};
