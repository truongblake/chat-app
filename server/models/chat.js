const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    room: String,
    messages: [
        {
            user:{type:String, required:true},
            message:{type:String, require:true},
        }
    ]
})

module.exports = mongoose.model("chat",ChatSchema);