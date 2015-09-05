var express = require('express');
var router = express.Router();

var isLoggedIn = function(req, res, next) {
    if (req.user && req.isAuthenticated()) {
        next();
    } else {
        res.send(500);
    }
};

router.get('/', isLoggedIn, function(req, res) {
	if (req.user && req.user.password) {
		delete req.user.password;
	}
    res.json(req.user);
});

module.exports = router;