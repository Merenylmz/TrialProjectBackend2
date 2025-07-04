const express = require("express");
const { getBlogs, addBlog, getBlog, editBlog, deleteBlog } = require("../Controllers/Blog.controller");
const isValidToken = require("../Middlewares/isValidToken");
const router = express.Router();

router.get("/", isValidToken, getBlogs);
router.get("/:id", getBlog);
router.post("/create", addBlog);
router.put("/edit/:id", editBlog);
router.get("/delete/:id", deleteBlog);

module.exports = router;