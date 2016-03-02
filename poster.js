
Posts = new Mongo.Collection("posts");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    posts: function () {
      return Posts.find({});
    }
  });

  Template.body.events({
    "submit .new-post": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var text = event.target.text.value;

      // Insert a post into the collection
      Posts.insert({
        text: text,
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.text.value = "";
    }
  });
}