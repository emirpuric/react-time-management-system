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

    async verifyPassword(hashedPassword, password) {
        await bcrypt.compare(hashedPassword, password);
    }

    getCurrentUserData(user, token) {
        return {
            id: user._id,
            username: user.username,
            preferredWorkingHoursPerDay: user.preferredWorkingHoursPerDay,
            roles: user.roles,
            jwt: token
        };
    }

}

module.exports = new AuthService();