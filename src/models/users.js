const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    
    lastname: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true
    },
    
    role: {
        type: String,
        enum: ["general", "agent", "admin"],
        default: "general"
    },

    emailVerified: {
        type: Boolean,
        default: false
    },
    
    verifiedUser: {
        type: Boolean,
        default: false
    },
    
    documents: String,
    // bookMarked
});

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12);
    }

    if(this.isModified("emailVerified")) {
        if(this.role === "general") {
            this.verifiedUser = true;
        }
    }

    next();
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;