import { ApplicationError } from "../../../shared/errors/application.error";

import { IRestaurantRepository } from "../../../domain/interfaces/repositories/restaurant.repository.interface";

import {
  RestaurantResponseDto,
  toRestaurantResponseDto,
} from "../../dto/restaurant/restaurant-response.dto";

import { IGetRestaurantUseCase } from "../../interfaces/use-cases/get-restaurant.use-case.interface";

export class GetRestaurantUseCase implements IGetRestaurantUseCase {
  constructor(private readonly _restaurantRepository: IRestaurantRepository) {}

  async execute(id: number): Promise<RestaurantResponseDto> {
    const restaurant = await this._restaurantRepository.findById(id);

    if (!restaurant) {
      throw new ApplicationError(
        "Restaurant not found",
        404,
        "RESTAURANT_NOT_FOUND",
      );
    }

    return toRestaurantResponseDto(restaurant);
  }
}
