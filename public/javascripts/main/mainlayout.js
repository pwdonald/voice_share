var Marionette = require('backbone.marionette'),
    MainLayoutTemplate = require('./mainlayouttemplate.html');

var MainLayout = Marionette.LayoutView.extend({
    el: '#app',
    template: MainLayoutTemplate
});

module.exports = MainLayout;