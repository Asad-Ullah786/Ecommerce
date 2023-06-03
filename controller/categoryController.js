const { default: slugify } = require('slugify');
const categoryModel = require('../models/ccategoryModel')
exports.createCategoryController = async (req,res) => {
    try {
        const {name} = req.body;
        if(!name){
            return res.status(400).json({
                success: false,
                message: "name is required"
            })
        }
        const existingCategory = await categoryModel.findOne({name})
        if (existingCategory){
            return res.status(400).json({
                success: false,
                message: "category already exists"
            })
        }
        const category = await new categoryModel({name,slug:slugify(name)}).save();
        res.status(201).json({
            success: true,
            message: 'category created',
            category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error in Category creating"
        })
    }
}

exports.updateCategoryController = async (req,res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id,{
            name,slug: slugify(name)
        },{new: true});
        console.log(category)
        res.status(200).json({
            success: true,
            message: 'category updated successfully',
            category
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error:error.message,
            message: 'Error updating category'
        })
    }    
}
//getAll categories
exports.allCategoriesController = async (req,res) => {
    try {
        const categories = await categoryModel.find({})
        res.status(200).json({
            success: true,
            message: "all categories",
            categories
        })

        
    } catch (error) {
        res.status(500).json({
            success: true,
            message: "failed  categories fetching",
            error:error.message
        })
    }

}
exports.singleCAtegoryController = async (req,res) => {
    try {
        // const { id } = req
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).json({
            success: true,
            message: "get single category",
            category
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            error:error.message,
            message: "failed get single category",
        })
    }
}
exports.deleteCategoryController = async (req,res) => {
    try {
        await categoryModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: "delete successful"
            
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error:error.message,
            message: "failed deleting",
        })
    }
}