import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import RestaurantTable from "../components/restaurant/RestaurantTable";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import ConfirmDialog from "../components/common/ConfirmDialog";

import {
  deleteRestaurant,
  getRestaurants,
} from "../api/restaurant.api";

import type { Restaurant } from "../types/restaurant";

const RestaurantsPage = () => {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);

  const fetchRestaurants = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getRestaurants();

      setRestaurants(data);
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);

      setError(
        "Failed to load restaurants. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/restaurants/${id}/edit`);
  };

  const handleDeleteClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    if (isDeleting) {
      return;
    }

    setIsDeleteDialogOpen(false);
    setSelectedRestaurant(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRestaurant) {
      return;
    }

    try {
      setIsDeleting(true);

      await deleteRestaurant(selectedRestaurant.id);

      setRestaurants((previous) =>
        previous.filter(
          (restaurant) =>
            restaurant.id !== selectedRestaurant.id,
        ),
      );

      setSuccessMessage(
        `${selectedRestaurant.name} was deleted successfully.`,
      );

      setIsDeleteDialogOpen(false);
      setSelectedRestaurant(null);
    } catch (error) {
      console.error("Failed to delete restaurant:", error);

      setError(
        "Failed to delete restaurant. Please try again.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 5 }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          spacing={2}
          mb={4}
        >
          <Box>
            <Typography variant="h4" gutterBottom>
              Restaurants
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
            >
              Manage your restaurant listings.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() =>
              navigate("/restaurants/new")
            }
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
            onDelete={handleDeleteClick}
          />
        )}

        <ConfirmDialog
          open={isDeleteDialogOpen}
          title="Delete Restaurant"
          message={
            selectedRestaurant
              ? `Are you sure you want to delete "${selectedRestaurant.name}"? This action cannot be undone.`
              : ""
          }
          confirmLabel="Delete Restaurant"
          isLoading={isDeleting}
          onConfirm={handleConfirmDelete}
          onClose={handleCloseDeleteDialog}
        />

        <Snackbar
          open={Boolean(successMessage)}
          autoHideDuration={3000}
          onClose={() => setSuccessMessage(null)}
          message={successMessage}
        />
      </Container>
    </Box>
  );
};

export default RestaurantsPage;