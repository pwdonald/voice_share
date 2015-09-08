var express = require('express');
var router = express.Router();
var User = require('../models/UserModel');

var isLoggedIn = function(req, res, next) {
    if (req.user && req.isAuthenticated()) {
        next();
    } else {
        res.send(401);
    }
};

router.get('/', isLoggedIn, function(req, res) {
    if (req.user && req.user.password) {
        delete req.user.password;
    }
    res.json(req.user);
});

router.get('/profile', isLoggedIn, function(req, res) {
	if(req.user && req.user.password) {
		delete req.user.password;
	}

	res.json(req.user);
});

router.post('/profile', isLoggedIn, User.updateUserProfile, function(req, res) {
	res.json(req.user.profile);
});

module.exports = router;