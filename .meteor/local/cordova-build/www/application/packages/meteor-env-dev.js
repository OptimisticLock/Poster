//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


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
meteorEnv = {                                                        // 1
  NODE_ENV: "development"                                            // 2
};                                                                   // 3
                                                                     // 4
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
