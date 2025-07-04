const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    blog: mongoose.Schema.Types.ObjectId
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastLoginToken: String,
    blogs: [blogSchema]
});

const User = mongoose.model("User", userSchema);

module.exports = User;