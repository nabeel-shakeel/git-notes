import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#003B44',
    },
    secondary: {
      main: '#3D3D3D',
    },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    h5: {
      fontSize: '25px',
      fontWeight: 400,
      lineHeight: '30px',
      color: '#3D3D3D',
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '17px',
    },
    caption: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: '15px',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: '#3D3D3D',
          fontSize: '14px',
          fontWeight: 400,
          '& .MuiOutlinedInput-input': {
            fontSize: '14px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
