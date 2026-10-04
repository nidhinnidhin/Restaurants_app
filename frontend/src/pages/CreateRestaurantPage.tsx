import { useState } from "react";
import { Alert, Box, Container, Grid, Paper, Stack, Typography, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Navbar from "../components/common/Navbar";
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
            Register New Restaurant
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
            Fill in the essential details below to list a new dining venue in your directory.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* Decorative Info Card Left Column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
                backgroundColor: "#181B20",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  height: 200,
                  background: `linear-gradient(180deg, rgba(15, 17, 21, 0.2) 0%, rgba(24, 27, 32, 0.95) 100%), url("/images/form_bg.jpg") center/cover no-repeat`,
                }}
              />
              <Box sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5, color: "#D4AC0D" }}>
                    <StorefrontTwoToneIcon />
                    <Typography variant="h6" sx={{ color: "#FFFFFF", fontSize: "1.1rem" }}>
                      Venue Guidelines
                    </Typography>
                  </Box>

                  <Stack spacing={2} sx={{ mt: 2 }}>
                    <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                      <CheckCircleTwoToneIcon sx={{ color: "#D9381E", fontSize: 20, mt: 0.2 }} />
                      <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
                        Ensure the official registered restaurant name is used for brand clarity.
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                      <CheckCircleTwoToneIcon sx={{ color: "#D9381E", fontSize: 20, mt: 0.2 }} />
                      <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
                        Provide complete address details including street name, building number, and landmark.
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                      <CheckCircleTwoToneIcon sx={{ color: "#D9381E", fontSize: 20, mt: 0.2 }} />
                      <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
                        Contact number must be a valid 10-digit mobile number for customer inquiries.
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Box
                  sx={{
                    mt: 4,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "rgba(212, 172, 13, 0.08)",
                    border: "1px solid rgba(212, 172, 13, 0.2)",
                  }}
                >
                  <Typography variant="caption" sx={{ color: "#D4AC0D", fontWeight: 600, display: "block" }}>
                    PRO TIP
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#D1D5DB" }}>
                    All added venues are immediately visible on your live listing table.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Restaurant Form Right Column */}
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
                Restaurant Details
              </Typography>

              <RestaurantForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                submitLabel="Add Restaurant Listing"
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CreateRestaurantPage;

