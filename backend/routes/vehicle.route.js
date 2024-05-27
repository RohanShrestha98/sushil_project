const { Router } = require('express');
const router = Router();
const {upload} = require("../Utils/multer.js")

const controller = require('../controllers/vehicle.controller');

router.get("/", controller.getVehicles);
router.route("/:vendor").get(controller.getVehiclesByVendorId)
router.get("/:id", controller.getVehicleById);
router.route("/add").post(upload.fields([{
    name: "image",
    maxCount: 1
}]), controller.addVehicle);
router.put("/edit/:id", controller.editVehicle);
router.delete("/delete/:id", controller.deleteVehicle);
router.get("/search/:category/:max_budget", controller.getVehicleByCategoryAndBudget);

module.exports = router;