import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL; 

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${apiUrl}/auth/login`, form);
            alert('Login successful!');
            
            localStorage.setItem('token', res.data.token); 
            console.log(res.data);
            navigate('/');  
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            console.error('Login error:', err.response ? err.response.data : err);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 6 }}>
            <Typography variant="h4" gutterBottom align="center">
                Login
            </Typography>
            {error && <Typography color="error" variant="body2" align="center">{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    value={form.email}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    value={form.password}
                />
                <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
                    Login
                </Button>
            </form>
        </Box>
    );
};

export default Login;
