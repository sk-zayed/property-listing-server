const {Errors} = require("../constants");
const AdminServices = require("../services/admin.services");
const sendMail = require("../utils/sendmail");

const getAllUsers = async (req, res, next) => {
    try{
        const response = await AdminServices.getAllUsers();

        res.status(200).json({
            status: "success",
            data: response
        });
    } catch(error) {
        console.error("getAllUsers --> ", error);
        return next(error);
    }
};

const getAllProps = async (req, res, next) => {
    try{
        const response = await AdminServices.getAllProps();

        res.status(200).json({
            status: "success",
            data: response
        });
    } catch(error) {
        console.error("getAllProps --> ", error);
        return next(error);
    }
};

const verifyUser = async (req, res, next) => {
    try{
        const response = await AdminServices.verifyUser(req.prams.id);

        // send mail to owner
        const sendTo = response.email;
        const subject = "User verification done!";
        const body = "Body here!";

        await sendMail(sendTo, subject, body);

        res.status(200).json({
            status: "success",
            data: response
        });
    } catch(error) {
        console.error("verifyUser --> ", error);
        return next(error);
    }
};

const verifyProp = async (req, res, next) => {
    try{
        const response = await AdminServices.verifyProp(req.params.id);

        // send mail to owner
        const sendTo = response.postedBy.email;
        const subject = "Property verification done!";
        const body = "Body here!";

        await sendMail(sendTo, subject, body);

        res.status(200).json({
            status: "success",
            data: response
        });
    } catch(error) {
        console.error("verifyProp --> ", error);
        return next(error);
    }
};

module.exports = {
    getAllUsers,
    getAllProps,
    verifyUser,
    verifyProp 
};