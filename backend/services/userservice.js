const usermodal = require('../modals/User');
const db = require('../helper/db');
const User = db.User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');

async function authenticate(username, password) {
    const user = await User.findOne({ username: username });
    console.log('user ', user)
    if (user && (user.hash === password)) {
        var privateKey = fs.readFileSync('./config/rsa.private');
        // const token = jwt.sign({ sub: user.id, name: username, audience: username, issuer: 'smc', jwtid: 'jwtid', subject: 'Web access' }, config.secret, { expiresIn: '7d' });
        const token = jwt.sign({ id: user.id, name: username, audience: username, issuer: 'smc', jwtid: 'jwtid', subject: 'Web access' }, privateKey, { expiresIn: '7d', algorithm: 'RS256' });
        return {
            ...user.toJSON(),
            token
        };
    }
}
async function getAllUsers() {
    let result = await User.find();
    return result;
}

async function getUserById(id) {
    let result = await User.findById(id);
    return result;
}

async function create(userparam) {
    const user = new User(userparam);

    await user.save();
}

async function deleteUser(id) {
    await User.findByIdAndDelete(id)
}


async function updateUser(userparam) {
    // console.log('userparam : ', userparam)
    const user = await User.findById(userparam.id);
    // console.log('user : ', user)
    if (!user) {
        throw 'User not found';
    }
    if (user) {
        // let newUser = user.toJSON();
        // newUser.username = userparam.username;
        // newUser.firstname = userparam.firstname;
        // newUser.lastname = userparam.lastname;
        // newUser.hash = userparam.hash;
        // newUser.age = userparam.age;
        Object.assign(user, userparam);
    }
    await user.save();
}

module.exports = {
    getAllUsers,
    getUserById,
    create,
    deleteUser,
    updateUser,
    authenticate
}