if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    posts: [
      { text: "This is post 1" },
      { text: "This is post 2" },
      { text: "This is post 3" }
    ]
  });
}