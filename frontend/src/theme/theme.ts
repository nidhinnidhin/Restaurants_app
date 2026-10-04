import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#1976d2",
    },

    background: {
      default: "#f5f7fa",
      paper: "#ffffff",
    },
  },

  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },

    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
  },
});