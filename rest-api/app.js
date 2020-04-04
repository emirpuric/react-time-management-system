import express from 'express';

require('dotenv').config();

const PORT = 5000;
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true,  useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(PORT, () => {
    console.log(`Time Management System API server running on port ${PORT}`)
});

app.use(express.json());

//TODO REMOVE
const Test = require("./model/test");

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