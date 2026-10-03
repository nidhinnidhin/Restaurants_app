import { IRestaurantRepository } from "../../../domain/interfaces/repositories/restaurant.repository.interface";

import {
  RestaurantResponseDto,
  toRestaurantResponseDto,
} from "../../dto/restaurant/restaurant-response.dto";

import { IGetRestaurantsUseCase } from "../../interfaces/use-cases/get-restaurants.use-case.interface";

export class GetRestaurantsUseCase implements IGetRestaurantsUseCase {
  constructor(private readonly _restaurantRepository: IRestaurantRepository) {}

  async execute(): Promise<RestaurantResponseDto[]> {
    const restaurants = await this._restaurantRepository.findAll();

    return restaurants.map(toRestaurantResponseDto);
  }
}
