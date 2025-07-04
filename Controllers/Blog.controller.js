const { default: mongoose } = require("mongoose");
const Blogs = require("../Models/Blogs.models");
const Category = require("../Models/Category.models");

const getBlogs = async(req, res)=>{
    const blogs = await Blogs.find(); 

    res.send(blogs);
};

const getBlog = async(req, res)=>{
    const blog = await Blogs.findById(req.params.id); 

    res.send(blog);
};

const addBlog = async(req, res)=>{
    const {title, description, categoryId} = req.body;

    const newBlog = new Blogs({
        title,
        description,
        categoryId
    });
    await newBlog.save();
    // blogs:[...blogs, {blog: newBlog.id}]
    
    const newblogId = new mongoose.Types.ObjectId(newBlog.id)
    
    await Category.findByIdAndUpdate(categoryId, {
        $push: {blogs:{
            blog: newblogId
        }}
    });

    res.send(newBlog);
}

const editBlog = async(req, res) =>{
    const {title, description} = req.body;

    const response = await Blogs.findByIdAndUpdate(req.params.id, {
        title,
        description,
    });

    res.send(response);
}

const deleteBlog = async(req, res) =>{
    const response = await Blogs.findByIdAndDelete(req.params.id);
    await Category.findByIdAndUpdate(response.categoryId, {
        $pull: {blogs:{
            blog: req.params.id
        }}
    });
    res.send(response);
}

module.exports = {addBlog, getBlogs, getBlog, editBlog, deleteBlog};