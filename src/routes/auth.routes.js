const express = require("express");
const router = express.Router();
const AuthCtrls = require("../controllers/auth.controllers");

router.post("/register", AuthCtrls.register);
router.get("/verify-email/:token", AuthCtrls.verifyEmail);
router.post("/login", AuthCtrls.login);
router.post("/reset-password", AuthCtrls.resetPasswordEmail);
router.post("/reset-password/:token", AuthCtrls.updatePassword);

module.exports = router;
