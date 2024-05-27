const { Router } = require("express");
const router = Router();
const { upload } = require("../Utils/multer.js");

const vendorController = require("../controllers/vendor.controller");

router.get("/", vendorController.getVendors);
router.post("/login", vendorController.login);
router.patch("/block/:id", vendorController.blockVendor);

router.route("/signup").post(
  upload.fields([
    {
      name: "citizenship",
      maxCount: 1,
    },
    {
      name: "pan",
      maxCount: 1,
    },
  ]),
  vendorController.signup
);

module.exports = router;
