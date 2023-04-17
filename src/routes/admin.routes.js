const express = require("express");
const router = express.Router();
const AdminCtrls = require("../controllers/admin.controllers");
const {authenticate, authorize} = require("../middlewares/auth");

router.get("/users", authenticate, authorize("admin"), AdminCtrls.getAllUsers);
router.get("/properties", authenticate, authorize("admin"), AdminCtrls.getAllProps);
router.patch("/verify-user/:id", authenticate, authorize("admin"), AdminCtrls.verifyUser);
router.delete("/delete-user/:id", authenticate, authorize("admin"), AdminCtrls.deleteUser);
router.patch("/verify-property/:id", authenticate, authorize("admin"), AdminCtrls.verifyProp);
router.delete("/delete-property/:id", authenticate, authorize("admin"), AdminCtrls.deleteProp);

module.exports = router;