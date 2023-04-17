const mongoose = require("mongoose");
const User = mongoose.model("User");
const Property = mongoose.model("Property");

const getAllUsers = () => {
    return User.find();
};

const getAllProps = () => {
    return Property.find().populate("postedBy");
};

const verifyUser = (userId) => {
    return User.findByIdAndUpdate(userId, {verifiedUser: true});
};

const deleteUser = (userId) => {
    return User.findByIdAndDelete(userId);
};

const verifyProp = (propId) => {
    return Property.findByIdAndUpdate(propId, {verifiedProp: true}).populate("postedBy");
};

const deleteProp = (propId) => {
    return Property.findByIdAndDelete(propId);
};

module.exports = {
    getAllUsers,
    getAllProps,
    verifyUser,
    deleteUser,
    verifyProp,
    deleteProp
};