import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faCheckCircle, faFlagCheckered } from '@fortawesome/free-solid-svg-icons';

const AchievementBadge = ({ title, icon, count, description }) => {
    const renderIcon = (icon) => {
        switch (icon) {
            case 'trophy':
                return <FontAwesomeIcon icon={faTrophy} size="2x" color="#4caf50" />;
            case 'check-circle':
                return <FontAwesomeIcon icon={faCheckCircle} size="2x" color="#00b894" />;
            case 'flag':
                return <FontAwesomeIcon icon={faFlagCheckered} size="2x" color="#f39c12" />;
            default:
                return <FontAwesomeIcon icon={faTrophy} size="2x" color="#4caf50" />;
        }
    };

    return (
        <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2, boxShadow: 3, width: 150 }}>
            <Box sx={{ position: 'relative' }}>
                {renderIcon(icon)}
            </Box>
            <Typography variant="h6" mt={2}>
                {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" mt={1}>
                {description}
            </Typography>
        </Paper>
    );
};

export default AchievementBadge;
