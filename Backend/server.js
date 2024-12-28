const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const quizRoutes = require('./routes/quizRoutes');
const studentRoutes = require('./routes/student');

dotenv.config();

const app = express();

app.use(cors({
    origin : 'http://localhost:8100',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.Mongo_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error: ', error));
    app.get('/api/test', (req, res) => {
        res.json({ message: "API is working!" });
    });

    
// Use the auth routes
app.use('/api/auth', authRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/student',studentRoutes);
app.use('/api/quizzes',quizRoutes);
app.use(cors({
    origin : 'http://localhost:8100',
    methods : ['GET' , 'POST'],
    allowedHeaders : ['Content-Type' , 'Authorization'],
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
