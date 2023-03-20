const express = require("express");
const router = express.Router();
const AdminCtrls = require("../controllers/admin.controllers");
const {authenticate, authorize} = require("../middlewares/auth");

router.get("/getAllUsers", authenticate, authorize("admin"), AdminCtrls.getAllUsers);
router.get("/getAllProps", authenticate, authorize("admin"), AdminCtrls.getAllProps);
router.patch("/verifyUser/:id", authenticate, authorize("admin"), AdminCtrls.verifyUser);
router.patch("/verifyProp/:id", authenticate, authorize("admin"), AdminCtrls.verifyProp);

module.exports = router;