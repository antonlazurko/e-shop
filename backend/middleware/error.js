import { HttpCode } from '../helpers/constants.js'
const notFound = (req,res,next) => {
    const error = new Error(`Not found - ${req.originalUrl}`)
    res.status(HttpCode.NOT_FOUND)
    next(error)
}

const errorHandler = (err, req,res,next) => {
    const statusCode = res.statusCode === HttpCode.OK ? HttpCode.INTERNAL_SERVER_ERROR : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}
export {
    notFound, errorHandler
}