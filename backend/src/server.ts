import dotenv from "dotenv";
import path from "path";
import app from "./app";
import { connectDatabase } from "./config/database.connection";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = Number(process.env.PORT) || 5000;

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server");
    process.exit(1);
  }
};

startServer();