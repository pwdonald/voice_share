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
    res.json({
        username: req.user.username
    });
});

module.exports = router;