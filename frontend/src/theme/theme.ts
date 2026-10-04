import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#D9381E", // Crimson / Fine Dining Red
      light: "#E74C3C",
      dark: "#962D22",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#D4AC0D", // Warm Amber Gold
      light: "#F4D03F",
      dark: "#B8860B",
      contrastText: "#0F1115",
    },
    background: {
      default: "#0F1115",
      paper: "#181B20",
    },
    text: {
      primary: "#F3F4F6",
      secondary: "#9CA3AF",
    },
    divider: "rgba(255, 255, 255, 0.1)",
    error: {
      main: "#EF4444",
    },
    success: {
      main: "#10B981",
    },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    h1: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 700,
    },
    h4: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h5: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.02em",
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#0F1115",
          color: "#F3F4F6",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#181B20",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.5)",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: "10px",
          padding: "10px 22px",
          transition: "all 0.2s ease-in-out",
          "&.MuiButton-containedPrimary": {
            background: "linear-gradient(135deg, #D9381E 0%, #B02710 100%)",
            boxShadow: "0 4px 14px 0 rgba(217, 56, 30, 0.35)",
            "&:hover": {
              background: "linear-gradient(135deg, #E74C3C 0%, #D9381E 100%)",
              boxShadow: "0 6px 20px 0 rgba(217, 56, 30, 0.5)",
              transform: "translateY(-1px)",
            },
          },
          "&.MuiButton-containedSecondary": {
            background: "linear-gradient(135deg, #D4AC0D 0%, #B8860B 100%)",
            color: "#0F1115",
            boxShadow: "0 4px 14px 0 rgba(212, 172, 13, 0.35)",
            "&:hover": {
              background: "linear-gradient(135deg, #F4D03F 0%, #D4AC0D 100%)",
              boxShadow: "0 6px 20px 0 rgba(212, 172, 13, 0.5)",
              transform: "translateY(-1px)",
            },
          },
          "&.MuiButton-outlinedPrimary": {
            borderColor: "rgba(217, 56, 30, 0.5)",
            "&:hover": {
              borderColor: "#D9381E",
              backgroundColor: "rgba(217, 56, 30, 0.08)",
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#14161B",
          color: "#D4AC0D",
          fontWeight: 700,
          textTransform: "uppercase",
          fontSize: "0.75rem",
          letterSpacing: "0.08em",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        },
        body: {
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          fontSize: "0.925rem",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            borderRadius: "10px",
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.12)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(212, 172, 13, 0.5)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#D4AC0D",
              boxShadow: "0 0 0 3px rgba(212, 172, 13, 0.15)",
            },
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          color: "#9CA3AF",
          "&.Mui-selected": {
            backgroundColor: "#D9381E",
            color: "#FFFFFF",
            fontWeight: 700,
            "&:hover": {
              backgroundColor: "#B02710",
            },
          },
        },
      },
    },
  },
});