import React from 'react';
import Navbar from './Navbar';
import { Box } from '@mui/material';

const Layout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
