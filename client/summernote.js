Template.mySummerNote.rendered = function () {
    console.log("mySummerNote rendered");
    $('#summernote').summernote({
        //   airMode: true
        height: 80,                 // set editor height
        minHeight: null,             // set minimum height of editor
        maxHeight: null,             // set maximum height of editor
        focus: true,                  // set focus to editable area after initializing summernote
        placeholder:  "Type a new post"
    });
};


Template.mySummerNote.events({
    "ignore me": function () {
        var html = $('#summernote').summernote('code');
        console.log(html);
    },

    "click #post": function (event) {
        // Prevent default browser form submit

        console.log("New rich text post submitted");
        event.preventDefault();

        // Get value from form element
        var html = $('#summernote').summernote('code');
        console.log(html);

        // If new post is not empty, insert it
        if ($.trim(html) != '') {

            var me = Meteor.user();

            // me.sername if user logged in with password.
            // me.profile.name if user logged in with Facebook and maybe other OAuth services.
            var username = me.username || me.profile.name

            var latLng = Geolocation.latLng()
            console.log("latLng", latLng)

            // Insert a post into the collection
            Posts.insert({
                html,
                createdAt: new Date(),            // current time
                author: Meteor.userId(),           // _id of logged in user
                lat: latLng.lat,
                lng: latLng.lng,
                username: username  // username of logged in user
            });

            // Clear form
            $('#summernote').summernote('code', "");
            //   event.target.text.value = "";
        }
    }
});

Template.mySummerNote.destroyed = function() {
    console.log("Template destroyed");
    $('#summernote').summernote('destroy');
}

// TODO sanitize html output of Summernote https://github.com/search?l=JavaScript&q=sanitize+html

