const {Router} = require("exporess");

const router = Router();

const controller = require("../controllers/feedback.controller");

router.route("/").post(controller.sendFeedback);
router.route("/").get(controller.getFeedbacks);


module.exports = router