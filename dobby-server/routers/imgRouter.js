const router = require("express").Router();
const imageController = require("../controllers/imgController");
const requireUser = require("../middlewares/requireUser");

router.post("/createImg", requireUser, imageController.uploadImageController);
router.get("/getImg", requireUser, imageController.getAllImagesController);

module.exports = router;
