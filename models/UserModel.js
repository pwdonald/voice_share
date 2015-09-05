var Datastore = require('nedb'),
    bcrypt = require('bcrypt');

var User = new Datastore({
    filename: 'data/users',
    autoload: true
});

exports.findById = function(id, callback) {
    User.findOne({
        _id: id
    }, callback);
};

exports.findByUsername = function(username, callback) {
    User.findOne({
        username: username
    }, function(err, user) {
        callback(err, user);
    });
};

exports.isUsernameAvailable = function(req, res, next) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) {
            return next(err);
        }

        if (user) {
            // not available
            req.flash('error', 'Username invalid.');
            res.redirect('/register');
        }

        next();
    });
};

exports.hashPassword = function(req, res, next) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hashedPassword) {
            req.body.hashedPassword = hashedPassword;
            next();
        });
    });
};

exports.checkPassword = function(user, password, callback) {
    bcrypt.compare(password, user.password, callback);
};

exports.createNewUser = function(req, res, next) {
    User.insert({
        username: req.body.username,
        password: req.body.hashedPassword,
        role: 0,
        timestamp: new Date()
    }, function(err, user) {
        if (err) {
            next(err);
        }

        req.body.username = user.username;

        next();
    });
};