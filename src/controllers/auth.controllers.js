const { Errors } = require("../constants");
const AuthServices = require("../services/auth.services");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendmail");

const register = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        const error = new Error(
            "Request body is empty and need to have users' details!"
        );
        error.name = Errors.BadRequest;
        return next(error);
    }

    try {
        const exist = await AuthServices.getUserByEmail(req.body.email);

        if(exist) {
            const error = new Error("User with email already exists!");
            error.name = Errors.ValidationError;
            return next(error);
        }

        const user = await AuthServices.addUser(req.body);
        const userObj = user.toObject();

        delete userObj.password;
        
        const token = jwt.sign({email: user.email}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"});
        
        const sendTo = user.email;
        const subject = "Verify email";
        const verificationURL = `${process.env.BASE_URL}/api/auth/verifyEmail/${token}`;
        const body = `<p>Click <a href=${verificationURL}>here</a> to verify.</p>`;

        sendMail(sendTo, subject, body);

        res.status(201).json({
            status: "success",
            data: userObj,
        });
    } catch (error) {
        return next(error);
    }
};


const verifyEmail = async (req, res, next) => {
    try {
        const token = req.params.token;
        const claims = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        const response = await AuthServices.verifyEmail(claims.email);

        res.status(200).json({
            status: "success",
            data: response
        });

    } catch(error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        const error = new Error(
            "Request body is empty and need to have users' details!"
        );
        error.name = Errors.BadRequest;
        return next(error);
    }

    try {
        const user = await AuthServices.validateUser(req.body);
        if (!user) {
            const error = new Error("Invalid credentials");
            error.name = Errors.UnAuthorized;
            return next(error);
        }

        const claims = {
            user: user._id,
            email: user.email,
            role: user.role,
        };

        jwt.sign(
            claims,
            process.env.JWT_SECRET_KEY,
            /*{expiresIn: "7d"},*/ (err, token) => {
                res.status(201).json({
                    status: "success",
                    data: {
                        ...claims,
                        token: token,
                    },
                });
            }
        );
    } catch (error) {
        const err = new Error("Something went wrong during authorization.");
        err.name = Errors.InternalServerError;
        return next(err);
    }
};

const resetPasswordEmail = (req, res, next) => {
    try {
        const email = req.body.email;
        const token = jwt.sign({email}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"});

        const sendTo = email;
        const subject = "Reset password!";
        const resetPasswordURL = `${process.env.BASE_URL}/api/auth/resetPassword/${token}`;
        const body = `<p>Click <a href=${resetPasswordURL}>here</a> to reset password.</p>`;

        sendMail(sendTo, subject, body);

        res.status(200).json({
            status: "success",
            data: body
        });

    } catch(error) {
        next(error);
    }
};

const updatePassword = async (req, res, next) => {
    try {
        const newPassword = req.body.password;
        const token = req.params.token;

        const claims = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await AuthServices.updatePassword(claims.email, newPassword);

        const response = user.toObject();
        delete response.password;

        res.status(200).json({
            status: "success",
            data: response
        });
    } catch(error) {
        next(error);
    }
};


module.exports = {
    register,
    verifyEmail,
    login,
    resetPasswordEmail,
    updatePassword
};
