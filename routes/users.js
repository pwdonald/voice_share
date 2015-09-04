var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/UserModel');

var confirmPassword = function(req, res, next) {
    var password = req.body.password,
        confirmpassword = req.body.confirmpassword;

    if (password !== confirmpassword) {
        req.flash('error', 'Passwords do not match!');
        return res.redirect('/register');
    }

    next();
};

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/app',
        failureRedirect: '/login',
        failureFlash: true
    }));

router.post('/register', confirmPassword, User.IsUsernameAvailable, User.HashPassword, User.CreateNewUser, passport.authenticate('local', {
    successRedirect: '/app',
    failureFlash: true
}));

module.exports = router;