import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
    Container,
    Typography,
    Paper,
    Button,
    Alert,
    CircularProgress,
    LinearProgress,
    Box
} from '@mui/material';


import HabitCalendar from './HabitCalendar.js';

const HabitDetails = () => {
    const { id } = useParams();
    const [habit, setHabit] = useState(null);
    const [progress, setProgress] = useState(null);
    const [completionDates, setCompletionDates] = useState([]);  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchHabit = async () => {
            try {
                const [habitRes, progressRes, completionDatesRes] = await Promise.all([
                    axios.get(`http://localhost:5000/habits/${id}`),
                    axios.get(`http://localhost:5000/habits/${id}/progress`),
                    axios.get(`http://localhost:5000/habits/${id}/calendar`),  
                ]);
                setHabit(habitRes.data);
                setProgress(progressRes.data.progress);
                setCompletionDates(completionDatesRes.data.completedDates); 
                setLoading(false);
            } catch (err) {
                setError('Failed to load habit details or progress');
                setLoading(false);
            }
        };

        fetchHabit();
    }, [id]);

    const handleMarkCompleted = () => {
        axios.put(`http://localhost:5000/habits/${id}/completed`)
            .then(response => {
                
                setHabit(prev => ({
                    ...prev,
                    streak: response.data.streak,
                    longestStreak: response.data.longestStreak,
                }));

                // Update progress
                setProgress(response.data.progress);

                setSuccess('Habit marked as completed!');
                setTimeout(() => setSuccess(null), 2000); 
            })
            .catch(() => {
                setError('Failed to mark habit as completed');
                setTimeout(() => setError(null), 3000);
            });
    };

    if (loading) {
        return (
            <Container sx={{ textAlign: 'center', mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>;
    }

    return (
        <Container>
            <Paper sx={{ p: 3, boxShadow: 3, mt: 3 }}>
                <Typography variant="h4">{habit.name}</Typography>
                <Typography variant="body1" mt={2}>{habit.description}</Typography>
                <Typography variant="body2" color="textSecondary" mt={2}>
                    Frequency: {habit.frequency}
                </Typography>
                <Typography variant="body2" color="textSecondary" mt={1}>
                    Category: {habit.category}
                </Typography>

                <Typography variant="body2" color="primary" mt={2}>
                    🔥 Streak: {habit.streak || 0} | 💪 Longest Streak: {habit.longestStreak || 0}
                </Typography>

                {progress !== null && (
                    <Box mt={4}>
                        <Typography variant="h6" gutterBottom>📈 Progress</Typography>
                        <LinearProgress variant="determinate" value={progress * 100} />
                        <Typography mt={1}>{Math.round(progress * 100)}% completed</Typography>
                    </Box>
                )}

                <Button
                    variant="contained"
                    color="success"
                    sx={{ mt: 3 }}
                    onClick={handleMarkCompleted}
                >
                    Mark as Completed
                </Button>

                {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
                <Box mt={4}>
                    <HabitCalendar completionDates={completionDates} />
                </Box>
            </Paper>
        </Container>
    );
};

export default HabitDetails;
