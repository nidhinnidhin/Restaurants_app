export class ApplicationError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    public readonly code: string,
  ) {
    super(message);

    this.name = "ApplicationError";

    Object.setPrototypeOf(
      this,
      new.target.prototype,
    );
  }
}