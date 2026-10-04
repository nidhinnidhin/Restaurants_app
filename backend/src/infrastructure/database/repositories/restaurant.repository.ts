import {
  CreateRestaurantData,
  IRestaurantRepository,
  PaginatedRestaurants,
  PaginationOptions,
  UpdateRestaurantData,
} from "../../../domain/interfaces/repositories/restaurant.repository.interface";

import { Restaurant } from "../../../domain/entities/restaurant.entity";

import { RestaurantModel } from "../models/restaurant.model";

export class RestaurantRepository implements IRestaurantRepository {
  async create(data: CreateRestaurantData): Promise<Restaurant> {
    const restaurant = await RestaurantModel.create(data);

    return this.toDomain(restaurant);
  }

  async findAll(options: PaginationOptions): Promise<PaginatedRestaurants> {
    const { page, limit } = options;

    const offset = (page - 1) * limit;

    const { rows, count } = await RestaurantModel.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return {
      restaurants: rows.map((restaurant) => this.toDomain(restaurant)),
      totalItems: count,
    };
  }

  async findById(id: number): Promise<Restaurant | null> {
    const restaurant = await RestaurantModel.findByPk(id);

    if (!restaurant) {
      return null;
    }

    return this.toDomain(restaurant);
  }

  async update(
    id: number,
    data: UpdateRestaurantData,
  ): Promise<Restaurant | null> {
    const restaurant = await RestaurantModel.findByPk(id);

    if (!restaurant) {
      return null;
    }

    await restaurant.update(data);

    return this.toDomain(restaurant);
  }

  async delete(id: number): Promise<boolean> {
    const deletedCount = await RestaurantModel.destroy({
      where: { id },
    });

    return deletedCount > 0;
  }

  private toDomain(restaurant: RestaurantModel): Restaurant {
    return new Restaurant({
      id: restaurant.id,
      name: restaurant.name,
      address: restaurant.address,
      contact: restaurant.contact,
      createdAt: restaurant.createdAt,
      updatedAt: restaurant.updatedAt,
    });
  }
}
