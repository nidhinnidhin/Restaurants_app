import { z } from "zod";

export const createRestaurantSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Restaurant name must contain at least 2 characters")
    .max(255, "Restaurant name cannot exceed 255 characters"),

  address: z
    .string()
    .trim()
    .min(5, "Address must contain at least 5 characters")
    .max(1000, "Address cannot exceed 1000 characters"),

  contact: z
    .string()
    .trim()
    .regex(
      /^[0-9+\-\s()]{7,20}$/,
      "Invalid contact number",
    ),
});

export type CreateRestaurantInput = z.infer<
  typeof createRestaurantSchema
>;