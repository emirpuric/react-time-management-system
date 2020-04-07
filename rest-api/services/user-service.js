const User = require('../model/user');
const bcrypt = require('bcrypt');

class UserService {

    async create(user) {
        if (user.password !== user.passConfirm) {
            throw "Passwords Don't Match";
        }

        if (user.username && await this.usernameExists(user.username)) {
            throw "This choice of username has already been assigned"
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.password, salt);

        const userModel = new User({
            username: user.username,
            password: hashedPassword,
            preferredWorkingHoursPerDay: user.preferredWorkingHoursPerDay || 0,
            roles: user.roles || 1
        });

        return await userModel.save();
    }

    async update(user) {
        return "Radi";
    }

    async usernameExists(username) {
        return await User.exists({ username: username });
    }

    async getByUsername(username) {
        return await User.findOne({ username: username }).exec();
    }

}

module.exports = new UserService();