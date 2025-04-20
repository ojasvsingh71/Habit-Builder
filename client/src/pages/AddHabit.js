import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddHabit = () => {
    const [habit, setHabit] = useState({
        name: '',
        description: '',
        frequency: 'daily',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setHabit({ ...habit, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        
        if (!habit.name || !habit.frequency) {
            setError('Name and Frequency are required!');
            setLoading(false);
            return;
        }

        axios.post('http://localhost:5000/habits/addHabit', habit)
            .then(response => {
                console.log('Habit added:', response.data);
                
                navigate('/');
            })
            .catch(err => {
                console.error('Failed to add habit', err);
                setError('Failed to add habit. Please try again later.');
                setLoading(false);
            });
    };

    return (
        <Container>
            <Box mt={3}>
                <Typography variant="h4">Add a New Habit</Typography>

                {error && <Alert severity="error">{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Habit Name"
                        name="name"
                        value={habit.name}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={habit.description}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Frequency"
                        name="frequency"
                        value={habit.frequency}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Habit'}
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default AddHabit;
