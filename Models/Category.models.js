const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    blog: {type: mongoose.Schema.Types.ObjectId, ref: "Blogs"}
});

const categorySchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    blogs:{
        type: [blogSchema]
    }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
