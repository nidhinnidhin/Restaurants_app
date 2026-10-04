import { IRestaurantRepository } from "../../../domain/interfaces/repositories/restaurant.repository.interface";
import { RestaurantPaginationDto } from "../../dto/restaurant/restaurant-pagination.dto";
import { RestaurantPaginationQueryDto } from "../../dto/restaurant/restaurant-pagination-query.dto";
import { IGetRestaurantsUseCase } from "../../interfaces/use-cases/get-restaurants.use-case.interface";
import { toRestaurantResponseDto } from "../../dto/restaurant/restaurant-response.dto";

export class GetRestaurantsUseCase implements IGetRestaurantsUseCase {
  constructor(private readonly _restaurantRepository: IRestaurantRepository) {}

  async execute(
    query: RestaurantPaginationQueryDto,
  ): Promise<RestaurantPaginationDto> {
    const { page, limit } = query;

    const result = await this._restaurantRepository.findAll({
      page,
      limit,
    });

    const totalPages = Math.ceil(result.totalItems / limit);

    return {
      restaurants: result.restaurants.map(toRestaurantResponseDto),

      pagination: {
        currentPage: page,
        pageSize: limit,
        totalItems: result.totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }
}
