const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");

const addUser = (newUserDetails) => {
    return User.create(newUserDetails);
};

const verifyEmail = async (email) => {
    const user = await User.findOne({ email });
    user.emailVerified = true;
    user.verifiedUser = true;
    return await user.save();
};

const getUserById = (userId) => {
    return User.findById(userId);
};

const validateUser = async (userDetails) => {
    const user = await User.findOne({
        email: userDetails.email,
    });

    if (!user) return null;
    const isValid = await bcrypt.compare(userDetails.password, user.password);
    if (!isValid) return null;

    return user;
};

const getUserByEmail = (email) => {
    return User.findOne({ email });
};

const updatePassword = async (email, password) => {
    const user = await User.findOne({ email });
    user.password = password;
    return await user.save();
};

module.exports = {
    addUser,
    verifyEmail,
    getUserById,
    validateUser,
    getUserByEmail,
    updatePassword,
};
