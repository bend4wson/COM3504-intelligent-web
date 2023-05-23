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
            await store.put(sightingList);
            await  tx.complete;
            console.log('added item to the store! '+ JSON.stringify(sightingList));
        } catch(error) {
            localStorage.setItem("sightings", JSON.stringify(sightingList));
        };
    }
    else localStorage.setItem(sightings, JSON.stringify(sightingList));
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
            let index = await store.index('location');
            let readingsList = await index.getAll(IDBKeyRange.only(city));
            await tx.complete;
            let finalResults=[];
            if (readingsList && readingsList.length > 0) {
                let max;
                for (let elem of readingsList)
                    if (!max || elem.date > max.date)
                        max = elem;
                if (max)
                    finalResults.push(max);
                return finalResults;
            } else {
                const value = localStorage.getItem(city);
                if (value == null)
                    return finalResults;
                else finalResults.push(value);
                return finalResults;
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        const value = localStorage.getItem(city);
        let finalResults=[];
        if (value == null)
            return finalResults;
        else finalResults.push(value);
        return finalResults;
    }
}
window.getCachedData= getCachedData;
