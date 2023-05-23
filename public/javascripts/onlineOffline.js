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

            // Retrieve the form data from IndexedDB
            const formData = await getFormDataFromIndexedDB();
            if (formData) {
                // There is offline data to upload
                try {
                    // Convert formData object back into a FormData instance
                    const convertedFormData = new FormData();
                    for (let [key, value] of Object.entries(formData)) {
                        if (key === 'picture') {
                            // Fetch the Blob from the URL and convert it back into a File
                            const response = await fetch(value);
                            const blob = await response.blob();
                            const file = new File([blob], 'uploaded_picture');  // Name the file 'uploaded_picture'. Adjust this as needed.
                            convertedFormData.append(key, file);
                        } else {
                            convertedFormData.append(key, value);
                        }
                    }

                    // Upload the data to the server
                    const response = await fetch('/sightings/add_sighting', {
                        method: 'POST',
                        body: convertedFormData,  // Use convertedFormData instead of JSON
                    });

                    if (!response.ok) {
                        throw new Error('Error uploading offline data');
                    }

                    console.log('Offline data uploaded successfully');

                    // Resetting the flag since the data has been uploaded
                    savedToIndexedDB = false;
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

    // Convert FormData to a plain object
    function formDataToObject(formData) {
        let obj = {};
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                // Convert file to Blob and store it separately
                obj[key] = URL.createObjectURL(value);
            } else {
                obj[key] = value;
            }
        }
        return obj;
    }

    // Save form data to IndexedDB
    async function saveFormDataInIndexedDBLocal(formData) {
        // Convert the form data to a plain object before saving
        const obj = formDataToObject(formData);
        await idbKeyval.set('offlineFormData', obj);
    }

    //Makes the function globally accessible so that it can be called from the addSighting.ejs file
    window.saveFormDataInIndexedDB = saveFormDataInIndexedDBLocal;

    // Get form data from IndexedDB
    async function getFormDataFromIndexedDBLocal() {
        const obj = await idbKeyval.get('offlineFormData');
        if (obj) {
            // If there's data, delete it from the database
            await idbKeyval.del('offlineFormData');
            return obj;
        } else {
            return null;
        }
    }
    window.getFormDataFromIndexedDB = getFormDataFromIndexedDBLocal;


});
