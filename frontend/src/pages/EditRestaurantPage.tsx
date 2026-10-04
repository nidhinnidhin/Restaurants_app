import { useEffect, useState } from "react";
import { Alert, Box, Container, Grid, Paper, Stack, Typography, Chip } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone";
import PhoneTwoToneIcon from "@mui/icons-material/PhoneTwoTone";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";

import Navbar from "../components/common/Navbar";
import RestaurantForm from "../components/restaurant/RestaurantForm";
import { getRestaurantById, updateRestaurant } from "../api/restaurant.api";
import type { CreateRestaurantRequest, Restaurant } from "../types/restaurant";
import Loading from "../components/common/Loading";

const EditRestaurantPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const error = !id ? "Invalid restaurant ID." : fetchError;

  useEffect(() => {
    if (!id) {
      return;
    }

    let isMounted = true;

    const fetchRestaurant = async () => {
      try {
        const data = await getRestaurantById(Number(id));

        if (isMounted) {
          setRestaurant(data);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to fetch restaurant:", err);
          setFetchError("Failed to load restaurant. It may no longer exist.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchRestaurant();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSubmit = async (data: CreateRestaurantRequest) => {
    if (!id) {
      return;
    }

    try {
      setIsSubmitting(true);
      setFetchError(null);

      await updateRestaurant(Number(id), data);

      navigate("/");
    } catch (error) {
      console.error("Failed to update restaurant:", error);

      setFetchError("Failed to update restaurant. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", pb: 8 }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ pt: 5 }}>
        {/* Back navigation header */}
        <Box sx={{ mb: 4 }}>
          <Chip
            icon={<ArrowBackIcon sx={{ color: "#D4AC0D !important", fontSize: 16 }} />}
            label="Back to Listings"
            onClick={() => navigate("/")}
            clickable
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              color: "#D1D5DB",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              mb: 2,
              "&:hover": {
                backgroundColor: "rgba(212, 172, 13, 0.15)",
                color: "#D4AC0D",
              },
            }}
          />

          <Typography variant="h4" component="h1" sx={{ color: "#FFFFFF", fontWeight: 700 }}>
            {restaurant ? `Edit ${restaurant.name}` : "Edit Restaurant"}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
            Update restaurant profile, location address, or contact telephone number.
          </Typography>
        </Box>

        {isLoading && (
          <Box sx={{ py: 10 }}>
            <Loading />
          </Box>
        )}

        {!isLoading && !restaurant && (
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            {error ?? "Restaurant not found."}
          </Alert>
        )}

        {!isLoading && restaurant && (
          <>
            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Grid container spacing={4}>
              {/* Current Listing Summary Card (Left) */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    overflow: "hidden",
                    backgroundColor: "#181B20",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      height: 180,
                      background: `linear-gradient(180deg, rgba(15, 17, 21, 0.2) 0%, rgba(24, 27, 32, 0.95) 100%), url("/images/form_bg.jpg") center/cover no-repeat`,
                      display: "flex",
                      alignItems: "flex-end",
                      p: 2.5,
                    }}
                  >
                    <Chip
                      icon={<EditTwoToneIcon sx={{ color: "#D4AC0D !important", fontSize: 16 }} />}
                      label={`Editing Venue #${restaurant.id}`}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(15, 17, 21, 0.8)",
                        backdropFilter: "blur(6px)",
                        color: "#D4AC0D",
                        border: "1px solid rgba(212, 172, 13, 0.3)",
                      }}
                    />
                  </Box>

                  <Box sx={{ p: 3, flex: 1 }}>
                    <Typography variant="overline" sx={{ color: "#D4AC0D", fontWeight: 700, letterSpacing: "0.1em" }}>
                      Current Info
                    </Typography>

                    <Typography variant="h6" sx={{ color: "#FFFFFF", fontWeight: 700, mt: 0.5, mb: 2 }}>
                      {restaurant.name}
                    </Typography>

                    <Stack spacing={2}>
                      <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                        <StorefrontTwoToneIcon sx={{ color: "#D4AC0D", fontSize: 20, mt: 0.2 }} />
                        <Typography variant="body2" sx={{ color: "#D1D5DB" }}>
                          ID Listing: #{restaurant.id}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                        <LocationOnTwoToneIcon sx={{ color: "#D4AC0D", fontSize: 20, mt: 0.2 }} />
                        <Typography variant="body2" sx={{ color: "#D1D5DB" }}>
                          {restaurant.address}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                        <PhoneTwoToneIcon sx={{ color: "#D9381E", fontSize: 20 }} />
                        <Typography variant="body2" sx={{ color: "#D1D5DB", fontFamily: "monospace", fontWeight: 600 }}>
                          {restaurant.contact}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Paper>
              </Grid>

              {/* Form Card (Right) */}
              <Grid size={{ xs: 12, md: 8 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, sm: 4 },
                    borderRadius: 3,
                    backgroundColor: "#181B20",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 12px 32px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#FFFFFF", mb: 3, pb: 1, borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
                    Update Information
                  </Typography>

                  <RestaurantForm
                    initialValues={{
                      name: restaurant.name,
                      address: restaurant.address,
                      contact: restaurant.contact,
                    }}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    submitLabel="Save Changes"
                  />
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
};

export default EditRestaurantPage;

