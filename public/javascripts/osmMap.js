// function initMap(lat, lng) {
//     console.log("THE VALUES ARE: " + lat + " " + lng)
//     // var lat = sightingLatitude;
//     // var lng = sightingLongitude;
//
//     // Initialize the map
//     var map = L.map('map').setView([lat, lng], 13);
//
//     // Set the OSM tile layer
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution:
//             '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//         maxZoom: 18,
//     }).addTo(map);
//
//     // Add a marker at the sighting location
//     var marker = L.marker([lat, lng]).addTo(map);
// }
//
// // Call the initMap function to display the map when the page loads
// window.addEventListener('DOMContentLoaded', initMap);

var marker;  // Initialize marker variable globally

function initMapWithDraggableMarker(lat, lng) {
    // Initialize the map
    var map = L.map('map').setView([lat, lng], 13);

    // Set the OSM tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);

    // Add a draggable marker at the sighting location
    marker = L.marker([lat, lng], {draggable: 'true'}).addTo(map);

    // Update form inputs whenever the marker is dragged
    marker.on('dragend', function(event) {
        var position = marker.getLatLng();
        document.getElementById('lat').value = position.lat;
        document.getElementById('lng').value = position.lng;
        document.getElementById('userLat').value = position.lat;
        document.getElementById('userLng').value = position.lng;
    });
}

function initMapWithStaticMarker(lat, lng) {
    // Initialize the map
    var map = L.map('map').setView([lat, lng], 13);

    // Set the OSM tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);

    // Add a static marker at the sighting location
    marker = L.marker([lat, lng]).addTo(map);
}


window.initMapWithDraggableMarker = initMapWithDraggableMarker;
window.initMapWithStaticMarker = initMapWithStaticMarker;