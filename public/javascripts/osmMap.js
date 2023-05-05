function initMap(lat, lng) {
    console.log("THE VALUES ARE: " + lat + " " + lng)
    // var lat = sightingLatitude;
    // var lng = sightingLongitude;

    // Initialize the map
    var map = L.map('map').setView([lat, lng], 13);

    // Set the OSM tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);

    // Add a marker at the sighting location
    var marker = L.marker([lat, lng]).addTo(map);
}

// Call the initMap function to display the map when the page loads
window.addEventListener('DOMContentLoaded', initMap);
