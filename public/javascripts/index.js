var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    MainLayout = require('./main/mainlayout');

var app = new Marionette.Application();

app.on('start', function() {
    Backbone.history.start();
});

app.rootView = new MainLayout();
app.rootView.render();