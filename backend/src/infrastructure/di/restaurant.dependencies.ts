import { RestaurantController } from "../../presentation/controllers/restaurant.controller";

import { createRestaurantDependencies } from "./restaurant.container";

export const createRestaurantController = (): RestaurantController => {
  const {
    createRestaurantUseCase,
    getRestaurantsUseCase,
    getRestaurantUseCase,
    updateRestaurantUseCase,
  } = createRestaurantDependencies();

  return new RestaurantController(
    createRestaurantUseCase,
    getRestaurantsUseCase,
    getRestaurantUseCase,
    updateRestaurantUseCase,
  );
};
