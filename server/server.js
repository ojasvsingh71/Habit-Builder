const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const habitRoutes = require('./routes/habitRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();


app.use(express.json());  
app.use(cors());          

const quotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
  "It does not matter how slowly you go as long as you do not stop. - Confucius",
  "The best way to predict the future is to create it. - Abraham Lincoln",
  "What you get by achieving your goals is not as important as what you become by achieving your goals. - Zig Ziglar",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "Hardships often prepare ordinary people for an extraordinary destiny. - C.S. Lewis",
  "You are capable of amazing things. - Unknown",
  "Your limitation—it's only your imagination. - Unknown",
  "Push yourself, because no one else is going to do it for you. - Unknown",
  "Great things never come from comfort zones. - Unknown",
  "Dream it. Wish it. Do it. - Unknown",
  "Success doesn’t just find you. You have to go out and get it. - Unknown",
  "The harder you work for something, the greater you’ll feel when you achieve it. - Unknown",
  "Dream bigger. Do bigger. - Unknown",
  "Don’t stop when you’re tired. Stop when you’re done. - Unknown",
  "Wake up with determination. Go to bed with satisfaction. - Unknown",
  "Little things make big days. - Unknown"
];



app.use('/habits', habitRoutes);  
app.use('/auth', authRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


app.get('/api/quote', (req, res) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote: randomQuote });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('API is running 🚀');
});
