(function () {

/* Imports */
var meteorEnv = Package.meteor.meteorEnv;
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var DDP = Package['ddp-client'].DDP;

/* Package-scope variables */
var LivedataTest;



/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package.livedata = {}, {
  DDP: DDP,
  LivedataTest: LivedataTest
});

})();
