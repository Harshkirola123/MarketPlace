import { createTheme } from "@mui/material/styles";
import { grey, blue, blueGrey } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#2196F3", // Blue
    },
    secondary: {
      main: "#FFC107", // Amber
    },
    background: {
      default: "#f5f5f5", // Light background
      paper: "#ffffff", // White paper background
    },
    text: {
      primary: "#212121", // Dark text
      secondary: "#757575", // Light secondary text
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif", // Modern font family
    h1: {
      fontWeight: 700,
      fontSize: "3rem", // Large font size for main headers
      color: "#212121",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.5rem", // Subheading styles
      color: "#2196F3",
    },
    h3: {
      fontWeight: 500,
      fontSize: "2rem",
      color: "#212121",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: "1.6",
      color: "#333",
    },
    body2: {
      fontSize: "0.875rem",
      color: "#757575",
    },
    button: {
      fontWeight: "bold", // Bold buttons
      textTransform: "uppercase", // Uppercase text for buttons
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px", // Rounded corners
          boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)", // Shadow effect
          padding: "8px 16px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "10px", // Smooth rounded edges
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Soft shadow
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "0px", // Rounded corners for papers
          padding: "16px", // Padding inside Paper components
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", // Subtle shadow for elevation
        },
      },
    },
  },
  spacing: 8, // Uniform spacing
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: blue[500],
    },
    secondary: {
      main: blueGrey[500],
    },
    background: {
      default: grey[50],
      paper: "#fff",
    },
    text: {
      primary: grey[900],
      secondary: grey[700],
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: blue[500],
    },
    secondary: {
      main: blueGrey[500],
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#fff",
      secondary: grey[400],
    },
  },
});

export default theme;
