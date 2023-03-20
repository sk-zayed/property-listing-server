const { Errors, Plans } = require("../constants");
const UserServices = require("../services/auth.services");
const PropServices = require("../services/property.services");
const sendMail = require("../utils/sendmail");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const createProp = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        const error = new Error(
            "Request body is empty and need to have property details!"
        );
        error.name = Errors.BadRequest;
        return next(error);
    }

    const exists = await PropServices.getByRera(req.body.reraNumber);

    if (exists) {
        const error = new Error("Property with RERA already exists!");
        error.name = Errors.BadRequest;
        return next(error);
    }

    try {
        const propData = {
            postedBy: res.locals.claims.user,
            ...req.body,
        };

        const response = await PropServices.createProp(propData);

        // send mail to owner
        const sendTo = res.locals.claims.email;
        const subject = "Posted a property!";
        const body = "Under verification!";

        await sendMail(sendTo, subject, body);

        res.status(201).json({
            status: "success",
            data: response,
        });
    } catch (error) {
        console.error("createProp ctrls --> ", error);
        return next(error);
    }
};

const getProps = async (req, res, next) => {
    try {
        const {
            city,
            type,
            furnishing,
            availabilityStatus,
            age,
            noOfRooms,
            minPrice,
            maxPrice,
            minArea,
            maxArea,
        } = req.body;

        // for
        // city

        // type
        // furnishingType
        // availabilityStatus

        // age
        // noOfRooms
        // minPrice
        // maxPrice
        // minArea
        // maxArea

        let filterBy = {
            for: req.body.for,
            city,
        };

        if (type) {
            filterBy = {
                ...filterBy,
                type,
            };
        }

        if (furnishing) {
            filterBy = {
                ...filterBy,
                furnishing,
            };
        }

        if (availabilityStatus) {
            filterBy = {
                ...filterBy,
                availabilityStatus,
            };
        }

        const response = await PropServices.getProps(filterBy);
        var filtered = response;

        if (maxPrice)
            filtered = filtered.filter((property) => {
                return property.price >= minPrice && property.price <= maxPrice;
            });

        if (maxArea)
            filtered = filtered.filter((property) => {
                return (
                    property.propArea >= minArea && property.propArea <= maxArea
                );
            });

        if (noOfRooms)
            filtered = filtered.filter((property) => {
                return property.noOfRooms === noOfRooms;
            });

        if (age)
            filtered = filtered.filter((property) => {
                return property.age <= age;
            });

        res.status(200).json({
            status: "success",
            data: filtered,
        });
    } catch (error) {
        console.error("getProps ctrls --> ", error);
        return next(error);
    }
};

const getPropById = async (req, res, next) => {
    try {
        const response = await PropServices.getPropById(req.params.id);
        res.status(200).json({
            status: "success",
            data: response,
        });
    } catch (error) {
        console.error("getPropById ctrls --> ", error);
        return next(error);
    }
};

const getUsersProps = async (req, res, next) => {
    try {
        const response = await PropServices.getUsersProps(
            res.locals.claims.user
        );
        res.status(200).json({
            status: "success",
            data: response,
        });
    } catch (error) {
        console.error("getUsersProps ctrls --> ", error);
        return next(error);
    }
};

const updateProp = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        const error = new Error(
            "Request body is empty and need to have property details!"
        );
        error.name = Errors.BadRequest;
        return next(error);
    }

    if (res.locals.claims.user !== req.body.postedBy._id) {
        const error = new Error("Only owner can update the details!");
        error.name = Errors.UnAuthorized;
        return next(error);
    }

    try {
        const response = await PropServices.updateProp(req.body);

        res.status(201).json({
            status: "success",
            data: response,
        });
    } catch (error) {
        console.error("updateProp ctrls --> ", error);
        return next(error);
    }
};

const deleteProp = async (req, res, next) => {
    try {
        const response = await PropServices.deleteProp(req.params.id);
        res.status(201).json({
            status: "success",
            data: response,
        });
    } catch (error) {
        console.error("deleteProp ctrls --> ", error);
        return next(error);
    }
};

const contactOwner = async (req, res, next) => {
    try {
        const property = res.locals.property;

        // add query to db
        await PropServices.addToQuery(res.locals.claims.user, req.params.id);

        // send mail to owner
        const user = await UserServices.getUserById(res.locals.claims.user);

        const sendTo = property.postedBy.email;
        const subject = "Property query!";
        const body = `${
            user.firstname + user.lastname
        } has shown interest in your property!`;

        await sendMail(sendTo, subject, body);

        res.status(200).json({
            status: "success",
            data: property.postedBy,
        });
    } catch (error) {
        console.error("contactOwner ctrls --> ", error);
        return next(error);
    }
};

const getInterestedUsers = async (req, res, next) => {
    try {
        const response = await PropServices.getInterestedUsers(req.params.id);
        res.status(200).json({
            status: "success",
            data: response,
        });
    } catch (error) {
        console.error("getInterestedUsers --> ", error);
        return next(error);
    }
};

const getMyQueriedProps = async (req, res, next) => {
    try {
        const response = await PropServices.getMyQueriedProps(
            res.locals.claims.user
        );
        res.status(200).json({
            status: "success",
            data: response,
        });
    } catch (error) {
        console.error("getMyQueriedProps --> ", error);
        return next(error);
    }
};

const propHistory = async (req, res, next) => {
    try {
        const owners = ["640d690bd936e05a63d2eeb5", "640de694dccf7117d5ff4afc"];
        var response = [];
        for (const ownerId in owners) {
            const owner = await UserServices.getUserById(owners[ownerId]);
            response.push(owner);
        }
        res.status(200).json({
            status: "success",
            data: response,
        });
    } catch (error) {
        console.error("propHistory ctrls --> ", error);
        return next(error);
    }
};

const buyPremium = async (req, res, next) => {
    try {
        if(res.locals.property.premium) {
            const error = new Error("Already a premium property!");
            error.name = Errors.Forbidden;
            return next(error);
        }

        // payment gateway
        const chosenPlan = Plans[req.body.plan];
        const session = await stripe.checkout.sessions.create({
            // payment_method_types: [],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "INR",
                        unit_amount: chosenPlan.price,
                        product_data: {
                            name: chosenPlan.name,
                        },
                    },
                    quantity: 1,
                },
            ],
            // success_url: `${process.env.BASE_URL}/api/property/setPremium/${req.params.id}/${chosenPlan.valid}`,
            success_url: req.body.success_url,
            cancel_url: req.body.cancel_url,
        });

        res.status(200).json({
            plan: chosenPlan,
            url: session.url,
        });
    } catch (error) {
        console.error("buyPremium ctrls --> ", error);
        next(error);
    }
};

const paymentSuccessful = async (req, res, next) => {
    try {
        const response = await PropServices.makePremium(
            req.params.id,
            Plans[req.body.plan].valid
        );

        res.status(200).json({
            status: "success",
            data: response,
        });
    } catch (error) {
        console.error("paymentSuccessful ctrls --> ", error);
        next(error);
    }
};

module.exports = {
    createProp,
    getProps,
    getPropById,
    getUsersProps,
    updateProp,
    deleteProp,
    contactOwner,
    getInterestedUsers,
    getMyQueriedProps,
    propHistory, // incomplete
    buyPremium,
    paymentSuccessful,
};