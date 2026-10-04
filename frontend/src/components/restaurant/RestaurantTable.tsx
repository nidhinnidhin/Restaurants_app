import {
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
  if (restaurants.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 6,
          textAlign: "center",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" gutterBottom>
          No restaurants found
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Add your first restaurant to get started.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Name</strong>
            </TableCell>

            <TableCell>
              <strong>Address</strong>
            </TableCell>

            <TableCell>
              <strong>Contact</strong>
            </TableCell>

            <TableCell align="right">
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {restaurants.map((restaurant) => (
            <TableRow
              key={restaurant.id}
              hover
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell>{restaurant.name}</TableCell>

              <TableCell>{restaurant.address}</TableCell>

              <TableCell>{restaurant.contact}</TableCell>

              <TableCell align="right">
                <Tooltip title="Edit restaurant">
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(restaurant.id)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete restaurant">
                  <IconButton
                    color="error"
                    onClick={() => onDelete(restaurant)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RestaurantTable;
