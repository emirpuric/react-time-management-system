const router = require('express').Router();
const taskService = require('../services/task-service');

router.get('/task/:id', async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send();
    }

    const task = await taskService.get(id);

    if (task) {
        res.status(200).send({
            id: task._id,
            date: task.date,
            note: task.note,
            workingHours: task.workingHours,
            userId: task.userId
        });
    } else {
        res.status(404).send();
    }
});

router.post('/task', async (req, res) => {
    try {
        await taskService.create(req.body);
        res.status(200).send();
    } catch(error) {
        res.status(500).send();
    }
});

router.put('/task', async (req, res) => {
    try {
        await taskService.update(req.body);
        res.status(200).send();
    } catch(error) {
        res.status(500).send();
    }
});

router.delete('/task/:id', async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send();
    }

    try {
        await taskService.deleteTask(id);
        res.status(200).send();
    } catch(error) {
        res.status(500).send();
    }
});

router.get('/user/:userId/tasks', async (req, res) => {
    const userId = req.params.userId;
    const tasks = await taskService.getForUser(userId);
    res.status(200).send(tasks);
});

module.exports = router;