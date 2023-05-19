document.getElementById('sightingForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('id').value;
    const type = document.getElementById('type').value;

    const sightingData = {
        id,
        type
    };

    try {
        const response = await fetch('/sightings/update_sighting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sightingData),
        });

        if (response.ok) {
            // Redirect back to the sightings page, and add a popup that says
            // uploaded successfully
            document.getElementById("alert").style.display = "block";
        } else {
            console.error('Error creating sighting');
            // Show an error popup with an explanation as to why it didn't work
        }
    } catch (error) {
        console.error('Error creating sighting:', error);
        // Show an error message
    }
});
