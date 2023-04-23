const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    reraNumber: {
        type: String,
        required: true,
    },

    for: {
        type: String,
        required: true,
    },

    type: {
        type: String,
        required: true,
    },

    society: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        required: true,
    },

    state: {
        type: String,
        required: true,
    },

    zipcode: {
        type: Number,
        required: true,
    },

    noOfBedrooms: {
        type: Number,
        required: true,
    },

    noOfBathrooms: {
        type: Number,
        required: true,
    },

    noOfBalconies: {
        type: Number,
        required: true,
    },

    builtUpArea: {
        type: Number,
        required: true,
    },

    furnishing: {
        type: String,
        required: true,
    },

    floor: {
        type: Number,
        required: true,
    },

    totalFloors: {
        type: Number,
        required: true,
    },

    availabilityStatus: {
        //
        type: String,
        required: false,
    },

    age: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    postedOn: {
        type: Date,
        default: new Date(),
    },

    verifiedProp: {
        type: Boolean,
        default: false,
    },

    premium: {
        type: Boolean,
        default: false,
    },

    premiumExpiry: Date,
    paid: Number,
    paidOn: Date,
    description: String,
    lattitude: String,
    longitude: String,

    //Featues:
    gym: Boolean,
    carParking: Boolean,
    lift: Boolean,
    powerSupply: Boolean,
    waterSupply: Boolean,
    playArea: Boolean,
    clubHouse: Boolean,
    pipedGas: Boolean,
    pool: Boolean,

    //Aminities:
    light: Boolean,
    fan: Boolean,
    bed: Boolean,
    ac: Boolean,
    wardrobe: Boolean,
    geyser: Boolean,
    waterPurifier: Boolean,
    diningTable: Boolean,
    fridge: Boolean,
    oven: Boolean,
    exhaustFan: Boolean,
    modularKitchin: Boolean,
    chimney: Boolean,
    sofa: Boolean,
    curtain: Boolean,
    tv: Boolean,
    washingMachine: Boolean,

    //Images:
    propImages: String,
});

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
