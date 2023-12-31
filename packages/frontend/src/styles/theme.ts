import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#247fbc', // Primary color
      light: '#cdf0ff', // Lighter shade
      dark: '#14537d', // Darker shade
      contrastText: '#e6f7ff',
    },
    secondary: {
      main: '#FFC107', // Secondary color
      light: '#FFD54F', // Lighter shade
      dark: '#FFA000', // Darker shade
    },
    background: {
      default: '#F5F5F5', // Default background color
      paper: '#FFFFFF', // Background color for paper elements
    },
    text: {
      primary: "#273A50"
    },
    error: {
      main: '#D32F2F', // Error color
    },
    success: {
      main: '#43A047', // Success color
    },
    warning: {
      main: '#FF9800', // Warning color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.2rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.4,
    },
    button: {
      textTransform: 'none', // Prevent button text from being capitalized
    },
  },
  spacing: 8, // Set the base spacing unit (8px)
  breakpoints: {
    values: {
      xs: 0, // Extra small screens
      sm: 600, // Small screens
      md: 960, // Medium screens
      lg: 1280, // Large screens
      xl: 1920, // Extra-large screens
    },
  },
  shape: {
    borderRadius: 8, // Define a global border radius
  },
  zIndex: {
    appBar: 1200, // Z-index for the app bar
    drawer: 1100, // Z-index for the drawer
  },
});

export default theme;
