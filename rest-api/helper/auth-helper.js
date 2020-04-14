const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).send();
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send();
        }

        req.user = user;
        next();
    });
}

module.exports = verifyToken;