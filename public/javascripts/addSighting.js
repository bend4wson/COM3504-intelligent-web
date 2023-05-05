document.getElementById('sightingForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;
    const lat = parseFloat(document.getElementById('lat').value);
    const lng = parseFloat(document.getElementById('lng').value);
    const userLat = parseFloat(document.getElementById('userLat').value);
    const userLng = parseFloat(document.getElementById('userLng').value);

    const sightingData = {
        type,
        description,
        location: { lat, lng },
        userLat,
        userLng
        // Add the picture data here when implemented on the form
        // to add it to the database
    };

    try {
        const response = await fetch('/sightings/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sightingData),
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result);
            // Redirect back to the sightings page, and add a popup that says
            // uploaded successfully
        } else {
            console.error('Error creating sighting');
            // Show an error popup with an explanation as to why it didn't work
        }
    } catch (error) {
        console.error('Error creating sighting:', error);
        // Show an error message
    }
});
