(function () {

/* Imports */
var meteorEnv = Package.meteor.meteorEnv;
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;

/* Package-scope variables */
var DDPServer, Server, StreamServer;



/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ddp-server'] = {};

})();
