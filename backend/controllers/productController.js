import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import { HttpCode } from '../helpers/constants.js'

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async(req, res) => {
        const products = await Product.find({})
        res.json(products)
})

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
        if (product) {
            res.json(product)
        } else {
            res.status(HttpCode.NOT_FOUND)
            throw new Error(HttpErrorMessage.PRODUCT_NOT_FOUND)
        }
})

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
        if (product) {
            await product.remove()
            res.json({message: 'Product removed'})
        } else {
            res.status(HttpCode.NOT_FOUND)
            throw new Error(HttpErrorMessage.PRODUCT_NOT_FOUND)
        }
})

export {
    getProducts,
    getProductById,
    deleteProduct,
}