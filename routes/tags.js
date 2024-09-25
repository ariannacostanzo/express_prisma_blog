const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tags.js");

//validators
const validator = require("../middlewares/validator.js")
const tagsValidations = require("../validations/tags.js")

router.post("/", validator(tagsValidations.bodyData),tagController.store);
router.get("/", tagController.index);

router.use("/:id", validator(tagsValidations.paramId));

router.get("/:id", tagController.show); 
router.delete("/:id", tagController.destroy);
router.put("/:id",validator(tagsValidations.bodyData), tagController.update);

module.exports = router;
