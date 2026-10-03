import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import sequelize from "../../../config/database";

export class RestaurantModel extends Model<
  InferAttributes<RestaurantModel>,
  InferCreationAttributes<RestaurantModel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare address: string;
  declare contact: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

RestaurantModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    contact: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "restaurants",
    timestamps: true,
  },
);