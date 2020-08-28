const express = require('express');
const router = express.Router();
const userservice = require('../services/userservice');


router.post('/authenticate', function (req, res, next) {
    userservice.authenticate(req.body.username, req.body.password)
        .then(user => user ? res.json({ user, flag: true }) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
});
router.post('/register', function (req, res, next) {
    userservice.create(req.body)
        .then(() => res.json({ message: 'User added successfull', flag: true }))
        .catch(err => next(err));
});

router.get('/getAllUsers', function (req, res, next) {
    userservice.getAllUsers().then(function (user) {
        (user) ? res.json({ flag: true, outdatalist: user }) : res.sendStatus(404);
    }).catch(function (err) {
        console.log(err);
        next({ flag: false, message: err });
    })
});

router.get('/getUserById', function (req, res, next) {
    userservice.getUserById(req.params.id).then(function (user) {
        (user) ? res.json(user) : res.sendStatus(404);
    }).catch(function (err) {
        next({ message: err, flag: false });
    })
});

router.post('/createUser', function (req, res, next) {
    userservice.create(req.body).then(function () {
        res.json({ message: 'User Inserted', flag: true });
    }).catch(function (err) {
        next({ message: err, flag: false });
    })
});

router.put('/updateUser', function (req, res, next) {

    userservice.updateUser(req.body).then(function () {
        console.log('User saved');
        res.json({ message: 'User Updated', flag: true });
    }).catch(function (err) {
        console.log('User Error', err);
        next({ message: err, flag: false });
    })
});

router.delete('/deleteUser/:id', function (req, res, next) {
    userservice.deleteUser(req.params.id).then(function (user) {
        res.json({ message: 'User Deleted', flag: true });
    }).catch(function (err) {
        next({ message: err, flag: false });
    })
});
module.exports = router;