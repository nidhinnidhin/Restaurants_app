import sequelize from "./database";

export const connectDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();

    console.log("PostgreSQL connected successfully");
  } catch (error) {
    console.error("PostgreSQL connection failed:");
    console.error(error);

    throw error;
  }
};