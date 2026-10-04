import { useState } from "react";
import { Alert, Box, Container, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import RestaurantForm from "../components/restaurant/RestaurantForm";
import { createRestaurant } from "../api/restaurant.api";
import type { CreateRestaurantRequest } from "../types/restaurant";

const CreateRestaurantPage = () => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CreateRestaurantRequest) => {
    try {
      setIsSubmitting(true);
      setError(null);

      await createRestaurant(data);

      navigate("/");
    } catch (error) {
      console.error("Failed to create restaurant:", error);

      setError("Failed to create restaurant. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 5 }}>
      <Container maxWidth="md">
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Add Restaurant
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Add a new restaurant to your listing.
            </Typography>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <RestaurantForm
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitLabel="Add Restaurant"
            />
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};

export default CreateRestaurantPage;
