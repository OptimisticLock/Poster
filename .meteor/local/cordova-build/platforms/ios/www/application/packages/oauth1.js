(function () {

/* Imports */
var meteorEnv = Package.meteor.meteorEnv;
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var Random = Package.random.Random;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var OAuth = Package.oauth.OAuth;
var Oauth = Package.oauth.Oauth;
var Mongo = Package.mongo.Mongo;

/* Package-scope variables */
var OAuth1Binding;



/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.oauth1 = {};

})();
