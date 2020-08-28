const expressJwt = require('express-jwt');
const config = require('../config/config.json');
const userService = require('../services/userservice');
const fs = require('fs');
module.exports = jwt;

function jwt() {
    console.log('jwt called')
    //const secret = config.secret;
    const secret = fs.readFileSync('./config/rsa.public');
    return expressJwt({ secret, algorithms: ['RS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/user/authenticate',
            '/user/createUser'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getUserById(payload.id);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};