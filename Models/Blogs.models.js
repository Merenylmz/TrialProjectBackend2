const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: String,
    views: Number,
    categoryId:{
        type: {type: mongoose.Schema.Types.ObjectId},
        // ref: 'categories'
    }
});


const Blogs = mongoose.model("Blogs", blogsSchema);

module.exports = Blogs;