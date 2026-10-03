import { RestaurantController } from "../../presentation/controllers/restaurant.controller";

import { createRestaurantDependencies } from "./restaurant.container";

export const createRestaurantController =
  (): RestaurantController => {
    const { createRestaurantUseCase } =
      createRestaurantDependencies();

    return new RestaurantController(
      createRestaurantUseCase,
    );
  };