const router = require('express').Router();
const userService = require('../services/user-service');
const authService = require('../services/auth-service');

router.post('/login', async (req, res) => {
    try {
        const user = await userService.getByUsername(req.body.username);
        const isPasswordValid = authService.verifyPassword(user.password, req.body.password);

        if (isPasswordValid) {
            const token = authService.createJWT(user);
            const currentUserData = authService.getCurrentUserData(user, token);

            res.status(200).send(currentUserData);
        } else {
            res.status(401).send({
                error: 'You have entered an invalid email address / password combination.'
            })
        }
    } catch(error) {
        res.status(400).send({
            error: 'You have entered an invalid email address / password combination.'
        });
    }
});

router.post('/register', async (req, res) => {
    try {
        const user = await userService.create(req.body);
        const currentUserData = authService.getCurrentUserData(user, null);

        res.status(201).send(currentUserData);
    } catch (error) {
        res.status(400).send({
            error: error
        });
    }
});

module.exports = router;