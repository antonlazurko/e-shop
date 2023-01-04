import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import { HttpCode, HttpErrorMessage } from '../helpers/constants.js'

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

// @desc Create a product
// @route POST /api/products/
// @access Private/Admin
const createProduct = asyncHandler(async(req, res) => {
    const product = new Product({
        name: 'QWE',
        price: 100,
        user: req.user._id,
        image: '/images/test.jpg',
        brand: 'QWE Int',
        category: 'Phones',
        countInStock: 10,
        numReviews: 0,
        description: 'SOME TEST TEXT'
    })
    const createdProduct = await product.save()
    res.status(HttpCode.CREATED).json(createdProduct)
})

// @desc Update a product
// @route PUT /api/products/;id
// @access Private/Admin
const updateProduct = asyncHandler(async(req, res) => {
    const {name, price, description, image, brand, category, countInStock} = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock
    } else {
        res.status(HttpCode.NOT_FOUND)
        throw new Error(HttpErrorMessage.PRODUCT_NOT_FOUND)
    }
    const updatedProduct = await product.save()
    res.status(HttpCode.CREATED).json(updatedProduct)
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
}