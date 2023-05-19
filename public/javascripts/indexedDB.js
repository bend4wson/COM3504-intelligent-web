// Initialize the IndexedDB
async function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("bird_sightings", 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore("sightings", { keyPath: "timestamp" });
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.error);
        };
    });
}

// Save bird sighting to IndexedDB
async function saveSighting(db, sighting) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("sightings", "readwrite");
        const sightingsStore = transaction.objectStore("sightings");
        const request = sightingsStore.add(sighting);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = (event) => {
            reject(event.error);
        };
    });
}

export { initDB, saveSighting };
