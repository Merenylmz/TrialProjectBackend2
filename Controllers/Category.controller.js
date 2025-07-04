const Category = require("../Models/Category.models");
const client = require("../Redis/redisClient");

const getCategories = async(req, res)=>{
    const categories = await Category.find().populate("blogs.blog").exec();
    
    res.send(categories);
};



const addCategories = async(req, res)=>{
    const {title} = req.body;

    const newCategory = new Category({
        title,
    });


    const response = await newCategory.save();
    res.send({res: "Succesfully", newCategory});
};

const deleteCategory = async(req, res)=>{
    const response = await Category.deleteOne({_id: req.params.id});

    res.send(response.deletedCount > 0 ? {res: "Successfully"} : {res:"Error"});
};

const editCategories = async(req, res)=>{
    const {title} = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {
        title
    });

    // await updatedCategory.save();
    res.send({res: "Succesfully", updatedCategory});
};

module.exports = {getCategories, addCategories, deleteCategory, editCategories};