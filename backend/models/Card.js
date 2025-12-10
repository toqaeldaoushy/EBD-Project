import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
    UserID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requires: true
    },
    Last4:{
        type: String,
        required: true
    },
    Brand:{
        type: String,
        default: "Visa"

    },
    Status:{
        type: String,
        default: "active"
    },
    CreatedAt:{
        type: Date,
        default: Date.now
    }
});
module.exports= mongoose.model("Card", CardSchema);