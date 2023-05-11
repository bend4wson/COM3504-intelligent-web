import * as idbKeyval from "idb-keyval";

const connectionStatus = document.getElementById('connection-status');

function updateOnlineStatus() {
    if (navigator.onLine) {
        connectionStatus.textContent = 'Online';
        connectionStatus.classList.remove('offline');
        connectionStatus.classList.add('online');
    } else {
        connectionStatus.textContent = 'Offline';
        connectionStatus.classList.remove('online');
        connectionStatus.classList.add('offline');
    }
}

// Initialize the status
updateOnlineStatus();

// Add event listeners for online and offline events
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);



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
async function saveFormDataInIndexedDB(formData) {
    // Convert the form data to JSON before saving
    const json = formDataToJson(formData);
    await idbKeyval.set('offlineFormData', json);
}

// Get form data from IndexedDB
async function getFormDataFromIndexedDB() {
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