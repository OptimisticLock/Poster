Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});

// This code only runs on the client
Template.posts.helpers({
    posts: function () {
        return Posts.find({}, {sort: {createdAt: -1}});
    }
});

Template.header.events({
    "submit .new-post": function (event) {
        // Prevent default browser form submit

        console.log("New post submitted");

        event.preventDefault();

        // Get value from form element
        var text = event.target.text.value;

        // If new post is not empty, insert it
        if ($.trim(text) != '') {

            var me = Meteor.user();

            // me.sername if user logged in with password.
            // me.profile.name if user logged in with Facebook and maybe other OAuth services.
            var username = me.username || me.profile.name

            // Insert a post into the collection
            Posts.insert({
                text: text,
                createdAt: new Date(),            // current time
                author: Meteor.userId(),           // _id of logged in user
                username: username  // username of logged in user
            });

            // Clear form
            event.target.text.value = "";
        }
    }
});
// TODO: make sure the server only allows user to remove own posts
Template.post.events({
    "click .delete": function () {
        Posts.remove(this._id);
    }
});

Template.post.helpers({

    // Returns true if this post is mine
    isMyPost: function() {
        var me = Meteor.userId();

        // If I am not logged in, none of the posts are recognized as "mine"
        if (!me)
            return false;

        // TODO: Renamed "owner" into "author" and never did a db migration.
        // "Owner" is here only for historical reasons.
        var result = ( me == this.author || me == this.owner);
        return result;
    },

    user: function() {
        var u = Meteor.user();
        console.log("User is ", u);
        return u;
    }
});


