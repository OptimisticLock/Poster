var require = meteorInstall({"BothClientAndServer":{"poster.js":function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// BothClientAndServer/poster.js                                     //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Posts = new Mongo.Collection("posts");                               // 1
///////////////////////////////////////////////////////////////////////

}},"server":{"configure.js":function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// server/configure.js                                               //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Meteor.startup(function () {                                         // 1
                                                                     //
  // Uncomment this to reset botched Facebook OAuth                  //
                                                                     //
  //    ServiceConfiguration.configurations.remove({                 //
  //        service: "facebook"                                      //
  //    });                                                          //
});                                                                  //
///////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json"]});
require("./BothClientAndServer/poster.js");
require("./server/configure.js");
//# sourceMappingURL=app.js.map
