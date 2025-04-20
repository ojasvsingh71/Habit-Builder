import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="100vh">
            <Typography variant="h3" color="error">404 - Page Not Found</Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>Go to Home</Button>
        </Box>
    );
};

export default NotFound;
