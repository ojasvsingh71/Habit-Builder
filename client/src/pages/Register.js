import React, { useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL; 

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', username: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            await axios.post(`${apiUrl}/auth/register`, formData);
            alert('Registered successfully!');
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration error');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 6 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Create Account
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        required
                        value={formData.username}
                        onChange={(e) =>
                            setFormData({ ...formData, username: e.target.value })
                        }
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        required
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        required
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                        sx={{ mb: 3 }}
                    />
                    <Button variant="contained" fullWidth type="submit">
                        Register
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;
