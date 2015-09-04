var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    MainLayout = require('./main/mainlayout'),
    Handlebars = require('handlebars'),
    UserModel = require('./user/user');

Marionette.Renderer.render = function(template, data) {
    var template = Handlebars.compile(template);
    return template(data);
};

var app = new Marionette.Application();

app.on('start', function() {
    Backbone.history.start();
});

app.rootView = new MainLayout({
    model: new UserModel()
});

app.rootView.model.fetch();
app.rootView.render();