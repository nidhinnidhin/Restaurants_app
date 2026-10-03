import { RestaurantResponseDto } from "../../dto/restaurant/restaurant-response.dto";

export interface IGetRestaurantUseCase {
  execute(id: number): Promise<RestaurantResponseDto>;
}