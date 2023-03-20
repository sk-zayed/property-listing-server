const express = require("express");
const router = express.Router();
const AuthCtrls = require("../controllers/auth.controllers");

router.post("/register", AuthCtrls.register);
router.get("/verifyEmail/:token", AuthCtrls.verifyEmail);
router.post("/login", AuthCtrls.login);
router.post("/resetPassword", AuthCtrls.resetPasswordEmail);
router.post("/resetPassword/:token", AuthCtrls.updatePassword);

module.exports = router;
