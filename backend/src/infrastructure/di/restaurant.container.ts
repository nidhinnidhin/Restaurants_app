import { RestaurantRepository } from "../database/repositories/restaurant.repository";

import { CreateRestaurantUseCase } from "../../application/use-cases/restaurant/create-restaurant.use-case";
import { GetRestaurantsUseCase } from "../../application/use-cases/restaurant/get-restaurants.use-case";
import { GetRestaurantUseCase } from "../../application/use-cases/restaurant/get-restaurant.use-case";
import { UpdateRestaurantUseCase } from "../../application/use-cases/restaurant/update-restaurant.use-case";

import { ICreateRestaurantUseCase } from "../../application/interfaces/use-cases/create-restaurant.use-case.interface";
import { IGetRestaurantsUseCase } from "../../application/interfaces/use-cases/get-restaurants.use-case.interface";
import { IGetRestaurantUseCase } from "../../application/interfaces/use-cases/get-restaurant.use-case.interface";
import { IUpdateRestaurantUseCase } from "../../application/interfaces/use-cases/update-restaurant.use-case.interface";
import { DeleteRestaurantUseCase } from "../../application/use-cases/restaurant/delete-restaurant.use-case";
import { IDeleteRestaurantUseCase } from "../../application/interfaces/use-cases/delete-restaurant.use-case.interface";

export interface RestaurantDependencies {
  createRestaurantUseCase: ICreateRestaurantUseCase;
  getRestaurantsUseCase: IGetRestaurantsUseCase;
  getRestaurantUseCase: IGetRestaurantUseCase;
  updateRestaurantUseCase: IUpdateRestaurantUseCase;
  deleteRestaurantUseCase: IDeleteRestaurantUseCase;
}

export const createRestaurantDependencies = (): RestaurantDependencies => {
  const restaurantRepository = new RestaurantRepository();

  const createRestaurantUseCase = new CreateRestaurantUseCase(
    restaurantRepository,
  );

  const getRestaurantsUseCase = new GetRestaurantsUseCase(restaurantRepository);

  const getRestaurantUseCase = new GetRestaurantUseCase(restaurantRepository);

  const updateRestaurantUseCase = new UpdateRestaurantUseCase(
    restaurantRepository,
  );

  const deleteRestaurantUseCase = new DeleteRestaurantUseCase(
    restaurantRepository,
  );

  return {
    createRestaurantUseCase,
    getRestaurantsUseCase,
    getRestaurantUseCase,
    updateRestaurantUseCase,
    deleteRestaurantUseCase,
  };
};
