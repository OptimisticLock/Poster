Template.photoButton.events({
    'click': function () {
        event.preventDefault();
        console.log("Photo");
        //    Meteor.defer(function() {
        //      $("#fInput").click();
        //      console.log("clicking",  $("#fInput"))
        //    })
        return true;
    }
});
