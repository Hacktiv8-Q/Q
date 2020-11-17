const router = require("express").Router();
const NotificationController = require("../controllers/NotificationController");

router.post("/", NotificationController.getNotification);

module.exports = router;
