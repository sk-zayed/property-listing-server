const mongoose = require("mongoose");
const User = mongoose.model("User");
const Property = mongoose.model("Property");

const getAllUsers = () => {
    return User.find();
};

const getAllProps = () => {
    return Property.find();
};

const verifyUser = (userId) => {
    return User.findByIdAndUpdate(userId, {verifiedUser: true});
};

const verifyProp = (propId) => {
    return Property.findByIdAndUpdate(propId, {verified: true}).populate("postedBy");
};

module.exports = {
    getAllUsers,
    getAllProps,
    verifyUser,
    verifyProp
};