'use strict';
var routes = require('./routes/resourceRoutes');

var resources = {
    register: function register(app, config) {
        for (var i = 0, ii = routes.length; i < ii; i++) {
            var route = routes[i];
            var Resource = require('./resources/' + route.name + '/resource');
            var resource = new Resource(config);
            app[route.method](route.url, resource[route.method]);
        }
    }
};

module.exports = resources;
