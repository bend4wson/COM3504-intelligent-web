////////////////// DATABASE //////////////////
// the database receives from the server the following structure
import * as idb from './idb/index.js';

let db;

const SIGHTING_DB_NAME= 'db_sightings_1';
const SIGHTING_STORE_NAME= 'store_sightings';

/**
 * it inits the database
 */
async function initDatabase(){
    if (!db) {
        db = await idb.openDB(SIGHTING_DB_NAME, 2, {
            upgrade(upgradeDb, oldVersion, newVersion) {
                if (!upgradeDb.objectStoreNames.contains(SIGHTING_STORE_NAME)) {
                    let forecastDB = upgradeDb.createObjectStore(SIGHTING_STORE_NAME, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    forecastDB.createIndex('location', 'location', {unique: false, multiEntry: true});
                }
            }
        });
        console.log('db created');
    }
}
window.initDatabase= initDatabase;

/**
 * it saves the sightings in localStorage
 * @param sightingList
 */
async function storeCachedData(sightingList) {
    console.log('inserting: '+JSON.stringify(sightingList));
    if (!db)
        await initDatabase();
    if (db) {
        try{
            let tx = await db.transaction(SIGHTING_STORE_NAME, 'readwrite');
            let store = await tx.objectStore(SIGHTING_STORE_NAME);
            for (let i = 0; i < sightingList.length; i++) {
                await store.put(sightingList[i]);
            }
            await  tx.complete;
            console.log('added item to the store! '+ JSON.stringify(sightingList));
        } catch(error) {
            localStorage.setItem("sightings", JSON.stringify(sightingList));
        };
    }
    else localStorage.setItem("sightings", JSON.stringify(sightingList));
}

window.storeCachedData=storeCachedData;

/**
 * it retrieves the sighting data from the database
 * @returns {*}
 */
async function getCachedData() {
    if (!db)
        await initDatabase();
    if (db) {
        try {
            let tx = await db.transaction(SIGHTING_STORE_NAME, 'readonly');
            let store = await tx.objectStore(SIGHTING_STORE_NAME);
            let readingsList = await store.getAll();
            await tx.complete;
            let finalResults=[];
            if (readingsList && readingsList.length > 0) {
                return readingsList;
            } else {
                const value = localStorage.getItem("sightings");
                if (value == null)
                    return finalResults;
                else finalResults.push(value);
                return finalResults;
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        const value = localStorage.getItem("sightings");
        let finalResults=[];
        if (value == null)
            return finalResults;
        else finalResults.push(value);
        return finalResults;
    }
}
window.getCachedData= getCachedData;


/**
 * it clear the sightings in localStorage
 */
async function clearCachedData() {
    if (!db)
        await initDatabase();
    if (db) {
        try{
            let tx = await db.transaction(SIGHTING_STORE_NAME, 'readwrite');
            let store = await tx.objectStore(SIGHTING_STORE_NAME);
            store.clear();
            await  tx.complete;
            console.log('clear all item from the store! ');
        } catch(error) {
            localStorage.removeItem("sightings");
        }
    }
    else localStorage.removeItem("sightings");
}

window.clearCachedData=clearCachedData;
