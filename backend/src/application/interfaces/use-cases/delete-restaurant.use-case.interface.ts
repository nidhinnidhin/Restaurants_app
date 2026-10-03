export interface IDeleteRestaurantUseCase {
  execute(id: number): Promise<void>;
}
