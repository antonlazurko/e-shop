import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async(req, res) => {
        const {
            itemsPrice,
            orderItems,
            paymentMethod,
            shippingAddress,
            shippingPrice,
            taxPrice,
            totalPrice
        } = req.body
        if(orderItems?.length === 0){
            res.status(400)
            throw new Error('No order items')
        } else {
            const order = new Order({user: req.user._id, orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice})
            const createdOrder = order.save()
            res.status(201).json(createdOrder)
        }

})
export { addOrderItems }
