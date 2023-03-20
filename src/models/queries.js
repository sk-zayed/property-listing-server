const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true
    },
    interestedUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    time: {
        type: Date,
        default: Date.now()
    }
});

// querySchema.set("timestamps", true);

const Query = mongoose.model("Query", querySchema);
module.exports = Query;