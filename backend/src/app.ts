import express from "express";
import cors from "cors";

import restaurantRouter from "./presentation/controllers/routes/restaurant.routes";
import { errorMiddleware } from "./presentation/middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Restaurant Listing API is running",
  });
});

app.use("/api/restaurants", restaurantRouter);

app.use(errorMiddleware);

export default app;