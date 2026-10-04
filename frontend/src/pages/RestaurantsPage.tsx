import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Pagination,
  Paper,
  Snackbar,
  Stack,
  Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone";
import RestaurantMenuTwoToneIcon from "@mui/icons-material/RestaurantMenuTwoTone";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import RestaurantTable from "../components/restaurant/RestaurantTable";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import ConfirmDialog from "../components/common/ConfirmDialog";

import { deleteRestaurant, getRestaurants } from "../api/restaurant.api";

import type { Restaurant } from "../types/restaurant";

const PAGE_SIZE = 10;

const RestaurantsPage = () => {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchRestaurants = useCallback(
    async (pageToFetch = currentPage) => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await getRestaurants(pageToFetch, PAGE_SIZE);

        setRestaurants(result.restaurants);
        setTotalPages(result.pagination.totalPages);
        setTotalItems(result.pagination.totalItems);
      } catch (err) {
        console.error("Failed to fetch restaurants:", err);

        setError("Failed to load restaurants. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage],
  );

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const result = await getRestaurants(currentPage, PAGE_SIZE);

        if (isMounted) {
          setRestaurants(result.restaurants);
          setTotalPages(result.pagination.totalPages);
          setTotalItems(result.pagination.totalItems);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to fetch restaurants:", err);
          setError("Failed to load restaurants. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page);
  };

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
      setError(null);

      await deleteRestaurant(selectedRestaurant.id);

      setSuccessMessage(
        `"${selectedRestaurant.name}" was successfully removed from listings.`,
      );

      setIsDeleteDialogOpen(false);
      setSelectedRestaurant(null);

      await fetchRestaurants();

      if (restaurants.length === 1 && currentPage > 1) {
        setCurrentPage((previousPage) => previousPage - 1);
      }
    } catch (err) {
      console.error("Failed to delete restaurant:", err);

      setError("Failed to delete restaurant. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", pb: 8 }}>
      {/* Top Navbar Header */}
      <Navbar />

      {/* Hero Banner Section */}
      <Box
        sx={{
          position: "relative",
          background: `linear-gradient(180deg, rgba(15, 17, 21, 0.75) 0%, rgba(15, 17, 21, 0.98) 100%), url("/images/hero_bg.jpg") center/cover no-repeat`,
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          pt: { xs: 5, md: 7 },
          pb: { xs: 6, md: 8 },
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  color: "#FFFFFF",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  mb: 1.5,
                  fontSize: { xs: "2.2rem", md: "3rem" },
                }}
              >
                Culinary Venue Listings
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "#9CA3AF",
                  fontWeight: 400,
                  maxWidth: 620,
                  lineHeight: 1.6,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: { xs: "0.95rem", md: "1.1rem" },
                }}
              >
                Manage, edit, and curate your fine dining venue database with
                instantaneous updates and real-time contact management.
              </Typography>
            </Grid>

            <Grid
              size={{ xs: 12, md: 4 }}
              sx={{
                display: "flex",
                justifyContent: { xs: "flex-start", md: "flex-end" },
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => navigate("/restaurants/new")}
                sx={{
                  py: 1.6,
                  px: 3.5,
                  fontSize: "1rem",
                  boxShadow: "0 8px 24px rgba(217, 56, 30, 0.4)",
                }}
              >
                Add New Restaurant
              </Button>
            </Grid>
          </Grid>

          {/* Quick Metrics Bar */}
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid size={{ xs: 6, sm: 4, md: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "10px",
                    backgroundColor: "rgba(217, 56, 30, 0.15)",
                    color: "#D9381E",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <StorefrontTwoToneIcon />
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Total Venues
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: "#FFFFFF", fontWeight: 700, lineHeight: 1 }}
                  >
                    {totalItems}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid size={{ xs: 6, sm: 4, md: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "10px",
                    backgroundColor: "rgba(212, 172, 13, 0.15)",
                    color: "#D4AC0D",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <RestaurantMenuTwoToneIcon />
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Active Pages
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: "#FFFFFF", fontWeight: 700, lineHeight: 1 }}
                  >
                    {totalPages}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container maxWidth="lg">
        {/* Error Notification */}
        {!isLoading && error && (
          <Box sx={{ mb: 3 }}>
            <ErrorMessage message={error} />
          </Box>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <Box sx={{ py: 8 }}>
            <Loading />
          </Box>
        )}

        {/* Restaurant Table & Controls */}
        {!isLoading && !error && (
          <>
            <RestaurantTable
              restaurants={restaurants}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />

            {/* Pagination Controls */}
            {totalItems > 0 && (
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{
                  mt: 4,
                  pt: 2,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Showing page{" "}
                  <strong style={{ color: "#F3F4F6" }}>{currentPage}</strong> of{" "}
                  <strong style={{ color: "#F3F4F6" }}>
                    {totalPages || 1}
                  </strong>{" "}
                  — Total{" "}
                  <strong style={{ color: "#D4AC0D" }}>{totalItems}</strong>{" "}
                  {totalItems === 1
                    ? "restaurant listing"
                    : "restaurant listings"}
                </Typography>

                {totalPages > 1 && (
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    shape="rounded"
                    showFirstButton
                    showLastButton
                  />
                )}
              </Stack>
            )}
          </>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmDialog
          open={isDeleteDialogOpen}
          title="Delete Restaurant Listing"
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

        {/* Success Alert Snackbar */}
        <Snackbar
          open={Boolean(successMessage)}
          autoHideDuration={4000}
          onClose={() => setSuccessMessage(null)}
          message={successMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Container>
    </Box>
  );
};

export default RestaurantsPage;
