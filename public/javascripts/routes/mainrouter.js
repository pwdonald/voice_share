var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    MainLayout = require('../main/mainlayout'),
    UserModel = require('../user/user');

var MainRouter = Backbone.Router.extend({
    routes: {
        'display/:t': 'display',
        '*default': 'home'
    },

    home: function() {
        var mainView = new MainLayout({
            model: new UserModel()
        });

        mainView.model.fetch();
        mainView.render();
    },

    display: function(t) {
        console.log('test: ' + t);
    }
});

module.exports = MainRouter;