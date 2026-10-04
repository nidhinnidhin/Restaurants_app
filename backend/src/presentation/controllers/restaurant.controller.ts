import { Request, Response, NextFunction } from "express";

import { ICreateRestaurantUseCase } from "../../application/interfaces/use-cases/create-restaurant.use-case.interface";

import { IGetRestaurantsUseCase } from "../../application/interfaces/use-cases/get-restaurants.use-case.interface";

import { CreateRestaurantDto } from "../../application/dto/restaurant/create-restaurant.dto";
import { IGetRestaurantUseCase } from "../../application/interfaces/use-cases/get-restaurant.use-case.interface";
import { IUpdateRestaurantUseCase } from "../../application/interfaces/use-cases/update-restaurant.use-case.interface";
import { UpdateRestaurantDto } from "../../application/dto/restaurant/update-restaurant.dto";
import { IDeleteRestaurantUseCase } from "../../application/interfaces/use-cases/delete-restaurant.use-case.interface";

export class RestaurantController {
  constructor(
    private readonly createRestaurantUseCase: ICreateRestaurantUseCase,

    private readonly getRestaurantsUseCase: IGetRestaurantsUseCase,

    private readonly _getRestaurantUseCase: IGetRestaurantUseCase,

    private readonly _updateRestaurantUseCase: IUpdateRestaurantUseCase,

    private readonly deleteRestaurantUseCase: IDeleteRestaurantUseCase,
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

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = Math.max(1, Number(req.query.page) || 1);
      const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));

      const result = await this.getRestaurantsUseCase.execute({
        page,
        limit,
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);

      const restaurant = await this._getRestaurantUseCase.execute(id);

      res.status(200).json({
        success: true,
        data: restaurant,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);

      const dto: UpdateRestaurantDto = req.body;

      const restaurant = await this._updateRestaurantUseCase.execute(id, dto);

      res.status(200).json({
        success: true,
        data: restaurant,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);

      await this.deleteRestaurantUseCase.execute(id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
