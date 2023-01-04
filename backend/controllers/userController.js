import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import { HttpCode, HttpErrorMessage } from '../helpers/constants.js'

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email})
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(HttpCode.UNAUTHORIZED)
        throw Error(HttpErrorMessage.INVALID_CREDENTIALS)
    }
})

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(HttpCode.UNAUTHORIZED)
        throw new Error(HttpErrorMessage.USER_NOT_FOUND)
    }
})

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(HttpCode.UNAUTHORIZED)
        throw new Error(HttpErrorMessage.USER_NOT_FOUND)
    }
})

// @desc Registar new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(HttpCode.BAD_REQUEST)
        throw new Error(HttpErrorMessage.USER_ALREADY_EXIST)
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if (user) {
        res.status(HttpCode.CREATED).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else{
        res.status(HttpCode.NOT_FOUND)
        throw new Error(HttpErrorMessage.USER_NOT_FOUND)
    }
})

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find({})
    res.json(users)
})

// @desc Delete user
// @route DELETE /api/users:id
// @access Private/Admin
const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove()
        res.json({message: `User ${req.params.id} removed`})
    } else {
        res.status(HttpCode.NOT_FOUND)
        throw new Error(HttpErrorMessage.USER_NOT_FOUND)
    }
    res.json(users)
})
// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.json(user)
    } else {
        res.status(HttpCode.NOT_FOUND)
        throw new Error(HttpErrorMessage.USER_NOT_FOUND)
    }
})

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(HttpCode.UNAUTHORIZED)
        throw new Error(HttpErrorMessage.USER_NOT_FOUND)
    }
})

export {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUserById
}