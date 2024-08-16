const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: [{ type: String }],
    expenses: [
        {
            description: String,
            amount: Number,
            paidBy: String,
            participants: [String],
        },
    ],
    userId: { type: String, required: true }, // Add this line
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;

