import { Router } from "express";

import { createRestaurantController } from "../../../infrastructure/di/restaurant.dependencies";
import { validateBody } from "../../middlewares/validation.middleware";
import {
  createRestaurantSchema,
  updateRestaurantSchema,
} from "../../validation/restaurant.validation";
import { validateParams } from "../../middlewares/params-validation.middleware";
import { restaurantIdSchema } from "../../validation/common.validation";

const restaurantRouter = Router();

const restaurantController = createRestaurantController();

restaurantRouter.post(
  "/",
  validateBody(createRestaurantSchema),
  restaurantController.create,
);

restaurantRouter.get("/", restaurantController.getAll);

restaurantRouter.get(
  "/:id",
  validateParams(restaurantIdSchema),
  restaurantController.getById,
);

restaurantRouter.patch(
  "/:id",
  validateParams(restaurantIdSchema),
  validateBody(updateRestaurantSchema),
  restaurantController.update,
);

export default restaurantRouter;
