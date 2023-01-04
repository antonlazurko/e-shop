import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import { HttpCode, HttpErrorMessage } from '../helpers/constants.js'

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
            res.status(HttpCode.BAD_REQUEST)
            throw new Error(HttpErrorMessage.NO_ORDER_ITEMS)
        } else {
            const order = new Order({
                orderItems,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice})
            const createdOrder = await order.save()
            res.status(HttpCode.CREATED).json(createdOrder)
        }
})

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (order) {
        res.json(order)
    }else{
        res.status(HttpCode.UNAUTHORIZED)
        throw new Error(HttpErrorMessage.ORDER_NOT_FOUND)
    }
})

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)
    const {id, status, create_time, payer} = req.body
    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: id,
            status: status,
            update_time: create_time,
            email_address: payer.email_address
        }
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }else{
        res.status(HttpCode.NOT_FOUND)
        throw new Error(HttpErrorMessage.ORDER_NOT_FOUND)
    }
})

// @desc Get logged user's orders
// @route GET /api/orders/myorders
// @access Private
const getUserUserOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({user: req.user._id})
    if (orders) {
        res.json(orders)
    }else{
        res.status(HttpCode.NOT_FOUND)
        throw new Error(HttpErrorMessage.ORDERS_NOT_FOUND)
    }
})

// @desc Get all orders
// @route GET /api/orders/myorders
// @access Private/Admin
const getAllOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    if (orders) {
        res.json(orders)
    }else{
        res.status(HttpCode.NOT_FOUND)
        throw new Error(HttpErrorMessage.ORDERS_NOT_FOUND)
    }
})

// @desc Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    }else{
        res.status(HttpCode.NOT_FOUND)
        throw new Error(HttpErrorMessage.ORDER_NOT_FOUND)
    }
})

export { addOrderItems, getOrderById, updateOrderToPaid, getUserUserOrders, getAllOrders, updateOrderToDelivered }
