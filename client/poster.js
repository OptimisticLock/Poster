Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});

// This code only runs on the client
Template.posts.helpers({
    posts: function () {
        return Posts.find({}, {sort: {createdAt: -1}});
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

    author: function() {

        var authorId = this.author || this.owner;
        var author = Meteor.users.findOne({_id: authorId});
        console.log("Found author: " + "for " + authorId, author);
        return author;
    }
});


