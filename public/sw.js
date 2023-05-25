// // const CACHE_NAME = `temperature-converter-v1`;
// //
// // // Use the install event to pre-cache all initial resources.
// // self.addEventListener('install', event => {
// //     event.waitUntil((async () => {
// //         const cache = await caches.open(CACHE_NAME);
// //         cache.addAll([
// //             '/',
// //             '/javascripts/converter.js',
// //             '/stylesheets/style.css'
// //         ]);
// //     })());
// // });
// //
// // self.addEventListener('fetch', event => {
// //     event.respondWith((async () => {
// //         const cache = await caches.open(CACHE_NAME);
// //
// //         // Get the resource from the cache.
// //         const cachedResponse = await cache.match(event.request);
// //         if (cachedResponse) {
// //             return cachedResponse;
// //         } else {
// //             try {
// //                 // If the resource was not in the cache, try the network.
// //                 const fetchResponse = await fetch(event.request);
// //
// //                 // Save the resource in the cache and return it.
// //                 cache.put(event.request, fetchResponse.clone());
// //                 return fetchResponse;
// //             } catch (e) {
// //                 // The network failed.
// //             }
// //         }
// //     })());
// // });
//
//
// // Copyright 2016 Google Inc.
// //
// // Licensed under the Apache License, Version 2.0 (the "License");
// // you may not use this file except in compliance with the License.
// // You may obtain a copy of the License at
// //
// //      http://www.apache.org/licenses/LICENSE-2.0
// //
// // Unless required by applicable law or agreed to in writing, software
// // distributed under the License is distributed on an "AS IS" BASIS,
// // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// // See the License for the specific language governing permissions and
// // limitations under the License.
//
// let cache= null;
// let dataCacheName = 'intelligent-web';
// let cacheName = 'intelligentWebPWA';
// let filesToCache = [
//     '/',
//     '/javascript/converter.js',
//     '/javascript/bootstrap.min.js',
//     '/stylesheets/bootstrap.min.css',
//     '/stylesheets/style.css',
//     '/stylesheets/main.css',
//     'stylesheets/index.css', //Added to style the login/sign up and add sightings buttons on index.ejs
//     '/images/bird.jpg',
//     '/images/temperature.png',
//     '/favicon.ico'
// ];
//
//
// /**
//  * installation event: it adds all the files to be cached
//  */
// self.addEventListener('install', function (e) {
//     console.log('[ServiceWorker] Install');
//     e.waitUntil(
//         caches.open(cacheName).then(function (cacheX) {
//             console.log('[ServiceWorker] Caching app shell');
//             cache= cacheX;
//             return cache.addAll(filesToCache);
//         })
//     );
// });
//
//
// /**
//  * activation of service worker: it removes all cashed files if necessary
//  */
// self.addEventListener('activate', function (e) {
//     console.log('[ServiceWorker] Activate');
//     e.waitUntil(
//         caches.keys().then(function (keyList) {
//             return Promise.all(keyList.map(function (key) {
//                 if (key !== cacheName && key !== dataCacheName) {
//                     console.log('[ServiceWorker] Removing old cache', key);
//                     return caches.delete(key);
//                 }
//             }));
//         })
//     );
//     /*
//      * Fixes a corner case in which the app wasn't returning the latest data.
//      * You can reproduce the corner case by commenting out the line below and
//      * then doing the following steps: 1) load app for first time so that the
//      * initial New York City data is shown 2) press the refresh button on the
//      * app 3) go offline 4) reload the app. You expect to see the newer NYC
//      * data, but you actually see the initial data. This happens because the
//      * service worker is not yet activated. The code below essentially lets
//      * you activate the service worker faster.
//      */
//     return self.clients.claim();
// });
//
//
// /**
//  * this is called every time a file is fetched. This is a middleware, i.e. this method is
//  * called every time a page is fetched by the browser
//  * there are two main branches:
//  * /api get data from the server. if offline, the fetch will fail and the
//  *      control will be sent back to Ajax with an error - you will have to recover the situation
//  *      from there (e.g. showing the cached data)
//  * all the other pages are searched for in the cache. If not found, they are returned
//  */
// self.addEventListener('fetch', function (e) {
//     console.log('[Service Worker] Fetch', e.request.url);
//     let dataUrl = '/api';
//     //if the request is '/weather_data', post to the server - do nit try to cache it
//     if (e.request.url.indexOf(dataUrl) > -1) {
//         /*
//          * When the request URL contains dataUrl, the app is asking for fresh
//          * weather data. In this case, the service worker always goes to the
//          * network and then caches the response. This is called the "Cache then
//          * network" strategy:
//          * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
//          */
//         return fetch(e.request)
//             .then( (response) => {
//                 // note: it the network is down, response will contain the error
//                 // that will be passed to Ajax
//                 return response;
//             })
//             .catch((error) => {
//                 return error;
//             })
//     } else {
//         /*
//          * The app is asking for app shell files. In this scenario the app uses the
//          * "Cache, falling back to the network" offline strategy:
//          * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
//          */
//         e.respondWith(
//             caches.match(e.request).then(function (response) {
//                 return response
//                     || fetch(e.request)
//                         .then(function (response) {
//                             // note if network error happens, fetch does not return
//                             // an error. it just returns response not ok
//                             // https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
//                             if (!response.ok ||  response.statusCode>299) {
//                                 console.log("error: " + response.error());
//                             } else {
//                                 cache.add(e.request.url);
//                                 return response;
//                             }
//                         })
//                         .catch(function (err) {
//                             console.log("error: " + err);
//                         })
//             })
//         );
//     }
// });

// Import Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded`);
} else {
    console.log(`Boo! Workbox didn't load`);
}

// Precache static files
workbox.precaching.precacheAndRoute([
    '/javascripts/addSighting.js',
    '/javascripts/bootstrap.min.js',
    '/javascripts/converter.js',
    '/javascripts/index.js',
    '/javascripts/indexedDB.js',
    '/javascripts/login.js',
    '/javascripts/onlineOffline.js',
    '/javascripts/osmMap.js',
    '/javascripts/updateSighting.js',
    '/stylesheets/bootstrap.min.css',
    '/stylesheets/header.css',
    '/stylesheets/index.css',
    '/stylesheets/main.css',
    '/stylesheets/style.css',
    /* Add your image paths here */
    '/sw.js',
    /* Remember to add the paths for your .ejs files as well */
    '/',
    '/login',
    '/register',
    '/sightings/add_sighting'
]);

// Handle runtime or dynamic caching

workbox.routing.registerRoute(
    '/',
    new workbox.strategies.NetworkFirst({
        cacheName: 'home-cache',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
                purgeOnQuotaError: true,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    /\/(sightings|users|register|add_sighting|detail|login)\/.*/, // replace with your API endpoints
    new workbox.strategies.NetworkFirst({
        cacheName: 'api-cache',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
                purgeOnQuotaError: true,
            }),
        ],
    })
);
