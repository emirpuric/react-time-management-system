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

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(cors());

app.use(express.json());

const API_PREFIX = '/api/v1';

app.use(API_PREFIX, authRoute);
app.use(API_PREFIX, userRoute);
app.use(API_PREFIX, taskRoute);


//TODO REMOVE
const Test = require('./model/test');

app.get('/', (req, res) => {
    Test.find({}, (error, tests) => {
        console.log(JSON.stringify(tests));
        res.status(200).send(tests);
    });
});

app.post('/', async (req, res) => {
    let test = new Test({
        name: req.body.name
    });
    try {
        await test.save();
        res.status(201).send(test);
    } catch(error) {
        res.status(400).send(error);
    }
});

//END TODO

app.listen(PORT, () => {
    console.log(`Time Management System API server running on port ${PORT}`)
});