import { useEffect, useState } from "react";
import { Alert, Box, Container, Paper, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import RestaurantForm from "../components/restaurant/RestaurantForm";
import { getRestaurantById, updateRestaurant } from "../api/restaurant.api";
import type { CreateRestaurantRequest, Restaurant } from "../types/restaurant";
import Loading from "../components/common/Loading";

const EditRestaurantPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (!id) {
        setError("Invalid restaurant ID.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const data = await getRestaurantById(Number(id));

        setRestaurant(data);
      } catch (error) {
        console.error("Failed to fetch restaurant:", error);

        setError("Failed to load restaurant. It may no longer exist.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  const handleSubmit = async (data: CreateRestaurantRequest) => {
    if (!id) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await updateRestaurant(Number(id), data);

      navigate("/");
    } catch (error) {
      console.error("Failed to update restaurant:", error);

      setError("Failed to update restaurant. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ minHeight: "100vh", py: 5 }}>
        <Container maxWidth="md">
          <Loading />
        </Container>
      </Box>
    );
  }

  if (!restaurant) {
    return (
      <Box sx={{ minHeight: "100vh", py: 5 }}>
        <Container maxWidth="md">
          <Alert severity="error">{error ?? "Restaurant not found."}</Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", py: 5 }}>
      <Container maxWidth="md">
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Edit Restaurant
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Update the restaurant information.
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
              initialValues={{
                name: restaurant.name,
                address: restaurant.address,
                contact: restaurant.contact,
              }}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitLabel="Update Restaurant"
            />
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};

export default EditRestaurantPage;
