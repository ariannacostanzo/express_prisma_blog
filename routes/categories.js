const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categories.js");

//validators
const validator = require("../middlewares/validator.js")
const categoriesValidations = require("../validations/categories.js")

router.post("/", validator(categoriesValidations.bodyData),categoryController.store);
router.get("/", categoryController.index);

router.use("/:id", validator(categoriesValidations.paramId));

router.get("/:id",categoryController.show); 
router.delete("/:id", categoryController.destroy);
router.put("/:id",validator(categoriesValidations.bodyData),categoryController.update);

module.exports = router;
