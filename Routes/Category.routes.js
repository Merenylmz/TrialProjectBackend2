const express = require("express");
const { getCategories, addCategories, deleteCategory, editCategories } = require("../Controllers/Category.controller");
const router = express.Router();

router.get("/", getCategories); 
router.get("/delete/:id", deleteCategory); 
router.put("/edit/:id", editCategories);
router.post("/create", addCategories); 

module.exports = router;