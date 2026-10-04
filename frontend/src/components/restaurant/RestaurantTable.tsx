import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import PhoneTwoToneIcon from "@mui/icons-material/PhoneTwoTone";
import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone";
import RestaurantTwoToneIcon from "@mui/icons-material/RestaurantTwoTone";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import type { Restaurant } from "../../types/restaurant";

interface RestaurantTableProps {
  restaurants: Restaurant[];
  onEdit: (id: number) => void;
  onDelete: (restaurant: Restaurant) => void;
}

const RestaurantTable = ({
  restaurants,
  onEdit,
  onDelete,
}: RestaurantTableProps) => {
  const navigate = useNavigate();

  if (restaurants.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 6,
          textAlign: "center",
          borderRadius: 3,
          backgroundColor: "#181B20",
          border: "1px dashed rgba(212, 172, 13, 0.3)",
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            backgroundColor: "rgba(217, 56, 30, 0.1)",
            color: "#D9381E",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          <RestaurantTwoToneIcon sx={{ fontSize: 36 }} />
        </Box>

        <Typography variant="h5" gutterBottom sx={{ color: "#F3F4F6" }}>
          No Restaurants Found
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ maxW: 400, mx: "auto", mb: 3 }}>
          Your restaurant directory is currently empty. Start building your listing by adding your first venue.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/restaurants/new")}
        >
          Add First Restaurant
        </Button>
      </Paper>
    );
  }

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: "#181B20",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.4)",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ py: 2, pl: 3 }}>
              Restaurant Name
            </TableCell>

            <TableCell sx={{ py: 2 }}>
              Location & Address
            </TableCell>

            <TableCell sx={{ py: 2 }}>
              Contact Number
            </TableCell>

            <TableCell align="right" sx={{ py: 2, pr: 3 }}>
              Management Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {restaurants.map((restaurant) => (
            <TableRow
              key={restaurant.id}
              sx={{
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                },
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              {/* Restaurant Name */}
              <TableCell sx={{ pl: 3, py: 2.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.75 }}>
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: "10px",
                      backgroundColor: "rgba(212, 172, 13, 0.12)",
                      border: "1px solid rgba(212, 172, 13, 0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#D4AC0D",
                      flexShrink: 0,
                    }}
                  >
                    <StorefrontTwoToneIcon fontSize="small" />
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: "#F3F4F6",
                        lineHeight: 1.2,
                      }}
                    >
                      {restaurant.name}
                    </Typography>
                    <Chip
                      label={`ID: #${restaurant.id}`}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: "0.65rem",
                        mt: 0.5,
                        backgroundColor: "rgba(255, 255, 255, 0.06)",
                        color: "#9CA3AF",
                      }}
                    />
                  </Box>
                </Box>
              </TableCell>

              {/* Address */}
              <TableCell sx={{ py: 2.5 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <LocationOnTwoToneIcon
                    fontSize="small"
                    sx={{ color: "#D4AC0D", mt: 0.2, flexShrink: 0 }}
                  />
                  <Typography variant="body2" sx={{ color: "#D1D5DB", lineHeight: 1.4 }}>
                    {restaurant.address}
                  </Typography>
                </Box>
              </TableCell>

              {/* Contact */}
              <TableCell sx={{ py: 2.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PhoneTwoToneIcon
                    fontSize="small"
                    sx={{ color: "#D9381E", flexShrink: 0 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#F3F4F6",
                      fontFamily: "monospace",
                      fontWeight: 600,
                      letterSpacing: "0.03em",
                    }}
                  >
                    {restaurant.contact}
                  </Typography>
                </Box>
              </TableCell>

              {/* Actions */}
              <TableCell align="right" sx={{ pr: 3, py: 2.5 }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                  <Tooltip title="Edit Details">
                    <IconButton
                      size="small"
                      onClick={() => onEdit(restaurant.id)}
                      sx={{
                        color: "#D4AC0D",
                        backgroundColor: "rgba(212, 172, 13, 0.08)",
                        border: "1px solid rgba(212, 172, 13, 0.2)",
                        "&:hover": {
                          backgroundColor: "rgba(212, 172, 13, 0.2)",
                        },
                      }}
                    >
                      <EditTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete Listing">
                    <IconButton
                      size="small"
                      onClick={() => onDelete(restaurant)}
                      sx={{
                        color: "#EF4444",
                        backgroundColor: "rgba(239, 68, 68, 0.08)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        "&:hover": {
                          backgroundColor: "rgba(239, 68, 68, 0.2)",
                        },
                      }}
                    >
                      <DeleteTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RestaurantTable;

