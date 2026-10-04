import { RestaurantPaginationDto } from "../../dto/restaurant/restaurant-pagination.dto";
import { RestaurantPaginationQueryDto } from "../../dto/restaurant/restaurant-pagination-query.dto";

export interface IGetRestaurantsUseCase {
  execute(
    query: RestaurantPaginationQueryDto,
  ): Promise<RestaurantPaginationDto>;
}
