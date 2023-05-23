let name = null;
let roomNo = null;
let socket = io();




/**
 * called by <body onload>
 * it initialises the interface and the expected socket messages
 * plus the associated actions
 */
function init() {
    // it sets up the interface so that userId and room are selected
    document.getElementById('initial_form').style.display = 'block';
    document.getElementById('chat_interface').style.display = 'none';

    // called when someone joins the room. If it is someone else it notifies the joining of the room
    // socket.on('joined', function (room, userId) {
    //     if (userId === name) {
    //         // it enters the chat
    //         hideLoginInterface(room, userId);
    //     } else {
    //         // notifies that someone has joined the room
    //         // writeOnHistory('<b>'+userId+'</b>' + ' joined room ' + room);
    //
    //     }
    // });

    socket.on('joined', function (room, userId) {
        console.log('Joined event triggered'); // Add this line

        if (userId === name) {
            // it enters the chat
            console.log('Jinside if statement'); // Add this line

            hideLoginInterface(room, userId);

            fetchChatHistory(room)
                .then(() => {
                    console.log('Chat history fetched and displayed');
                    // Add any code here that should run after the chat history has been fetched and displayed.
                })
                .catch((error) => {
                    console.error('Error while fetching chat history:', error);
                });
        } else {
            // notifies that someone has joined the room
            // writeOnHistory('<b>'+userId+'</b>' + ' joined room ' + room);
        }
    });

    // called when a message is received
    socket.on('chat', function (room, userId, chatText) {
        let who = userId
        if (userId === name) who = 'Me';
        writeOnHistory('<b>' + who + ':</b> ' + chatText);
    });

}

/**
 * called to generate a random room number
 * This is a simplification. A real world implementation would ask the server to generate a unique room number
 * so to make sure that the room number is not accidentally repeated across uses
 */
// function generateRoom() {
//     roomNo = Math.round(Math.random() * 10000);
//     document.getElementById('roomNo').value = 'R' + roomNo;
// }

async function fetchChatHistory(sightingId) {
    console.log('fetchChatHistory called'); // Add this line

    try {
        const response = await fetch(`/sightings/chat-history/${sightingId}`);
        const chatHistory = await response.json();
        console.log('Fetched chat history:', chatHistory); // Add this line


        chatHistory.forEach((chat) => {
            writeOnHistory(`<b>${chat.userId}:</b> ${chat.message}`);
        });
    } catch (error) {
        console.error("Error fetching chat history:", error);
    }
}


/**
 * called when the Send button is pressed. It gets the text to send from the interface
 * and sends the message via  socket
 */
function sendChatText() {
    let chatText = document.getElementById('chat_input').value;
    socket.emit('chat', roomNo, name, chatText);
}

/**
 * used to connect to a room. It gets the user name and room number from the
 * interface
 */
function connectToRoom(sightingId) {

    // console.log(sightingId + " ***************");
    // roomNo = document.getElementById('roomNo').value;
    // room = 1;
    roomNo = sightingId.toString()

    name = document.getElementById('name').value;
    if (!name) name = 'Unknown-' + Math.random();
    socket.emit('create or join', roomNo, name);
}

/**
 * it appends the given html text to the history div
 * @param text: the text to append
 */
function writeOnHistory(text) {
    let history = document.getElementById('history');
    let paragraph = document.createElement('p');
    paragraph.innerHTML = text;
    history.appendChild(paragraph);
    document.getElementById('chat_input').value = '';
}

/**
 * it hides the initial form and shows the chat
 * @param room the selected room
 * @param userId the user name
 */
function hideLoginInterface(room, userId) {
    document.getElementById('initial_form').style.display = 'none';
    document.getElementById('chat_interface').style.display = 'block';
    document.getElementById('who_you_are').innerHTML= userId;
    document.getElementById('in_room').innerHTML= ' '+room;
}



// async function fetchBirdTypes() {
//     const sparqlQuery = `
//     PREFIX dbo: <http://dbpedia.org/ontology/>
//     PREFIX dbr: <http://dbpedia.org/resource/>
//     SELECT DISTINCT ?about
//     WHERE {
//         dbr:Bird dbo:wikiPageWikiLink ?resource .
//         ?resource dbo:abstract ?about .
//         FILTER(lang(?about) = "en") .
//     }
//     LIMIT 100
//     `;
//     const url = "https://dbpedia.org/sparql?query=" + encodeURIComponent(sparqlQuery) + "&format=json";
//
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         return data.results.bindings;
//     } catch (error) {
//         console.error("Error fetching bird types:", error);
//         return [];
//     }
// }
//
// function populateBirdTypesDropdown(birdTypes) {
//     const dropdown = document.getElementById("type");
//     birdTypes.forEach((birdType) => {
//         const option = document.createElement("option");
//         option.value = option.textContent = birdType.about.value;
//         dropdown.appendChild(option);
//     });
// }

window.onload = function() {
    const sortEle = document.getElementById("sort");
    const sortOptions = sortEle.getElementsByTagName('option');
    const urlSearchParams = new URLSearchParams(window.location.search);
    const sort = urlSearchParams.get('sort');
    for (let i = 0; i < sortOptions.length; i++) {
        if (sortOptions[i].value === sort) {
            sortOptions[i].selected = true;
        }
    }

    sortEle.addEventListener("change", function(event) {
        document.getElementById("form").submit();
    })
}


// Service worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

