import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#3D5CFF",
      light: "#E3F2FD",
    },
    success: {
      main: "#4CAF50",
      light: "#E8F5E9",
    },
    warning: {
      main: "#FF7043",
      light: "#FFEBEE",
    },
    error: {
      main: "#FF5252",
      light: "#FFEBEE",
    },
    text: {
      primary: "#0C143B",
      secondary: "#0C143B99",
    },
  },
  components: {
    MuiButton: {
      defaultProps: { variant: "contained" },
      styleOverrides: {
        root: {
          padding: "8px 20px",
          textTransform: "none",
          borderRadius: "8px",
          fontWeight: "600",
        },
      },
    },
    MuiTypography: {
      defaultProps: { color: "text.primary" },
    },
  },
  typography: {
    fontFamily: ["Nunito", "sans-serif"].join(","),
    button: {
      textTransform: "capitalize",
    },
  },
});

export default theme;
