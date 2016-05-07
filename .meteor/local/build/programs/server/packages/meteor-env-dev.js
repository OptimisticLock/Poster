(function () {

/* Package-scope variables */
var meteorEnv;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/meteor-env-dev/env.js                                    //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
meteorEnv = {
  NODE_ENV: "development"
};

///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['meteor-env-dev'] = {}, {
  meteorEnv: meteorEnv
});

})();

//# sourceMappingURL=meteor-env-dev.js.map
