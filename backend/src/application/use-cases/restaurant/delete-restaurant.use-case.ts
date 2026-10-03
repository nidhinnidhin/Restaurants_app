import { IRestaurantRepository } from "../../../domain/interfaces/repositories/restaurant.repository.interface";

import { ApplicationError } from "../../../shared/errors/application.error";

import { IDeleteRestaurantUseCase } from "../../interfaces/use-cases/delete-restaurant.use-case.interface";

export class DeleteRestaurantUseCase implements IDeleteRestaurantUseCase {
  constructor(private readonly restaurantRepository: IRestaurantRepository) {}

  async execute(id: number): Promise<void> {
    const restaurant = await this.restaurantRepository.findById(id);

    if (!restaurant) {
      throw new ApplicationError(
        "Restaurant not found",
        404,
        "RESTAURANT_NOT_FOUND",
      );
    }

    const deleted = await this.restaurantRepository.delete(id);

    if (!deleted) {
      throw new ApplicationError(
        "Failed to delete restaurant",
        500,
        "RESTAURANT_DELETE_FAILED",
      );
    }
  }
}
