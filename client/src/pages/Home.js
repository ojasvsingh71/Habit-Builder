import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, Grid, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AddTaskIcon from '@mui/icons-material/AddTask';
import axios from 'axios';
import AchievementBadge from '../components/AchievementBadge';
const apiUrl = process.env.REACT_APP_API_URL; 

const Home = () => {
    const [quote, setQuote] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [badges, setBadges] = useState([]); 

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/quotes`);
                setQuote(response.data.quote);
                setLoading(false);
            } catch (err) {
                setError('Failed to load motivational quote');
                setLoading(false);
            }
        };

        fetchQuote();
    }, []);

    useEffect(() => {
        const fetchBadges = async () => {
            try {
                
                const response = await axios.get(`${apiUrl}/api/badges`);
                setBadges(response.data); 
            } catch (err) {
                setError('Failed to load badges');
            }
        };

        fetchBadges();
    }, []);

    if (loading) {
        return (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Welcome to Habit Builder! 🎯
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" mb={3}>
                Track, build, and master your daily habits.
            </Typography>

            <Paper sx={{ p: 3, mb: 4, backgroundColor: '#f0f0f0' }}>
                <Typography variant="h6" color="secondary">✨ Motivational Quote</Typography>
                <Typography variant="body1" color="textSecondary">{quote}</Typography>
            </Paper>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Your Achievements 🏅
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    {badges.length > 0 ? (
                        badges.map((badge) => (
                            <Grid item key={badge.id}>
                                <AchievementBadge
                                    title={badge.title}
                                    icon={badge.icon}
                                    count={badge.count}
                                    description={badge.description}
                                />
                            </Grid>
                        ))
                    ) : (
                        <Typography>No achievements yet!</Typography>
                    )}
                </Grid>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Take Action 🚀
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 3, borderLeft: '6px solid #6c5ce7' }}>
                            <Typography variant="h6" gutterBottom>
                                Start a New Habit
                            </Typography>
                            <Typography variant="body2" mb={2}>
                                Create and commit to your next life-changing habit.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddTaskIcon />}
                                component={Link}
                                to="/habits/addHabit"
                            >
                                Add Habit
                            </Button>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 3, borderLeft: '6px solid #00b894' }}>
                            <Typography variant="h6" gutterBottom>
                                View Your Streaks
                            </Typography>
                            <Typography variant="body2" mb={2}>
                                Keep track of your progress and celebrate consistency.
                            </Typography>
                            <Button
                                variant="outlined"
                                color="success"
                                startIcon={<EmojiEventsIcon />}
                                component={Link}
                                to="/habits"
                            >
                                Track Habits
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Home;