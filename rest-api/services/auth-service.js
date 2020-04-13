const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class AuthService {

    createJWT(user) {
        const jwdUserData = {
            username: user.username,
            roles: user.roles
        };

        return jwt.sign(jwdUserData, process.env.ACCESS_TOKEN_SECRET);
    }

    verifyPassword(hashedPassword, password) {
        return bcrypt.compareSync(password, hashedPassword);
    }

    getCurrentUserData(user, token) {
        return {
            user: {
                id: user._id,
                username: user.username,
                preferredWorkingHoursPerDay: user.preferredWorkingHoursPerDay,
                roles: user.roles
            },
            jwt: token
        };
    }

}

module.exports = new AuthService();