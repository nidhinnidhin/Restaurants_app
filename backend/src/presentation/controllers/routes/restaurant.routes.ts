import { Router } from "express";

import { createRestaurantController } from "../../../infrastructure/di/restaurant.dependencies";
import { validateBody } from "../../middlewares/validation.middleware";
import { createRestaurantSchema } from "../../validation/restaurant.validation";

const restaurantRouter = Router();

const restaurantController = createRestaurantController();

restaurantRouter.post(
  "/",
  validateBody(createRestaurantSchema),
  restaurantController.create,
);

export default restaurantRouter;
