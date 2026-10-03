import { UpdateRestaurantDto } from "../../dto/restaurant/update-restaurant.dto";
import { RestaurantResponseDto } from "../../dto/restaurant/restaurant-response.dto";

export interface IUpdateRestaurantUseCase {
  execute(id: number, dto: UpdateRestaurantDto): Promise<RestaurantResponseDto>;
}
