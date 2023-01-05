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
        name: 'Default Name',
        price: 0,
        user: req.user._id,
        image: '/images/default.jpg',
        brand: 'Default brand',
        category: 'Default category',
        countInStock: 0,
        numReviews: 0,
        description: 'Default description'
    })
    const createdProduct = await product.save()
    res.status(HttpCode.CREATED).json(createdProduct)
})

// @desc Update a product
// @route PUT /api/products/:id
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

// @desc Create new review
// @route PUT /api/products/:id
// @access Private
const createProductReview = asyncHandler(async(req, res) => {
    const {rating, comment} = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
        const alreadyReviewed = product.reviews.find(review => review?.user?.toString() === req.user?._id?.toString())
        if (alreadyReviewed) {
            res.status(HttpCode.BAD_REQUEST)
        throw new Error(HttpErrorMessage.PRODUCT_ALREADY_REVIEWED)
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user?._id
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, {rating}) => rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(HttpCode.CREATED).json({
            message: 'Review created'
        })

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
    updateProduct,
    createProductReview
}