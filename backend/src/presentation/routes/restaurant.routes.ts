import { Router } from "express";

import {
  createRestaurantSchema,
} from "../validation/restaurant.validation";

import {
  validateBody,
} from "../middlewares/validation.middleware";

import {
  createRestaurantController,
} from "../../infrastructure/di/restaurant.dependencies";

const restaurantRouter = Router();

const restaurantController =
  createRestaurantController();

restaurantRouter.post(
  "/",
  validateBody(createRestaurantSchema),
  restaurantController.create,
);

export default restaurantRouter;