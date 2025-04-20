const moment = require('moment');

function calculateProgress(habit) {
    const today = moment().startOf('day');
    const completed = habit.completedDates.map(date => moment(date).startOf('day'));
    const uniqueCompleted = Array.from(new Set(completed.map(date => date.format())));

    if (habit.frequency === 'daily') {
        return uniqueCompleted.includes(today.format()) ? 100 : 0;
    }

    if (habit.frequency === 'weekly') {
        const startOfWeek = today.clone().startOf('isoWeek');
        const endOfWeek = today.clone().endOf('isoWeek');
        const completedThisWeek = uniqueCompleted.filter(date =>
            moment(date).isBetween(startOfWeek, endOfWeek, null, '[]')
        );
        return Math.round((completedThisWeek.length / 7) * 100);
    }

    if (habit.frequency === 'monthly') {
        const startOfMonth = today.clone().startOf('month');
        const endOfMonth = today.clone().endOf('month');
        const daysInMonth = endOfMonth.date();
        const completedThisMonth = uniqueCompleted.filter(date =>
            moment(date).isBetween(startOfMonth, endOfMonth, null, '[]')
        );
        return Math.round((completedThisMonth.length / daysInMonth) * 100);
    }

    return 0;
}

module.exports = calculateProgress;
