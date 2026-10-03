import { ApplicationError } from "../../../shared/errors/application.error";

import { IRestaurantRepository } from "../../../domain/interfaces/repositories/restaurant.repository.interface";

import {
  RestaurantResponseDto,
  toRestaurantResponseDto,
} from "../../dto/restaurant/restaurant-response.dto";

import { UpdateRestaurantDto } from "../../dto/restaurant/update-restaurant.dto";

import { IUpdateRestaurantUseCase } from "../../interfaces/use-cases/update-restaurant.use-case.interface";

export class UpdateRestaurantUseCase implements IUpdateRestaurantUseCase {
  constructor(private readonly _restaurantRepository: IRestaurantRepository) {}

  async execute(
    id: number,
    dto: UpdateRestaurantDto,
  ): Promise<RestaurantResponseDto> {
    const existingRestaurant = await this._restaurantRepository.findById(id);

    if (!existingRestaurant) {
      throw new ApplicationError(
        "Restaurant not found",
        404,
        "RESTAURANT_NOT_FOUND",
      );
    }

    const updatedRestaurant = await this._restaurantRepository.update(id, dto);

    if (!updatedRestaurant) {
      throw new ApplicationError(
        "Failed to update restaurant",
        500,
        "RESTAURANT_UPDATE_FAILED",
      );
    }

    return toRestaurantResponseDto(updatedRestaurant);
  }
}
