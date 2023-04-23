const express = require("express");
const router = express.Router();
const AuthCtrls = require("../controllers/auth.controllers");

router.post("/register", AuthCtrls.register);
router.get("/verify-email/:token", AuthCtrls.verifyEmail);
router.post("/login", AuthCtrls.login);
router.patch("/reset-password", AuthCtrls.resetPasswordEmail);
router.patch("/reset-password/:token", AuthCtrls.updatePassword);

module.exports = router;
