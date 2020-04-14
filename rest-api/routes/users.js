const router = require('express').Router();
const userService = require('../services/user-service');
const verifyToken = require('../helper/auth-helper');

router.get('/user/:id', verifyToken, async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send();
    }

    const user = await userService.get(id);

    if (user) {
        res.status(200).send({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            preferredWorkingHoursPerDay: user.preferredWorkingHoursPerDay,
            roles: user.roles
        });
    } else {
        res.status(400).send();
    }
});

router.put('/user', verifyToken, async (req, res) => {
    try {
        await userService.update(req.body);
        res.status(200).send();
    } catch(error) {
        res.status(400).send({
            error: 'User did not updated, please try again.'
        });
    }
});

router.delete('/user/:id', verifyToken, async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send();
    }

    try {
        await userService.deleteUser(id);
        res.status(200).send();
    } catch(error) {
        res.status(500).send();
    }
});

router.get('/users/', verifyToken, async (req, res) => {
    const users = await userService.getAll();
    res.status(200).send(users);
});

module.exports = router;