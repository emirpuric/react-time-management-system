import express from 'express';

const PORT = 5000;
const app = express();

app.listen(PORT, () => {
    console.log(`Time Management System API server running on port ${PORT}`)
});

app.get('/', (req, res) => {
    res.status(200).send({
        success: true,
        message: 'Hello World!'
    });
});