const mongoose = require('mongoose')

const leaderboardSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    score: {
        type: Number,
        required: true
    }
})

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema)
module.exports = Leaderboard