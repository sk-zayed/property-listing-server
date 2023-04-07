const Errors = {
    BadRequest: "BadRequest",
    NotFound: "NotFound",
    ValidationError: "ValidationError",
    MongoServerError: "MongoServerError",
    UnAuthorized: "UnAuthorized",
    InternalServerError: "InternalServerError",
    Forbidden: "Forbidden",
};

const Plans = {
    BASIC: {
        name: "Basic plan",
        price: 19900,
        valid: 1
    },
    PRO: {
        name: "Pro plan",
        price: 29900,
        valid: 3
    }
};

module.exports = {
    Errors,
    Plans
};