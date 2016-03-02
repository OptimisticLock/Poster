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

            // Insert a post into the collection
            Posts.insert({
                text: text,
                createdAt: new Date(),            // current time
                owner: Meteor.userId(),           // _id of logged in user
                aaa: "bbb",
                username: Meteor.user().username  // username of logged in user
            });

            // Clear form
            event.target.text.value = "";
        }
    }
});
