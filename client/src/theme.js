import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#A8D5BA', // Pastel green
    },
    secondary: {
      main: '#FFD3B6', // Pastel orange
    },
    background: {
      default: '#FFFCF2', // Light pastel background
    },
    text: {
      primary: '#333', // Darker text for contrast
    },
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#333',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#333',
    },
    h3: {
      fontSize: '1.2rem',
      color: '#333',
    },
    body1: {
      color: '#333',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '16px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;

