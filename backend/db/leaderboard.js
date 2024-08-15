import mongoose from "mongoose"

const leaderboardSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    score: {
        type: Number,
        required: true
    }
})

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema)
export default Leaderboard;