var express = require('express');
var router = express.Router();

var alreadyLoggedIn = function(req, res, next) {
    if (req.user && req.isAuthenticated()) {
        res.redirect('/app');
    } else {
        next();
    }
};

var isLoggedIn = function(req, res, next) {
    if (req.user && req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
};

var showAppIndex = function(req, res, next) {
    res.render('appview', {
        app: true
    });
};

router.use(function(req, res, next) {
    res.locals.user = req.user;
    res.locals.role = (req.user ? req.user.role : 0);
    next();
});

/* GET home page. */
router.get('/', alreadyLoggedIn, function(req, res, next) {
    res.render('index', {
        title: 'Voice App',
        home: 'active'
    });
});

router.get('/login', alreadyLoggedIn, function(req, res, next) {
    res.render('login', {
        title: 'Login to T3nT',
        login: 'active',
        error: req.flash('error')
    });
});

router.get('/logout', isLoggedIn, function(req, res, next) {
    req.session.destroy(function() {
        req.logout();
        res.redirect('/');
    });
});

router.get('/register', alreadyLoggedIn, function(req, res, next) {
    res.render('register', {
        title: 'Register',
        register: 'active',
        error: req.flash('error')
    });
});

router.get('/app*', isLoggedIn, showAppIndex);

module.exports = router;