import { RestaurantResponseDto } from "./restaurant-response.dto";

export interface RestaurantPaginationDto {
  restaurants: RestaurantResponseDto[];

  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
