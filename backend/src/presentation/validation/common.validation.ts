import { z } from "zod";

export const restaurantIdSchema = z.object({
  id: z.coerce
    .number()
    .int("Restaurant ID must be an integer")
    .positive("Restaurant ID must be positive"),
});
