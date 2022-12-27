import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async(req, res) => {
        const {orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice} = req.body
        if(orderItems?length === 0){
            res.status(400)
            throw new Error('No order items')
            return
        } else {
            const order = new Order({user: req.user._id, orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice})
            const createdOrder = order.save()
            res.status(201).json(createdOrder)
        }

})
