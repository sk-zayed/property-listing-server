const PropertyServices = require("../services/property.services");
const Errors = require("../constants");

const propertyExists = async (req, res, next) => {
    const property = await PropertyServices.getPropById(req.params.id);
    if (!property) {
        const error = new Error("Property does not exist!");
        error.name = Errors.BadRequest;
        next(error);
    }
    res.locals.property = property;
    next();
};

const owns = (req, res, next) => {
    if(String(res.locals.property.postedBy._id) !== res.locals.claims.user) {
        const error = new Error("Only owner has this access!");
        error.name = Errors.UnAuthorized;
        next(error);
    }
    next();
};

module.exports = {
    propertyExists,
    owns
};
