import { RestaurantResponseDto } from "../../dto/restaurant/restaurant-response.dto";

export interface IGetRestaurantsUseCase {
  execute(): Promise<RestaurantResponseDto[]>;
}