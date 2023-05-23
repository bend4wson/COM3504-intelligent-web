console.log('Script loaded')
import * as idbKeyval from './libs/idb-keyval/index.js';

document.addEventListener("DOMContentLoaded", function() {

    const connectionStatus = document.getElementById('connection-status');

    async function updateOnlineStatus() {
        if (navigator.onLine) {
            console.log("GOING ONLINE")
            connectionStatus.textContent = 'Online';
            connectionStatus.classList.remove('offline');
            connectionStatus.classList.add('online');

            // Retrieve and delete the form data from IndexedDB
            const formData = await getFormDataFromIndexedDB();
            if (formData) {
                // There is offline data to upload
                try {
                    // Upload the data to the server
                    const response = await fetch('/sightings/add_sighting', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (!response.ok) {
                        throw new Error('Error uploading offline data');
                    }

                    console.log('Offline data uploaded successfully');
                } catch (error) {
                    console.error('Error uploading offline data:', error);
                    // Put the data back into IndexedDB, so we can try again next time the user goes online
                    await saveFormDataInIndexedDB(formData);
                }
            }

        } else {
            console.log("GOING OFFLINE")
            connectionStatus.textContent = 'Offline';
            connectionStatus.classList.remove('online');
            connectionStatus.classList.add('offline');
        }
    }

    // Initialize the status
    updateOnlineStatus();


    // Add event listeners for online and offline events
    window.addEventListener('online', async () => {
        await updateOnlineStatus();
    });
    window.addEventListener('offline', async () => {
        await updateOnlineStatus();
    });

    //WHEN GOING TO THE BIRD FORM POST, CHECK WHETHER ONLINE OR OFFLINE USING ONLINEOROFFLINE FUNCTION, THEN USE
    //UPLOADSIGHTINGONLINE OR UPLOADSIGHTINGOFFLINE ACCORDINGLY.

    //onlineOrOffline

    //uploadSightingOnline

    //uploadSightingOffline

    //****** Uploading sightings may no longer be working, CHECK THIS *******



    //These functions are for uploading and deleting from indexedDB:

    // Convert FormData to JSON
    function formDataToJson(formData) {
        let obj = {};
        for (let key of formData.keys()) {
            obj[key] = formData.get(key);
        }
        return JSON.stringify(obj);
    }

    // Save form data to IndexedDB
    async function saveFormDataInIndexedDBLocal(formData) {
        // Convert the form data to JSON before saving
        const json = formDataToJson(formData);
        await idbKeyval.set('offlineFormData', json);
    }
    //Makes the function globally accessible so that it can be called from the addSighting.ejs file
    window.saveFormDataInIndexedDB = saveFormDataInIndexedDBLocal;

    // Get form data from IndexedDB
    async function getFormDataFromIndexedDBLocal() {
        const json = await idbKeyval.get('offlineFormData');
        if (json) {
            // If there's data, delete it from the database
            await idbKeyval.del('offlineFormData');
            // Convert the JSON back to an object and return it
            return JSON.parse(json);
        } else {
            return null;
        }
    }
    window.getFormDataFromIndexedDB = getFormDataFromIndexedDBLocal;

});
