import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { HttpCode,HttpErrorMessage } from '../helpers/constants.js';


const protect = asyncHandler(async (req, res, next) => {
    let token
if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    console.log('Token found');
    try {
        token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded?.id).select('-password')
    } catch (error) {
        console.error(error);
        res.status(HttpCode.UNAUTHORIZED)
        throw new Error(HttpErrorMessage.NOT_AUTHORIZED_TOKENFAILED)
    }
}
if (!token) {
    res.status(HttpCode.UNAUTHORIZED)
    throw new Error(HttpErrorMessage.NOT_AUTHORIZED)
}
    next()
})
const admin = (req, res, next) => {
    if (req?.user?.isAdmin) {
        next()
      } else {
        res.status(HttpCode.UNAUTHORIZED)
        throw new Error(HttpErrorMessage.NOT_AUTHORIZED_AS_AN_ADMIN)
      }
}
export {protect, admin}