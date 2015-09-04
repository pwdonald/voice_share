var Backbone = require('backbone');

var UserModel = Backbone.Model.extend({
    url: '/api/user/'
});

module.exports = UserModel;