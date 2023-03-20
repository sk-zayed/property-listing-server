const express = require("express");
const router = express.Router();
const PropertyCtrls = require("../controllers/property.controllers");
const { authenticate } = require("../middlewares/auth");
const { propertyExists, owns } = require("../middlewares/utils");

router.post("/create", authenticate, PropertyCtrls.createProp);
router.get("/properties", PropertyCtrls.getProps); // search
router.get("/id/:id", PropertyCtrls.getPropById);
router.get("/users-properties", authenticate, PropertyCtrls.getUsersProps);
router.patch("/update", authenticate, PropertyCtrls.updateProp);
router.delete("/:id", authenticate, propertyExists, owns, PropertyCtrls.deleteProp);
router.get("/contact/:id", authenticate, propertyExists, PropertyCtrls.contactOwner);
router.get("/interested-users/:id", authenticate, propertyExists, owns, PropertyCtrls.getInterestedUsers);
router.get("/queried", authenticate, PropertyCtrls.getMyQueriedProps);
router.get("/history/:id", propertyExists, PropertyCtrls.propHistory); // incomplete
router.post("/premium/:id", authenticate, propertyExists, owns, PropertyCtrls.buyPremium);
router.patch("/payment-successful/:id", authenticate, propertyExists, owns, PropertyCtrls.paymentSuccessful);

module.exports = router;