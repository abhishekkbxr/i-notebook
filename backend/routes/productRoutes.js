const express=require('express');
const router=express.Router();
const {createProduct ,getAllProducts ,updateProduct ,deleteProduct , getProductDetails,createProductReview, getAllReviews ,deleteReviews}=require('../controller/productController');
const { isAuthenticadtedUser,authorizeRoles } = require('../middleware/auth');



// CRUD of products 

router.route("/products").get(getAllProducts)
router.route("/admin/product/new").post( isAuthenticadtedUser ,authorizeRoles("admin") ,createProduct)
router.route("/admin/updateProduct/:id").put( isAuthenticadtedUser ,authorizeRoles("admin") ,updateProduct)
router.route("/admin/deleteProduct/:id").delete( isAuthenticadtedUser ,authorizeRoles("admin") ,deleteProduct)
router.route("/getProduct/:id").get(getProductDetails)
router.route("/review").put( isAuthenticadtedUser,createProductReview)
router.route("/reviews").get( getAllReviews).delete(isAuthenticadtedUser,deleteReviews)


module.exports=router;