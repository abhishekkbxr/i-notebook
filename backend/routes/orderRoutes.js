const express=require('express');
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controller/orderController');
const router = express.Router();
const { isAuthenticadtedUser,authorizeRoles } = require('../middleware/auth');



router.route("/order/new").post(isAuthenticadtedUser , newOrder);

router.route("/order/:id").get(isAuthenticadtedUser , getSingleOrder);

router.route("/orders/me").get(isAuthenticadtedUser , myOrders);
router.route("/admin/orders").get(isAuthenticadtedUser ,authorizeRoles("admin"), getAllOrders);
router.route("/admin/order/:id").put(isAuthenticadtedUser ,authorizeRoles("admin"), updateOrder).delete(isAuthenticadtedUser ,authorizeRoles("admin"), deleteOrder)




module.exports =router;