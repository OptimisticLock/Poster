var require = meteorInstall({"client":{"poster.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/template.poster.js                                                                                      //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.body.addContent((function() {                                                                            // 2
  var view = this;                                                                                                // 3
  return HTML.DIV({                                                                                               // 4
    "class": "container"                                                                                          // 5
  }, "\n        ", Spacebars.include(view.lookupTemplate("header")), "\n        ", Spacebars.include(view.lookupTemplate("posts")), "\n    ");
}));                                                                                                              // 7
Meteor.startup(Template.body.renderToDocument);                                                                   // 8
                                                                                                                  // 9
Template.__checkName("header");                                                                                   // 10
Template["header"] = new Template("Template.header", (function() {                                                // 11
  var view = this;                                                                                                // 12
  return HTML.HEADER(HTML.Raw("\n        <!-- h1>Poster</h1 -->\n        "), Spacebars.include(view.lookupTemplate("loginButtons")), "\n\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));                                                            // 14
  }, function() {                                                                                                 // 15
    return [ "\n            ", Spacebars.include(view.lookupTemplate("mySummerNote")), "\n        " ];            // 16
  }), "\n    ");                                                                                                  // 17
}));                                                                                                              // 18
                                                                                                                  // 19
Template.__checkName("posts");                                                                                    // 20
Template["posts"] = new Template("Template.posts", (function() {                                                  // 21
  var view = this;                                                                                                // 22
  return HTML.UL("\n        ", Blaze.Each(function() {                                                            // 23
    return Spacebars.call(view.lookup("posts"));                                                                  // 24
  }, function() {                                                                                                 // 25
    return [ "\n            ", Spacebars.include(view.lookupTemplate("post")), "\n        " ];                    // 26
  }), "\n    ");                                                                                                  // 27
}));                                                                                                              // 28
                                                                                                                  // 29
Template.__checkName("post");                                                                                     // 30
Template["post"] = new Template("Template.post", (function() {                                                    // 31
  var view = this;                                                                                                // 32
  return HTML.LI("\n        ", Blaze.If(function() {                                                              // 33
    return Spacebars.call(view.lookup("isMyPost"));                                                               // 34
  }, function() {                                                                                                 // 35
    return [ "\n            ", HTML.BUTTON({                                                                      // 36
      "class": "delete"                                                                                           // 37
    }, HTML.CharRef({                                                                                             // 38
      html: "&times;",                                                                                            // 39
      str: "×"                                                                                                    // 40
    })), "\n        " ];                                                                                          // 41
  }), "\n\n        ", Blaze._TemplateWith(function() {                                                            // 42
    return {                                                                                                      // 43
      shape: Spacebars.call("circle"),                                                                            // 44
      size: Spacebars.call("small"),                                                                              // 45
      user: Spacebars.call("{{author}}")                                                                          // 46
    };                                                                                                            // 47
  }, function() {                                                                                                 // 48
    return Spacebars.include(view.lookupTemplate("avatar"));                                                      // 49
  }), "\n        ", HTML.DIV({                                                                                    // 50
    "class": "username"                                                                                           // 51
  }, " ", Blaze.View("lookup:username", function() {                                                              // 52
    return Spacebars.mustache(view.lookup("username"));                                                           // 53
  }), " "), "\n        ", HTML.DIV({                                                                              // 54
    "class": "postText"                                                                                           // 55
  }, " ", Blaze.View("lookup:text", function() {                                                                  // 56
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("text")));                                            // 57
  }), " "), "\n    ");                                                                                            // 58
}));                                                                                                              // 59
                                                                                                                  // 60
Template.__checkName("mySummerNote");                                                                             // 61
Template["mySummerNote"] = new Template("Template.mySummerNote", (function() {                                    // 62
  var view = this;                                                                                                // 63
  return HTML.Raw('<div id="summernote"></div>\n    <button id="post" type="button" class="btn btn-info">Post</button>');
}));                                                                                                              // 65
                                                                                                                  // 66
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"photoButton.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/photoButton.js                                                                                          //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
/* Template.photoButton.events({                                                                                  //
    'click': function () {                                                                                        //
 //       event.preventDefault();                                                                                 //
        console.log("Photo click..");                                                                             //
        //    Meteor.defer(function() {                                                                           //
        //      $("#fInput").click();                                                                             //
        //      console.log("clicking",  $("#fInput"))                                                            //
        //    })                                                                                                  //
        return false;                                                                                             //
    }                                                                                                             //
}); */                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"poster.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/poster.js                                                                                               //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Accounts.ui.config({                                                                                              // 1
    passwordSignupFields: "USERNAME_ONLY"                                                                         // 2
});                                                                                                               //
                                                                                                                  //
// This code only runs on the client                                                                              //
Template.posts.helpers({                                                                                          // 6
    posts: function () {                                                                                          // 7
        function posts() {                                                                                        // 7
            return Posts.find({}, { sort: { createdAt: -1 } });                                                   // 8
        }                                                                                                         //
                                                                                                                  //
        return posts;                                                                                             //
    }()                                                                                                           //
});                                                                                                               //
                                                                                                                  //
// TODO: make sure the server only allows user to remove own posts                                                //
Template.post.events({                                                                                            // 14
    "click .delete": function () {                                                                                // 15
        function clickDelete() {                                                                                  // 15
            Posts.remove(this._id);                                                                               // 16
        }                                                                                                         //
                                                                                                                  //
        return clickDelete;                                                                                       //
    }()                                                                                                           //
});                                                                                                               //
                                                                                                                  //
Template.post.helpers({                                                                                           // 20
                                                                                                                  //
    // Returns true if this post is mine                                                                          //
    isMyPost: function () {                                                                                       // 23
        function isMyPost() {                                                                                     // 23
            var me = Meteor.userId();                                                                             // 24
                                                                                                                  //
            // If I am not logged in, none of the posts are recognized as "mine"                                  //
            if (!me) return false;                                                                                // 23
                                                                                                                  //
            // TODO: Renamed "owner" into "author" and never did a db migration.                                  //
            // "Owner" is here only for historical reasons.                                                       //
            var result = me == this.author || me == this.owner;                                                   // 23
            return result;                                                                                        // 33
        }                                                                                                         //
                                                                                                                  //
        return isMyPost;                                                                                          //
    }(),                                                                                                          //
                                                                                                                  //
    author: function () {                                                                                         // 36
        function author() {                                                                                       // 36
                                                                                                                  //
            // TODO db migration from owner to author                                                             //
            var authorId = this.author || this.owner;                                                             // 39
            var author = Meteor.users.findOne({ _id: authorId });                                                 // 40
            console.log("Found author: " + "for " + authorId, author);                                            // 41
            return author;                                                                                        // 42
        }                                                                                                         //
                                                                                                                  //
        return author;                                                                                            //
    }()                                                                                                           //
});                                                                                                               //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"summernote.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/summernote.js                                                                                           //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Template.mySummerNote.rendered = function () {                                                                    // 1
    console.log("mySummerNote rendered");                                                                         // 2
    $('#summernote').summernote({                                                                                 // 3
        //   airMode: true                                                                                        //
        height: 80, // set editor height                                                                          // 5
        minHeight: null, // set minimum height of editor                                                          // 6
        maxHeight: null, // set maximum height of editor                                                          // 7
        focus: true, // set focus to editable area after initializing summernote                                  // 8
        placeholder: "Type a new post"                                                                            // 9
    });                                                                                                           //
};                                                                                                                //
                                                                                                                  //
Template.mySummerNote.events({                                                                                    // 14
    "ignore me": function () {                                                                                    // 15
        function ignoreMe() {                                                                                     // 15
            var html = $('#summernote').summernote('code');                                                       // 16
            console.log(html);                                                                                    // 17
        }                                                                                                         //
                                                                                                                  //
        return ignoreMe;                                                                                          //
    }(),                                                                                                          //
                                                                                                                  //
    "click #post": function () {                                                                                  // 20
        function clickPost(event) {                                                                               // 20
            // Prevent default browser form submit                                                                //
                                                                                                                  //
            console.log("New rich text post submitted");                                                          // 23
            event.preventDefault();                                                                               // 24
                                                                                                                  //
            // Get value from form element                                                                        //
            var html = $('#summernote').summernote('code');                                                       // 20
            console.log(html);                                                                                    // 28
                                                                                                                  //
            // If new post is not empty, insert it                                                                //
            if ($.trim(html) != '') {                                                                             // 20
                                                                                                                  //
                var me = Meteor.user();                                                                           // 33
                                                                                                                  //
                // me.sername if user logged in with password.                                                    //
                // me.profile.name if user logged in with Facebook and maybe other OAuth services.                //
                var username = me.username || me.profile.name;                                                    // 31
                                                                                                                  //
                // Insert a post into the collection                                                              //
                Posts.insert({                                                                                    // 31
                    // TODO: this field should now be "html", not "text", but too lazy to do another db migration
                    text: html,                                                                                   // 42
                    createdAt: new Date(), // current time                                                        // 43
                    author: Meteor.userId(), // _id of logged in user                                             // 44
                    username: username // username of logged in user                                              // 45
                });                                                                                               // 40
                                                                                                                  //
                // Clear form                                                                                     //
                $('#summernote').summernote('code', "");                                                          // 31
                //   event.target.text.value = "";                                                                //
            }                                                                                                     // 31
        }                                                                                                         //
                                                                                                                  //
        return clickPost;                                                                                         //
    }()                                                                                                           //
});                                                                                                               //
                                                                                                                  //
Template.mySummerNote.destroyed = function () {                                                                   // 55
    console.log("Template destroyed");                                                                            // 56
    $('#summernote').summernote('destroy');                                                                       // 57
};                                                                                                                //
                                                                                                                  //
// TODO sanitize html output of Summernote https://github.com/search?l=JavaScript&q=sanitize+html                 //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"BothClientAndServer":{"poster.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// BothClientAndServer/poster.js                                                                                  //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Posts = new Mongo.Collection("posts");                                                                            // 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json",".html",".css"]});
require("./client/poster.html");
require("./BothClientAndServer/poster.js");
require("./client/photoButton.js");
require("./client/poster.js");
require("./client/summernote.js");