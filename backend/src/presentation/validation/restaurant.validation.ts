import { z } from "zod";

const restaurantNameSchema = z
  .string()
  .trim()
  .min(3, "Restaurant name must contain at least 3 characters")
  .max(255, "Restaurant name cannot exceed 255 characters")
  .regex(/[A-Za-z]/, "Restaurant name must contain at least one letter")
  .regex(
    /^[A-Za-z0-9][A-Za-z0-9\s&.'-]*$/,
    "Restaurant name contains invalid characters",
  );

const restaurantAddressSchema = z
  .string()
  .trim()
  .min(5, "Address must contain at least 5 characters")
  .max(1000, "Address cannot exceed 1000 characters")
  .regex(/[A-Za-z]{2,}/, "Please enter a valid address");

const restaurantContactSchema = z
  .string()
  .trim()
  .regex(/^\d{10}$/, "Mobile number must contain exactly 10 digits");

export const createRestaurantSchema = z.object({
  name: restaurantNameSchema,

  address: restaurantAddressSchema,

  contact: restaurantContactSchema,
});

export const updateRestaurantSchema = z.object({
  name: restaurantNameSchema,

  address: restaurantAddressSchema,

  contact: restaurantContactSchema,
});

export type CreateRestaurantInput = z.infer<typeof createRestaurantSchema>;

export type UpdateRestaurantInput = z.infer<typeof updateRestaurantSchema>;
