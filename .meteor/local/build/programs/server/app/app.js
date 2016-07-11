var require = meteorInstall({"both":{"poster.js":function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// both/poster.js                                                    //
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
});                                                                  // 8
///////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json"]});
require("./both/poster.js");
require("./server/configure.js");
//# sourceMappingURL=app.js.map
