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

        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(user.password, salt);

        const userModel = new User({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: hashedPassword,
            preferredWorkingHoursPerDay: user.preferredWorkingHoursPerDay || 0,
            roles: user.roles || 1
        });

        return await userModel.save();
    }

    async get(id) {
        return await User.findOne({ _id: id }).exec();
    }

    async getPreferredWorkingHoursPerDay(userId) {
        return await User.findOne({ _id: userId }, 'preferredWorkingHoursPerDay').exec();
    }

    async update(user) {
        if (user.password && user.password !== user.passConfirm) {
            throw "Passwords Don't Match";
        }

        if (user.username && user.username && await this.usernameExists(user.username)) {
            throw "This choice of username has already been assigned"
        }

        const userId = user.id;
        delete user.id;

        if (user.password) {
            const salt = bcrypt.genSaltSync();
            const hashedPassword = bcrypt.hashSync(user.password, salt);
            user.password = hashedPassword;
            delete user.passConfirm;
        }

        return await User.updateOne({_id: userId}, user, {upsert: true}).exec();
    }

    async usernameExists(username) {
        return await User.exists({ username: username });
    }

    async getByUsername(username) {
        return await User.findOne({ username: username }).exec();
    }

    async getAll() {
        return await User.find({}, 'firstName lastName username').exec();
    }

    async deleteUser(userId) {
        return await User.findOneAndDelete({_id: userId}).exec();
    }
}

module.exports = new UserService();