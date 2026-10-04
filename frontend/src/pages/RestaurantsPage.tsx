import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import RestaurantTable from "../components/restaurant/RestaurantTable";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import { getRestaurants } from "../api/restaurant.api";
import type { Restaurant } from "../types/restaurant";

const RestaurantsPage = () => {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurants = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getRestaurants();

      setRestaurants(data);
    } catch (err) {
      console.error("Failed to fetch restaurants:", err);

      setError("Failed to load restaurants. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (err) {
        console.error("Failed to fetch restaurants:", err);
        setError("Failed to load restaurants. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/restaurants/${id}/edit`);
  };

  const handleDelete = (restaurant: Restaurant) => {
    console.log("Delete:", restaurant);
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 5 }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="h4" gutterBottom>
              Restaurants
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Manage your restaurant listings.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/restaurants/new")}
          >
            Add Restaurant
          </Button>
        </Stack>

        {isLoading && <Loading />}

        {!isLoading && error && (
          <ErrorMessage message={error} />
        )}

        {!isLoading && !error && (
          <RestaurantTable
            restaurants={restaurants}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </Container>
    </Box>
  );
};

export default RestaurantsPage;