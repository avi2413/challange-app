import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    "_id": false,
    name: {
        type: String,
        unique: true,
        required: true
    },
    firstCorrect: {
        type: Date
    },
    firstCorrect2: {
        type: Date
    },
    attempts: {
        type: Number,
        default: 0
    },
    attempts2: {
        type: Number,
        default: 0
    }
}, {timestamp: true})

export default mongoose.model("User", userSchema);