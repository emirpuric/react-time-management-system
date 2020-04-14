import express from 'express';
const cors = require('cors');
require('dotenv').config();

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const taskRoute = require('./routes/tasks');

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true,  useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const PORT = 5000;
const app = express();

app.use(cors());

app.use(express.json());

const API_PREFIX = '/api/v1';

app.use(API_PREFIX, authRoute);
app.use(API_PREFIX, userRoute);
app.use(API_PREFIX, taskRoute);

app.listen(PORT, () => {
    console.log(`Time Management System API server running on port ${PORT}`)
});