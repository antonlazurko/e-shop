import express from 'express'
import { addOrderItems, getOrderById, updateOrderToPaid, getUserUserOrders, getAllOrders } from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'


const router = express.Router()


router.route('/').post(protect, addOrderItems).get(protect, admin, getAllOrders)
router.route('/myorders').get(protect, getUserUserOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router
