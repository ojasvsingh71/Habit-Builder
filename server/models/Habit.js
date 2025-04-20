const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly'],
        default: 'daily',
    },
    category: {
        type: String,
        default: 'general',
    },
    lastCompleted: {
        type: Date,
        default: null,
    },
    streak: {
        type: Number,
        default: 0,
    },
    longestStreak: {
        type: Number,
        default: 0,
    },
    completedDates: {
        type: [Date],
        default: [],
    },
    badges: {
        type: [String], 
        default: [] 
    }
      
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;
