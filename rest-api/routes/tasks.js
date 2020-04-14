const router = require('express').Router();
const taskService = require('../services/task-service');
const userService = require('../services/user-service');
const verifyToken = require('../helper/auth-helper');

const hasAdminRole = (roles) => {
    return (roles & 4) > 0;
} 

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

router.get('/user/:userId/tasks', verifyToken, async (req, res) => {
    const userId = req.params.userId;
    
    if (userId != req.user.id && !hasAdminRole(req.user.roles)) {
        return res.status(401).send();
    }

    const user = await userService.getPreferredWorkingHoursPerDay(userId);
    const preferredWorkingHoursPerDay = user.preferredWorkingHoursPerDay
    const tasks = await taskService.getForUser(userId);
    res.status(200).send({
        preferredWorkingHoursPerDay,
        tasks
    });
});

module.exports = router;