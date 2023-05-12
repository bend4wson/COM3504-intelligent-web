const Chat = require('../databases/chatModel');

exports.fetchChatHistory = async function (req, res) {
    const sightingId = req.params.sightingId;

    try {
        const chatHistory = await Chat.find({ birdSightingId: sightingId }).sort({ timestamp: 1 }).exec();

        res.status(200).json(chatHistory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
