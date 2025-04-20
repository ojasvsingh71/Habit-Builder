import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box, Typography, Grid, Card, CardContent, CardActions, Button, Alert, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

const HabitList = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL; 
        axios.get(`${apiUrl}/habits`)
            .then(response => {
                setHabits(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to load habits');
                setLoading(false);
            });
    }, []);

    const handleDelete = (habitId) => {
        const apiUrl = process.env.REACT_APP_API_URL; 
        axios.delete(`${apiUrl}/habits/${habitId}`)
            .then(response => {
                setHabits(habits.filter(habit => habit._id !== habitId));
            })
            .catch(error => {
                setError('Failed to delete habit');
            });
    };

    const handleMarkCompleted = (habitId) => {
        const apiUrl = process.env.REACT_APP_API_URL; 
        axios.put(`${apiUrl}/habits/${habitId}/completed`)
            .then(response => {
                const updatedHabits = habits.map(habit =>
                    habit._id === habitId ? { ...habit, streak: response.data.streak, longestStreak: response.data.longestStreak } : habit
                );
                setHabits(updatedHabits);
            })
            .catch(error => {
                setError('Failed to mark habit as completed');
            });
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">Your Habits</Typography>
                <Button variant="contained" color="primary" component={Link} to="/habits/addHabit">Add New Habit</Button>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <Grid container spacing={3}>
                {habits.map(habit => (
                    <Grid item xs={12} sm={6} md={4} key={habit._id}>
                        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="h6">{habit.name}</Typography>
                                <Typography variant="body2">{habit.description}</Typography>
                                <Typography variant="body2" color="textSecondary" mt={1}>
                                    Frequency: {habit.frequency}
                                </Typography>
                                <Typography variant="body2" color="primary" mt={1}>
                                    Streak: {habit.streak} days 🔥
                                </Typography>
                                <Typography variant="body2" color="textSecondary" mt={1}>
                                    Longest Streak: {habit.longestStreak} days
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" component={Link} to={`/habits/${habit._id}`}>View Details</Button>
                                <Button size="small" color="primary" onClick={() => handleMarkCompleted(habit._id)}>
                                    Mark Completed
                                </Button>
                                <Button size="small" color="secondary" onClick={() => handleDelete(habit._id)}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HabitList;