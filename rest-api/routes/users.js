const router = require('express').Router();
const userService = require('../services/user-service');

router.get('/user/:id', async (req, res) => {
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
    }
});

router.put('/user', async (req, res) => {
    try {
        await userService.update(req.body);
        res.status(200).send();
    } catch(error) {
        res.status(400).send({
            error: 'User did not updated, please try again.'
        });
    }
});

router.delete('/user/:id', (req, res) => {

});

router.get('/users/', async (req, res) => {
    const users = await userService.getAll();
    res.status(200).send(users);
});

module.exports = router;