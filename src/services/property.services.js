const mongoose = require("mongoose");
const Property = require("../models/properties");
const Properties = mongoose.model("Property");
const Queries = mongoose.model("Query");

const createProp = (propData) => {
    return Properties.create(propData);
};

const getProps = (filterBy) => {
    return Properties.find(filterBy).populate("postedBy");
};

const getPropById = (propId) => {
    return Properties.findById(propId).populate("postedBy");
};

const getByRera = (reraNumber) => {
    return Properties.findOne({reraNumber});
};

const getUsersProps = (userId) => {
    return Properties.find({ postedBy: userId });
};

const updateProp = (propData) => {
    return Properties.findByIdAndUpdate(propData._id, propData);
};

const deleteProp = (propId) => {
    return Properties.findByIdAndDelete(propId);
};

const addToQuery = (userId, propId) => {
    return Queries.findOneAndUpdate(
        { property: propId },
        {
            $addToSet: {
                interestedUsers: userId,
            },
        },
        {
            upsert: true,
        }
    );
};

const getInterestedUsers = (propId) => {
    return Queries.findOne({ property: propId }, {interestedUsers: true}).populate("interestedUsers");
};

const getMyQueriedProps = (userId) => {
    return Queries.find({interestedUsers: userId}, {_id: false, property: true}).populate("property");
};

const makePremium = (propId, valid) => {
    return Property.findByIdAndUpdate(propId, {premium: true, premiumExpiry: new Date().setMonth(new Date().getMonth()+valid)});
};

module.exports = {
    createProp,
    getProps,
    getPropById,
    getByRera,
    getUsersProps,
    updateProp,
    deleteProp,
    addToQuery,
    getInterestedUsers,
    getMyQueriedProps,
    makePremium,
};
