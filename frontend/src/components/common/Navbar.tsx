import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AddIcon from "@mui/icons-material/Add";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAddPage = location.pathname === "/restaurants/new";

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "rgba(18, 19, 22, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        zIndex: 1100,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between", py: 1 }}>
          {/* Logo & Brand */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
              color: "inherit",
              "&:hover .brand-icon": {
                transform: "rotate(-10deg) scale(1.08)",
              },
            }}
          >
            <Box
              className="brand-icon"
              sx={{
                width: 42,
                height: 42,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #D9381E 0%, #D4AC0D 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(217, 56, 30, 0.3)",
                transition: "transform 0.3s ease",
              }}
            >
              <RestaurantIcon sx={{ color: "#FFFFFF", fontSize: 24 }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  lineHeight: 1.1,
                  background: "linear-gradient(90deg, #FFFFFF 60%, #D4AC0D 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Food Table
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#9CA3AF",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  display: "block",
                }}
              >
                Restaurant Directory
              </Typography>
            </Box>
          </Box>

          {/* Action Button & Nav Links */}
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>

            {!isAddPage && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => navigate("/restaurants/new")}
                sx={{
                  px: 2.5,
                  py: 1,
                  fontSize: "0.875rem",
                }}
              >
                Add Restaurant
              </Button>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
