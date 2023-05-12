// const Chat = require('../models/chatModel');
//
// exports.init = function(io) {
//     io.sockets.on('connection', function (socket) {
//         console.log("try");
//         try {
//             /**
//              * create or joins a room
//              */
//             socket.on('create or join', function (room, userId) {
//                 console.log(room)
//                 socket.join(room);
//                 io.sockets.to(room).emit('joined', room, userId);
//             });
//
//             socket.on('chat', function (room, userId, chatText) {
//                 // Save the chat message in the database
//                 const chat = new Chat({
//                     birdSightingId: room,
//                     userId: userId,
//                     message: chatText,
//                 });
//
//                 await chat.save();
//
//                 io.sockets.to(room).emit('chat', room, userId, chatText);
//             });
//
//             socket.on('disconnect', function(){
//                 console.log('someone disconnected');
//             });
//         } catch (e) {
//         }
//     });
// }










const Chat = require('../databases/chatModel');

exports.init = function(io) {
    io.sockets.on('connection', function (socket) {
        console.log("try");
        try {
            /**
             * create or joins a room
             */
            socket.on('create or join', function (room, userId) {
                console.log(room)
                socket.join(room);
                io.sockets.to(room).emit('joined', room, userId);
            });

            // Add 'async' keyword before the function
            socket.on('chat', async function (room, userId, chatText) {
                // Save the chat message in the database
                const chat = new Chat({
                    birdSightingId: room,
                    userId: userId,
                    message: chatText,
                });

                await chat.save();
                console.log('Chat message saved:', chat); // Add this line

                io.sockets.to(room).emit('chat', room, userId, chatText);
            });


            socket.on('disconnect', function(){
                console.log('someone disconnected');
            });
        } catch (e) {
        }
    });
}

