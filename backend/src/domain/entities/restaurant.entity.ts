export interface RestaurantProps {
  id: number;
  name: string;
  address: string;
  contact: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Restaurant {
  private readonly _id: number;
  private _name: string;
  private _address: string;
  private _contact: string;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: RestaurantProps) {
    this._id = props.id;
    this._name = props.name;
    this._address = props.address;
    this._contact = props.contact;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): string {
    return this._address;
  }

  get contact(): string {
    return this._contact;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  updateDetails(
    name: string,
    address: string,
    contact: string,
  ): void {
    this._name = name;
    this._address = address;
    this._contact = contact;
    this._updatedAt = new Date();
  }
}