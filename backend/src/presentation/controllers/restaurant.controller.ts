import { Request, Response, NextFunction } from "express";

import { ICreateRestaurantUseCase } from "../../application/interfaces/use-cases/create-restaurant.use-case.interface";

import { CreateRestaurantDto } from "../../application/dto/restaurant/create-restaurant.dto";

export class RestaurantController {
  constructor(
    private readonly _createRestaurantUseCase: ICreateRestaurantUseCase,
  ) {}

  create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const dto: CreateRestaurantDto = req.body;

      const restaurant = await this._createRestaurantUseCase.execute(dto);

      res.status(201).json({
        success: true,
        data: restaurant,
      });
    } catch (error) {
      next(error);
    }
  };
}
