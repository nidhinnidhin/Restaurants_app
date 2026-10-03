import { Request, Response, NextFunction } from "express";

import { ICreateRestaurantUseCase } from "../../application/interfaces/use-cases/create-restaurant.use-case.interface";

import { IGetRestaurantsUseCase } from "../../application/interfaces/use-cases/get-restaurants.use-case.interface";

import { CreateRestaurantDto } from "../../application/dto/restaurant/create-restaurant.dto";

export class RestaurantController {
  constructor(
    private readonly createRestaurantUseCase: ICreateRestaurantUseCase,

    private readonly getRestaurantsUseCase: IGetRestaurantsUseCase,
  ) {}

  create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const dto: CreateRestaurantDto = req.body;

      const restaurant = await this.createRestaurantUseCase.execute(dto);

      res.status(201).json({
        success: true,
        data: restaurant,
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const restaurants = await this.getRestaurantsUseCase.execute();

      res.status(200).json({
        success: true,
        data: restaurants,
      });
    } catch (error) {
      next(error);
    }
  };
}
