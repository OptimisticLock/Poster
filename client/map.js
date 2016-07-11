
Meteor.startup(() => {
    GoogleMaps.load()
    GoogleMaps.loadUtilityLibrary('/path/to/library.js')
})

var MAP_ZOOM = 15

Template.map.helpers({

    mapOptions: function() {
        var latLng = Geolocation.latLng();
        // Initialize the map once we have the latLng.
        if (GoogleMaps.loaded() && latLng) {
            return {
                center: new google.maps.LatLng(latLng.lat, latLng.lng),
                zoom: MAP_ZOOM
            };
        }
    },

    geolocationError: function() {
        var error = Geolocation.error();
        return error && error.message;
    }
});

Template.map.onCreated(function() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('myMap', function(map) {

        var latLng = Geolocation.latLng()

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(latLng.lat, latLng.lng),
            map: map.instance,
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        })
    })
})
