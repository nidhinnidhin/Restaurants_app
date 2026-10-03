import { CreateRestaurantDto } from "../../dto/restaurant/create-restaurant.dto";
import { Restaurant } from "../../../domain/entities/restaurant.entity";

export interface ICreateRestaurantUseCase {
  execute(
    dto: CreateRestaurantDto,
  ): Promise<Restaurant>;
}