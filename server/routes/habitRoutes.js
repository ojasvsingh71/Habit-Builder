const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');
// const authenticateToken = require('../middleware/authMiddleware');
const { markCompleted } = require('./habitdoneRoute.js');
// Apply auth middleware to all routes below
// router.use(authenticateToken);
const calculateProgress = require('../utils/calculateProgress');


router.get('/', async (req, res) => {
    try {
        const habits = await Habit.find();
        res.json(habits);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching habits' });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }
        res.json(habit);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching habit' });
    }
});


router.post('/addHabit', async (req, res) => {
    const { name, description, frequency, category } = req.body;
    const newHabit = new Habit({
        name,
        description,
        frequency,
        category
    });

    try {
        await newHabit.save();
        res.status(201).json(newHabit);
    } catch (err) {
        res.status(400).json({ message: 'Failed to create habit' });
    }
});

router.put('/habit/:habitId/completed', markCompleted);


router.put('/:id', async (req, res) => {
    try {
        const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }
        res.json(habit);
    } catch (err) {
        res.status(400).json({ message: 'Failed to update habit' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const habit = await Habit.findByIdAndDelete(req.params.id);
        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }
        res.json({ message: 'Habit deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Failed to delete habit' });
    }
});


router.put('/:id/completed', async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        const currentDate = new Date();
        let newStreak = habit.streak;
        let newLongestStreak = habit.longestStreak;

        
        const lastCompletedDate = habit.lastCompleted ? new Date(habit.lastCompleted) : null;
        const isNewDay = lastCompletedDate && (currentDate - lastCompletedDate) >= 86400000; 

        if (isNewDay || !habit.lastCompleted) {
            newStreak += 1;
            if (newStreak > newLongestStreak) {
                newLongestStreak = newStreak; 
            }
        } else {
            newStreak = habit.streak;
        }

        habit.streak = newStreak;
        habit.longestStreak = newLongestStreak;
        habit.lastCompleted = currentDate;

        
        let awardedBadges = [];

        
        if (newStreak === 7 && !habit.badges.includes('7 Day Streak')) {
            habit.badges.push('7 Day Streak');
            awardedBadges.push('7 Day Streak');
        }

        
        if (newStreak === 30 && !habit.badges.includes('30 Day Streak')) {
            habit.badges.push('30 Day Streak');
            awardedBadges.push('30 Day Streak');
        }

        
        if (newStreak === 100 && !habit.badges.includes('100 Day Streak')) {
            habit.badges.push('100 Day Streak');
            awardedBadges.push('100 Day Streak');
        }

        await habit.save();

        res.json({
            streak: newStreak,
            longestStreak: newLongestStreak,
            awardedBadges, 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to mark habit as completed' });
    }
});

router.get('/:id/progress', async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) return res.status(404).json({ message: 'Habit not found' });

        const progress = calculateProgress(habit);
        res.json({ progress });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});


router.get('/:id/calendar', async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }
        res.json({ completedDates: habit.completedDates });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
