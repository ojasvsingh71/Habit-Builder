const Habit = require('../models/Habit');  

exports.markCompleted = async (req, res) => {
    try {
        const { habitId } = req.params;
        const habit = await Habit.findById(habitId);

        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        
        const today = new Date();
        const lastCompleted = habit.lastCompleted;

        
        if (lastCompleted) {
            const lastCompletedDate = new Date(lastCompleted);
            const diffInDays = (today - lastCompletedDate) / (1000 * 3600 * 24);

            if (diffInDays === 1) {
                
                habit.streak += 1;
            } else if (diffInDays > 1) {
                
                habit.streak = 1;  
            }
        } else {
            habit.streak = 1; 
        }

        
        if (habit.streak > habit.longestStreak) {
            habit.longestStreak = habit.streak;
        }

        
        habit.lastCompleted = today;

        await habit.save();

        res.status(200).json({
            message: 'Habit marked as completed',
            streak: habit.streak,
            longestStreak: habit.longestStreak,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
