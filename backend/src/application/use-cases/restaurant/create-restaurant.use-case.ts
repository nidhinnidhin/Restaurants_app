import { Restaurant } from "../../../domain/entities/restaurant.entity";

import {
  CreateRestaurantData,
  IRestaurantRepository,
} from "../../../domain/interfaces/repositories/restaurant.repository.interface";

import { CreateRestaurantDto } from "../../dto/restaurant/create-restaurant.dto";

import { ICreateRestaurantUseCase } from "../../interfaces/use-cases/create-restaurant.use-case.interface";

export class CreateRestaurantUseCase implements ICreateRestaurantUseCase {
  constructor(private readonly _restaurantRepository: IRestaurantRepository) {}

  async execute(dto: CreateRestaurantDto): Promise<Restaurant> {
    const data: CreateRestaurantData = {
      name: dto.name,
      address: dto.address,
      contact: dto.contact,
    };

    return this._restaurantRepository.create(data);
  }
}
