var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    Handlebars = require('handlebars'),
    MainRouter = require('./routes/mainrouter');

Marionette.Renderer.render = function(template, data) {
    var template = Handlebars.compile(template);
    return template(data);
};


var app = new Marionette.Application();

app.on('start', function() {
	var mainRouter = new MainRouter();
    Backbone.history.start({
        root: '/app/',
        pushState: true
    });
});

app.start();