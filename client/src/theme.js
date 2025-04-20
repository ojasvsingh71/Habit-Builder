import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#6c5ce7', 
        },
        background: {
            default: '#f9f9f9',
        },
    },
    typography: {
        fontFamily: 'Segoe UI, sans-serif',
    },
});

export default theme;
