import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, Box, CircularProgress, Alert } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const HabitCalendar = () => {
    const { id } = useParams();
    const [completedDates, setCompletedDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/habits/${id}/calendar`)
            .then(response => {
                setCompletedDates(response.data.completedDates);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load calendar data');
                setLoading(false);
            });
    }, [id]);

    const tileStyle = ({ date }) => {
        const dateStr = date.toISOString().split('T')[0];
        if (completedDates.includes(dateStr)) {
            return {
                backgroundColor: '#4caf50', 
                color: 'white',
                borderRadius: '50%',
            };
        }
        return {};
    };

    const handleTileClick = (date) => {
        const dateStr = date.toISOString().split('T')[0];
        if (completedDates.includes(dateStr)) {
            
            alert(`Habit completed on: ${dateStr}`);
        }
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
                <Typography variant="h4">Habit Calendar</Typography>
                <Typography variant="body1" mt={2}>Track your habit completions on the calendar</Typography>

                <Box mt={4}>
                    <Calendar
                        onClickDay={handleTileClick}
                        tileContent={({ date }) => {
                            const dateStr = date.toISOString().split('T')[0];
                            return completedDates.includes(dateStr) ? <div style={{ color: 'white', textAlign: 'center' }}>✔</div> : null;
                        }}
                        tileClassName={tileStyle}
                    />
                </Box>
            </Paper>
        </Container>
    );
};

export default HabitCalendar;
