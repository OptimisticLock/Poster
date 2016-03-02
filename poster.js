
Posts = new Mongo.Collection("posts");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    posts: function () {
      return Posts.find({});
    }
  });
}